import {Map} from "./Map"
import {Tree, TreeSchema} from "@/utils/models/trees"



export default async function Home() {
    const {trees} = await getData()
        return (
            <>
                <div className="flex justify-center py-6">
                    <Map trees={trees}/>
                </div>
            </>
        )
    }

    async function getData(): Promise<{ trees: Tree[] }> {
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
