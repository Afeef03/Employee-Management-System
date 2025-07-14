import { config } from 'dotenv'

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const { 
    PORT, 
    NODE_ENV, 
    DB_URI,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    ARCJET_KEY,
    ARCJET_ENV,
    CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
    CLOUDINARY_API_VARIABLE
} = process.env;