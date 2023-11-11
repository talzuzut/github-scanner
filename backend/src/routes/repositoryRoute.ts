import {Router} from "express";
import {repositoryController} from "../controllers/repositoryController.ts";
import {concurrencyMiddleware} from "../middleware/concurrentRequest.ts";

export const router: Router = Router();
router.route('/').get(repositoryController.fetchAllRepositories);
router.use('/:owner/:name', concurrencyMiddleware);
router.route('/:owner/:name').get(repositoryController.fetchRepositoryByNameAndOwner);
router.route('/:owner').get(repositoryController.fetchAllRepositoriesByOwner);
