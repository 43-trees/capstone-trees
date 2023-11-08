import {z} from 'zod'

export const ImageSchema = z.object({
    imageId: z.string({
        required_error: 'please provide a valid ImageId'}).uuid({message: 'please provide a valid uuid for imageId'}).nullable(),
    imageTreeId: z.string({required_error: 'please provide a valid imageTreeId'}).uuid({message: 'please provide a valid uuid for imageTreeId'}),
    imageUrl: z.string({
        required_error: 'Image is required',
        invalid_type_error: 'please provide a valid ImageUrl'
    })
        .trim()
        .url({ message: 'please provide a valid profile image url'})
        .max(256, {message: 'profile image url is too long'})
})

export type Image = z.infer <typeof ImageSchema>