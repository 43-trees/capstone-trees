import {Tree, TreeSchema} from "@/utils/models/trees";
import React from "react";
import {getSession, Session} from "@/utils/models/fetchSession";
import {SubmitTreeComponent} from "@/app/components/SubmitTree";
import {AddImagesComponent, AddImagesContent} from "@/app/components/AddImages";
import {useDropzone} from "react-dropzone";
// import {SubmitTreeComponent} from "@/app/components/SubmitTree";

type ImageSubmitProps = {
    params: {
        treeId: string
    }
    tree: Tree
}

// ADD IMAGES TO TREE PAGE
export default async function ImageSubmit(props: ImageSubmitProps) {
    const {params: {treeId}} = props
    const session = await getSession()
    const tree = await getData(treeId)

    if(session === undefined) {

        return <>
            <p>poop</p>
        </>
    }

    return (
        <>
            <div className="">
                <AddImagesComponent session={session} tree={tree}}/>
            </div>
        </>
    )
}

async function  getData(treeId: string): Promise<{tree:Tree}> {

    const treeUrl = `${process.env.REST_API_URL}/apis/tree/${treeId}`


    const treeResult = await fetch(treeUrl)
        .then(response => {
            if (response.status === 200 || response.status === 304) {
                return response.json()
            }
            throw new Error('retrieving trees failed')
        }).catch(error =>{
            console.error(error)
        })

    const tree = TreeSchema.parse(treeResult?.data)

    return {tree}
}