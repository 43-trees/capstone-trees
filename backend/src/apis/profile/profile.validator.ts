import { z } from 'zod'

export const PrivateProfileSchema = z.object({
    profileId: z.string({
    required_error: 'profileId is required',
    invalid_type_error: 'Please provide a valid profileId'
})
    .uuid({ message: 'please provide a valid profileId' })
    .nullable(),

    profileActivationToken: z.string({
    required_error: 'Token is required',
    invalid_type_error: 'please provide a valid token'
})
        .length(32, 'Activation token must be 32 characters'),

    profileEmail: z.string({
    required_error: 'profileEmail is required',
    invalid_type_error: 'please provide a valid profileEmail'
})
    .email({ message: 'please provide a valid email' })
    .max(128, { message: 'profileEmail is to long' }),

    profileHash: z.string({
    required_error: 'profileHash is required',
    invalid_type_error: 'please provide a valid profileHash',
})
    .length(97, { message: 'profile hash must be 97 characters' }),

    profileImageUrl: z.string({
        required_error: 'profileImage is required',
        invalid_type_error: 'please provide a valid profileImageUrl'
    })
        .trim()
        .url({ message: 'please provide a valid profile image url'})
        .max(255, {message: 'profile image url is too long'})
        .nullable(),

    profileName: z.string()
    .trim()
    .min(1, { message: 'please provide a valid profile name (min 1 characters)' })
    .max(32, { message: 'please provide a valid profile name (max 32 characters)' }),

    profileJoinDate: z.coerce.date({
        required_error: 'profileJoinDate is required',
        invalid_type_error: 'please provide a valid profileJoinDate'
    })
        .nullable()
})

export const PublicProfileSchema = PrivateProfileSchema.omit({profileActivationToken: true,profileHash: true, profileEmail: true})