import createError from "../middleware/create.error.js";
import Message from "../model/message.model.js";

// Create a new message
export async function createMessage(req, res, next) {
  try {
    const message = new Message(req.body);
    await message.save();
    return next(createError(201, 'Message created successfully'));
  } catch (error) {
    next(error);
  }
}

// Get all messages
export async function getAllMessages(req, res) {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
}

// Get a specific message by ID
export async function getMessageById(req, res) {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
}

// Update a message by ID
export async function updateMessage(req, res) {
  try {
    const message = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!message) {
      return next(createError(404, 'Message not found'));
    }
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
}

// Delete a message by ID
export async function deleteMessage(req, res) {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return next(createError(404, 'Message not found'));
    }
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    next(error);
  }
}