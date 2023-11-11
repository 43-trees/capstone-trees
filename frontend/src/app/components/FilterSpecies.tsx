'use client'
import {useState} from "react";

type FilterSpeciesProps = {
    trees: Tree[]
}

export function FilterSpecies({trees}: FilterSpeciesProps) {
    const [treeSpecies, setTreeSpecies] = useState('')

    const handleChange = (event: any) => {
        setTreeSpecies(event.target.value)
        console.log(treeSpecies)
    }

    return (
        <>
            <div>
                <select tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 font-semibold">
                    <option>Filter by Species</option>
                    <option>Apple</option>
                    <option>Apricot</option>
                    <option>Cherry</option>
                    <option>Fig</option>
                    <option>Peach</option>
                    <option>Pear</option>
                    <option>Plum</option>
                    <option>Pomegranate</option>
                    <option>Other</option>
                </select>
            </div>
        </>
    )

}