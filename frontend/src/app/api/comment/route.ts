import {cookies} from "next/headers";
import {revalidateTag} from "next/cache";

export async function POST(request: Request){


    const data = await request.json()
    const responseFromServer = data.clone()
    revalidateTag("comments")

    console.log(responseFromServer)
    const response =  responseFromServer.clone()

    return response
}