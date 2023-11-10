import {Profile, ProfileSchema} from "@/utils/models/profiles";
import {Image, ImageSchema} from "@/utils/models/images";
import Img from "next/image";

type AvatarProps = {
    profileId: string,
    profileImageUrl: string
}

export async function Avatar(avatarProps: AvatarProps) {
    const {profileId} = avatarProps
    const {profile, image} = await getData(profileId)
    let avatarAlt = `Profile picture for user ${profile.profileName}`

    return (
        <div>
            <div className="max-md:px-16">
                <Img className="rounded-full" src={profile.profileImageUrl as string} alt="profile picture of current user"/>
            </div>
        </div>
    )}

async function  getData(profileId: string): Promise<{profile: Profile, image: Image[]}> {
    const url = `${process.env.REST_API_URL}/apis/profile/${profileId}`

    const profileResult = await fetch(url)
        .then(response => {
            if (response.status === 200 || response.status === 304) {
                return response.json()
            }
            throw new Error('retrieving data failed')
        }).catch(error =>{
            console.error(error)
        })

    const profile = ProfileSchema.parse(profileResult?.data)

    const imageResult = await fetch(url)
        .then(response => {
            if (response.status === 200 || response.status === 304) {
                return response.json()
            }
            throw new Error('retrieving data failed')
        }).catch(error =>{
            console.error(error)
        })
    const image = ImageSchema.array().parse(imageResult?.data)

    return {profile, image}
}
