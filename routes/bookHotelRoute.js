const express = require("express");
const BookHotel = require("../models/bookHotel");
const router = express.Router();

router.post("/bookingHotel", async (req, res) => {
  try {
    const { name, phone, checkInDate, checkOutDate } =
      req.body;

    // Create 
    await BookHotel.create({
      name,
      phone,
      checkInDate,
      checkOutDate,
    });
    res.status(200).json({ message: "Booked Hotel Successfully" });
  } catch (error) {
    res.status(500).json({ error: " Failed!!" });
  }
});

module.exports = router;
