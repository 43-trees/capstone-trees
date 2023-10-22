import {z} from 'zod'
import {TreeSchema} from './tree.validator'
import {sql} from '../../utils/database.utils'

import axios from "axios"

export type Tree = z.infer<typeof TreeSchema>

export async function insertTree(tree: Tree): Promise<string> {
    const {treeProfileId, treeAddress, treeImage, treeInfo, treeTitle, treeSpecies} = tree

    // this function takes the current date and adds 30 days to be added into the dataset as "end date" to serve as the "lifespan" of the tree on the app before it goes inactive
    function endDate() {
        let date = new Date() // Now
          return new Date(date.setDate(date.getDate() + 30)) // Set now + 30 days as the new date
      }

    // function to convert address into treeLat and treeLng to pass into sql

    async function convertAddress (address: string) {
        let formattedAddress = address.replace(' ', '+')

        const result = await axios({
            method: 'get',
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAddress}&key=AIzaSyBM_3QTrw7n7kCXGrECNuOcotP_FbbDFfI`,
            // responseType: 'stream'
        })
            .then(function (response) {
                const latitude = response.data.results[0].geometry.location.lat
                const longitude = response.data.results[0].geometry.location.lng
                return {lat: latitude, lng: longitude}
            })
        return (result)
    }

const treeCords = await convertAddress(treeAddress)

    await sql`INSERT INTO tree (tree_id, tree_profile_id, tree_address, tree_end_date, tree_date, tree_image, tree_info, tree_lat, tree_lng, tree_title, tree_species) VALUES (gen_random_uuid(), ${treeProfileId}, ${treeAddress}, endDate(), now(), ${treeImage}, ${treeInfo}, ${treeCords.lat}, ${treeCords.lng}, ${treeTitle}, ${treeSpecies})`

    return 'Tree successfully posted'
}

export async function selectAllTrees(): Promise<Tree[]> {
    const rowList = <Tree[]> await sql `SELECT tree_id,
       tree_profile_id,
       tree_address,
       tree_end_date,
       tree_date,
       tree_image,
       tree_info,
       tree_title,
       tree_species
       FROM tree
       ORDER BY tree_datetime DESC`

    return TreeSchema.array().parse(rowList)
}

export async function selectTreeByProfileName(profileName: string): Promise<Tree[]> {
    const rowList = <Tree[]> await sql `SELECT tree_id,
       tree_profile_id,
       tree_address,
       tree_end_date,
       tree_date,
       tree_image,
       tree_info,
       tree_title,
       tree_species
       FROM tree JOIN profile ON tree.tree_profile_id = profile.profile_id
       WHERE profile.profile_name = ${profileName}`

    return TreeSchema.array().parse(rowList)
}

export async function selectTreesByTreeProfileId(treeProfileId: string): Promise<Tree[]> {
    const rowList = <Tree[]> await sql `SELECT tree_id,
       tree_profile_id,
       tree_address,
       tree_end_date,
       tree_date,
       tree_image,
       tree_info,
       tree_title,
       tree_species
       FROM tree
       WHERE tree_profile_id = ${treeProfileId}`

    return TreeSchema.array().parse(rowList)
}


export async function selectTreeByTreeId(treeId: string): Promise<Tree | null> {
    const rowList = <Tree[]>await sql `SELECT tree_id,
       tree_profile_id,
       tree_address,
       tree_end_date,
       tree_date,
       tree_image,
       tree_info,
       tree_title,
       tree_species
       FROM tree
       WHERE tree_id = ${treeId}`

    const result = TreeSchema.array().max(1).parse(rowList)

    return result.length === 0 ? null : result[0]
}

export async function selectSpeciesOfTrees(species: string): Promise<Tree[]> {
    const rowList = <Tree[]> await sql `SELECT tree_id,
                                               tree_profile_id,
                                               tree_address,
                                               tree_end_date,
                                               tree_date,
                                               tree_image,
                                               tree_info,
                                               tree_title,
                                               tree_species
                                               FROM tree
                                               WHERE tree_species = ${species}
                                               ORDER BY tree_datetime DESC`

    return TreeSchema.array().parse(rowList)
}

export async function deleteTreeByTreeId(treeId: string): Promise<string> {
    await sql `DELETE FROM tree WHERE treeId = ${treeId}`

    return 'Tree successfully deleted'
}

