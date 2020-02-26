const Hashtag = require('../models/Hashtag');

const GetHashTag = (hashTag)=>{
    var auxObj = await Hashtag.findOne({hashTag});
    if(!auxObj){
        auxObj = new Hashtag({hashTag});
        auxObj.save();
    }
    return auxObj;
}

module.exports = {GetHashTag};