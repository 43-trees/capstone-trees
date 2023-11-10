'use server'
import Img from 'next/image'
import {Tree, TreeSchema} from "@/utils/models/trees";
import {Image, ImageSchema} from "@/utils/models/images";

type TreeProps = {
    tree: Tree,
    images: Image[]
}


export async function TreePost(treeProps: TreeProps) {
    const {tree, images} = treeProps
    let treeSpeciesAlt = `This is a ${tree.treeSpecies} tree`
    // const {tree, images} = await getData(treeId)

    return (
        <>
            <section className="bg-primary mb-12">

                {/*tree title*/}
                <h2 className="md:text-5xl text-4xl text-neutral/80 font-bold text-center p-4">{tree.treeTitle}</h2>

                {/*// carousel of tree images*/}
                <div id="carousel" className="md:w-1/4 mx-auto carousel  rounded-box flex">

                <div id="" className="carousel-item p-4 space-x-4 bg-neutral rounded-box">
                    {
                        images.map((image: any) =>
                    <div key={image.imageUrl} className=" carousel-item  w-96 h-72">
                        <a href="" className="btn btn-circle self-center">❮</a>
                    <img src={image.imageUrl} alt={image.alt} className="w-11/12 object-contain rounded-box" width={200} height={200}/>
                        <a href="" className="btn btn-circle self-center">❯</a>
                    </div>
                        )}
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
                    <img src="/map-pin-icon.png" alt="an icon of a map pin" className="" width={72}
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

// async function getData(treeId: string): Promise<{tree: Tree, images: Image[]}> {
//     const url = `${process.env.REST_API_URL}/apis/tree/${treeId}`
//
//     const treeResult = await fetch(url)
//         .then(response => {
//
//             if (response.status === 200 || response.status === 304) {
//                 return response.json()
//             }
//             throw new Error('retrieving data failed')
//         }).catch(error => {
//             console.error(error)
//         })
//
//     const tree = TreeSchema.parse(treeResult?.data)
//
//     const imageResult = await fetch(url)
//         .then(response => {
//
//             if (response.status === 200 || response.status === 304) {
//                 return response.json()
//             }
//             throw new Error('retrieving data failed')
//         }).catch(error => {
//             console.error(error)
//         })
//
//     const images = ImageSchema.parse(imageResult?.data)
//
//     return {tree, images }
// }


