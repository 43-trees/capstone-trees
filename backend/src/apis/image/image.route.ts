import { Router } from 'express'
import { imageUploader} from "../../utils/controllers/multer.controller"
import { imageUploadController } from './imageUpload.controller'

const basePath = '/apis/image'

const router = Router()

router.route('/upload')
    .post(imageUploader, imageUploadController)

export const imageRoute = {basePath, router}