// import {Tree, TreeSchema} from "@/utils/models/trees";
import React from "react";
import {getSession, Session} from "@/utils/models/fetchSession";
import {SubmitTreeComponent} from "@/app/components/SubmitTree";
// import {SubmitTreeComponent} from "@/app/components/SubmitTree";


export default async function TreeSubmit() {
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
            <div className="">
                <SubmitTreeComponent session={session}/>
            </div>
        </>
    )
}
