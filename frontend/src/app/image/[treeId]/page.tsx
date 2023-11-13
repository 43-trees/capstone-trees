// import {Tree, TreeSchema} from "@/utils/models/trees";
import React from "react";
import {getSession, Session} from "@/utils/models/fetchSession";
import {SubmitTreeComponent} from "@/app/components/SubmitTree";
import {AddImagesComponent, AddImagesContent} from "@/app/components/AddImages";
// import {SubmitTreeComponent} from "@/app/components/SubmitTree";

// ADD IMAGES TO TREE PAGE
export default async function TreeSubmit() {
    const session = await getSession()

    if(session === undefined) {

        return <>
            <p>poop</p>
        </>
    }

    return (
        <>
            <div className="">
                <AddImagesComponent session={session}/>
            </div>
        </>
    )
}