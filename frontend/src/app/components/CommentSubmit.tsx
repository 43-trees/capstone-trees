import React, {useState} from "react";

type CommentSubmitProps = {
    commentContent: string
    profileName: string
    onComment: (comment: string) => void;
};

export function CommentSubmit(commentProps: CommentSubmitProps) {
    const { profileName, onComment } = commentProps;
    const [comment, setComment] = useState('');

    const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>)=> {
        setComment(event.target.value);
    };

    const handleCommentSubmit=()=> {
        onComment(comment);
        setComment("");
    };

    return (
        <>
            <section className="bg-base-100 p-4 rounded-lg md:w-96 mx-auto">
                <h3 className="text-md text-start font-semibold text-secondary">{profileName}</h3>
                <textarea
                    placeholder="comment here"
                    value={comment}
                    onChange={handleCommentChange}
                    className="text-justify">
                </textarea>
                <button onClick={handleCommentSubmit}>Comment</button>
            </section>
        </>
    )
}