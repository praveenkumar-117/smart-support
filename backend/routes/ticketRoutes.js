const express = require("express");
const router = express.Router();
const {
  createTicket,
  getTickets,
  getAticket,
  updateTicket,
  deleteTicket,
  getMyTickets,
} = require("../controllers/ticketController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post("/createticket", authMiddleware, createTicket);

router.get(
  "/tickets",
  authMiddleware,
  roleMiddleware("support_admin"),
  getTickets,
);

router.get("/getmytickets", authMiddleware, getMyTickets);

router.get("/:id", authMiddleware, getAticket);

// Only admins can change ticket status / resolution note
router.patch(
  "/updateticket/:id",
  authMiddleware,
  roleMiddleware("support_admin"),
  updateTicket,
);

// Only admins can delete tickets
router.delete(
  "/deleteticket/:id",
  authMiddleware,
  roleMiddleware("support_admin"),
  deleteTicket,
);

module.exports = router;