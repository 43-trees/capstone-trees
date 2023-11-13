import {Formik, FormikHelpers, FormikProps} from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import {DisplayError} from "@/app/components/displayError";
import {Profile, ProfileSchema} from "@/utils/models/profiles";
import {SignInSchema} from "@/utils/models/sign-in";
import {FormDebugger} from "@/app/components/formDebugger";
import {Session} from "@/utils/models/fetchSession";


type SettingsFormProps = {
    session: Session,
    profile: Profile
}
export default async function Settings(){

    const session = await getSession();
    if (session === undefined) {
        redirect("/")
    }
    const {profile} = await getData(session.profile.profileId)


export default function SettingsFormComponent(props: SettingsFormProps) {
    const{profile, session} = props
    const initialValues = {
        profileImageUrl: "",
        profileName: profile.profileName,
        profileEmail: profile.profileEmail,
        newPassword: "",
        confirmPassword: "",
    };

    const handleSubmit = (values: Profile, actions: FormikHelpers<Profile>) => {
        const { setStatus, resetForm } = actions;
        const result = fetch('/api/profile', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        }).then(response => response.json()).then(json => {
            if (json.status === 200) {
                resetForm()
            }
            setStatus({ type: "success", message: "Your settings have been updated successfully" })
        })
    }

    return (
        <>
        {/*<Formik*/}
        {/*    initialValues={initialValues}*/}
        {/*    onSubmit={handleSubmit}*/}
        {/*    validationSchema={toFormikValidationSchema(ProfileSchema)}*/}
        {/*>*/}
        {/*    {SettingsFormContent}*/}
        {/*</Formik>*/}
            </>
    )
}

function SettingsFormContent(props: FormikProps<Profile>) {
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
        <form onSubmit={handleSubmit} className={"md:w-1/2 md:auto mx-auto grid-cols-1 auto-rows-max gap-6 mt-8"}>
            <div className="form-control">
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
         <FormDebugger/>
        </>
    )
}}





// Original Component Code

/*
export default async function Settings(){

    const session = await getSession();
    if (session === undefined) {
        redirect("/")
    }
    const {profile} = await getData(session.profile.profileId)
    console.log(profile)

    return (
        <>
            <form  className="md:w-1/2 md:auto mx-auto grid-cols-1 auto-rows-max gap-6 mt-8">
                <div>
                    <h2 className="text-3xl text-center text-neutral/80 font-semibold p-2">User Settings</h2>
                </div>
                <div className="flex justify-center">
                    <Avatar profileImageUrl={'https://placekitten.com/200/200'}/>
                </div>
                <div className="py-3">
                    <label htmlFor="name" className="block text-gray text-sm font-bold mb-2">Username</label>
                    <input type="text" id="name" name="name"
                           className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray focus:bg-white focus:ring-0"/>
                </div>
                <div className="py-3">
                    <label htmlFor="email" className="block text-gray text-sm font-bold mb-2">New Password</label>
                    <input type="email" id="email" name="email"
                           className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray focus:bg-white focus:ring-0"/>
                </div>
                <div className="py-3">
                    <label htmlFor="email" className="block text-gray text-sm font-bold mb-2">Confirm Password</label>
                    <input type="email" id="email" name="email"
                           className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray focus:bg-white focus:ring-0"/>
                </div>

                <div className="py-3 space-x-4">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Apply
                    </button>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Cancel
                    </button>
                </div>
            </form>
            <div className="py-3 font-semibold text-center text-lg text-neutral hover:text-neutral/60">
                {trees .map(tree => (<h1><a href={`tree/edit/${tree.treeId}`}>{tree.treeTitle}</a></h1>))}
            </div>
        </>
    )
}

async function  getData(profileId: string): Promise<{profile: Profile, trees: Tree[]}> {
    console.log(profileId)
    const url = `${process.env.REST_API_URL}/apis/profile/${profileId}`

    const profileResult = await fetch(url)
        .then(response => {
            if (response.status === 200 || response.status === 304) {
                return response.json()
            }
            throw new Error('retrieving profile failed')
        }).catch(error =>{
            console.error(error)
        })

    const profile = ProfileSchema.parse(profileResult?.data)

    const treeUrl = `${process.env.REST_API_URL}/apis/tree/treeProfileId/${profile.profileId}`

    const treeResult = await fetch(treeUrl)
        .then(response => {
            if (response.status === 200 || response.status === 304) {
                return response.json()
            }
            throw new Error('retrieving trees failed')
        }).catch(error =>{
            console.error(error)
        })

    const trees = TreeSchema.array().parse(treeResult?.data)


    return {profile, trees}
}*/
