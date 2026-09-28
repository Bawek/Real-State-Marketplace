import express from 'express';
import {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  getFeaturedProperties,
  getPropertyStats,
} from '../controllers/property.controller.js';

const router = express.Router();

// Stats & featured (must come before /:id)
router.get('/stats', getPropertyStats);
router.get('/featured', getFeaturedProperties);

// CRUD routes
router.get('/', getAllProperties);
router.get('/:id', getPropertyById);
router.post('/', createProperty);
router.put('/:id', updateProperty);
router.delete('/:id', deleteProperty);

export default router;