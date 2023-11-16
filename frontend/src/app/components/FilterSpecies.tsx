'use client'
// import {useState} from "react";
// import {Tree} from "@/utils/models/trees";

type FilterSpeciesProps = {
    setTreeSpecies: any
    treeSpecies: string
}

export function FilterSpecies(props: FilterSpeciesProps) {
    const {setTreeSpecies, treeSpecies} = props

    const handleChange = (event: any) => {
        setTreeSpecies(event.target.value)
        console.log(treeSpecies)
    }

    return (
        <>
            <div>
                <select tabIndex={0} value={treeSpecies} onChange={handleChange} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 font-semibold">
                    <option value={''}>Filter by Species</option>
                    <option value={'Apple'}>Apple</option>
                    <option value={'Apricot'}>Apricot</option>
                    <option value={'Cherry'}>Cherry</option>
                    <option value={'Fig'}>Fig</option>
                    <option value={'Peach'}>Peach</option>
                    <option value={'Pear'}>Pear</option>
                    <option value={'Plum'}>Plum</option>
                    <option value={'Pomegranate'}>Pomegranate</option>
                    <option value={'Other'}>Other</option>
                </select>
            </div>
        </>
    )
}