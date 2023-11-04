type AvatarProps = {
    link: string
}

export function Avatar(avatarProps: AvatarProps) {
    const {link} = avatarProps
    return (
        <div>
            <div className="max-md:px-16">
                <img className="rounded-full" src={link} alt="profile picture of current user"/>
            </div>
        </div>
    )}

