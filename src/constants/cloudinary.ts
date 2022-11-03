const CLOUDINARY_BASE_FOLDER = 'instagram-clone';

export const CLOUDINARY = {
  NAME: process.env.CLOUDINARY_CLOUD_NAME,
  API_KEY: process.env.CLOUDINARY_API_KEY,
  SECRET: process.env.CLOUDINARY_SECRET,
};

export const CLOUDINARY_FOLDERS = {
  POSTS: CLOUDINARY_BASE_FOLDER + '/posts',
  AVATARS: CLOUDINARY_BASE_FOLDER + '/avatars',
};
