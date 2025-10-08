import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; //File system

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(
      localFilePath,
      {
        resource_type: "auto",
      }
    );
    // file uploaded successfully
    console.log("File uploaded to Cloudinary:", response.url);
    fs.unlinkSync(localFilePath); //delete the local file after successfully being uploaded on cloudinary
    return response;
  } catch (error) {
    console.error("Cloudinary upload error:", error.message);
    console.error("Error details:", error);
    // Only try to delete if file exists
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    return null;
  }
};

export { uploadOnCloudinary };
