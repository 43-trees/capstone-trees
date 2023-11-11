'use server'
import React from "react";
import {TreePost} from "@/app/components/TreePost";
import {Comment as CommentComponent} from "@/app/components/CommentPost";
import {Tree, TreeSchema} from "@/utils/models/trees";
import {useParams} from "next/navigation";
import {Comment, CommentSchema} from "@/utils/models/comments";
import {Profile, ProfileSchema} from "@/utils/models/profiles";
import {Image, ImageSchema} from "@/utils/models/images";
import {CommentSubmitComponent} from "@/app/components/CommentSubmit";

type Props = {
    params: {
        treeId: string
    }
}

export default async function Tree(props: Props) {
    const {params: {treeId}} = props

    const session = await getSession()
    const {tree, images, comments, profiles} = await getData(treeId)

    console.log("treeId", treeId)

    return (
        <>
            <section className="md:mx-16 rounded-lg bg-primary p-20 my-12">
         <TreePost tree={tree} images={images}/>
            <CommentComponent comments={comments} profiles={profiles}/>
                <CommentSubmitComponent treeId={treeId} session={session}/>
            </section>
        </>
    )
}


async function getData(treeId: string): Promise<{tree: Tree, comments: Comment[], profiles: any, images: Image[]}> {
    const treeUrl = `${process.env.REST_API_URL}/apis/tree/${treeId}`

    const treeResult = await fetch(treeUrl)
        .then(response => {

            if (response.status === 200 || response.status === 304) {
                return response.json()
            }
            throw new Error('retrieving data failed')
        }).catch(error => {
            console.error(error)
        })

    const tree = TreeSchema.parse(treeResult?.data)

    const commentUrl = `${process.env.REST_API_URL}/apis/comment/commentTreeId/${treeId}`

    const commentResult = await fetch(commentUrl)
        .then(response => {

            if (response.status === 200 || response.status === 304) {
                return response.json()
            }
            throw new Error('retrieving comments failed')
        }).catch(error => {
            console.error(error)
        })

    const comments = CommentSchema.array().parse(commentResult?.data)

    let profiles: any = {}

for(let comment of comments) {
    const profileUrl = `${process.env.REST_API_URL}/apis/profile/${comment.commentProfileId}`

    const profileResult = await fetch(profileUrl, {next:{
        revalidate:0
        }})
        .then(response => {
            if (response.status === 200 || response.status === 304) {
                return response.json()
            }
            throw new Error('retrieving profiles failed')
        }).catch(error => {
            console.error(error)
        })

    const profile = ProfileSchema.parse(profileResult?.data)

    profiles[profile.profileId] = profile
}
    const imageUrl = `${process.env.REST_API_URL}/apis/image/treeId/${treeId}`

    const imageResult = await fetch(imageUrl, {next: {
        revalidate:0
        }})
        .then(response => {

            if (response.status === 200 || response.status === 304) {
                return response.json()
            }
            throw new Error('retrieving images failed')
        }).catch(error => {
            console.error(error)
        })
console.log("image result", imageResult)

    const images = ImageSchema.array().parse(imageResult?.data)

    return {tree, profiles, comments, images}
}
