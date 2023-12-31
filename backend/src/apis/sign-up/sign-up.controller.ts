import { Request, Response } from 'express'
import { Status } from '../../utils/interfaces/Status'
import formData from 'form-data'
import Mailgun from 'mailgun.js'
import { setActivationToken, setHash } from '../../utils/auth.utils'
import { PrivateProfile, insertProfile } from '../profile/profile.model'
import { SignUpProfileSchema } from './sign-up.validator'
import { zodErrorResponse } from "../../utils/response.utils"

export async function signUpProfileController (request: Request, response: Response): Promise<Response | undefined> {
    try {
        const validationResult = SignUpProfileSchema.safeParse(request.body)
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        console.log(process.env.MAILGUN_API_KEY)
        const mailgun: Mailgun = new Mailgun(formData)
        const mailgunClient = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY as string })
        console.log(process.env.MAILGUN_API_KEY)

        const { profileName, profileEmail, profilePassword } = request.body

        const profileHash = await setHash(profilePassword)

        const profileActivationToken = setActivationToken()

        const profileImageUrl = 'https://res.cloudinary.com/dtcosq4b9/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1699983937/Urban_orchard_2023_nsbimg.jpg?_s=public-apps'

        const basePath: string = `${request.protocol}://${request.hostname}:8080${request.originalUrl}activation/${profileActivationToken}`

        const message = `<h2>Welcome to Urban Orchard<h2>
          <p>In order to start finding or posting trees you must confirm your account.</p>
          <p><a href="${basePath}">${basePath}</a></p>`

        const mailgunMessage = {
            from: `Mailgun Sandbox <postmaster@${process.env.MAILGUN_DOMAIN as string}>`,
            to: profileEmail,
            subject: 'One step closer to Trees -- Account Activation',
            html: message
        }

        const profile: PrivateProfile = {
            profileId: null,
            profileActivationToken,
            profileEmail,
            profileHash,
            profileJoinDate: null,
            profileImageUrl,
            profileName,
        }

        await insertProfile(profile)

        await mailgunClient.messages.create(process.env.MAILGUN_DOMAIN as string, mailgunMessage)
console.log("after mailgun message create")
        const status: Status = {
            status: 200,
            message: 'Profile created successfully please check your email.',
            data: null
        }

        return response.json(status)
    } catch (error: any) {
        console.log(error)
        const status: Status = {
            status: 500,
            message: error.message,
            data: null
        }

        return response.json(status)
    }
}