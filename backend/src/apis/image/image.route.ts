import { Router } from 'express'
import { imageUploader} from "../../utils/controllers/multer.controller"
import { imageUploadController } from './imageUpload.controller'
import {getImagesByImageTreeIdController, postImageController} from "./image.controller";

const basePath = '/apis/image'

const router = Router()

router.route('/')
    .post(postImageController)

router.route('/:treeId')
    .get(getImagesByImageTreeIdController)

router.route('/upload')
    .post(imageUploader, imageUploadController)

export const imageRoute = {basePath, router}