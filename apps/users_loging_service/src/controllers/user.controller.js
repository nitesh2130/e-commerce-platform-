import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import jwt, { decode, verify } from "jsonwebtoken";




//this is to generate access token and refresh token

const generateAccessAndRefreshToken = async (user,_id) => {
    try {
          const user = await User.findById(userId);
          const accessToken = await user.generateAccessToken();
          const refreshToken = user.generateRefreshToken();
          user.refreshToken = refreshToken;

          await user.save({ validateBeforeSave: false })

          return {accessToken, refreshToken}

        
    } catch (error) {
        console.log(error)
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }

}



//for the  creating the user 
const userRegister = asyncHandler( async (req, res) => {

    const { fullName, email, phoneNumber, password } = req.body;
    if(
        [ fullName, email, password, phoneNumber ].some((field) => field?.trim() === "")
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

    console.log(profileImagelocalpath, "profile image local url ")


    const profileImage = await uploadOnCloudinary(profileImagelocalpath);

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

    console.log("password", user.password)
    const createdUser = await User.findById(user._id).select(
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
const userLogin = asyncHandler( async (req, res) => {
    console.log( 'this is email');
    // const { email, phoneNumber, password } = req.body;
    const { email, phoneNumber, password } = req.body;
    console.log(email, 'this is email');

    // Checking the email, phoneNumber, password
    if(
        [email, phoneNumber, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(404, "email, phoneNUmber and password is need for the login");
    }

    const user = await User.findOne({
        $or: [ {email}, {phoneNumber}]
    })

    if(!user) {
        throw new ApiError(404, "email or phoneNumber are not availble");
    }

    const isPasswordMatch = await user.isPasswordCorrect(password);
    console.log(isPasswordMatch)
    
    if(!isPasswordMatch) {
        throw new ApiError(401, "Invalid password");
    }

    const accessAndRefreshToken = await generateAccessAndRefreshToken(user._id);

    const { accessToken, refreshToken } = accessAndRefreshToken;
    console.log("this is accessToken", accessToken );
    console.log("this is refreshToken", refreshToken );

    const logedInUser = await User.findById(user._id).select("-password, -refreshToken");

    const option = {
        httpOnly: true,
        secure: true
    }
    res
    .status(200)
    .cookie("refreshToken", refreshToken, option)
    .cookie("accessToken", accessToken, option)
    .json(new ApiResponse(
        200, {
            user: logedInUser, accessToken, refreshToken
        },
        "user login successfully"
    ))
}) 


// LogOut the user

const userLogOut = asyncHandler( async (req, res) => {
    console.log(req.user._id);
    const result = await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1  //this remove the field from document
            }
        },
        {
            new: true
        }
    )

    console.log("result of logOut query");
    const option = {
        httpOnly: true,
        secure: true
    }

    console.log("abhi ka refresh Token", refreshToken)

    return res
    .status(200)
    .clearCookie("accessToken", option)
    .clearCookie("refreshToken", option)
    .json(
        new ApiResponse(200, {}, "User logged Out successfully")
    )
})

 // refreshAccessToken,

const refreshAccessToken = asyncHandler( async (req, res) => {
    // get the refresh the Refresh token form the request web => (get token to cookie ), App => (get Access Token from body and header ) 
    const incomingRefreshToken = req.cookie.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken) {
        throw new ApiError(401, "refresh Token is unavailable" )
    }
    try {
        //verify the refresh token
        const decodeToken = await jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await findById(decodeToken?._id)

        if(!user) {
            throw new ApiError(401, "Invalid refersh token");
        }

        if(incomingRefreshToken !== user.refreshToken) {
            throw new ApiError(401, "Refresh token is invalid or used ")
        }
        const {accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

        const option = {
            httpOnly: true,
            secure: true
        }

        return res
        .status(200)
        .cookie("accessToken", accessToken, option)
        .cookie("refreshToken", refreshToken, option)
        .json(
            new ApiResponse(
                200,
                {accessToken, refreshToken},
                "Access token refreshed"
            )
        )

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token");
        
    }

})

//changeCurrentPassword
 const changeCurrentPassword = asyncHandler( async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    if(oldPassword == newPassword) {
        throw new ApiError(401, "Old and New password");
    }

    const user = await User.findById(req.user?._id);

    //This is check the old password are match to saved password or not
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if(!isPasswordCorrect) {
        throw new ApiError(401, "Old Pasword is not match, you can't change this password");
    }

    user.password = newPassword;
    await user.save({validateBeforeSave: false});

    return res
    .status(200)
    .json(
        new ApiResponse(200, {}, "Password change successfully")
    )

 })



    // getCurrentUser,
    // updateAccountDetails,
    // updateUserprofileImage,
export { userRegister, userLogin, userLogOut, refreshAccessToken, changeCurrentPassword }
