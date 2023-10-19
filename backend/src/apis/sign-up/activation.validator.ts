import { z } from 'zod'

export const activationProfileSchema = z.object({ activation: z.string().length(32, { message: 'please provide a valid profileActivationToken' }) })

