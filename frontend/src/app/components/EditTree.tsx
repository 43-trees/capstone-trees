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

    const initialValues: any = {
        imageId: null,
        imageTreeId: tree.treeId,
        imageUrl: ''
    }

    const handleSubmit = (values: Image, actions: FormikHelpers<Image>)=> {
        const {setStatus, resetForm, setErrors} = actions

        // @ts-ignore
        if (values.imageUrl instanceof FormData === false) {
            setErrors({imageUrl: "You must upload a valid image for your tree."})
        }
            fetch('/apis/image/upload/single', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `${session.authorization}`
                },
                body: JSON.stringify(tree)
            })
                .then(response => response.json())
                .then(json => {
                    if(json.status === 200){
                        resetForm()
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

function EditTreeContent(props: FormikProps<Image>) {
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
                    <h2 className="text-3xl text-center text-neutral/80 font-semibold p-2">Would you like to add more images?</h2>
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
                </div>
                <DisplayStatus status={status} />
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