import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const ensureCloudinaryConfigured = () => {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    throw new Error('Cloudinary credentials are not configured');
  }
};

const normalizePublicId = (filename) => {
  if (!filename) return `lion-spices/${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const safeName = filename.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_');
  return `lion-spices/${Date.now()}-${safeName}`;
};

export const uploadImage = async (buffer, filename, publicId) => {
  ensureCloudinaryConfigured();

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'lion-spices',
        public_id: publicId || normalizePublicId(filename),
        resource_type: 'image',
        quality: 'auto',
        fetch_format: 'auto',
        overwrite: true,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    stream.end(buffer);
  });
};

export const deleteImage = async (publicId) => {
  ensureCloudinaryConfigured();
  if (!publicId) return null;
  return cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
};

export const extractCloudinaryImageObject = (image) => {
  if (!image) return null;
  if (typeof image === 'object') {
    if (image.secure_url && image.public_id) return image;
    if (image.secure_url) return { secure_url: image.secure_url, public_id: image.public_id || '' };
    return null;
  }
  if (typeof image !== 'string') return null;
  const regex = /\/upload\/(?:v[0-9]+\/)?(.+)\.(?:jpg|jpeg|png|webp|gif|svg|avif|heic|heif|tiff|bmp)(?:$|[?\/])/i;
  const match = image.match(regex);
  const public_id = match ? decodeURIComponent(match[1]) : '';
  return { secure_url: image, public_id };
};

export const isCloudinaryUrl = (url) => typeof url === 'string' && url.includes('res.cloudinary.com');

