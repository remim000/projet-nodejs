import multer from 'multer';

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png'
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "images");
    },
    filename: (req, file, callback) => {
        callback(null, `${file.originalname.split(' ').join('_')}${Date.now()}.${MIME_TYPES[file.mimetype]}`);
    }
})

export default multer({storage}).single('images');
