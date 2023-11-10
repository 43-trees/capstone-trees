import {z} from 'zod'
import {ImageSchema} from './image.validator'
import {sql} from "../../utils/database.utils"

export type Image = z.infer<typeof ImageSchema>


export async function deleteImageByTreeId(imageTreeId: string): Promise<string> {

    await sql`DELETE 
              FROM image
              WHERE image_tree_id = ${imageTreeId}`

    return  'Image successfully deleted'

}

export async function deleteImageByImageId(imageId: string): Promise<string> {

    await sql`DELETE 
              FROM image
              WHERE image_id = ${imageId}`

    return  'Image successfully deleted'

}

export async function insertImage(image: Image): Promise<string> {

    const {imageTreeId, imageUrl} = image

    await sql`INSERT INTO image (image_id, image_tree_id, image_url)
                VALUES (gen_random_uuid(), ${imageTreeId}, ${imageUrl})`

    return 'Image successfully posted'
}


export async function selectImageByImageId(imageId: string): Promise<Image | null> {
    const rowList = <Image[]>await sql`SELECT image_id, image_tree_id, image_url
                                              FROM image
                                              WHERE image_id = ${imageId}`
    const result = ImageSchema.array().max(1).parse(rowList)
    return result.length === 0 ? null : result[0]
}

export async function selectImagesByImageTreeId(imageTreeId: string): Promise<Image[]> {
    const rowList = <Image[]>await sql`SELECT image_id, image_tree_id, image_url
                                              FROM image
                                              WHERE image_tree_id = ${imageTreeId}`
    const result = ImageSchema.array().parse(rowList)
    return result
}
