
type TreeProps = {
    treeAddress: string
    treeImage: string
    treeInfo: string
    treeSpecies: string
    treeTitle: string
    treeVote: string
}


export function TreePost(treeProps: TreeProps){
    const {treeAddress, treeImage, treeInfo, treeSpecies, treeTitle, treeVote} = treeProps
    let treeSpeciesAlt = `This is a ${treeSpecies} tree`
    return(
        <>
            <section className="bg-primary justify-center">
                <h2 className="text-2xl">{treeTitle}</h2>
                <div className="carousel carousel-center max-w-md p-4 space-x-4 bg-neutral rounded-box">
                    <div className="carousel-item object-contain h-72 w-72">
                        <img src={treeImage} alt={treeSpeciesAlt} className="rounded-box" />
                    </div>
                </div>
                <div>
                    <h3 className="text-xl justify-center">{treeSpecies}</h3>
                </div>
            </section>
        </>
    )
}