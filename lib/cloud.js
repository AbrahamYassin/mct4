import { v2 as cloudinary } from 'cloudinary'
export const cloudEnabled = () => String(process.env.USE_CLOUDINARY||'false').toLowerCase()==='true'
export function configCloud(){ cloudinary.config({ cloud_name:process.env.CLOUDINARY_CLOUD_NAME, api_key:process.env.CLOUDINARY_API_KEY, api_secret:process.env.CLOUDINARY_API_SECRET }); return cloudinary }
