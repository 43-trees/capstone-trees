import {z} from 'zod'
import {CommentSchema} from './comment.validator'
import {sql} from '../../utils/database.utils'
import exp from "constants";

export type Comment = z.infer<typeof CommentSchema>

export async function insertComment(comment: Comment): Promise<string> {
    const {commentId, commentProfileId, commentTreeId, commentContent, commentImageUrl} = comment

    await sql`INSERT INTO comment (comment_id, comment_profile_id, comment_tree_id, comment_content, comment_datetime,
                                   comment_image_url)
              VALUES (gen_random_uuid(), ${commentProfileId}, ${commentTreeId}, ${commentContent}, now(),
                      ${commentImageUrl})`

    return 'Comment posted successfully'
}

export async function selectAllComments(): Promise<Comment[]> {
    const rowList = <Comment[]>await sql`SELECT comment_id,
                                                comment_profile_id,
                                                comment_content,
                                                comment_datetime,
                                                comment_image_url
                                         FROM comment
                                         ORDER BY comment_datetime DESC`
    return CommentSchema.array().parse(rowList)
}

export async function selectCommentsByCommentProfileId(commentProfileId: string): Promise<Comment[]> {

    const rowList = <Comment[]>await sql`SELECT comment_id,
                                                comment_profile_id,
                                                comment_content,
                                                comment_datetime,
                                                comment_image_url
                                         FROM comment
                                         WHERE comment_profile_id = ${commentProfileId}`

    return CommentSchema.array().parse(rowList)
}

export async function selectCommentsByProfileName(profileName: string): Promise<Comment[]> {
    const rowList = <Comment[]>await sql`SELECT comment_id,
                                                comment_profile_id,
                                                comment_content,
                                                comment_datetime,
                                                comment_image_url
                                         FROM comment
                                                  JOIN profile ON comment.comment_profile_id = profile.profile_id
                                         WHERE profile.profile_name = ${profileName}`
    return CommentSchema.array().parse(rowList)
}

export async function selectCommentByCommentId(commentId: string): Promise<Comment | null> {
    const rowList = <Comment[]>await sql`SELECT comment_id,
                                                comment_profile_id,
                                                comment_content,
                                                comment_datetime,
                                                comment_image_url
                                         FROM comment
                                         WHERE comment_id = ${commentId}`
    const result = CommentSchema.array().max(1).parse(rowList)
    return result.length === 0 ? null : result(0)
}

export async function deleteCommentByCommentId(commentId: string): Promise<string> {

    await sql`DELETE
              FROM comment
              WHERE comment_id = ${commentId}`

    return 'Comment successfully deleted'

}






