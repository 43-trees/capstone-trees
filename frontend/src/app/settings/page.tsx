import {Profile, ProfileSchema} from "@/utils/models/profiles";
import {getSession, Session} from "@/utils/models/fetchSession";
import {redirect} from "next/navigation";
import {SettingsFormComponent} from "@/app/components/Settings";
import React from "react";
import {Tree, TreeSchema} from "@/utils/models/trees";
import {Avatar} from "@/app/components/Avatar";


type SettingsFormProps = {
    session: Session,
    profile: Profile
    trees: Tree[]
}
export default async function Settings() {

    const session = await getSession();
    if (session === undefined) {
        redirect("/")
    }
    const {profile, trees} = await getData(session.profile.profileId)
    return(
        <>
            <div style={{width:"20rem"}} className="mx-auto">
            <Avatar  profileImageUrl={profile.profileImageUrl} profile={profile}/>
            </div>
        <SettingsFormComponent session={session} profile={profile}/>

                {/*<div className="py-3 grid grid-cols-3 font-semibold text-center text-lg text-neutral hover:text-neutral/60">*/}
                {/*    {trees.map(tree => (<h1><a href={`tree/edit/${tree.treeId}`}>{tree.treeTitle}</a></h1>))}*/}
                {/*</div>*/}
            <div className="mt-20 pt-12"></div>
        </>
    )
}



async function  getData(profileId: string): Promise<{profile: Profile, trees: Tree[]}> {
    console.log(profileId)
    const url = `${process.env.REST_API_URL}/apis/profile/${profileId}`

    const profileResult = await fetch(url)
        .then(response => {
            if (response.status === 200 || response.status === 304) {
                return response.json()
            }
            throw new Error('retrieving profile failed')
        }).catch(error =>{
            console.error(error)
        })

    const profile = ProfileSchema.parse(profileResult?.data)

    const treeUrl = `${process.env.REST_API_URL}/apis/tree/`

    const treeResult = await fetch(treeUrl)
        .then(response => {

            if (response.status === 200 || response.status === 304) {
                return response.json()
            }
            throw new Error('retrieving data failed')
        }).catch(error => {
            console.error(error)
        })
    const trees = TreeSchema.array().parse(treeResult?.data)

    return {profile, trees}
}
