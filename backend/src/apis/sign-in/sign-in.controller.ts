import {
PrivateProfile,
selectPrivateProfileByProfileEmail
} from "../profile/profile.model";
import {generateJwt, validatePassword} from '../../utils/auth.utils'
import {Request, Response} from 'express'
import {signInProfileSchema} from './sign-in.validator'
import {zodErrorResponse} from '../../utils/response.utils'
import {v4 as uuid} from 'uuid'
import {Status} from '../../utils/interfaces/Status'

export async function signInController (request:Request, response: Response): Promise<Response> {
    try{
        const validationResult = signInProfileSchema.safeParse(request.body)
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }
        const {profileEmail, profilePassword} = validationResult.data
        const profile: PrivateProfile | null = await selectPrivateProfileByProfileEmail(profileEmail)
        const signInFailedStatus: Status = {
            status: 400,
            message: 'Emaail or password is incorrect please try again',
            data: null
        }
        if (profile === null) {
            return response.json(signInFailedStatus)
        }
        const isPasswordValid = await validatePassword(profile
            .profileHash, profilePassword)
        if (!isPasswordValid) {
            return response.json(signInFailedStatus)
        }
        const {profileId, profileImageUrl, profileJoinDate, profileName} = profile
        const signature: string = uuid()
        const authorization: string = generateJwt({
            profileId,
            profileImageUrl,
            profileJoinDate,
            profileName
        }, signature)

        request.session.profile = profile
        request.session.jwt = authorization
        request.session.signature = signature

        response.header({
            authorization
        })
        return response.json({
            status:200,
            message: 'Sign in successful',
            data: null
        })

    } catch (error: any) {
        return response.json({
            status:500,
            data: null,
            message: error.message
        })
    }
}
