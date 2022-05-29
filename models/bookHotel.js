const mongoose = require("mongoose");

const bookHotelSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  checkInDate: {
    type: String,
    required: true,
  },
  checkOutDate: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
});

const BookHotel = new mongoose.model('BookHotel', bookHotelSchema)

module.exports = BookHotel;