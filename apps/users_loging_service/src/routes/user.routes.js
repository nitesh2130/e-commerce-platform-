import { Router } from "express";
import { userRegister, userLogin, userLogOut } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.midleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

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
router.route("/logOut").delete(verifyJWT, userLogOut);

export default router;

