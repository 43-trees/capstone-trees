import {Router} from 'express'
import {isLoggedInController} from "../../utils/controllers/isLoggedIn.controller";
import {
    deleteVoteController, getVotesByVoteProfileIdController,
    getVotesByVoteTreeIdController,
    postVoteController,
    toggleVoteController
} from "./vote.controller";


const basePath = '/apis/vote'


const router = Router()


router.route('/')
    .post(isLoggedInController, postVoteController)


router.route('/toggle')
    .post(isLoggedInController, toggleVoteController)


router.route('/voteTreeId/:voteTreeId')
    .get(getVotesByVoteTreeIdController)
    .delete(isLoggedInController, deleteVoteController)

router.route('/profileId/:voteProfileId')
    .get(getVotesByVoteProfileIdController)

export const voteRoute = {basePath, router}