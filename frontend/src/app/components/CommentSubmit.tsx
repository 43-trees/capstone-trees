'use client'
import React, {useState} from "react";
import {Formik, FormikHelpers, FormikProps} from "formik";
import {Comment, CommentSchema} from "@/utils/models/comments"
import {toFormikValidationSchema} from "zod-formik-adapter";
import {Profile} from "@/utils/models/profiles";

type CommentSubmitComponentProps = {
    treeId: string
    profile: Profile
}
export function CommentSubmitComponent(props: CommentSubmitComponentProps) {
    const {treeId} = props
    const initialValues: any = {
        commentId: null,
        commentContent: '',
        commentDatetime: null,
        commentImageUrl: null,
        commentProfileId: '',
        commentTreeId: treeId
    }

    const handleSubmit = (values: Comment, actions: FormikHelpers<Comment>)=> {
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

    return (
        <>
            <h1 className="text-3xl font-bold text-neutral">Login</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validatorSchema={toFormikValidationSchema(CommentSchema)}
                    >
                {CommentFormContent}
            </Formik>
        </>
    )
}

function CommentFormContent(props: FormikProps<Comment>) {

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
            <form onSubmit={handleSubmit} className="bg-base-100 p-4 rounded-lg md:w-96 mx-auto">
                <label className="label font-semibold text-secondary" htmlFor="commentContent">Comment</label>
                <textarea
                    placeholder="comment here"
                    value={values.commentContent}
                    onChange={handleChange}
                    className="text-justify"
                    name="commentContent"
                    id="commentContent"
                >
                </textarea>
                <button type="submit">Comment</button>
            </form>
        </>
    )
}