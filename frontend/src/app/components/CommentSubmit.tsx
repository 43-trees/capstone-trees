'use client'
import React, {useState} from "react";
import {FormikHelpers, FormikProps} from "formik";

type CommentSubmitComponentProps = {
    treeId: string
}
export function CommentSubmitComponent(props: CommentSubmitComponentProps) {
    const {treeId} = props
    const initialValues: any = {
        commentContent: '',
        profileName: '',
        treeId
    }

    const handleCommentSubmit = (values: , actions: FormikHelpers<CommentSubmit>)=> {
        const {setStatus, resetForm} = actions
        const result = fetch('/apis/comment', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        }).then(response => response.json()).then(json => {
            if(json.status === 200){
                resetForm()
            }
            setStatus({type: json.type, message: json.message})
        })
    };
    

}

function commentSubmitContent(props: FormikProps<CommentSubmit>) {

    const {
        status,
        values,
        errors,
        touched,
        dirty,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset
    } = props

    return (
        <>
            <form className="bg-base-100 p-4 rounded-lg md:w-96 mx-auto">
                <h3 className="text-md text-start font-semibold text-secondary">{profileName}</h3>
                <textarea
                    placeholder="comment here"
                    value={values.commentContent}
                    onChange={handleChange}
                    className="text-justify">
                </textarea>
                <button type="submit">Comment</button>
            </form>
        </>
    )
}