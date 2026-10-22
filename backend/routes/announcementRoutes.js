const express = require("express");
const router = express.Router();

const {
  createAnnouncement,
  getAnnouncements,
  updateAnnouncement,
  deactivateAnnouncement,
  publishAnnouncement
} = require("../controllers/announcementController");
const roleMiddleware = require("../middleware/roleMiddleware");

const authMiddleware = require("../middleware/authMiddleware");

// Get active announcements (authenticated users)
router.get("/", authMiddleware, getAnnouncements);

// Create announcement (admin only)
router.post(
  "/",
  authMiddleware,
  roleMiddleware("support_admin"),
  createAnnouncement
);

// Update announcement (admin only)
router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware("support_admin"),
  updateAnnouncement
);

// Publish draft announcement (admin only)
router.patch(
  "/:id/publish",
  authMiddleware,
  roleMiddleware("support_admin"),
  publishAnnouncement
);
// Deactivate announcement (admin only)
router.patch(
  "/:id/deactivate",
  authMiddleware,
  roleMiddleware("support_admin"),
  deactivateAnnouncement
);

module.exports = router;
