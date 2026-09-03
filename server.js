const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const uniqueName =
            Date.now() + "-" + file.originalname;

        cb(null, uniqueName);
    }
});

const upload = multer({ storage: storage });

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

app.get("/", (req, res) => {
    res.send("MELOX Backend is Running 🚀");
});

app.listen(PORT, () => {
    console.log(`MELOX Backend running on http://localhost:${PORT}`);
});