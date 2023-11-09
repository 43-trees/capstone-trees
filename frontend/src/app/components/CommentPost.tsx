'use server'
import {Tree, TreeSchema} from "@/utils/models/trees";
import {Comment, CommentSchema} from "@/utils/models/comments";


type CommentProps = {
    treeId: string
    commentContent: string
    profileName: string
}

export async function Comment(commentProps: CommentProps) {
    const {commentContent, profileName, treeId} = commentProps
    const {tree, comments} = await getData(treeId)
    return (
        <>
            <section className="bg-base-100 p-4 rounded-lg md:w-96 mx-auto">
                <h3 className="text-md text-start font-semibold text-secondary">{profileName}</h3>
                <p className="text-justify">{commentContent}</p>
            </section>
        </>
    )
}

async function getData(treeId: string): Promise<{tree: Tree, comments: Comment[]}> {
    const url = `${process.env.REST_API_URL}/apis/tree/${treeId}`

    const treeResult = await fetch(url)
        .then(response => {

            if (response.status === 200 || response.status === 304) {
                return response.json()
            }
            throw new Error('retrieving data failed')
        }).catch(error => {
            console.error(error)
        })

    const tree = TreeSchema.parse(treeResult?.data)

    const commentResult = await fetch(url)
        .then(response => {

            if (response.status === 200 || response.status === 304) {
                return response.json()
            }
            throw new Error('retrieving data failed')
        }).catch(error => {
            console.error(error)
        })

    const comments = CommentSchema.array().parse(commentResult?.data)

    return {tree, comments}
}