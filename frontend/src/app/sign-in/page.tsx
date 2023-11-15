"use client";
import {Formik, FormikHelpers, FormikProps} from "formik";
import {toFormikValidationSchema} from "zod-formik-adapter";
// import {FormDebugger} from "@/components/formDebugger";
import {SignIn, SignInSchema} from "@/utils/models/sign-in";
import {DisplayStatus} from "@/app/components/displayStatus";
import {DisplayError} from "@/app/components/displayError";
import {FormDebugger} from "@/app/components/formDebugger";

export default function SignInFormComponent() {

    const initialValues : any = {
        profileEmail: '',
        profilePassword: ''
    }

    const handleSubmit = (values: SignIn, actions: FormikHelpers<SignIn>) => {
        const {setStatus, resetForm} = actions
        const result = fetch('/api/sign-in', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values)
        }).then(response => response.json()).then(json => {
            if(json.status === 200) {
                resetForm()
            }
            setStatus({type: json.type, message: json.message})
        })
    }

    return(
        <>
            <h1 className="md:text-5xl text-4xl pb-2 font-bold text-center text-neutral mt-6">Login</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={toFormikValidationSchema(SignInSchema)}
            >
                {SignInFormContent}
            </Formik>

        </>
    )
}


function SignInFormContent(props: FormikProps<SignIn>) {

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

    return(
        <>
            <form onSubmit={handleSubmit} className={"md:w-1/2 md:auto mx-auto grid-cols-1 auto-rows-max gap-6 mt-8"}>
                <div className="form-control">
                    <label className="label font-semibold" htmlFor="profileEmail">Email</label>
                    <input
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.profileEmail}
                        className="input input-bordered w-full max bg-primary"
                        type="text"
                        name="profileEmail"
                        id="profileEmail"
                    />
                    <DisplayError errors={errors} touched={touched} field={"profileEmail"} />
                </div>
                <div className=" form-control">
                    <label className={" label font-semibold"} htmlFor="password">Password</label>
                    <input
                        className="input input-bordered w-full max bg-primary"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.profilePassword}
                        type="password"
                        name="profilePassword"
                        id="password"
                    />
                    <DisplayError errors={errors} touched={touched} field={"profilePassword"} />
                </div>
                <div className="py-2 flex gap-4">
                    <button className='btn btn-success bg-secondary text-white border-secondary' type="submit">Log In</button>
                    <button className='btn btn-danger bg-accent border-accent text-white' onClick={handleReset} type="reset">reset</button>
                </div>
                <a href={"./sign-up"} className='btn bg-neutral/90 text-white font-semibold rounded-lg' >Not a member? Sign Up</a>
                <DisplayStatus status={status} />
            </form>
        </>
    )
}