import {z} from 'zod'

export const ImageSchema = z.object({
    imageProfileId: z.string({
        required_error: 'please provide a valid ImageProfileId'}).uuid({message: 'please provide a valid uuid for imageProfileId'}),
    imageTreeId: z.string({required_error: 'please provide a valid imageTreeId'}).uuid({message: 'please provide a valid uuid for imageTreeId'}),
    imageDatetime: z.date({required_error: 'please provide a valid imageDatetime or null'}).nullable(),
})