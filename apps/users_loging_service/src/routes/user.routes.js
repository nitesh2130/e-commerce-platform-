import { Router } from "express";
import { userRegister, userLogin, userLogOut } from "../controllers/user.controller.js";
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

router.route("/login").post(userLogin);
router.route("/logOut").delete(userLogOut);

export default router;

