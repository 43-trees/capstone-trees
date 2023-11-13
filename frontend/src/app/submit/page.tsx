// import {Tree, TreeSchema} from "@/utils/models/trees";
import React from "react";
import {getSession, Session} from "@/utils/models/fetchSession";
import {SubmitTreeComponent} from "@/app/components/SubmitTree";
// import {SubmitTreeComponent} from "@/app/components/SubmitTree";


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
                <SubmitTreeComponent session={session}/>
            </div>
        </>
    )
}
