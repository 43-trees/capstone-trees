import {Avatar} from "@/app/components/Avatar";
import {Profile, ProfileSchema} from "@/utils/models/profiles";
import {getSession} from "@/utils/models/fetchSession";
import {redirect} from "next/navigation";
import {Tree, TreeSchema} from "@/utils/models/trees";
import {useFormik} from "formik";


const SettingsFormComponent = () => {
    const initialValues = {
        username: '',
        email: '',
        newPassword: '',
        confirmPassword: '',
    };

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
    } = useFormik({
        initialValues,
        validationSchema: Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            newPassword: Yup.string().min(6).required(),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('newPassword')], 'Passwords must match')
                .required(),
        }),
        onSubmit: async (values) => {

        },
    });

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={values.username}
                onChange={handleChange}
                placeholder="Username"
            />
            <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder="Email"
            />
            <input
                type="password"
                name="newPassword"
                value={values.newPassword}
                onChange={handleChange}
                placeholder="New Password"
            />
            <input
                type="password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
            />
            <button type="submit">Submit</button>
        </form>
    )
}

export default async function Settings() {

    return (
        <>
            <SettingsFormComponent />
            <div className="py-3 font-semibold text-center text-lg text-neutral hover:text-neutral/60">
                {trees.map(tree => (<h1><a href={`tree/edit/${tree.treeId}`}>{tree.treeTitle}</a></h1>))}
            </div>
        </>
    )
}


//     something about passing it to the backend ???
//     Do I need to create a model in frontend/src/utils/models ???

// onSubmit: async (values) => {
//     const response = await fetch('', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(values),
//     });
//
//     if (response.status === 200) {
//     } else {
//     }
// },




// Original Component Code

// export default async function Settings(){
//
//     const session = await getSession();
//     if (session === undefined) {
//         redirect("/")
//     }
//     const {profile, trees} = await getData(session.profile.profileId)
//     console.log(profile)
//
//     return (
//         <>
//             <form  className="md:w-1/2 md:auto mx-auto grid-cols-1 auto-rows-max gap-6 mt-8">
//                 <div>
//                     <h2 className="text-3xl text-center text-neutral/80 font-semibold p-2">User Settings</h2>
//                 </div>
//                 <div className="flex justify-center">
//                     <Avatar profileImageUrl={'https://placekitten.com/200/200'}/>
//                 </div>
//                 <div className="py-3">
//                     <label htmlFor="name" className="block text-gray text-sm font-bold mb-2">Username</label>
//                     <input type="text" id="name" name="name"
//                            className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray focus:bg-white focus:ring-0"/>
//                 </div>
//                 <div className="py-3">
//                     <label htmlFor="email" className="block text-gray text-sm font-bold mb-2">New Password</label>
//                     <input type="email" id="email" name="email"
//                            className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray focus:bg-white focus:ring-0"/>
//                 </div>
//                 <div className="py-3">
//                     <label htmlFor="email" className="block text-gray text-sm font-bold mb-2">Confirm Password</label>
//                     <input type="email" id="email" name="email"
//                            className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray focus:bg-white focus:ring-0"/>
//                 </div>
//
//                 <div className="py-3 space-x-4">
//                     <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                         Apply
//                     </button>
//                     <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                         Cancel
//                     </button>
//                 </div>
//             </form>
//             <div className="py-3 font-semibold text-center text-lg text-neutral hover:text-neutral/60">
//                 {trees .map(tree => (<h1><a href={`tree/edit/${tree.treeId}`}>{tree.treeTitle}</a></h1>))}
//             </div>
//         </>
//     )
// }
//
// async function  getData(profileId: string): Promise<{profile: Profile, trees: Tree[]}> {
//     console.log(profileId)
//     const url = `${process.env.REST_API_URL}/apis/profile/${profileId}`
//
//     const profileResult = await fetch(url)
//         .then(response => {
//             if (response.status === 200 || response.status === 304) {
//                 return response.json()
//             }
//             throw new Error('retrieving profile failed')
//         }).catch(error =>{
//             console.error(error)
//         })
//
//     const profile = ProfileSchema.parse(profileResult?.data)
//
//     const treeUrl = `${process.env.REST_API_URL}/apis/tree/treeProfileId/${profile.profileId}`
//
//     const treeResult = await fetch(treeUrl)
//         .then(response => {
//             if (response.status === 200 || response.status === 304) {
//                 return response.json()
//             }
//             throw new Error('retrieving trees failed')
//         }).catch(error =>{
//             console.error(error)
//         })
//
//     const trees = TreeSchema.array().parse(treeResult?.data)
//
//
//     return {profile, trees}
// }