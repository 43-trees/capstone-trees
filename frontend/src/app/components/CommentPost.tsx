'use server'
import {Comment, CommentSchema} from "@/utils/models/comments";
import {Profile, ProfileSchema} from "@/utils/models/profiles";


type CommentProps = {
    comments: Comment[],
    profiles: any
}

export async function Comment(commentProps: CommentProps) {
    const {comments, profiles} = commentProps
    // const {profiles, comments} = await getData(treeId)
    return (
        <>
            <section className="bg-base-100 p-4 rounded-lg md:w-96 mx-auto">
                <div>{
                    comments.map((comment) =>
                        <div key={comment.commentContent}>
                            <h3 className="font-semibold text-secondary">{profiles[comment.commentProfileId].profileName}</h3>
                            <p className="text-justify">{comment.commentContent}</p>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

// async function getData(treeId: string): Promise<{comments: Comment[], profiles: any}> {
//     const url = `${process.env.REST_API_URL}/commentTreeId/${treeId}`
//
//     const commentResult = await fetch(url)
//         .then(response => {
//
//             if (response.status === 200 || response.status === 304) {
//                 return response.json()
//             }
//             throw new Error('retrieving data failed')
//         }).catch(error => {
//             console.error(error)
//         })
//
//     const comments = CommentSchema.array().parse(commentResult?.data)
//
//     let profiles: any = {}
//
//     for(let comment of comments) {
//         const profileUrl = `${process.env.REST_API_URL}/profile/${comment.commentProfileId}`
//
//         const profileResult = await fetch(profileUrl)
//             .then(response => {
//                 if (response.status === 200 || response.status === 304) {
//                     return response.json()
//                 }
//                 throw new Error('retrieving data failed')
//             }).catch(error => {
//                 console.error(error)
//             })
//
//         const profile = ProfileSchema.parse(profileResult?.data)
//         profiles[profile.profileId] = profile
//     }
//
//     return {profiles, comments}
// }