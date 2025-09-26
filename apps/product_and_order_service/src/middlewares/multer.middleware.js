import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
        const timestamp = Date.now(); // current date in ms
        const uniqueName = `${timestamp}-${file.originalname}`; //for the unique name
        cb(null, uniqueName)

        // cb(null, file.originalname)
    }
})

export const upload = multer({
    storage,
})