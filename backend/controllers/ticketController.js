const TicketCounter = require("../models/ticketCounterModel.js");
const Ticket = require("../models/Ticket");

const createTicket = async (req, res) => {
  const { subject, description, category, priority } = req.body;

  if (!subject || !category || !description) {
    return res.status(400).json({
      status: false,
      message: "All fields are required",
    });
  }

  try {
    const counter = await TicketCounter.findOneAndUpdate(
      { _id: "ticketId" },
      { $inc: { sequence: 1 } },
      {
        new: true,
        upsert: true,
      },
    );

    const ticketId = `TKT-${counter.sequence}`;

    const ticket = await Ticket.create({
      ticketId,
      createdBy: req.user,
      subject,
      description,
      category,
      priority,
    });
    return res.status(201).json({
      status: true,
      message: "Ticket created successfully",
      ticket,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Ticket generation failed",
    });
  }
};

const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate("createdBy", "name email");

    return res.status(200).json({
      status: true,
      message: "Tickets fetched successfully",
      tickets,
    });
  } catch (error) {
    console.log("Ticket fetching error:", error.message);

    return res.status(400).json({
      status: false,
      message: "Tickets fetching failed",
    });
  }
};

// get ticket by perticuler logged in user
const getMyTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ createdBy: req.user }).populate(
      "createdBy",
      "name email",
    );

    if (tickets.length === 0) {
      return res.status(200).json({
        status: true,
        message: "Tickets Not Found",
        tickets,
      });
    }
    return res.status(200).json({
      status: true,
      message: "Tickets fetched successfully",
      tickets,
    });
  } catch (error) {
    console.log("Ticket fetching error:", error.message);

    return res.status(500).json({
      status: false,
      message: "Tickets fetching failed",
    });
  }
};

const getAticket = async (req, res) => {
  const { id } = req.params;

  try {
    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return res.status(404).json({
        status: false,
        message: "Ticket not found",
      });
    }
    if (
      req.userRole !== "support_admin" &&
      ticket.createdBy.toString() !== req.user
    ) {
      return res.status(403).json({
        status: false,
        message: "Access denied",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Ticket fetched successfully",
      ticket,
    });
  } catch (error) {
    console.log("Ticket fetching error:", error.message);

    return res.status(500).json({
      status: false,
      message: "Ticket fetching failed",
    });
  }
};


   const updateTicket = async (req, res) => {
  const { id } = req.params;
  const { newStatus } = req.body;
  const resolutionNote = req.body.resolutionNote?.trim() || "";

  try {
    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return res.status(404).json({
        status: false,
        message: "Ticket not found",
      });
    }

  
    if (ticket.status === "Resolved") {
      return res.status(409).json({
        status: false,
        message: "Resolved ticket cannot be modified",
      });
    }

    if (newStatus === "Resolved" && !resolutionNote) {
      return res.status(400).json({
        status: false,
        message: "Resolution note is required when resolving a ticket",
      });
    }

    ticket.status = newStatus;
    ticket.resolutionNote = resolutionNote;

    if (newStatus === "Resolved") {
      ticket.resolvedAt = new Date();
    }

    await ticket.save();

    return res.status(200).json({
      status: true,
      message: "Ticket updated",
      updatedTicket: ticket,
    });
  } catch (error) {
    console.log("Ticket updating error:", error.message);

    return res.status(500).json({
      status: false,
      message: "Ticket updating failed",
    });
  }
   }



const deleteTicket = async (req, res) => {
  const { id } = req.params;

  try {
    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return res.status(404).json({
        status: false,
        message: "Ticket not found",
      });
    }

    if (
      req.userRole !== "support_admin" &&
      ticket.createdBy.toString() !== req.user
    ) {
      return res.status(403).json({
        status: false,
        message: "Access denied",
      });
    }

    await Ticket.findByIdAndDelete(id);

    return res.status(200).json({
      status: true,
      message: "Ticket deleted",
    });
  } catch (error) {
    console.log("Ticket deleting error:", error.message);

    return res.status(500).json({
      status: false,
      message: "Ticket deleting failed",
    });
  }
};

module.exports = {
  createTicket,
  getTickets,
  getAticket,
  updateTicket,
  deleteTicket,
  getMyTickets,
};
