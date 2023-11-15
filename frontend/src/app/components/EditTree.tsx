'use client'
import {Tree, TreeSchema} from "@/utils/models/trees";
import {Formik, FormikHelpers, FormikProps} from "formik";
import {toFormikValidationSchema} from "zod-formik-adapter";
import React, {useState} from "react";
import {Session} from "@/utils/models/fetchSession";
import {DisplayStatus} from "@/app/components/displayStatus";
import {useDropzone} from "react-dropzone";
import {Image} from "@/utils/models/images";
// import {useDropzone} from "react-dropzone";


type TreeEditComponentProps = {
    session : Session
    tree: Tree
    image: Image
}
export function TreeEditComponent(props: TreeEditComponentProps) {
    const {tree, session, image} = props
    console.log("tree", tree)

    const initialValues: any = {
        imageId: null,
        imageTreeId: tree.treeId,
        imageUrl: ''
    }

    const handleSubmit = (values: Tree, actions: FormikHelpers<Tree>)=> {
        const {setStatus, resetForm, setErrors} = actions

        if (values.treeImage instanceof FormData === false) {
            setErrors({imageUrl: "You must upload a valid image for your tree."})
        }
        fetch("/apis/image/upload/single",{
            method: "POST",
            headers: {
                "authorization": `${session.authorization}`
            },
            body: values.treeImage
        })
            .then(response => response.json())
            .then(data => {
                if(data.status !== 200) {
                    setStatus({type: "alert alert-danger"})
                }
                values.imageUrl = data.message
                submitImage(values)
            })

        // fetch('/apis/tree', {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "authorization": `${session.authorization}`
        //     },
        //     body: JSON.stringify(values)
        // })
        //     .then(response => response.json())
        //     .then(json => {
        //         if(json.status === 200){
        //             resetForm()
        //         }
        //         setStatus({type: json.type, message: json.message})
        //     })
        //     .catch(error => {
        //         console.error(error)
        //     })
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
                    <h2 className="text-3xl text-center text-neutral/80 font-semibold p-2">Edit a Tree</h2>
                </div>
                <div className="py-3 dropdown flex justify-center">
                    <label className="block text-gray text-sm font-bold mb-2">{values.treeSpecies}</label>
                </div>
                <div className="py-3">
                    <label htmlFor="title" className="block text-gray text-sm font-bold mb-2">{values.treeTitle}</label>
                    {/*<input type="text" id="title" name="title"*/}
                    {/*       className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray focus:bg-white focus:ring-0"*/}
                    {/*       onBlur={handleBlur}*/}
                    {/*       onChange={handleChange}*/}
                    {/*       value={values.treeTitle}*/}
                    {/*/>*/}
                </div>
                <div className="py-3">
                    <label htmlFor="address" className="block text-gray text-sm font-bold mb-2">{values.treeAddress}</label>
                    {/*<input type="text" id="address" name="address"*/}
                    {/*       className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray focus:bg-white focus:ring-0"*/}
                    {/*       onBlur={handleBlur}*/}
                    {/*       onChange={handleChange}*/}
                    {/*       value={values.treeAddress}/>*/}
                </div>
                <div className="py-3">
                    <label htmlFor="info" className="block text-gray text-sm font-bold mb-2">{values.treeInfo}</label>
                    {/*<input type="text" id="info" name="info"*/}
                    {/*       className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray focus:bg-white focus:ring-0"*/}
                    {/*       onBlur={handleBlur}*/}
                    {/*       onChange={handleChange}*/}
                    {/*       value={values.treeInfo}/>*/}
                </div>
                <div>
                    <ImageDropZone
                        formikProps={{
                            values,
                            handleChange,
                            handleBlur,
                            setFieldValue,
                            fieldValue: "imageUrl"
                        }}
                    />
                    <DisplayStatus status={status} />
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

function ImageDropZone ({ formikProps }: any) {

    const onDrop = React.useCallback((acceptedFiles: any) => {

        const formData = new FormData()
        formData.append('image', acceptedFiles[0])

        formikProps.setFieldValue(formikProps.fieldValue, formData)

    }, [formikProps])
    const { getInputProps, isDragActive, getRootProps } = useDropzone({ onDrop })

    return (
        <>
            <label className="text-neutral font-semibold">Add Tree Images</label>
            {
                formikProps.values.imageUrl &&
                <>
                    <div className="bg-transparent m-0">
                        <img  height={200}  width={200} alt="new tree image" src={formikProps.values.imageUrl} />
                    </div>

                </>
            }
            <div {...getRootProps()} className="py-6 px-2 flex flex-fill bg-primary/60 justify-center align-items-center border rounded-lg font-semibold text-secondary">
                <input
                    aria-label="tree image file drag and drop area"
                    aria-describedby="image drag drop area"
                    className="file-input form-control-file"
                    accept="image/*"
                    type="file"
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                    {...getInputProps()}
                />
                {
                    isDragActive ?
                        <span className="align-items-center" >Drop image here</span> :
                        <span className="align-items-center" >Drag and drop image here, or click here to select an image</span>
                }
            </div>
        </>
    )
}