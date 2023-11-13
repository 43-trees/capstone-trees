
import {Tree, TreeSchema} from "@/utils/models/trees";
import {TreeEditComponent} from "@/app/components/EditTree";
import {getSession} from "@/utils/models/fetchSession";
import React from "react";

type EditProps = {
    params: {
        treeId: string
    }
}

export default async function TreeEditPage(props: EditProps) {
    const {params: {treeId}} = props

    const tree = await getData(treeId)

    const session = await getSession()

    if(session === undefined) {

        return <>
            <p>poop</p>
        </>
    }

    return (
        <>
            <TreeEditComponent tree={tree} session={session}/>
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
