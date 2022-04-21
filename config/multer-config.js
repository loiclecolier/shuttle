import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
  };
  
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images/products');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, uuidv4() + Date.now() + '.' + extension);
    }
});
  
export default multer({storage: storage}).single('image');