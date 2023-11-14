'use client'
import {Profile, ProfileSchema} from "@/utils/models/profiles";
import {Formik, FormikHelpers, FormikProps} from "formik";
import {DisplayError} from "@/app/components/displayError";
import {FormDebugger} from "@/app/components/formDebugger";
import {Session} from "@/utils/models/fetchSession";
import {toFormikValidationSchema} from "zod-formik-adapter";
import React from "react";

type SettingsFormProps = {
    session: Session,
    profile: Profile
}
export function SettingsFormComponent(props: SettingsFormProps) {
    const{session, profile} = props

    const initialValues: any = {
        profileImageUrl: "",
        profileName: profile.profileName,
        profileEmail: profile.profileEmail,
        newPassword: "",
        confirmPassword: "",
    };

    const handleSubmit = (values: Profile, actions: FormikHelpers<Profile>) => {
        console.log("values here", values)
        const { setStatus, resetForm } = actions

        fetch('/api/profile', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": `${session.authorization}`
            },
            body: JSON.stringify(values)
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

    return (
        <>
            <div className="test">
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={toFormikValidationSchema(ProfileSchema)}
            >
                {SettingsFormContent}
            </Formik>
            </div>
        </>
    )
}

export function SettingsFormContent(props: FormikProps<Profile>) {
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
    } = props;

    return (
        <>
            <form onSubmit={handleSubmit} className="md:w-1/2 md:auto mx-auto grid-cols-1 auto-rows-max gap-6 mt-8">
                <div>
                    <h2 className="text-3xl text-center text-neutral/80 font-semibold p-2">User Settings</h2>
                </div>
                <div>
                    <label className="label font-semibold" htmlFor="profileImageUrl">
                        Profile Image URL
                    </label>
                    <input
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.profileImageUrl}
                        className="input input-bordered w-full max bg-primary"
                        type="url"
                        name="profileImageUrl"
                        id="profileImageUrl"
                    />
                    <DisplayError errors={errors} touched={touched} field={"profileImageUrl"}/>
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
                        name="username"
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
                        name="email"
                        id="email"
                    />
                    <DisplayError errors={errors} touched={touched} field={"email"}/>
                </div>
                <div className="form-control">
                    <label className="label font-semibold" htmlFor="newPassword">
                        New Password
                    </label>
                    <input
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.newPassword}
                        className="input input-bordered w-full max bg-primary"
                        type="password"
                        name="newPassword"
                        id="newPassword"
                    />
                    <DisplayError errors={errors} touched={touched} field={"newPassword"}/>
                </div>
                <div className="form-control">
                    <label className="label font-semibold" htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                    <input
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.confirmPassword}
                        className="input input-bordered w-full max bg-primary"
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                    />
                    <DisplayError errors={errors} touched={touched} field={"confirmPassword"}/>
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