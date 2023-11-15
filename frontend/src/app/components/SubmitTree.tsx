'use client'
import {Tree, TreeSchema} from "@/utils/models/trees";
import {Formik, FormikHelpers, FormikProps} from "formik";
import {toFormikValidationSchema} from "zod-formik-adapter";
import {DisplayStatus} from "@/app/components/displayStatus";
import React, {useState} from "react";
import {useDropzone} from "react-dropzone";
import {Session} from "@/utils/models/fetchSession";
import {FormDebugger} from "@/app/components/formDebugger";


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
        console.log("values here", values.treeImage)
        const submitValues = {...values, treeImage: null}
        const {setStatus, resetForm, setErrors} = actions

        // @ts-ignore
        if (values.treeImage instanceof FormData === false) {
            setErrors({treeImage: "You must upload a valid image for your tree."})
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
                values.treeImage = data.message
                submitTree(values)
            })

        function submitTree (tree: Tree) {
            fetch('/apis/tree', {
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
        }
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

    const [selectedImage, setSelectedImage] = useState(null)

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
                <ImageDropZone
                    formikProps ={
                    {
                        values,
                        handleChange,
                        handleBlur,
                        setFieldValue,
                        fieldValue:"treeImage",
                        setSelectedImage: setSelectedImage
                    }
                    }

                    />
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

        const fileReader = new FileReader()
        fileReader.readAsDataURL(acceptedFiles[0])
        fileReader.addEventListener("load", () => {
            formikProps.setSelectedImage(fileReader.result)
        })

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
                    className="file-input form-control-file w-50 h-50"
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
