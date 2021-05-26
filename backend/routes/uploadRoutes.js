// nodes path module gives access to extname - a files extension
import path from 'path';
import express from 'express';
// Middleware to handle upload of files through forms
import multer from 'multer';
import { admin, protect } from '../middleware/authMiddleware.js';
const router = express.Router();

// Should create methods to check for file duplicates and delete on update

// Get Date
let dateNow;
const getDate = () => {
	const [date, month, year] = new Date().toLocaleDateString('en-UK').split('/');
	dateNow = date + month + year;
};
getDate();

// Initialise multer storage engine
const storage = multer.diskStorage({
	// request, file, callback
	destination(req, file, cb) {
		// error, destination
		cb(null, 'uploads/');
	},
	filename(req, file, cb) {
		// error, destination - composed of 'fieldname' from the form, 'date' and 'extname' from node path module
		// (could be jpg or other file extension)
		cb(null, `${file.originalname.split('.')[0]}${dateNow}${path.extname(file.originalname)}`);
	},
});

// Original storage callback
// cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);

function checkFileType(file, cb) {
	// Options wrapped in slashes
	const filetypes = /jpg|jpeg|png/;
	// test returns boolean tested against filetypes variable
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	// mime type is the 'Content-Type' field in the request header, this double check the correct file type is being uploaded
	const mimetype = filetypes.test(file.mimetype);

	// Return callback, true if checks passed else error
	if (extname && mimetype) {
		return cb(null, true);
	} else {
		cb(new Error('Images only (.jpg .jpeg .png)'));
	}
}

// This will be passed in as the middleware for the route
const upload = multer({
	storage,
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb);
	},
});

const errorHandler = (err, req, res, next) => {
	//error handler gets called only when catches error
	if (err || err instanceof multer.MulterError) {
		res.status(400);
		throw new Error(`Upload failed - ${err.response && err.response.data.message ? err.response.data.message : err.message}`);
	}
	//redirect to custom error handler
	next(err);
};

// Can upload multiple files, here it's a single image. File named image needs to be specified in front end
router.post('/', protect, admin, upload.single('image'), errorHandler, (req, res) => {
	if (!req.file) {
		res.status(400);
		throw new Error('Please select file');
	}

	// Returns the file path and replaces '\' with '/' because windows supoorts '\' as directory separator
	res.send(`/${req.file.path.replace('\\', '/')}`);
});

export default router;
