import {z} from "zod";

export const PrivateProfileSchema = z.object({
    profileId: z.string({
        required_error: 'profileId is required',
        invalid_type_error: 'Please provide a valid profileId'
    })
        .uuid({ message: 'please provide a valid profileId' })
        .nullable(),

    profileEmail: z.string({
        required_error: 'profileEmail is required',
        invalid_type_error: 'please provide a valid profileEmail'
    })
        .email({ message: 'please provide a valid email' })
        .max(128, { message: 'profileEmail is to long' }),

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
})

export type privateProfile = z.infer<typeof PrivateProfileSchema>