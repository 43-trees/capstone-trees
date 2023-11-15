import {Formik, FormikHelpers, FormikProps} from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import {DisplayError} from "@/app/components/displayError";
import {Profile, ProfileSchema} from "@/utils/models/profiles";
import {SignInSchema} from "@/utils/models/sign-in";
import {FormDebugger} from "@/app/components/formDebugger";
import {getSession, Session} from "@/utils/models/fetchSession";
import {redirect} from "next/navigation";
import {SettingsFormComponent} from "@/app/components/Settings";
import {Avatar} from "@/app/components/Avatar";


type SettingsFormProps = {
    session: Session,
    profile: Profile
}
export default async function Settings() {

    const session = await getSession();
    if (session === undefined) {
        redirect("/")
    }
    const {profile} = await getData(session.profile.profileId)
    return(
        <>
            <Avatar profileImageUrl={profile.profileImageUrl}/>
        <SettingsFormComponent session={session} profile={profile}/>
        </>
    )
}



async function  getData(profileId: string): Promise<{profile: Profile}> {
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


    return {profile}
}
