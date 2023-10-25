import {z} from 'zod'
import {ImageSchema} from './image.validator'
import {sql} from "../../utils/database.utils"

export type Image = z.infer<typeof ImageSchema>


export async function deleteImage(image: Image): Promise<string> {

    const {imageProfileId, imageTreeId} = image
    await sql`DELETE 
              FROM "image"
              WHERE image_profile_id = ${imageProfileId}
                AND image_tree_id = ${imageTreeId}`

    return  'Image successfully deleted'

}
export async function insertImage(image: Image): Promise<string> {

    const {imageProfileId, imageTreeId} = image

    await sql`INSERT INTO "image" (image_profile_id, image_tree_id, image_datetime)
                VALUES (${imageProfileId}, ${imageTreeId}, NOW())`

    return 'Image successfully posted'
}


export async function selectImageByImageId(image: Image): Promise<Image | null> {
    const {imageProfileId, imageTreeId} = image

    const rowList = <Image[]>await sql`SELECT image_profile_id, image_tree_id, image_datetime
                                              FROM "image"
                                              WHERE image_profile_id = ${imageProfileId}
                                                AND image_tree_id = ${imageTreeId}`
    const result = ImageSchema.array().max(1).parse(rowList)
    return result.length === 0 ? null : result[0]
}

export async function selectImagesByImageTreeId(image: Image): Promise<Image | null> {
    const {imageProfileId, imageTreeId} = image

    const rowList = <Image[]>await sql`SELECT image_profile_id, image_tree_id, image_datetime
                                              FROM "image"
                                              WHERE image_profile_id = ${imageProfileId}
                                                AND image_tree_id = ${imageTreeId}`
    const result = ImageSchema.array().max(1).parse(rowList)
    return result.length === 0 ? null : result[0]
}
