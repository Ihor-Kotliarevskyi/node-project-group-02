import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const destroyImage = async (publicId) => {
  if (!publicId) return null;
  try {
    return await cloudinary.uploader.destroy(publicId, {
      invalidate: true,
      resource_type: 'image',
    });
  } catch (error) {
    console.error(
      `[cloudinary] failed to destroy "${publicId}": ${error.message}`,
    );
    return null;
  }
};

export { cloudinary };
