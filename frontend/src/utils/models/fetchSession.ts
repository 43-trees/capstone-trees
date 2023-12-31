import {Profile, ProfileSchema} from "@/utils/models/profiles";
import {cookies} from "next/headers";
import { unstable_noStore as noStore } from 'next/cache';
import {jwtDecode} from "jwt-decode";

noStore()
export type Session = {
    profile: Profile,
    authorization: string
    exp: number
}


let session : Session|undefined = undefined

const currentTimeInSeconds = new Date().getTime() / 1000

export async function getSession(): Promise<Session|undefined > {
    const cookieStore = cookies()
    const jwtToken = cookieStore.get("jwt-token")
    if (session === undefined &&  jwtToken) {
        setJwtToken(jwtToken.value)
        return session
    } else {
        return session
    }

}

export function setJwtToken(jwtToken: string) {

    try {
        const  parsedJwtToken = jwtDecode(jwtToken) as any

        if(parsedJwtToken &&  currentTimeInSeconds < parsedJwtToken.exp) {
            session = {
                profile: ProfileSchema.parse(parsedJwtToken.auth),
                authorization: jwtToken,
                exp: parsedJwtToken.exp
            }
        } else {
            session = undefined
        }


    } catch (error) {
        console.log("error", error)
        session = undefined

    }

}


