import multer from "multer";
// to generate a random file path name that is operating system agnostic
import path from "path";

//create a constant to access the directory path of the temp folder
// the temp folder with hold the images that are uploaded but not yet sent to the server for database persistence
const tempPath = path.join("tmp");

//create a multer config to set the destination and file names of the files being uploaded
//accepts 2 parameters: first is the destination of the file uploaded
//second is the file name creator function which accepts 3 params (req, file, callback function)
const multerConfig = multer.diskStorage({
  destination: tempPath,
  filename: (_req, file, cb) => {
    // this refers to the file naming convention
    //multer package give us an access to this callback function for the filename creator function
    //takes 2 params: first is the error which is set to null by default
    //second is the desired filename for the uploaded file
    cb(null, file.originalname);
  },
});

//declare or create the actual middleware function
const upload = multer({
  storage: multerConfig,
});

export { upload };
