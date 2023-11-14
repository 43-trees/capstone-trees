import {Tree, TreeSchema} from "@/utils/models/trees";
import React from "react";
import {getSession, Session} from "@/utils/models/fetchSession";
import {SubmitTreeComponent} from "@/app/components/SubmitTree";
import {AddImagesComponent, AddImagesContent} from "@/app/components/AddImages";
import {useDropzone} from "react-dropzone";
// import {SubmitTreeComponent} from "@/app/components/SubmitTree";

type ImageSubmitProps = {
    params: {
        treeId: string
    }
}

// ADD IMAGES TO TREE PAGE
export default async function ImageSubmit(props: ImageSubmitProps) {
    const {params: {treeId}} = props
    const session = await getSession()
    const tree = await getData(treeId)

    if(session === undefined) {

        return <>
            <p>poop</p>
        </>
    }

    return (
        <>
            <div className="">
                <AddImagesComponent session={session} tree={tree}}/>
            </div>
        </>
    )
}

async function  getData(treeId: string): Promise<{tree:Tree}> {

    const treeUrl = `${process.env.REST_API_URL}/apis/tree/${treeId}`


    const treeResult = await fetch(treeUrl)
        .then(response => {
            if (response.status === 200 || response.status === 304) {
                return response.json()
            }
            throw new Error('retrieving trees failed')
        }).catch(error =>{
            console.error(error)
        })

    const tree = TreeSchema.parse(treeResult?.data)

    return {tree}
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