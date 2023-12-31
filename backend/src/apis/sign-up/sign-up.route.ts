import {Router} from "express"
import { signUpProfileController} from "./sign-up.controller"
// import { activationController } from "./activation.controllers"

const basePath = '/apis/sign-up'

const router = Router()

router.route('/').post(signUpProfileController)

// router.route('/activation/:activation').get(activationController)

export const signUpRoute = { basePath, router}