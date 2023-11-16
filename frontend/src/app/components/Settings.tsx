'use client'
import {Profile, ProfileSchema} from "@/utils/models/profiles";
import {Formik, FormikHelpers, FormikProps} from "formik";
import {DisplayError} from "@/app/components/displayError";
import {FormDebugger} from "@/app/components/formDebugger";
import {Session} from "@/utils/models/fetchSession";
import {toFormikValidationSchema} from "zod-formik-adapter";
import React, {useState} from "react";
import {useDropzone} from "react-dropzone";

type SettingsFormProps = {
    session: Session,
    profile: Profile,

}
export function SettingsFormComponent(props: SettingsFormProps) {
    const{session, profile} = props

    const initialValues: any = {
        profileId: profile.profileId,
        profileJoinDate: profile.profileJoinDate,
        profileImageUrl: "",
        profileName: profile.profileName,
        profileEmail: profile.profileEmail,
    };
    const ValidationSchema = ProfileSchema.pick({
        profileName: true,
        profileEmail: true,

    })

    const handleSubmit = (values: Profile, actions: FormikHelpers<Profile>) => {
        profile.profileEmail = values.profileEmail
        profile.profileName = values.profileName

        console.log("values here", values)
        const { setStatus, setErrors, resetForm } = actions

    // @ts-ignore
        if (values.profileImageUrl instanceof FormData === false) {
        setErrors({profileImageUrl: "You must upload a valid image for this profile"})
    }
    fetch("/apis/image/upload/single", {
        method: "POST",
        headers: {
            "authorization": `${session.authorization}`
        },
        body: values.profileImageUrl
    })
        .then(response => response.json())
        .then(data => {
            if(data.status !== 200)
            {
                setStatus({type: "alert alert-danger"})
            }
            console.log("data here", data)
            values.profileImageUrl = data.message
            updateProfile(values)
        })

        function updateProfile(profile: Profile) {
            console.log("profile", profile)
            fetch(`/apis/profile/${session.profile.profileId}`, {
                method: 'PUT',
                next:{revalidate: 0},
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `${session.authorization}`
                },
                body: JSON.stringify({...profile, profileId: session.profile.profileId})
            })
                .then(response => response.json()
                )
                .then(json => {
                    if (json.status === 200) {
                        resetForm()
                    }
                    console.log("success")
                    setStatus({ type: json.type, message:
                        json.message })
                })
                .catch(error => {
                    console.error(error)
                })
        }
    }

    return (
        <>
            <div className="test">
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={toFormikValidationSchema(ValidationSchema)}
            >
                {SettingsFormContent}
            </Formik>
            </div>
        </>
    )
}

export function SettingsFormContent(props: FormikProps<Profile>) {

    const [selectedImage, setSelectedImage] = useState(null)

    const {
        status,
        values,
        errors,
        touched,
        setFieldValue,
        dirty,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset,
    } = props;

    return (
        <>
            <form onSubmit={handleSubmit} className="md:w-1/2 md:auto mx-auto grid-cols-1 auto-rows-max gap-6 mt-8">
                <div>
                    <h2 className="text-3xl text-center text-neutral/80 font-semibold p-2">User Settings</h2>
                </div>
                <div>
                <ImageDropZone
                    formikProps ={
                        {
                            values,
                            handleChange,
                            handleBlur,
                            useState,
                            setFieldValue,
                            fieldValue:"profileImageUrl",
                            setSelectedImage: setSelectedImage

                        }
                    }
                />
                    <div>
                        {selectedImage !== null ? <img src={selectedImage}/> : ""}
                    </div>
                </div>
                <div className="form-control">
                    <label className="label font-semibold" htmlFor="username">
                        Username
                    </label>
                    <input
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.profileName}
                        className="input input-bordered w-full max bg-primary"
                        type="text"
                        name="profileName"
                        id="username"
                    />
                    <DisplayError errors={errors} touched={touched} field={"username"}/>
                </div>
                <div className="form-control">
                    <label className="label font-semibold" htmlFor="email">
                        Email
                    </label>
                    <input
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.profileEmail}
                        className="input input-bordered w-full max bg-primary"
                        type="email"
                        name="profileEmail"
                        id="email"
                    />
                    <DisplayError errors={errors} touched={touched} field={"email"}/>
                </div>

                <div className="py-2 flex gap-4">
                    <button className='btn btn-success bg-secondary text-white border-secondary' type="submit">Apply Changes</button>
                    <button className='btn btn-danger bg-accent border-accent text-white' onClick={handleReset} type="reset">Reset</button>
                </div>
            </form>
            <FormDebugger {...props}/>
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
            <label className="text-neutral font-semibold">Update Profile Image</label>
            {
                formikProps.values.profileImageUrl &&
                <>

                </>
            }
            <div {...getRootProps()} className="py-6 px-2 flex flex-fill bg-primary/60 justify-center align-items-center border rounded-lg font-semibold text-secondary">
                <input
                    aria-label="Profile image file drag and drop area"
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