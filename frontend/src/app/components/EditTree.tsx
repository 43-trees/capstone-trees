import {Tree, TreeSchema} from "@/utils/models/trees";
import {Formik, FormikHelpers, FormikProps} from "formik";
import {toFormikValidationSchema} from "zod-formik-adapter";
import React from "react";
import {Session} from "@/utils/models/fetchSession";
import {DisplayStatus} from "@/app/components/displayStatus";
import {useDropzone} from "react-dropzone";


type TreeEditComponentProps = {
    session : Session|undefined
    tree: Tree
}
export function TreeEditComponent(props: TreeEditComponentProps) {
    const {tree, session} = props

    if(session === undefined) {
        return <></>
    }

    const {profile, authorization} = session

    const initialValues: any = {
        treeId: tree.treeId,
        treeProfileId: tree.treeProfileId,
        treeAddress: tree.treeAddress,
        treeEndDate: tree.treeEndDate,
        treeDate: tree.treeDate,
        treeImage: tree.treeImage,
        treeInfo: tree.treeInfo,
        treeLat: tree.treeLat,
        treeLng: tree.treeLng,
        treeTitle: tree.treeTitle,
        treeSpecies: tree.treeSpecies,
        imageUrl: ''
    }

    const handleSubmit = (values: Tree, actions: FormikHelpers<Tree>)=> {
        const {setStatus, resetForm} = actions
        fetch('/apis/tree', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `${authorization}`
            },
            body: JSON.stringify(values)
        })
            .then(response => response.json())
            .then(json => {
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
                validatorSchema={toFormikValidationSchema(TreeSchema)}
            >
                {EditTreeContent}
            </Formik>
        </>
    )
}

function EditTreeContent(props: FormikProps<Tree>) {
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
            <form  className="md:w-1/2 md:auto mx-auto grid-cols-1 auto-rows-max gap-6 mt-8">
                <div>
                    <h2 className="text-3xl text-center text-neutral/80 font-semibold p-2">Submit a Tree</h2>
                </div>
                <div className="py-3 dropdown flex justify-center">
                    <label tabIndex={0} className="btn bg-secondary text-white m-1">Species</label>
                    <select tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                            value={values.treeSpecies}
                            onBlur={handleBlur}
                            onChange={handleChange}>
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
                <div>
                    {/*<ImageDropZone*/}
                    {/*    formikProps={{*/}
                    {/*        values,*/}
                    {/*        handleChange,*/}
                    {/*        handleBlur,*/}
                    {/*        setFieldValue,*/}
                    {/*        fieldValue: 'imageTreeId'*/}
                    {/*    }}*/}
                    {/*/>*/}
                    {/*<DisplayStatus status={status} />*/}
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