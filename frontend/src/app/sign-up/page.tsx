'use client'
import {Formik, FormikHelpers, FormikProps} from "formik";
import {toFormikValidationSchema} from "zod-formik-adapter";
import {SignUp, SignUpSchema} from "@/utils/models/sign-up";
import {DisplayError} from "@/app/components/displayError";
import {DisplayStatus} from "@/app/components/displayStatus";
import {FormDebugger} from "@/app/components/formDebugger";

export default function SignUpComponent() {
    const initialValues: SignUp = {
        profileEmail: '',
        profileName: '',
        profilePasswordConfirm: '',
        profilePassword: ''
    }

    const handleSubmit = (values: SignUp, actions: FormikHelpers<SignUp>) => {
        const {setStatus, resetForm} = actions
         fetch('/apis/sign-up', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values)
        }).then(response => response.json()).then(json => {
            console.log(json)
            if (json.status === 200) {
                resetForm()
            }
            setStatus({type: json.type, message: json.message})
        })
    }

        return (
            <>
                <div className="md:mx-16 my-8">
                <h1 className="md:text-5xl text-4xl pb-2 font-bold text-center">Sign Up</h1>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={toFormikValidationSchema(SignUpSchema)}
                >
                    {SignUpFormContent}
                </Formik>
                </div>

            </>
        )
    }


    function SignUpFormContent(props: FormikProps<SignUp>) {

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
        } = props;

        return (
            <>
                <form onSubmit={handleSubmit} className="">
                    <div className="form-control">
                        <label className="label font-semibold self-center" htmlFor="profileEmail">Email</label>
                        <input
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.profileEmail}
                            className="input input-bordered w-1/2 max bg-primary mx-auto"
                            type="text"
                            name="profileEmail"
                            id="profileEmail"
                        />
                        <DisplayError errors={errors} touched={touched} field={"profileEmail"} />
                    </div>
                    <div className="form-control">
                        <label className="label font-semibold self-center" htmlFor="profileName">Name</label>
                        <input
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.profileName}
                            className="input input-bordered w-1/2 max bg-primary mx-auto"
                            type="text"
                            name="profileName"
                            id="profileName"
                        />
                        <DisplayError errors={errors} touched={touched} field={"profileName"} />
                    </div>
                    <div className=" form-control">
                        <label className={" label font-semibold self-center"} htmlFor="password">Password</label>
                        <input
                            className="input input-bordered w-1/2 max bg-primary mx-auto"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.profilePassword}
                            type="password"
                            name="profilePassword"
                            id="password"
                        />
                        <DisplayError errors={errors} touched={touched} field={"profilePassword"} />
                    </div>
                    <div className=" form-control">
                        <label className={" label font-semibold self-center"} htmlFor="passwordConfirm">Password Confirm</label>
                        <input
                            className="input input-bordered w-1/2 max bg-primary mx-auto"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.profilePasswordConfirm}
                            type="password"
                            name="profilePasswordConfirm"
                            id="profilePasswordConfirm"
                        />
                        <DisplayError errors={errors} touched={touched} field={"profilePassword"} />
                    </div>
                    <div className="py-2 flex gap-2 justify-center py-4">
                        <button className='btn bg-secondary border-secondary btn-success hover:bg-info text-white' type="submit">Create Account</button>
                        <button className='btn btn-danger bg-accent/90 text-white hover:bg-info' onClick={handleReset} type="reset">reset</button>
                    </div>
                    <DisplayStatus status={status} />
                </form>
                 <FormDebugger   {...props}/>
            </>
        )
    }
