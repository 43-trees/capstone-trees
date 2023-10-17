import { z } from 'zod'
import {PrivateProfileSchema, PublicProfileSchema} from "./profile.validator";
import {sql} from "../../utils/database.utils";

export type PrivateProfile = z.infer<typeof PrivateProfileSchema>

export async function insertProfile (profile: PrivateProfile) : Promise<string> {
    const {profileActivationToken, profileEmail, profileHash, profileJoinDate, profileName} = profile
    await sql `INSERT INTO profile(profile_id,profile_activation_token, profile_email, profile_hash, profile_join_date, profile_name) VALUES (gen_random_uuid(), ${profileActivationToken},${profileEmail},${profileHash},${profileJoinDate}, ${profileName})`
    return 'Profile successfully created'
}

export async function updateProfile (profile: PublicProfile): Promise<string> {
    const {profileName, profileId} = profile
    await sql `UPDATE profile SET profile_name = ${profileName},profile_id = ${profileId} WHERE profile_id = ${profileId}`
    return 'Profile updated successfully'
}

export async function selectPublicProfileByProfileId (profileId:string): Promise<PublicProfile |null> {
    const rowList = await sql`SELECT profile_id, profile_name FROM profile WHERE profile_id = ${profileId}`

    const result = PublicProfileSchema.array().max(1).parse(rowList)

    return result?.length === 1 ? result[0] : null
}


export async function selectPrivateProfileByProfileEmail (profileEmail:string): Promise<PrivateProfile |null> {
    const rowList = await sql`SELECT profile_id, profile_activation_token, profile_email, profile_hash, profile_join_date, profile_name FROM profile WHERE profile_email = ${profileEmail}`

    const result = PrivateProfileSchema.array().max(1).parse(rowList)

    return result?.length === 1 ? result[0] : null
}