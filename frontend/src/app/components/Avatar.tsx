
type AvatarProps = {
    profileImageUrl: string
}

export async function Avatar(avatarProps: AvatarProps) {
const {profileImageUrl} = avatarProps

    return (
        <div>
            <div className="max-md:px-16">
                <img className="rounded-full" src={profileImageUrl} alt="profile picture of current user"/>
            </div>
        </div>
    )}

// async function  getData(profileId: string): Promise<{profile: Profile, image: Image[]}> {
//     const url = `${process.env.REST_API_URL}/apis/profile/${profileId}`
//
//     const profileResult = await fetch(url)
//         .then(response => {
//             if (response.status === 200 || response.status === 304) {
//                 return response.json()
//             }
//             throw new Error('retrieving data failed')
//         }).catch(error =>{
//             console.error(error)
//         })
//
//     const profile = ProfileSchema.parse(profileResult?.data)
//
//     const imageResult = await fetch(url)
//         .then(response => {
//             if (response.status === 200 || response.status === 304) {
//                 return response.json()
//             }
//             throw new Error('retrieving data failed')
//         }).catch(error =>{
//             console.error(error)
//         })
//     const image = ImageSchema.array().parse(imageResult?.data)
//
//     return {profile, image}
// }
