import { CLOUDINARY_FOLDERS } from '~/constants';
import cloudinary from '~/configs/cloudinary';

type CloudinaryHandler = (params?: { folder: 'avatars' | 'posts' | null }) => {
  uploadPhoto: (newPhoto: string) => Promise<string>;
  updatePhoto: (newPhoto: string, oldPhotoUrl: string) => Promise<string>;
  deletePhoto: (oldPhotoUrl: string) => Promise<void>;
};

const cloudinaryHandler: CloudinaryHandler = ({ folder } = { folder: null }) => {
  const selectedFolder =
    folder === 'avatars' ? CLOUDINARY_FOLDERS.AVATARS : CLOUDINARY_FOLDERS.POSTS;

  const getPhotoIdFromUrl = (photoUrl: string): string | undefined => {
    const regex = new RegExp(selectedFolder + '/(?:vd+/)?([^.]+)');

    return photoUrl.match(regex)?.[0];
  };

  const uploadPhoto = async (newPhoto: string): Promise<string> => {
    const { secure_url: photo } = await cloudinary.uploader.upload(newPhoto, {
      folder: selectedFolder,
    });

    return photo;
  };

  const updatePhoto = async (newPhoto: string, oldPhotoUrl: string): Promise<string> => {
    const photoId = getPhotoIdFromUrl(oldPhotoUrl);

    const { secure_url: photo } = await cloudinary.uploader.upload(newPhoto, {
      public_id: photoId,
      overwrite: true,
      invalidate: true,
    });

    return photo;
  };

  const deletePhoto = async (oldPhotoUrl: string): Promise<void> => {
    const photoId = getPhotoIdFromUrl(oldPhotoUrl);

    if (photoId == null) return;

    await cloudinary.uploader.destroy(photoId);
  };

  return { uploadPhoto, updatePhoto, deletePhoto };
};

export default cloudinaryHandler;
