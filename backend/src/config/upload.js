const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {
    storage: new multer.diskStorage({
        destination:path.resolve(__dirname, '..', '..', 'uploads'),
        filename:(req, file, cb)=>{
            const [,...ext] = file.originalname.split('.');
            const name = crypto.randomBytes(16).toString("hex");
            const newFileName = `${name}.${ext[0]}`;
            cb(null,newFileName);
        }
    }),
}
