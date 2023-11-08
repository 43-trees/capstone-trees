import {z} from 'zod';


export const SignUpSchema = z.object({
    profileEmail: z.string({
        required_error: 'profile email is required',
        invalid_type_error: 'please provide a valid profileEmail'
    })
        .email({ message: 'please provide a valid email' })
        .max(128, { message: 'profileEmail is to long' }),
    profileName: z.string()
        .trim()
        .min(1, { message: 'please provide a valid profile name (min 1 characters)' })
        .max(32, { message: 'please provide a valid profile name (max 32 characters)' }),
        profilePasswordConfirm: z.string()
            .min(8, {message: 'please provide a valid password (min 8 characters)'})
            .max(32, {message: 'please provide a valid password (max 32 characters)'}),
        profilePassword: z.string()
            .min(8,{message: 'please provide a valid password (min 8 characters)' })
            .max(32, {message: 'please provide a valid password (max 32 characters)' })
    })

    .refine(data => data.profilePassword === data.profilePasswordConfirm, {
        message: 'passwords do not match'
    })

export type SignUp = z.infer<typeof SignUpSchema>