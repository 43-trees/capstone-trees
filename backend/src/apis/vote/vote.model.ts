import {z} from 'zod'
import {VoteSchema} from './vote.validator'
import {sql} from '../../utils/database.utils'

export type Vote = z.infer<typeof VoteSchema>

export async function insertVote(vote: Vote): Promise<string> {
    const{voteProfileId, voteTreeId} = vote

    await sql `INSERT INTO vote (vote_profile_id, vote_tree_id, vote_value) VALUES (${voteProfileId}, ${voteTreeId}, ${voteValue})`

    return 'Vote successfully posted'
}

export async function deleteVote(vote: Vote): Promise<string> {

    const {voteProfileId, voteTreeId, voteValue} = vote

    await sql `DELETE 
FROM vote
WHERE vote_profile_id =${voteProfileId}
AND vote_tree_id = ${voteTreeId}`

    return 'Vote successfully deleted'
}

export async function selectVotesByVoteTreeId(voteTreeId: string): Promise<Vote[]> {
    const rowList = <Vote[]>await sql `SELECT vote_profile_id, vote_tree_id, vote_value
FROM vote
WHERE vote_tree_id = ${voteTreeId}`

    return VoteSchema.array().parse(rowList)
}

export async function selectVotesByVoteProfileId(voteProfileId: string): Promise<Vote[]> {
    const rowList = <Vote[]>await sql `SELECT vote_profile_id, vote_tree_id, vote_value
FROM vote
WHERE vote_profile_id = ${voteProfileId}`

    return VoteSchema.array().parse(rowList)
}