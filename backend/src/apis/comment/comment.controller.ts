import {Request, Response} from 'express'
import {
    deleteCommentByCommentId,
    insertComment,
    selectAllComments,
    selectCommentByCommentId,
    selectCommentsByProfileName,
    selectCommentsByCommentProfileId,
    selectAllCommentsByTreeId,
    Comment,
} from "./comment.model"
import {Status} from "../../utils/interfaces/Status"
import {PublicProfile} from "../profile/profile.model"
import {CommentSchema} from "./comment.validator"
import {zodErrorResponse} from "../../utils/response.utils"
import {z} from 'zod'
import {PublicProfileSchema} from "../profile/profile.validator"
import exp from "constants";
import {commentRoute} from "./comment.route";

export async function postCommentController(request: Request, response: Response): Promise<Response | undefined> {
    try{
        const validationResult = CommentSchema.safeParse(request.body)
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }
        const {commentTreeId, commentContent, commentImageUrl} = validationResult.data
        const profile: PublicProfile = request.session.profile as PublicProfile
        const commentProfileId: string = profile.profileId as string
        const comment: Comment = {
            commentId: null,
            commentProfileId: commentProfileId,
            commentTreeId: commentTreeId,
            commentContent,
            commentDatetime: null,
            commentImageUrl
        }
        const result = await insertComment(comment)
        const status: Status = {status:200, message: result, data: null}
        return response.json(status)
    } catch (error) {
        console.log(error)
        return response.json({status: 500, message: 'Error creating comment. Try again.', data: null})
    }
}

export async function getAllComments (request: Request, response: Response): Promise<Response<Status>> {
    try{
        const data = await selectAllComments()
        const status: Status = {status: 200, message: null, data}
        return response.json(status)

    } catch (error) {
        console.log(error)
        return response.json({
            status: 500,
            message: 'Error getting comments. Try again.',
            data: []
        })
    }
}

export async function getAllCommentsByTreeIdController(request: Request, response: Response): Promise<Response<Status>> {
    try{
        const validationResult = CommentSchema.pick({commentTreeId: true}).safeParse(request.params)
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }
        const {commentTreeId} = validationResult.data
        const data = await selectAllCommentsByTreeId(commentTreeId)
        return response.json({status: 200, message: null, data})
    } catch (error){
        return response.json({
            status: 500,
            message: '',
            data: []
        })
    }
}

export async function getCommentsByCommentProfileIdController (request: Request, response: Response): Promise<Response<Status>> {
    try {
        const validationResult = z.string().uuid({message: 'please provide a valid commentProfileId'}).safeParse(request.body.commentProfileId)
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }
        const commentProfileId = validationResult.data
        const data = await selectCommentsByCommentProfileId(commentProfileId)
        return response.json({
            status: 200,
            message: null, data
        })
    } catch (error) {
        return response.json({
            status: 500,
            message: '',
            data: []
        })
    }
}


export async function getCommentsByProfileNameController (request: Request, response: Response): Promise<Response<Status>> {
    try {
        const validationResult = PublicProfileSchema.pick({profileName: true}).safeParse(request.params)
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }
        const {profileName} = validationResult.data
        const data = await selectCommentsByProfileName(profileName)
        return response.json({
            status: 500,
            message: '',
            data: []
        })

    } catch (error) {
        console.log(error)
        return response.json({
            status: 500,
            message: '',
            data: []
        })
    }
}

export async function getCommentByCommentIdController (request: Request, response: Response): Promise<Response<Status>> {
    try {
        const validationResult = z.string().uuid({message: 'please provide a valid CommentId'}).safeParse(request.params.commentId)
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }
        const commentId = validationResult.data
        const data = await selectCommentByCommentId(commentId)
        return response.json({
            status: 200,
            message: null,
            data
        })
    } catch (error) {
        return response.json({
            status: 500,
            message: '',
            data: []
        })
    }
}

export async function deleteCommentByCommentIdController (request: Request, response: Response): Promise<Response<Status>> {
    try{
        const validationResult = z.string().uuid({
            message: 'please provide a valid commentId'
        }).safeParse(request.params.commentId)
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }
        const profile: PublicProfile = request.session.profile as PublicProfile
        const commentProfileId: string = profile.profileId as string
        const commentId = validationResult.data
        const comment = await selectCommentByCommentId(commentId)

        if(comment?.commentProfileId !== commentProfileId) {
            return response.json({
                status: 403,
                message: 'you are not allowed to delete this comment',
                data: null
            })
        }
        const result = await deleteCommentByCommentId(commentId)
        return response.json({status: 200, message: result, data: null})

    } catch (error) {
        console.log(error)
        return response.json({
            status: 500,
            message: '',
            data: []
        })
    }
}