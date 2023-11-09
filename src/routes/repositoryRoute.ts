import {Router} from "express";
import {repositoryController} from "../controllers/repositoryController.ts";
export const router: Router = Router();
router.route('/').get(repositoryController.fetchAllRepositories);
router.route('/:name').get(repositoryController.fetchRepositoryByName);


