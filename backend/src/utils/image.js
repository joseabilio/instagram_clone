const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const resizeImage = async filePath=>{
    const dirName = path.dirname(filePath);
    const fileName = path.basename(filePath);
    await sharp(filePath)
    .resize(500)
    .jpeg({quality:70})
    .toFile(
        path.resolve(dirName, 'resized', fileName)
    );
    fs.unlinkSync(filePath);

    
}

module.exports = resizeImage;