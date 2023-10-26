import {z} from 'zod'

export const CommentSchema = z.object({
    commentId: z.string({required_error: 'please provide a valid commentId or null'}).uuid({message: 'please provide a valid uuid for commentId'}).nullable(),
    commentProfileId: z.string({required_error: 'please provide a valid commentProfileId'}).uuid({message: 'please provide a valid uuid for commentProfileId'}),
    commentTreeId: z.string({required_error: 'please provide a valid commentTreeId'}).uuid({message: 'please provide a valid uuid for commentTreeId'}),
    commentContent: z.string().max(255, {message: 'please provide a valid commentContent'}),
    commentDatetime: z.date({required_error: 'please provide a valid commentDatetime or null'}).nullable(),
    commentImageUrl: z.string({required_error: 'please provide a valid commentImageUrl or null'}).trim().url({message: 'please provide a valid Url for commentImageUrl'}).max(255, {message: 'please provide a valid commentImageUrl (max 255 characters)'}).nullable(),
})