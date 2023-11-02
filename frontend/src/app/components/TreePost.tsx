
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
            <section className="bg-primary py-10 my-8">
                <h2 className="text-2xl text-center">{tree.treeTitle}</h2>
                <div className="w-1/2 mx-auto">
                <div className="carousel carousel-center p-4 space-x-4 bg-neutral rounded-box">
                    <a href="" className="btn btn-circle self-center">❮</a>
                    {
                        treeImages.map((image: any) =>
                    <div id="" className=" carousel-item h-60">
                    <img src={image.imageUrl} alt={image.alt} className="rounded-box "/>

                    </div>
                        )}
                    <a href="" className="btn btn-circle self-center">❯</a>
                </div>
                </div>
                <div>
                    <h3 className="bg-base-100 mx-72 rounded-md text-lg font-semibold text-center p-2">{tree.treeSpecies}</h3>
                </div>
                <div className="">
                    <img src="" alt="an apple icon to rank the quality of the tree" className=""/>
                </div>
                <div className="">
                    <img src="" alt="an icon of a map pin" className=""/>
                    <p className="text-center text-xl py-4">{tree.treeAddress}</p>
                </div>
                <div>
                    <h2 className="text-xl text-center font-semibold">Tree Info</h2>
                    <p className="md:text-center py-2 px-24 text-justify ">{tree.treeInfo}</p>
                </div>
            </section>
        </>
    )
}

