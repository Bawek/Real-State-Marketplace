const express = require('express');
const router = express.Router();
const {
  createMessage,
  getAllMessages,
  getMessageById,
  updateMessage,
  deleteMessage,
} = require('../controller/message.controller');

router.post('/', createMessage);
router.get('/', getAllMessages);
router.get('/:id', getMessageById);
router.put('/:id', updateMessage);
router.delete('/:id', deleteMessage);

module.exports = router;