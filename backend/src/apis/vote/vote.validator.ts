import {z} from 'zod'

export const VoteSchema = z.object({
    voteProfileId: z.string({
        required_error: 'Please provide a valid voteProfileId' })
        .uuid({message: 'Please provide a valid uuid for voteProfileId'}),
    voteTreeId: z.string({
        required_error: 'Please provide a valid voteTreeId'})
        .uuid({message: 'Please provide a valid uuid for voteTreeId'}),
    voteValue: z.string({
        required_error: 'Please provide a valid voteValue'})
        .min(1, 'Please provide a minimum value of 1')
})