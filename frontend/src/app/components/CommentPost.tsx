

type CommentProps = {
    commentContent: string
    profileName: string
}

export function Comment(commentProps: CommentProps) {
    const {commentContent, profileName} = commentProps
    return (
        <>
            <section className="bg-base-100 p-4 rounded-lg md:w-96 mx-auto">
                <h3 className="text-md text-start font-semibold text-secondary">{profileName}</h3>
                <p className="text-justify">{commentContent}</p>
            </section>
        </>
    )
}