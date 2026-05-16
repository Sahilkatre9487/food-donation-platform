import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

import Restaurant from "../models/Restaurant.js";
import Volunteer from "../models/Volunteer.js";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// register restaurant
router.post("/register/restaurant", upload.single("image"), async (req, res) => {
  try {
    const { restaurantName, ownerName, contact, email, password, confirmPassword, foodType, time, latitude, longitude, address } = req.body;
    if (!restaurantName || !ownerName || !contact || !email || !password) return res.status(400).json({ message: "Missing required fields" });
    if (password !== confirmPassword) return res.status(400).json({ message: "Passwords must match" });

    const existing = await Restaurant.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already in use" });

    const hashed = await bcrypt.hash(password, 10);
    const rest = new Restaurant({
      restaurantName, ownerName, contact, email,
      password: hashed,
      foodType, availabilityTime: time,
      location: {
        lat: latitude ? parseFloat(latitude) : undefined,
        lng: longitude ? parseFloat(longitude) : undefined,
        address: address || ""
      },
      imagePath: req.file ? `/uploads/${req.file.filename}` : undefined
    });
    await rest.save();
    res.json({ message: "Registered", id: rest._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// register volunteer
router.post("/register/volunteer", upload.fields([{ name: "registrationDoc", maxCount: 1 }, { name: "logo", maxCount: 1 }]), async (req, res) => {
  try {
    const { ngoName, representativeName, contact, email, password, confirmPassword, volunteersCount, latitude, longitude, address } = req.body;
    if (!ngoName || !representativeName || !contact || !email || !password) return res.status(400).json({ message: "Missing required fields" });
    if (password !== confirmPassword) return res.status(400).json({ message: "Passwords must match" });

    const existing = await Volunteer.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already in use" });

    const hashed = await bcrypt.hash(password, 10);
    const regFile = req.files && req.files.registrationDoc && req.files.registrationDoc[0];
    const logoFile = req.files && req.files.logo && req.files.logo[0];

    const vol = new Volunteer({
      ngoName, representativeName, contact, email, password: hashed,
      volunteersCount: volunteersCount ? parseInt(volunteersCount) : undefined,
      location: {
        lat: latitude ? parseFloat(latitude) : undefined,
        lng: longitude ? parseFloat(longitude) : undefined,
        address: address || ""
      },
      registrationIdPath: regFile ? `/uploads/${regFile.filename}` : undefined,
      logoPath: logoFile ? `/uploads/${logoFile.filename}` : undefined
    });
    await vol.save();
    res.json({ message: "Registered", id: vol._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "Missing fields" });
    }

    let user;
    if (role === "restaurant") user = await Restaurant.findOne({ email });
    else user = await Volunteer.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Logged in",
      token,
      user: {
        id: user._id,
        name: role === "restaurant" ? user.restaurantName : user.ngoName,
        email: user.email,
        role,
        imagePath: role === "restaurant" ? user.imagePath : user.logoPath
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// get restaurant by id
router.get("/restaurant/:id", async (req, res) => {

  try {

    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found"
      });
    }

    res.json(restaurant);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server error"
    });

  }

});


// get volunteer by id
router.get("/volunteer/:id", async (req, res) => {

  try {

    const volunteer = await Volunteer.findById(req.params.id);

    if (!volunteer) {
      return res.status(404).json({
        message: "Volunteer not found"
      });
    }

    res.json(volunteer);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server error"
    });

  }

});

export default router;
