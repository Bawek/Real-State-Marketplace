const express = require('express');
const router = express.Router();
const {
  createPropertyType,
  getAllPropertyTypes,
  getPropertyTypeById,
  updatePropertyType,
  deletePropertyType,
} = require('../controller/propertytype.controller');

router.post('/', createPropertyType);
router.get('/', getAllPropertyTypes);
router.get('/:id', getPropertyTypeById);
router.put('/:id', updatePropertyType);
router.delete('/:id', deletePropertyType);

module.exports = router;