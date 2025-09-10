import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";


export const verifyJWT = asyncHandler( async (req, res) => {
    try {
        const token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer", "")

        if(!token) {
            throw new ApiError(401, "unauthorized token");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!user) {
            
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = user;
        next()
    } catch (error) {
        console.log(error);
        throw new ApiError(500, error?.message || "Invalid access token");
    }
})