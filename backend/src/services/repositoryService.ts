import axios, {AxiosInstance, AxiosResponse} from 'axios';
import dotenv from 'dotenv';
import NodeCache from 'node-cache';
import {
    fetchAllRepositoriesByOwnerQuery,
    fetchAllRepositoriesQuery,
    fetchRepositoryBasicDetailsByNameQuery,
    fetchRepositoryFilesQuery,
    fetchRepositoryYamlFileQuery,
} from '../graphql/queries/repositoryQuery.ts';
import {RepositoryFileDetails, RepositoryFormattedDetails} from "../types/RepositoryType.ts";

dotenv.config();

const githubApiUrl = process.env.GITHUB_API_URL || 'https://api.github.com/graphql';
const githubClient: AxiosInstance = axios.create({
    baseURL: githubApiUrl,
    headers: {
        Authorization: `bearer ${process.env.GITHUB_API_TOKEN}`,
    },
});
const cache = new NodeCache({stdTTL: 60 * 60 * 24});
const fetchAllRepositories = async (req, res) => {
    try {
        const response: AxiosResponse = await githubClient.post('', {query: fetchAllRepositoriesQuery()});

        if (response.data.errors) {
            throw new Error(response.data.errors);
        }

        const repositories = response.data.data?.viewer?.repositories?.nodes;
        const formattedRepositories: RepositoryFormattedDetails[] = repositories?.map((repository) => ({
            name: repository.name,
            size: repository.diskUsage,
            owner: repository.owner.login,
        }));

        res.status(200).send(formattedRepositories);
    } catch (error) {
        console.error('Error while fetching all repositories:', error);
        res.status(500).send('Internal Server Error');
    }
};
const fetchAllRepositoriesByOwner = async (req, res) => {
    try {
        const response: AxiosResponse = await githubClient.post('', {
            query: fetchAllRepositoriesByOwnerQuery(req.params.owner),
        });

        if (response.data.errors) {
            throw new Error(response.data.errors);
        }

        const repositories = response.data.data?.user?.repositories?.nodes;
        const formattedRepositories: RepositoryFormattedDetails[] = repositories?.filter(repository => repository.owner.login === req.params.owner).map((repository) => ({
            name: repository.name,
            size: repository.diskUsage,
            owner: repository.owner.login,
        }));

        res.status(200).send(formattedRepositories);
    } catch (error) {
        console.error('Error while fetching all repositories by owner:', error);
        res.status(500).send('Internal Server Error');
    }

}
const getRelatedCacheKey = (owner: string, name: string) => `${owner}/${name}`;
const fetchRepositoryByNameAndOwner = async (req, res) => {
    try {
        const cachingKey = getRelatedCacheKey(req.params.owner, req.params.name);
        const cachedRepository = cache.get(cachingKey);

        if (cachedRepository) {
            res.status(200).send(cachedRepository);
            return;
        }

        const response: AxiosResponse = await githubClient.post('', {
            query: fetchRepositoryBasicDetailsByNameQuery(req.params.owner, req.params.name),
        });

        if (response.data.errors) {
            console.log(response.data.errors);
            res.status(404).send('Repository not found');
            return;
        }

        const repository = response.data.data?.repository;
        const repositoryDetails: RepositoryFormattedDetails = {
            name: repository?.name,
            size: `${repository?.diskUsage} KB`,
            owner: repository?.owner?.login,
            visibility: repository?.isPrivate ? 'Private' : 'Public',
        };

        const enrichedRepositoryDetails = await scanRepositoryFiles(repositoryDetails, repository?.defaultBranchRef?.name);

        repositoryDetails.filesCount = enrichedRepositoryDetails.filesCount;
        repositoryDetails.yamlFile = enrichedRepositoryDetails.yamlFile;

        cache.set(cachingKey, repositoryDetails);
        res.status(200).send(repositoryDetails);
    } catch (error) {
        console.error('Error while fetching repository by name:', error);
        res.status(500).send('Internal Server Error');
    }
};

const scanRepositoryFiles = async (repositoryDetails: RepositoryFormattedDetails, defaultBranch: string, path: string = '') => {
    let yamlFilePath: string;

    async function countRepositoryFiles(owner: string, name: string, defaultBranch: string, path: string = ''): Promise<number> {
        try {
            const response: AxiosResponse = await githubClient.post('', {
                query: fetchRepositoryFilesQuery(owner, name, path, defaultBranch),
            });

            if (response.data.errors) {
                throw new Error(response.data.errors);
            }

            const entries: RepositoryFileDetails[] = response?.data?.data?.repository?.object?.entries;

            if (!entries) {
                return 0;
            }

            const fileCountPromises: Promise<number>[] = entries.map(async (entry) => {
                if (entry.type === 'tree') {
                    const folderPath: string = path ? `${path}/${entry.name}` : entry.name;
                    return countRepositoryFiles(owner, name, defaultBranch, folderPath);
                } else {
                    if (!yamlFilePath && (entry.extension === '.yml' || entry.extension === '.yaml')) {
                        yamlFilePath = path === '' ? entry.name : `${path}/${entry.name}`;
                    }
                    return 1;
                }
            });

            const fileCounts = await Promise.all(fileCountPromises);

            return fileCounts.reduce((acc, count) => acc + count, 0);
        } catch (error) {
            console.error('Error while counting files:', error);
            throw error;
        }
    }

    repositoryDetails.filesCount = await countRepositoryFiles(repositoryDetails.owner, repositoryDetails.name, defaultBranch, path);

    if (yamlFilePath) {
        repositoryDetails.yamlFile = await getYamlFileContent(repositoryDetails, defaultBranch, yamlFilePath);
    }

    return repositoryDetails;
};

const getYamlFileContent = async (repositoryDetails: RepositoryFormattedDetails, defaultBranch: string, path: string) => {
    try {
        const response: AxiosResponse = await githubClient.post('', {
            query: fetchRepositoryYamlFileQuery(repositoryDetails.owner, repositoryDetails.name, path, defaultBranch),
        });

        if (response.data.errors) {
            throw new Error(response.data.errors);
        }

        return response.data.data?.repository?.object?.text;
    } catch (error) {
        console.error('Error while fetching YAML file content:', error);
        throw error;
    }
};

export const repositoryService = {
    fetchAllRepositories,
    fetchRepositoryByNameAndOwner,
    fetchAllRepositoriesByOwner
};