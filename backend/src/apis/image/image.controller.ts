import { Request, Response} from "express"
import {
    deleteImage,
    insertImage,
    Image,
    selectImageByImageId,
    selectImagesByImageTreeId, deleteImageByImageId,
} from './image.model'
import {PublicProfile} from "../profile/profile.model"
import {Status} from "../../utils/interfaces/Status"
import {ImageSchema} from "./image.validator"
import {zodErrorResponse} from "../../utils/response.utils"
import {z} from "zod"
import exp from "constants";

export async function getImagesByImageTreeIdController(request: Request, response: Response): Promise<Response> {
    try{
        const validationResult = z.string().uuid("Please provide a valide imageTreeId").safeParse(request.params.imageTreeId)
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }
        const imageTreeId = validationResult.data
        const data = await selectImagesByImageTreeId(imageTreeId)
        return response.json({
            status: 200,
            message: null,
            data
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

export async function getImagesByImageProfileIdController(request:Request, response: Response): Promise<Response> {
    try {
        const validationResult = z.string().uuid("please provide a valid imageProfileId").safeParse(request.params.imageProfileId)
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }
        const imageProfileId = validationResult.data
        const data = await selectImagesbyImageProfileID(imageProfileId)
        return response.json({status: 200, message: null, data})
    }catch (error) {
        console.log(error)
        return response.json({
            status: 500,
            message: '',
            data: []
        })
    }
}

export async function postImageController(request: Request, response: Response): Promise<Response<Status>> {
    try {
        const validationResult = ImageSchema.safeParse(request.body)
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }
        const {ImageTreeId} = validationResult.data
        const profile = request.session.profile as PublicProfile
        const imageProfileId = profile.profileId as string
        const image: Image = {
            imageProfileId,
            imageTreeId,
            imageDatetime: null
        }
        const status: Status = {
            status: 200,
            message: '',
            data: null
        }
        status.message = await insertImage(image)
        return response.json(status)
    } catch (error: any) {
        console.log(error)
        return (response.json({
            status: 500,
            message: error.message,
            data: null
        }))
    }
}


export async function deleteImageController(request: Request, response: Response): Promise<Response<Status>> {
    try {
        const validationResult = z.string().uuid({message: 'please provide a valid imageId'}).safeParse(request.params.imageId)
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }
        const profile: PublicProfile = request.session.profile as PublicProfile
        const imageId = validationResult.data
        const image = await selectImageByImageId(imageId)
    }
    const result = await deleteImageByImageId(imageId)
    return response.json({staus: 200, message: result, data: null})
}
