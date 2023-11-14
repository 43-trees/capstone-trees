import React from "react";
import {useDropzone} from "react-dropzone";
import {Session} from "@/utils/models/fetchSession";
import {Tree, TreeSchema} from "@/utils/models/trees";
import {Formik, FormikHelpers, FormikProps} from "formik";
import {toFormikValidationSchema} from "zod-formik-adapter";
import {SubmitTreeContent} from "@/app/components/SubmitTree";
import {Image, ImageSchema} from "@/utils/models/images";

type AddImageProps = {
    session : Session
    tree: Tree,
}
export function AddImagesComponent(props: AddImageProps) {
    const { session, tree} = props

    const initialValues: any = {
        treeId: tree.treeId,
        imageUrl: '',
    }

    const handleSubmit = (values: Image, actions: FormikHelpers<Image>)=> {
        const {setStatus, resetForm} = actions
        fetch('/apis/image/upload', {
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
            <div className="">
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validatorSchema={toFormikValidationSchema(ImageSchema)}
                >
                    {AddImagesContent}
                </Formik>
            </div>
        </>
    )
}

export function AddImagesContent(props: FormikProps<Image>) {
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
            <div>
                <ImageDropZone
                    formikProps={{
                        values,
                        handleChange,
                        handleBlur,
                        setFieldValue,
                        fieldValue: 'imageTreeId'
                    }}
                />
            </div>
        </>
    )
}



function ImageDropZone ({ formikProps }: any) {

    const onDrop = React.useCallback((acceptedFiles: any) => {

        const formData = new FormData()
        formData.append('image', acceptedFiles[0])

        formikProps.setFieldValue(formikProps.fieldValue, formData)

    }, [formikProps])
    const { getInputProps, isDragActive } = useDropzone({ onDrop })

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
            <div className="d-flex flex-fill bg-light justify-content-center align-items-center border rounded">
                <input
                    aria-label="tree image file drag and drop area"
                    aria-describedby="image drag drop area"
                    className="form-control-file"
                    accept="image/*"
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
