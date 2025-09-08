import { Router } from "express";
import { userRegister } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.midleware.js"

const router = Router()

router.route("/register").post( 
    // console.log("this is routes"),
    upload.fields([
        {
            name: "profileImage",
            maxCount: 1
        }
    ]), userRegister
 )

export default router;

