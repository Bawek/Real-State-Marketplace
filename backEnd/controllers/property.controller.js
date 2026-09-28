import Property from '../model/property.model.js';

// Create a new property
export const createProperty = async (req, res) => {
  try {
    const property = new Property({ ...req.body, ownerId: req.user?._id || req.body.ownerId });
    await property.save();
    await property.populate('type', 'name');
    res.status(201).json({ message: 'Property created successfully', property });
  } catch (error) {
    console.error('Create property error:', error);
    res.status(500).json({ message: 'Error creating property', error: error.message });
  }
};

// Get all properties with filtering, sorting, and pagination
export const getAllProperties = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      location,
      type,
      minPrice,
      maxPrice,
      bedrooms,
      bathrooms,
      status,
      listingType,
      featured,
      minArea,
      maxArea,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      userId,
    } = req.query;

    const query = {};

    // Location filter
    if (location) {
      query.$or = [
        { 'location.city': { $regex: location, $options: 'i' } },
        { 'location.zone': { $regex: location, $options: 'i' } },
        { 'location.address': { $regex: location, $options: 'i' } },
        { title: { $regex: location, $options: 'i' } },
      ];
    }

    // Type filter (supports ObjectId or string search)
    if (type) {
      query.type = type;
    }

    // Price filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Bedroom filter
    if (bedrooms) {
      query.bedrooms = { $gte: Number(bedrooms) };
    }

    // Bathroom filter
    if (bathrooms) {
      query.bathrooms = { $gte: Number(bathrooms) };
    }

    // Area filter
    if (minArea || maxArea) {
      query.area = {};
      if (minArea) query.area.$gte = Number(minArea);
      if (maxArea) query.area.$lte = Number(maxArea);
    }

    // Status filter
    if (status) query.status = status;

    // Listing type filter
    if (listingType) query.listingType = listingType;

    // Featured filter
    if (featured === 'true') query.featured = true;

    // User-specific properties filter
    if (userId) query.ownerId = userId;

    const sortObj = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

    const skip = (Number(page) - 1) * Number(limit);
    const totalProperties = await Property.countDocuments(query);

    const properties = await Property.find(query)
      .populate('type', 'name')
      .populate('ownerId', 'username email photo')
      .sort(sortObj)
      .skip(skip)
      .limit(Number(limit))
      .lean();

    res.status(200).json({
      properties,
      currentPage: Number(page),
      totalPages: Math.ceil(totalProperties / Number(limit)),
      totalProperties,
    });
  } catch (error) {
    console.error('Get properties error:', error);
    res.status(500).json({ message: 'Error fetching properties', error: error.message });
  }
};

// Get a specific property by ID
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    )
      .populate('type', 'name')
      .populate('ownerId', 'username email photo')
      .lean();

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.status(200).json(property);
  } catch (error) {
    console.error('Get property error:', error);
    res.status(500).json({ message: 'Error fetching property', error: error.message });
  }
};

// Update a property by ID
export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('type', 'name');

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.status(200).json({ message: 'Property updated successfully', property });
  } catch (error) {
    console.error('Update property error:', error);
    res.status(500).json({ message: 'Error updating property', error: error.message });
  }
};

// Delete a property by ID
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Delete property error:', error);
    res.status(500).json({ message: 'Error deleting property', error: error.message });
  }
};

// Get featured properties
export const getFeaturedProperties = async (req, res) => {
  try {
    const { limit = 6 } = req.query;
    const properties = await Property.find({ featured: true, status: 'available' })
      .populate('type', 'name')
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .lean();

    res.status(200).json({ properties });
  } catch (error) {
    console.error('Get featured properties error:', error);
    res.status(500).json({ message: 'Error fetching featured properties' });
  }
};

// Get property stats (for dashboard)
export const getPropertyStats = async (req, res) => {
  try {
    const totalProperties = await Property.countDocuments();
    const availableProperties = await Property.countDocuments({ status: 'available' });
    const soldProperties = await Property.countDocuments({ status: 'sold' });
    const rentedProperties = await Property.countDocuments({ status: 'rented' });

    const avgPrice = await Property.aggregate([
      { $group: { _id: null, avg: { $avg: '$price' } } }
    ]);

    res.status(200).json({
      total: totalProperties,
      available: availableProperties,
      sold: soldProperties,
      rented: rentedProperties,
      avgPrice: avgPrice[0]?.avg || 0,
    });
  } catch (error) {
    console.error('Get property stats error:', error);
    res.status(500).json({ message: 'Error fetching property stats' });
  }
};