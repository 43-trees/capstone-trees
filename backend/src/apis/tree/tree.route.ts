import { Router } from 'express'
import {
    deleteTreeByTreeIdController,
    getAllTrees,
    getSpeciesOfTreeController,
    getTreeByTreeIdController,
    getTreeByProfileNameController,
    getTreesByTreeProfileIdController,
    postTreeController
} from "./tree.controller";
import {isLoggedInController} from "../../utils/controllers/isLoggedIn.controller";


const basePath = '/apis/tree'


const router = Router()

router.route('/')
    .post(isLoggedInController, postTreeController)
    .get(getAllTrees)

router.route('/page/:page').get(getSpeciesOfTreeController)

router.route('/profileName/:profileName').get(getTreeByProfileNameController)

router.route('/treeProfileId/:treeProfileId').get(getTreesByTreeProfileIdController)

router.route('/:threadId')
    .get(getTreeByTreeIdController)
    .delete(isLoggedInController, deleteTreeByTreeIdController)

export const treeRoute = { basePath, router }