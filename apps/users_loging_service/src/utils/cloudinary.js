import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_CLOUD_APIKEY, 
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET, 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        //files have been uploaded successfully
        console.log("file is uploaded on cloudinary, this is file url", response.url);

        // First do this operation after that perfoam another task
        // Unlink the file from the locally if file is uploaded successfully.
        
        fs.unlinkSync(localFilePath)
        return response;

    }
    catch (error) {
        fs.unlinkSync(localFilePath) //remove the locally if file is not upload on the cloudinary. 
        return null;
    }
}



export {uploadOnCloudinary}