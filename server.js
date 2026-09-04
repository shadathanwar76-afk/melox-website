const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Uploads folder
const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
filename: function (req, file, cb) {
    const safeName =
        Date.now() + "-" + file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");

    cb(null, safeName);
}
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 50 * 1024 * 1024
    }
});

// Upload file
app.post("/upload", upload.single("file"), (req, res) => {

    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "No file uploaded"
        });
    }

    res.json({
        success: true,
        message: "File uploaded successfully",
        filename: req.file.filename
    });
});

// List uploaded files
app.get("/files", (req, res) => {

    fs.readdir(uploadDir, (err, files) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Could not read files"
            });
        }

        res.json({
            success: true,
            files: files
        });
    });
});

// Download/view file
app.get("/files/:filename", (req, res) => {

    const filename = path.basename(req.params.filename);
    const filePath = path.join(uploadDir, filename);

    if (!fs.existsSync(filePath)) {
        return res.status(404).send("File not found");
    }

    res.sendFile(filePath);
});

// Home
app.get("/", (req, res) => {
    res.send("MELOX Backend is Running 🚀");
});

app.listen(PORT, () => {
    console.log(`MELOX Backend running on port ${PORT}`);
});
