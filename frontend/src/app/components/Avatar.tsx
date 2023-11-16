import {Profile} from "@/utils/models/profiles";
// import {Session} from "@/utils/models/fetchSession";


type AvatarProps = {
    profile: Profile,
    profileImageUrl: string | null,
}

export async function Avatar(avatarProps: AvatarProps) {
    const {profileImageUrl, profile} = avatarProps
    let avatarAlt = `Profile picture for user ${profile.profileName}`

    return (

        <div className="flex">
            <div className="mx-auto py-4">
                <img className="rounded-full " src={profileImageUrl as string} alt="profile picture of current user"/>
            </div>
        </div>
    )}


