const Announcement = require("../models/Annoucements");

// Create Announcement (Admin)

const createAnnouncement = async (req, res) => {
  try {
    const { title, message, type, publishType } = req.body;

    if (!title?.trim() || !message?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title and message are required",
      });
    }

    const isDraft = publishType === "draft";
    const announcement = await Announcement.create({
      title: title.trim(),
      message: message.trim(),
      type,
      publishType: isDraft ? "draft" : "now",
      publishedAt: isDraft ? null : new Date(),
      isActive: !isDraft,
      createdBy: req.user,
    });

    return res.status(201).json({
      success: true,
      message: isDraft
        ? "Announcement saved as draft"
        : "Announcement published successfully",
      announcement,
    });
  } catch (error) {
    console.error("Create Announcement Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Active Announcements (Admin and User)
const getAnnouncements = async (req, res) => {
  try {
    const isAdmin = req.userRole === "support_admin";

    const filter = isAdmin
      ? {}
      : {
          isActive: true,
        };

    const totalDocuments = await Announcement.countDocuments({});

    const announcements = await Announcement.find(filter)
      .populate("createdBy", "name role")
      .sort({ publishedAt: -1 });

    return res.status(200).json({
      success: true,
      count: announcements.length,
      announcements,
    });
  } catch (error) {
    console.error("Get Announcements Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Announcement (Admin)

const updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, message, type } = req.body;

    const announcement = await Announcement.findById(id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found",
      });
    }

    if (title !== undefined) {
      if (!title.trim()) {
        return res.status(400).json({
          success: false,
          message: "Title cannot be empty",
        });
      }

      announcement.title = title.trim();
    }

    if (message !== undefined) {
      if (!message.trim()) {
        return res.status(400).json({
          success: false,
          message: "Message cannot be empty",
        });
      }

      announcement.message = message.trim();
    }

    if (type !== undefined) {
      announcement.type = type;
    }

    await announcement.save();

    return res.status(200).json({
      success: true,
      message: "Announcement updated successfully",
      announcement,
    });
  } catch (error) {
    console.error("Update Announcement Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const publishAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found",
      });
    }

    if (announcement.publishType !== "draft") {
      return res.status(400).json({
        success: false,
        message: "Only draft announcements can be published",
      });
    }

    announcement.publishType = "now";
    announcement.publishedAt = new Date();
    announcement.isActive = true;

    await announcement.save();

    return res.status(200).json({
      success: true,
      message: "Announcement published successfully",
      announcement,
    });
  } catch (error) {
    console.error("Publish Announcement Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Deactivate Announcement (Admin)
const deactivateAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { returnDocument: "after" },
    );

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Announcement deactivated successfully",
      announcement,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createAnnouncement,
  getAnnouncements,
  updateAnnouncement,
  deactivateAnnouncement,
  publishAnnouncement,
};
