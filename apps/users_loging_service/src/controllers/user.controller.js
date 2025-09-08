import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";


//for the  creating the user 
const userRegister = asyncHandler( async (req, res) => {

    const { fullName, email, phoneNumber, password, refreshToken } = req.body;
    if(
        [ fullName, email, password, phoneNumber, refreshToken].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    // Checking the email and phone Number of user are allready exist or not
    const existedUser = await User.findOne({
        $or: [{ phoneNumber }, { email }]
    })

    if(existedUser) {
        throw new ApiError(401, "Email or Phone Number are allready exist");
    }

    // Handle the profile Image
    const profileImagelocalpath = req.files?.profileImage[0]?.path;

    if(!profileImagelocalpath) {
        throw new ApiError(400, "profile image is required");
    }

    const profileImage = uploadOncloudinary(profileImagelocalpath);

    if(!profileImage) {
        throw new ApiError(400, "profile image is required");
    }

    const user = await User.create({
        fullName: fullName,
        email: email,
        phoneNumber: phoneNumber,
        profileImage: profileImage,
        password: password,
    })

    const createdUser = User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser) {
        throw new ApiError(500, "Something went wrong on the server while registering the user" );
    }
    
    //response for the user if all of them are working fine

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User are register Successfully ")
    )
})



// for the user login

const userLogin = asyncHandler( async(req, res) => {
    const { email, phoneNumber, password} = req.body;

    // Checking the email, phoneNumber, password
    if(
        [email, phoneNumber, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(404, "email, phoneNUmber and password is need for the login");
    }

    const user = findOne({
        $or: [ {email}, {phoneNumber}]
    })

    if(!user) {
        throw new ApiError(404, "email or phoneNumber are not availble");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    
    if(!isPasswordCorrect) {
        throw new ApiError(401, "Invalid password");
    }

    const refreshToken = await genrateRefreshToken(user._id);
    // const accessToken = await genrateAccessToken({user._id,})

    const logedInUser = await User.findById(user._id).select("-password, -refreshToken");

    const option = {
        httpOnly: true,
        secure: true
    }
    res
    .status(200)
    .cookie("refreshToken", accessToken, option)
    .json(new ApiResponse(
        200, {
            user: logedInUser, accessToken, refreshToken
        },
        "user login successfully"
    ))
}) 


    // registerUser,
    // loginUser,
    // logoutUser,
    // refreshAccessToken,
    // changeCurrentPassword,
    // getCurrentUser,
    // updateAccountDetails,
    // updateUserAvatar,
    // updateUserCoverImage,
    // getUserChannelProfile,
    // getWatchHistory

export { userRegister}
