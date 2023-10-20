import {z} from 'zod'
import {TreeSchema} from './tree.validator'
import {sql} from '../../utils.database.utils'

export type Tree = z.infer<typeof TreeSchema>

export async function insertTree(tree: Tree): Promise<string> {
    const {treeProfileId, treeAddress, treeImage, treeInfo, treeTitle, treeSpecies} = tree

    await sql``

}