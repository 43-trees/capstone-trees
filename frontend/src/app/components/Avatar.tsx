import {Profile} from "@/utils/models/profiles";


type AvatarProps = {
    profile: Profile
}

export async function Avatar(avatarProps: AvatarProps) {
    const {profile} = avatarProps
    let avatarAlt = `Profile picture for user ${profile.profileName}`

    return (
        <div>
            <div className="max-md:px-16">
                <img className="rounded-full" src={profile.profileImageUrl as string} alt={avatarAlt}/>
            </div>
        </div>
    )}


