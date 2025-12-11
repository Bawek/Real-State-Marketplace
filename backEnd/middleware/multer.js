import multer from "multer";
import path from "path";

// Configure storage for images (thumbnail) and videos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set destination for image and video uploads
    const uploadPath = file.fieldname === "video" ? "uploads/videos" : "uploads/images"; // Separate folders for videos and images
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Generate a unique filename for each uploaded file
    const ext = path.extname(file.originalname); // Get file extension (e.g., .jpg, .mp4)
    const filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`; // Add a timestamp and random number for uniqueness
    cb(null, filename);
  }
});

// Define file filter to allow only specific file types (video and image)
const fileFilter = (req, file, cb) => {
  const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/avi'];

  if (file.fieldname === 'video') {
    if (!allowedVideoTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid video format. Only MP4, WebM, and AVI are allowed.'), false);
    }
  } else if (file.fieldname === 'img') {
    if (!allowedImageTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid image format. Only JPEG, PNG, and JPG are allowed.'), false);
    }
  }

  cb(null, true); // If the file type is valid, proceed with the upload
};

// Set up multer middleware for handling multiple videos and a single image
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10000000*100}, // 10 MB limit for file size (you can adjust this as needed)
});

export { upload };
