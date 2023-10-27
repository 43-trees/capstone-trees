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
import {TreeSchema} from './tree.validator'
import {zodErrorResponse} from '../../utils/response.utils'
import {z} from 'zod'
import {PublicProfileSchema} from '../profile/profile.validator'

export async function postTreeController(request: Request, response: Response): Promise<Response | undefined> {
    try{
        const validationResult = TreeSchema.safeParse(request.body)
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }
        const {treeAddress, treeImage, treeInfo, treeTitle, treeSpecies} = validationResult.data

        const profile: PublicProfile = request.session.profile as PublicProfile

        const treeProfileId: string = profile.profileId as string

        const tree: Tree = {
            treeId: null,
            treeProfileId: treeProfileId,
            treeAddress: treeAddress,
            treeEndDate: null,
            treeDate: null,
            treeImage: treeImage,
            treeInfo: treeInfo,
            treeLat: null,
            treeLng: null,
            treeTitle: treeTitle,
            treeSpecies: treeSpecies
        }

        const result = await insertTree(tree)

        const status: Status = {
            status: 200,
            message: result,
            data: null
        }
        return response.json(status)
    } catch (error) {
        console.error(error)
        return response.json({
            status: 500,
            message: 'Error creating tree, try again.',
            data: null
        })
    }
}

export async function getAllTrees (request: Request, response: Response): Promise<Response<Status>> {
    try {
        const data = await selectAllTrees()

        const status: Status = {
            status: 200,
            message: null,
            data
        }
        return response.json(status)
    } catch (error) {
        console.error(error)
        return response.json({
            status: 500,
            message: 'Error getting trees. Try again',
            data: []
        })
    }
}

export async function getTreesByTreeProfileIdController (request: Request, response: Response): Promise<Response<Status>> {
    try {
        const validationResult = z.string().uuid({
            message: 'Please provide a valid treeProfileId'
        })
            .safeParse(request.params.treeProfileId)

        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        const treeProfileId = validationResult.data

        const data = await selectTreesByTreeProfileId(treeProfileId)

        return response.json({
            status: 200,
            message: null,
            data
        })
    } catch (error) {
        console.error(error)
        return response.json ({
            status: 500,
            message: 'Something went wrong, try again.',
            data: []
        })
    }
}

export async function getTreesByProfileNameController (request: Request, response: Response): Promise<Response<Status>> {
    try {
        const validationResult = PublicProfileSchema.pick({
            profileName: true
        })
            .safeParse(request.params)
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        const {profileName} = validationResult.data

        const data = await selectTreeByProfileName(profileName)

        return response.json({
            status: 200,
            message: null,
            data
        })
    } catch (error) {
        return response.json({
            status: 500,
            message: 'something went wrong here, try again',
            data: []
        })
    }
}

export async function getTreeByTreeIdController (request: Request, response: Response): Promise<Response<Status>> {
    try {
        const validationResult = z.string()
            .uuid({
                message: 'Please provide a valid treeId'
            })
            .safeParse(request.params.treeId)

        if(!validationResult.success){
            return zodErrorResponse(response, validationResult.error)
        }

        const treeId = validationResult.data

        const data = await selectTreeByTreeId(treeId)

        return response.json({
            status: 200,
            message: null,
            data
        })
    } catch (error) {
        console.error(error)
        return response.json({
        status: 500,
        message: 'Oops! Something went wrong, try again.',
        data: []
    })}

}

export async function getSpeciesOfTreesController(request: Request, response: Response): Promise<Response<Status>> {
    try {
        const validationResult = TreeSchema.pick({treeSpecies: true})
            .safeParse(request.params)
        // const validationResult = z.string()
        //     .min(3,{
        //     message: 'Please provide a valid tree species.'
        // })
        //     .safeParse(request.params.treeSpecies)

        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        const {treeSpecies} = validationResult.data

        const data = await selectSpeciesOfTrees(treeSpecies)

        return response.json({
            status: 200,
            message: null,
            data
        })
    } catch (error) {
        console.error(error)
        return response.json({
            status: 500,
            message: 'Oh no! Something went wrong.',
            data: []
        })
    }
}

export async function deleteTreeByTreeIdController (request: Request, response: Response): Promise<Response<Status>> {
    try {
        const validationResult = z.string()
            .uuid({
                message: 'Please provide a valid treeId'
            })
            .safeParse(request.params.treeId)

        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        const profile: PublicProfile = request.session.profile as PublicProfile

        const treeProfileId: string = profile.profileId as string

        const treeId = validationResult.data

        const tree = await selectTreeByTreeId(treeId)

        if(tree?.treeProfileId !== treeProfileId) {

            return response.json ({
                status: 403,
                message: 'You are not allowed to delete this tree',
                data: null
            })
        }

        const result = await deleteTreeByTreeId(treeId)

        return response.json({
            status: 200,
            message: result,
            data: null
        })
    } catch (error) {
        console.error(error)
        return response.json({
            status: 500,
            message: 'Something went wrong!',
            data: []
        })
    }
}