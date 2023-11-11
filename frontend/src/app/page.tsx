
import {Map} from "./Map"
import {Tree, TreeSchema} from "@/utils/models/trees"
import Link from "next/link";
import React from "react";
import {getSession} from "@/utils/models/fetchSession";



export default async function Home() {
    const session = await getSession()
    const {trees} = await getData()


    return (
        <>
            <section className="bg-accent/50 my-8 container md:mx-72 rounded-md">
                <div className="flex justify-center py-6">
                    <div>
                        <Map trees={trees}/>
                        <div className="py-3 flex justify-end">
                            <button type="submit" className="bg-secondary hover:bg-blue-400 text-white font-bold py-2 px-4 rounded">
                                <Link href={"/submit"}>Submit a tree</Link>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

async function getData(): Promise<{trees:Tree[]}> {
    const url = `${process.env.REST_API_URL}/apis/tree/`

    const result = await fetch(url)
        .then(response => {

            if (response.status === 200 || response.status === 304) {
                return response.json()
            }
            throw new Error('retrieving data failed')
        }).catch(error => {
            console.error(error)
        })
     const trees = TreeSchema.array().parse(result?.data)

    return {trees}
}