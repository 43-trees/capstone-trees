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

router.route('/species/:treeSpecies').get(getSpeciesOfTreesController)

router.route('/profileName/:profileName').get(getTreesByProfileNameController)

router.route('/treeProfileId/:treeProfileId').get(getTreesByTreeProfileIdController)

router.route('/:treeId')
    .get(getTreeByTreeIdController)
    .delete(isLoggedInController, deleteTreeByTreeIdController)

export const treeRoute = { basePath, router }