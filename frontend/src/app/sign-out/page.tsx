
import {redirect} from "next/navigation";
import {cookies} from "next/headers";


const signOutUrl = `${process.env.REST_API_URL}/apis/sign-out/`

export async function performLogout() {
    cookies().delete('jwt-token')
    await fetch(signOutUrl)
        .then(response => redirect("/"))
        .catch (error => {
            console.error(error)
        })
    return null
}

// export default async function logout() {
//     const signOutUrl = `${process.env.REST_API_URL}/apis/sign-out/`
//   async function performLogout() {
//         cookies().delete('jwt-token')
//         await fetch(signOutUrl)
//             .then(response => redirect("/"))
//             .catch (error => {
//                 console.error(error)
//             })
//     }
// }