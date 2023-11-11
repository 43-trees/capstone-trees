import {Tree, TreeSchema} from "@/utils/models/trees";
import {Formik, FormikHelpers, FormikProps} from "formik";
import {toFormikValidationSchema} from "zod-formik-adapter";
import React from "react";
import {Comment} from "@/utils/models/comments";

type TreeSubmitComponentProps = {
    session : Session|undefined
    treeId: string
}
export function TreeSubmitComponent(props: TreeSubmitComponentProps) {
    const {treeId, session} = props

    if(session === undefined) {
        return <></>
    }

    const {profile, authorization} = session

    const initialValues: any = {
        treeId: treeId,
        treeProfileId: '',
        treeAddress: '',
        treeEndDate: null,
        treeDate: null,
        treeImage: null,
        treeInfo: '',
        treeLat: null,
        treeLng: null,
        treeTitle: '',
        treeSpecies: ''
    }

    const handleSubmit = (values: Tree, actions: FormikHelpers<Comment>)=> {
        const {setStatus, resetForm} = actions
        const result = fetch('/apis/tree', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `${authorization}`
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
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validatorSchema={toFormikValidationSchema(CommentSchema)}
            >
                {SubmitTreeContent}
            </Formik>
        </>
    )
}


export default function SubmitTreeContent(props: FormikProps<Comment>) {
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
            <form  className="md:w-1/2 md:auto mx-auto grid-cols-1 auto-rows-max gap-6 mt-8">
                <div>
                    <h2 className="text-3xl text-center text-neutral/80 font-semibold p-2">Submit a Tree</h2>
                </div>
                <div className="py-3 dropdown flex justify-center">
                    <label tabIndex={0} className="btn bg-secondary text-white m-1">Species</label>
                    <select tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <option>Apple</option>
                        <option>Apricot</option>
                        <option>Cherry</option>
                        <option>Fig</option>
                        <option>Peach</option>
                        <option>Pear</option>
                        <option>Plum</option>
                        <option>Pomegranate</option>
                        <option>Other</option>
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.treeSpecies}
                    </select>
                </div>
                <div className="py-3">
                    <label htmlFor="title" className="block text-gray text-sm font-bold mb-2">Title</label>
                    <input type="text" id="title" name="title"
                           className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray focus:bg-white focus:ring-0"
                           onBlur={handleBlur}
                           onChange={handleChange}
                           value={values.treeTitle}
                           />
                </div>
                <div className="py-3">
                    <label htmlFor="address" className="block text-gray text-sm font-bold mb-2">Address</label>
                    <input type="text" id="address" name="address"
                           className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray focus:bg-white focus:ring-0"
                           onBlur={handleBlur}
                           onChange={handleChange}
                           value={values.treeAddress}/>
                </div>
                <div className="py-3">
                    <label htmlFor="info" className="block text-gray text-sm font-bold mb-2">Info</label>
                    <input type="text" id="info" name="info"
                           className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray focus:bg-white focus:ring-0"
                           onBlur={handleBlur}
                           onChange={handleChange}
                           value={values.treeInfo}/>
                </div>
                <div className="py-3">
                    <label htmlFor="treeImage" className="block text-gray text-sm font-bold mb-2">Upload an Image</label>
                    <input type="email" id="email" name="email"
                           className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray focus:bg-white focus:ring-0"
                           onBlur={handleBlur}
                           onChange={handleChange}
                           value={values.treeImage}/>
                </div>
                <div className="py-3">
                    <button type="submit" className="bg-secondary hover:bg-blue-400 text-white font-bold py-2 px-4 rounded">
                        Submit
                    </button>
                </div>
            </form>

        </>
    )
}