'use client'
import {Tree, TreeSchema} from "@/utils/models/trees";
import {Formik, FormikHelpers, FormikProps} from "formik";
import {toFormikValidationSchema} from "zod-formik-adapter";
import {DisplayStatus} from "@/app/components/displayStatus";
import React from "react";
import {useDropzone} from "react-dropzone";
import {Session} from "@/utils/models/fetchSession";
import {FormDebugger} from "@/app/components/formDebugger";
import {redirect, useRouter} from 'next/navigation'

type TreeSubmitProps = {
    session : Session
}
export function SubmitTreeComponent(props: TreeSubmitProps) {
    const { session} = props


    const initialValues: any = {
        treeId: null,
        treeProfileId: session.profile.profileId,
        treeAddress: '',
        treeEndDate: null,
        treeDate: null,
        treeImage: null,
        treeInfo: '',
        treeLat: null,
        treeLng: null,
        treeTitle: '',
        treeSpecies: '',
    }

    const handleSubmit = (values: Tree, actions: FormikHelpers<Tree>)=> {
        console.log("values here", values)
        const {setStatus, resetForm} = actions
        const router = useRouter()

        fetch('/apis/tree', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `${session.authorization}`
            },
            body: JSON.stringify(values)
        })
            .then(response => response.json())
            .then(json => {
                if(json.status === 200){
                    console.log("jason", json.data.treeId)
                    // redirect(`/image/${json.data.treeId}`)
                    router.push(`/image/${json.data.treeId}`)
                }
                console.log("success")
                setStatus({type: json.type, message: json.message})
            })
            .catch(error => {
                console.error(error)
            })
    };

    return (
        <>
            <div className="test">
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validatorSchema={toFormikValidationSchema(TreeSchema)}
                >
                    {SubmitTreeContent}
                </Formik>
            </div>
        </>
    )
}
export function SubmitTreeContent(props: FormikProps<Tree>) {

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
        handleReset,
        setFieldValue
    } = props

    return (
        <>

            <form  className="md:w-1/2 md:auto mx-auto grid-cols-1 auto-rows-max gap-6 mt-8" onSubmit={handleSubmit}>
                <div>
                    <h2 className="text-3xl text-center text-neutral/80 font-semibold p-2">Submit a Tree</h2>
                </div>
                <div className="py-3 dropdown flex justify-center">
                    <select className=" p-2 shadow bg-base-100 rounded-box w-52"
                            value={values.treeSpecies}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            id="treeSpeciesDropdown"
                            name="treeSpecies"
                            >
                        <option value={''}>Filter by Species</option>
                        <option value={'Apple'}>Apple</option>
                        <option value={'Apricot'}>Apricot</option>
                        <option value={'Cherry'}>Cherry</option>
                        <option value={'Fig'}>Fig</option>
                        <option value={'Peach'}>Peach</option>
                        <option value={'Pear'}>Pear</option>
                        <option value={'Plum'}>Plum</option>
                        <option value={'Pomegranate'}>Pomegranate</option>
                        <option value={'Other'}>Other</option>
                    </select>
                </div>
                <div className="py-3">
                    <label htmlFor="title" className="block text-gray text-sm font-bold mb-2">Title</label>
                    <input type="text" id="title" name="treeTitle"
                           className="input input-bordered mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray focus:bg-white focus:ring-0"
                           onBlur={handleBlur}
                           onChange={handleChange}
                           value={values.treeTitle}
                           />
                </div>
                <div className="py-3">
                    <label htmlFor="address" className="block text-gray text-sm font-bold mb-2">Address</label>
                    <input type="text" id="address" name="treeAddress"
                           className="input input-bordered mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray focus:bg-white focus:ring-0"
                           onBlur={handleBlur}
                           onChange={handleChange}
                           value={values.treeAddress}/>
                </div>
                <div className="py-3">
                    <label htmlFor="info" className="block text-gray text-sm font-bold mb-2">Info</label>
                    <input type="text" id="info" name="treeInfo"
                           className="input input-bordered mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray focus:bg-white focus:ring-0"
                           onBlur={handleBlur}
                           onChange={handleChange}
                           value={values.treeInfo}/>
                </div>
                <DisplayStatus status={status} />
                <div className="py-3">
                    <button type="submit" className="bg-secondary hover:bg-blue-400 text-white font-bold py-2 px-4 rounded">
                        Submit
                    </button>
                </div>
                <FormDebugger {...props}/>
            </form>
        </>
    )
}
