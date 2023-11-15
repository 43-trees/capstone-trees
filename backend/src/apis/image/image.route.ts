import { Router } from 'express'
import { imageUploader} from "../../utils/controllers/multer.controller"
import { imageUploadController } from './imageUpload.controller'
import {
    deleteImageByImageIdController, deleteImageByTreeIdController,
    getImagesByImageTreeIdController,
    postImageController
} from "./image.controller";
import {deleteImageByImageId} from "./image.model";

const basePath = '/apis/image'

const router = Router()

router.route('/')
    .post(postImageController)

router.route('/treeId/:treeId')
    .get(getImagesByImageTreeIdController)
    .delete(deleteImageByTreeIdController)

router.route('/:imageId')
    .delete(deleteImageByImageIdController)

router.route('/upload/single')
    .post(imageUploader, imageUploadController)

export const imageRoute = {basePath, router}