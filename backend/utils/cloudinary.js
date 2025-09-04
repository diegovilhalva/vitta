import cloudinary from "../config/cloudinary.js";
import fs from "fs";

const uploadOnCloudinary = async (file) => {
  try {
    const res = await cloudinary.uploader.upload(file, {
      folder: "vitta", 
      resource_type: "auto",
    });
    fs.unlinkSync(file); 
    return res.secure_url;
  } catch (error) {
    fs.unlinkSync(file);
    throw error;
  }
};

export default uploadOnCloudinary;
