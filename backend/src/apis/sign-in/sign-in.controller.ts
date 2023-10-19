import {Request, Response} from 'express'
import {
    PrivateProfile,
    selectPrivateProfileByProfileId,
    selectPublicProfileById,
    selectPublicProfileByProfileName,
    selectPublic
} from "../profile/profile.model";