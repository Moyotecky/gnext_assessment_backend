// config/multer.config.ts
import multer, { Multer } from 'multer';
import Params, { CloudinaryStorage} from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.config';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
      folder: 'uploads',
      allowedFormats: ['jpg', 'jpeg', 'png', 'pdf', 'webp', 'docx', 'zip'],
  } as unknown as typeof Params, // Use the extended interface
});

const upload: Multer = multer({ storage });

export default upload;
