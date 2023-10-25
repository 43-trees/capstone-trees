import {Router} from 'express'
import {
    getAllCommentsByTreeIdController,
    deleteCommentByCommentIdController,
    getAllComments,
    getCommentByCommentIdController,
    getCommentsByProfileIdController,
    getCommentsByProfileNameController,
    postCommentController
} from './comment.controller';
import {isLoggedInController} from '../../utils/controllers/isLoggedIn.controller';

const basePath = '/apis/comment'

const router = Router()

router.route('/')
    .post(isLoggedInController, postCommentController)
    .get(getAllComments)

router.route('/commentTreeId/:commentTreeId')
    .get(getAllCommentsByTreeIdController)
router.route('/profileName/:profileName')
    .get(getCommentsByProfileNameController)
router.route('/commentProfileId/:commentProfileId').get(getCommentsByProfileIdController)
router.route('/:commentId')
    .get(getCommentByCommentIdController)
    .delete(isLoggedInController, deleteCommentByCommentIdController)

export const commentRoute = {basePath, router}

