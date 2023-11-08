import Image from 'next/image'
import {Tree, TreeSchema} from "@/utils/models/trees";

type TreeProps = {
   treeId: string
}


export function TreePost(treeProps: TreeProps) {
    const {treeId} = treeProps
    const tree = getData(treeId)
    // let treeSpeciesAlt = `This is a ${treeSpecies} tree`
    // let tree = {imageUrl: treeImage, alt: treeSpecies}
    // let trees = [tree, tree, tree]
    return (
        <>
            <section className="bg-primary mb-12">

                {/*tree title*/}
                <h2 className="md:text-5xl text-4xl text-neutral/80 font-bold text-center p-4">{tree.treeTitle}</h2>

                {/*// carousel of tree images*/}
                <div className="md:w-1/2 mx-auto flex">
                <div className="carousel carousel-center p-4 space-x-4 bg-neutral rounded-box">
                    <a href="" className="btn btn-circle self-center">❮</a>
                    {
                        treeImages.map((image: any) =>
                    <div key={image.imageUrl} className=" carousel-item h-60">
                    <img src={image.imageUrl} alt={image.alt} className="rounded-box "/>

                    </div>
                        )}
                    <a href="" className="btn btn-circle self-center">❯</a>
                </div>
                </div>

                {/*// species of tree*/}
                <div className="p-8">
                    <h3 className="bg-base-100 dropshadow-md md:mx-auto md:w-48 rounded-lg text-xl font-semibold text-center p-2">{tree.treeSpecies}</h3>
                </div>

                {/*// tree vote rating*/}
                <div className="">
                    <img src="https://placekitten.com/50/50" alt="an apple icon to rank the quality of the tree" className="mx-auto"/>
                </div>

                {/*// tree address*/}
                <div className="flex flex-row justify-center p-4">
                    <Image src="/map-pin-icon.png" alt="an icon of a map pin" className="" width={72}
                           height={35}/>
                    <p className="text-center text-3xl py-4">{tree.treeAddress}</p>
                </div>

                {/*// tree info*/}
                <div>
                    <h2 className="text-3xl text-center text-neutral/80 font-semibold p-2">Tree Info</h2>
                    <div className="bg-base-100 p-4 rounded-lg">
                    <p className="md:text-center py-2 text-justify ">{tree.treeInfo}</p>
                    </div>
                </div>
            </section>
        </>
    )
}

async function getData(treeId: string): Promise<Tree> {
    const url = `${process.env.REST_API_URL}/apis/tree/${treeId}`

    const result = await fetch(url)
        .then(response => {

            if (response.status === 200 || response.status === 304) {
                return response.json()
            }
            throw new Error('retrieving data failed')
        }).catch(error => {
            console.error(error)
        })

    return TreeSchema.parse(result?.data)
}


