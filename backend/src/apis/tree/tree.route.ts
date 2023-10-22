import { Router } from 'express'
import {
    deleteTreeByTreeIdController,
    getAllTrees,
    getSpeciesOfTreesController,
    getTreeByTreeIdController,
    getTreesByProfileNameController,
    getTreesByTreeProfileIdController,
    postTreeController
} from "./tree.controller";
import {isLoggedInController} from "../../utils/controllers/isLoggedIn.controller";


const basePath = '/apis/tree'


const router = Router()

router.route('/')
    .post(isLoggedInController, postTreeController)
    .get(getAllTrees)

router.route('/species/:species').get(getSpeciesOfTreesController)

router.route('/profileName/:profileName').get(getTreesByProfileNameController)

router.route('/treeProfileId/:treeProfileId').get(getTreesByTreeProfileIdController)

router.route('/:threadId')
    .get(getTreeByTreeIdController)
    .delete(isLoggedInController, deleteTreeByTreeIdController)

export const treeRoute = { basePath, router }