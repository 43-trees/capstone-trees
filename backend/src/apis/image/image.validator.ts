import {z} from 'zod'

export const ImageSchema = z.object({
    imageId: z.string({
        required_error: 'please provide a valid ImageId'}).uuid({message: 'please provide a valid uuid for imageId'}),
    imageTreeId: z.string({required_error: 'please provide a valid imageTreeId'}).uuid({message: 'please provide a valid uuid for imageTreeId'}),
    imageDatetime: z.date({required_error: 'please provide a valid imageDatetime or null'}).nullable(),
})