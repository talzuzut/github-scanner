import {repositoryService} from '../services/repositoryService.ts';

const fetchAllRepositories = async (req, res) => {
    return repositoryService.fetchAllRepositories(req, res);
}
const fetchRepositoryByNameAndOwner = async (req, res) => {
    await repositoryService.fetchRepositoryByNameAndOwner(req, res);
};

const fetchAllRepositoriesByOwner = async (req, res) => {
    await repositoryService.fetchAllRepositoriesByOwner(req, res);
}
export const repositoryController = {
    fetchAllRepositories,
    fetchRepositoryByNameAndOwner,
    fetchAllRepositoriesByOwner,
}