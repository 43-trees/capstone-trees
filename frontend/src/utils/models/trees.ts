import {z} from "zod"

const TreeSchema = z.object({
    treeId: z.string ({
        required_error: 'Please provide a valid treeId or null'
    })
        .uuid({message: 'Please provide a valid uuid for treeId'})
        .nullable(),
    treeProfileId: z.string({
        required_error: 'Please provide a valid treeProfileId'
    })
        .uuid({message: 'Please provide a valid uuid for treeProfileId'}),
    treeAddress: z.string({
        required_error:'Please provide a valid address'
    }),
    treeEndDate: z.coerce.date({
        required_error: 'Please provide a valid end date or null'
    })
        .nullable(),
    treeDate: z.coerce.date({
        required_error: 'Please provide a valid tree date or null'

    })
        .nullable(),
    treeImage: z.string ({
        required_error: 'Please provide a valid tree image'
    })
        .trim()
        .url({message:'Please provide a valid URL for tree image'})
        .max(255, {message: 'Please provide a valid tree image (max 255 characters URL'}),
    treeInfo: z.string({
        required_error: 'Please provide valid tree information'
    })
        .min(20, {message: 'Please provide a minimum of 20 characters for the tree information.'})
        .max(1024, {message: 'Please provide tree information that is no longer than 1024 characters.'}),
    treeLat: z.coerce.number ({
        required_error: 'Please provide a valid latitude'
    }),
    treeLng: z.coerce.number ({
        required_error: 'Please provide a valid longitude'
    }),
    treeTitle: z.string ({
        required_error: 'Please provide a valid title'
    })
        .min(5, {message: 'Please provide a minimum title of 5 characters'})
        .max(96, {message: 'Please provide a maximum title of 96 characters'}),
    treeSpecies: z.string ({
        required_error: 'Please provide a valid tree species'
    })
        .min(1, {message: 'Please provide a minimum of 1 characters'})
        .max(96,{message: 'Please provide a tree species that is no longer than 96 characters'})
})

export type Tree = z.infer<typeof TreeSchema>
