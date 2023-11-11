import { z } from 'zod'
import {PrivateProfileSchema, PublicProfileSchema} from "./profile.validator";
import {sql} from "../../utils/database.utils";
import {Status} from "../../utils/interfaces/Status";
import {zodErrorResponse} from "../../utils/response.utils";

export type PrivateProfile = z.infer<typeof PrivateProfileSchema>

export type PublicProfile = z.infer<typeof PublicProfileSchema>

export async function insertProfile (profile: PrivateProfile) : Promise<string> {
    const {profileActivationToken, profileEmail, profileHash, profileJoinDate, profileName} = profile
    await sql `INSERT INTO profile(profile_id,profile_activation_token, profile_email, profile_hash, profile_join_date, profile_name) VALUES (gen_random_uuid(), ${profileActivationToken},${profileEmail},${profileHash}, now(), ${profileName})`
    return 'Profile successfully created'
}

export async function updateProfile (profile: PublicProfile): Promise<string> {
    const {profileName, profileId, profileImageUrl} = profile
    await sql `UPDATE profile SET profile_name = ${profileName},profile_id = ${profileId}, profile_image_url = ${profileImageUrl} WHERE profile_id = ${profileId}`
    return 'Profile updated successfully'
}

export async function selectPublicProfileByProfileId (profileId:string | null): Promise<PublicProfile |null> {
    const rowList = await sql`SELECT profile_id, profile_name, profile_image_url, profile_join_date FROM profile WHERE profile_id = ${profileId}`

    const result = PublicProfileSchema.array().max(1).parse(rowList)

    return result?.length === 1 ? result[0] : null
}

export async function selectPublicProfileByProfileName(profileName: string): Promise<PublicProfile | null> {
    const rowList = await sql `SELECT profile_id, profile_image_url, profile_join_date, profile_name FROM profile WHERE profile_name = ${profileName}`

    const result = PublicProfileSchema.array().max(1).parse(rowList)

    return result?.length === 1 ? result[0] : null
}

export async function selectPublicProfilesByProfileName(profileName: string): Promise<PublicProfile[]>{
    const profileNameWithWildCards = `%$(profileName}%`

    const rowList = await sql`SELECT profile_id, profile_image_url, profile_join_date profile_name FROM profile WHERE profile_name LIKE ${profileNameWithWildCards}`

    return PublicProfileSchema.array().parse(rowList)
}

export async function selectPrivateProfileByProfileId(profileId: string|null): Promise<PrivateProfile|null> {
    const rowList = await sql `SELECT profile_id, profile_activation_token, profile_email, profile_hash, profile_image_url, profile_join_date, profile_id FROM profile WHERE profile_id = ${profileId}`

    const result = PrivateProfileSchema.array().max(1).parse(rowList)

    return result?.length === 1 ? result[0] : null
}

export async function selectPrivateProfileByProfileEmail (profileEmail:string): Promise<PrivateProfile |null> {
    const rowList = await sql`SELECT profile_id, profile_activation_token, profile_email, profile_hash, profile_image_url, profile_join_date, profile_name FROM profile WHERE profile_email = ${profileEmail}`
console.log(rowList)

    const result = PrivateProfileSchema.array().max(1).parse(rowList)

    return result?.length === 1 ? result[0] : null
}

export async function selectPrivateProfileByProfileActivationToken (profileActivationToken: string) : Promise<PrivateProfile|null> {
    const rowList = await sql `SELECT profile_id, profile_about, profile_activation_token, profile_email, profile_hash, profile_image_url, profile_name FROM profile WHERE profile_activation_token = ${profileActivationToken}`
    const result = PrivateProfileSchema.array().max(1).parse(rowList)
    return result?.length === 1 ? result[0] : null
}