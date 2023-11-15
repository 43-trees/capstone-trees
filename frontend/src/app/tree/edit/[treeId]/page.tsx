
import {Tree, TreeSchema} from "@/utils/models/trees";
import {TreeEditComponent} from "@/app/components/EditTree";
import {getSession} from "@/utils/models/fetchSession";
import React from "react";
import {Image, ImageSchema} from "@/utils/models/images";

type EditProps = {
    params: {
        treeId: string
    }
}

export default async function TreeEditPage(props: EditProps) {
    const {params: {treeId}} = props

    const {tree} = await getData(treeId)

    const session = await getSession()

    if(session === undefined) {

        return(
            <>
                <section className="bg-accent/50 p-6 my-4 rounded-lg md:w-96 mx-auto">
                    <div>
                        <img src='/trees-logo.png' alt="Urban Orchard Logo of hands acting as tree trunk holding the leaves"/>
                        <h2 className="text-neutral text-3xl font-semibold py-4">Please login to continue</h2>
                        <div className="flex justify-center">
                            <button className="p-2 px-4 rounded-lg bg-secondary border-secondary hover:bg-info text-white"><a href={"/sign-in"}>Sign-In</a></button>
                        </div>
                    </div>
                </section>
            </>
        )
    }

    return (
        <>
            <TreeEditComponent tree={tree} session={session}/>
        </>
    )
}


async function  getData(treeId: string): Promise<{tree:Tree, images: Image[]}> {

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

    return {tree, images}
}
