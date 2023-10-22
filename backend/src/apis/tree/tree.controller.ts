import {Request, response, Response} from 'express'
import {
    deleteTreeByTreeId,
    insertTree,
    selectAllTrees,
    selectSpeciesOfTrees,
    selectTreeByTreeId,
    selectTreeByProfileName,
    selectTreesByTreeProfileId,
    Tree
} from './tree.model'
import {Status} from '../../utils/interfaces/Status'
import {PublicProfile} from '../profile/profile.model'
import {TreeSchema} from './tree.vaildator'
import {zodErrorResponse} from '../../utils/response.utils'
import {z} from 'zod'
import {PublicProfileSchema} from '../profile/profile.validator'

export async function postTreeController(request: Request, response: Response): Promise<Response | undefined> {
    try{
        const validationResult = TreeSchema.safeParse(request.body)
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }
        const {treeInfo, }
    }
}