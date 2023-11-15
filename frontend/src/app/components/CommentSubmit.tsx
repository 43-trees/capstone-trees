'use client'
import React, {useState} from "react";
import {Formik, FormikHelpers, FormikProps} from "formik";
import {Comment, CommentSchema} from "@/utils/models/comments"
import {toFormikValidationSchema} from "zod-formik-adapter";
import {Session} from "@/utils/models/fetchSession";
import {revalidateTag} from 'next/cache'
import {useRouter} from "next/navigation";

type CommentSubmitComponentProps = {
    session : Session|undefined
    treeId: string,
}
export function CommentSubmitComponent(props: CommentSubmitComponentProps) {
    const {treeId, session} = props
    const router = useRouter()


    if(session === undefined) {
        return <></>
    }

    const {profile, authorization} = session

    const initialValues: any = {
        commentId: null,
        commentContent: '',
        commentDatetime: null,
        commentImageUrl: null,
        commentProfileId: profile.profileId,
        commentTreeId: treeId
    }

    const handleSubmit = (values: Comment, actions: FormikHelpers<Comment>)=> {
        const {setStatus, resetForm} = actions
        const result = fetch('/apis/comment', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `${authorization}`
            },
            body: JSON.stringify(values)
        }).then(response => response.json()).then(json => {
            if(json.status === 200){
                resetForm()
                router.refresh()
            }
            setStatus({type: json.type, message: json.message})
        })
    };

    return (
        <>
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
            <form onSubmit={handleSubmit} className="bg-base-100 p-4 my-6 rounded-lg md:w-96 mx-auto">
                <label className="label font-semibold text-secondary" htmlFor="commentContent">Comment</label>
                <textarea
                    placeholder="comment here"
                    value={values.commentContent}
                    onChange={handleChange}
                    className="w-full"
                    rows={5}
                    name="commentContent"
                    id="commentContent"
                >
                </textarea>
                <div className="py-3 flex justify-end">
                <button type="submit" className="p-2 my-2 text-white flex justify-end bg-secondary border-secondary border-2 rounded-lg ">Comment Submit</button>
                </div>
            </form>
        </>
    )
}