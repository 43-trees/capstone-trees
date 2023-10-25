import {Request, Response} from 'express'
import {
    deleteVote,
    insertVote,
    Vote,
    selectVotesByVoteProfileId,
    selectVotesByVoteTreeId,
} from './vote.model'
import {PublicProfile} from "../profile/profile.model"
import {Status} from '../../utils/interfaces/Status'
import {VoteSchema} from 'vote.validator'
import {zodErrorResponse} from "../../utils/response.utils";
import {z} from 'zod'

export async function getVotesByVoteTreeIdController(request: Request, response: Response): Promise<Response> {
    try{
        const validationResult = z.string().uuid('Please provide a valid voteTreeId').safeParse(request.params.voteTreeId)
        if(!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }
        const voteTreeId = validationResult.data

        const data = await selectVotesByVoteTreeId(voteTreeId)

        return response.json({
            status: 200,
            message: null,
            data
        })

    } catch (error) {
        console.error(error)
        return response.json({
            status: 500,
            message: 'Could not get votes by treeId, please try again.'
        })
    }
}

export async function getVotesByVoteProfileIdController(request: Request, response: Response): Promise<Response> {
    try {
        const validationResult = z.string().uuid('Please provide a valid voteProfileId').safeParse(request.params.voteProfileId)

        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        const voteProfileId = validationResult.data

        const data = await selectVotesByVoteProfileId(voteProfileId)

        return response.json({
            status: 200,
            message: null,
            data
        })
    } catch (error) {
        console.error(error)
        return response.json({
            status: 500,
            message: 'Could not access votes by Profile Id, please try again.',
            data: []
        })
    }
}

export async function toggleVoteController(request: Request, response: Response): Promise<Response<Status>> {
    try{
        const validationResult = voteSchema.safeParse(request.body)

        if(!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        const {voteTreeId} = validationResult.data

        const profile = request.session.profile

        const voteProfileId = profile.profileId

        const vote: Vote = {
            voteProfileId,
            voteTreeId,
            voteValue: null
        }

        const status: Status = {
            status: 200,
            message: '',
            data: null
        }

        const selectedVote: Vote | null = await selectVoteByVoteId(vote)

        if(selectedVote === null) {
            status.message = await insertVote(vote)
        } else {
            status.message = await deleteVote(vote)
        }

        return response.json(status)
    } catch (error: any) {
        console.error(error)
        return (response.json ({
            status: 500,
                data: null,
                message: error.message
        }))
    }
}

export async function postVoteController(request: Request, response: Response): Promise<Response<Status>> {
    try {
        const validationResult = VoteSchema.safeParse(request.body)

        if(!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        const {voteTreeId} = validationResult.data

        const profile = request.session.profile as PublicProfile

        const voteProfileId = profile.profileId as string

        const vote: Vote = {
            voteProfileId,
            voteTreeId,
            voteValue: null
        }

      status.message = await insertVote(vote)

        return response.json(status)
    } catch (error:any) {
        return(response.json({
            status: 500,
            message: error.message,
            data: null
        }))
    }
}

export async function deleteVoteController(request: Request, response: Response): Promise<Response<Status>> {
    try {
        const validationResult = VoteSchema.safeParse(request.body)

        if(!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        const {voteTreeId} = validationResult.data

        const profile = request.session.profile as PublicProfile

        const voteProfileId = profile.profileId as string

        const vote: Vote = {
            voteProfileId,
            voteTreeId,
            voteValue: null
        }

        const status: Status = {
            status: 200,
            message: '',
            data: null
        }
        status.message = await deleteVote(vote)

        return response.json(status)
    } catch (error: any) {
        console.error(error)
        return (response.json({
            status: 500,
            data: null,
            message: error.message
        }))
    }
}