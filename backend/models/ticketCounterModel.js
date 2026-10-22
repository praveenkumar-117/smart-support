const mongoose = require("mongoose");

const ticketCounterSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  sequence: {
    type: Number,
    default: 1000,
  },
});

const TicketCounter = mongoose.model(
  "TicketCounter",
  ticketCounterSchema
);

module.exports = TicketCounter;