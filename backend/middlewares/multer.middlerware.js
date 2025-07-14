import {multer} from "multer"

const storage = multer.diskStorage({
    fileName: function(req,file,cb){
        cb(null,file.orignalname);
    }
})

const upload = multer({storage : storage});

export default upload