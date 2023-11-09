import {repositoryService} from '../services/repositoryService.ts';
const fetchAllRepositories = async (req, res) => {
    return repositoryService.fetchAllRepositories(req, res);
}
const fetchRepositoryByName = async (req, res) => {
    await repositoryService.fetchRepositoryByName(req, res);
};

export const repositoryController = {
    fetchAllRepositories,
    fetchRepositoryByName
}