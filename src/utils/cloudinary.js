import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY_CLOUD,
    api_secret: process.env.API_SECRET_CLOUD
});

export default cloudinary