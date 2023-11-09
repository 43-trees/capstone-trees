import Image from 'next/image'

type TreeProps = {
    tree: any,
    treeImages: any
}


export function TreePost(treeProps: TreeProps) {
    const {tree, treeImages} = treeProps
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

                        {
                            treeImages.map((image: any, index: number) =>
                                // <a href="" className="btn btn-circle self-center">❮</a>
                                <div id={`slide${index}`} key={image.imageUrl} className=" carousel-item h-60">
                                    <img src={image.imageUrl} alt={image.alt} className="rounded-box "/>
                                    {/*<a href="" className="btn btn-circle self-center">❯</a>*/}
                                    <div
                                        className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                        <a href={`slide${index -1 < 0 ? treeImages.length -1 : index -1}`} className="btn btn-circle">❮</a>
                                        <a href={`slide${index +1 === treeImages.length ? 0 : index +1}`}className="btn btn-circle">❯</a>
                                    </div>
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
                    <img src="https://placekitten.com/50/50" alt="an apple icon to rank the quality of the tree"
                         className="mx-auto"/>
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



