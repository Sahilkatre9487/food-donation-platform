import express from "express";
import Admin from "../models/Admin.js";
import Restaurant from "../models/Restaurant.js";
import Volunteer from "../models/Volunteer.js";
import Food from "../models/Food.js";

const router = express.Router();


// ADMIN LOGIN
router.post("/login", async (req, res) => {

  const { email, password } = req.body;

  try {

    const admin = await Admin.findOne({ email, password });

    if (!admin) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    res.json({
      message: "Login successful",
      admin,
    });

  } catch (err) {

    res.status(500).json({
      message: "Server error",
    });

  }

});


// GET ALL RESTAURANTS
router.get("/restaurants", async (req, res) => {

  try {

    const restaurants = await Restaurant.find();

    res.json(restaurants);

  } catch (err) {

    res.status(500).json({
      message: "Error fetching restaurants",
    });

  }

});


// GET ALL VOLUNTEERS
router.get("/volunteers", async (req, res) => {

  try {

    const volunteers = await Volunteer.find();

    res.json(volunteers);

  } catch (err) {

    res.status(500).json({
      message: "Error fetching volunteers",
    });

  }

});


// GET ALL DONATIONS
router.get("/donations", async (req, res) => {

  try {

    const donations = await Food.find();

    res.json(donations);

  } catch (err) {

    res.status(500).json({
      message: "Error fetching donations",
    });

  }

});


// DELETE DONATION
router.delete("/donation/:id", async (req, res) => {

  try {

    await Food.findByIdAndDelete(req.params.id);

    res.json({
      message: "Donation deleted",
    });

  } catch (err) {

    res.status(500).json({
      message: "Error deleting donation",
    });

  }

});

export default router;