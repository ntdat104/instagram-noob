import cloudinary from 'cloudinary';

import { CLOUDINARY } from '~/constants';

const cloudinaryConfig = cloudinary.v2;

cloudinaryConfig.config({
  cloud_name: CLOUDINARY.NAME,
  api_key: CLOUDINARY.API_KEY,
  api_secret: CLOUDINARY.SECRET,
});

export default cloudinaryConfig;
