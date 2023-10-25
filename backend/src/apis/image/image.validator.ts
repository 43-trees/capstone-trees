import {z} from 'zod'

export const ImageSchema = z.object({
    imageId: z.string({
        required_error: 'please provide a valid ImageId'}).uuid({message: 'please provide a valid uuid for imageId'}).nullable(),
    imageTreeId: z.string({required_error: 'please provide a valid imageTreeId'}).uuid({message: 'please provide a valid uuid for imageTreeId'}),
    imageUrl: z.string({required_error: 'please provide a valid imageUrl'})
})