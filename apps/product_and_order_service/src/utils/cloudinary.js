import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_CLOUD_APIKEY, 
  api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET, 
});

const uploadOnCloudinary = async (localFilePath) => {
    console.log(localFilePath, "this is localfile path in the cloudinary1")
    try {
        if(!localFilePath) return null;
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        console.log("response ", response);
        // console.log("response ", response);
        //files have been uploaded successfully
        // console.log("file is uploaded on cloudinary, this is file url", response.url);

        // First do this operation after that perfoam another task
        // Unlink the file from the locally if file is uploaded successfully.
        
         fs.unlinkSync(localFilePath)
       return { 
        url: response.url, 
        // publicId: response.public_id 
};

    }
    catch (error) {
        // const checkvar = fs.unlinkSync(localFilePath) //remove the locally if file is not upload on the cloudinary. 
        console.log("image is not upload ", error.message);
        return null;
    }
}



export {uploadOnCloudinary}