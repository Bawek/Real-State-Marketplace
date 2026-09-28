import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  price: { type: Number, required: true, min: 0 },
  type: { type: mongoose.Schema.Types.ObjectId, ref: 'PropertyType', required: true },
  status: { 
    type: String, 
    enum: ['available', 'sold', 'rented', 'pending'], 
    default: 'available' 
  },
  listingType: {
    type: String,
    enum: ['sale', 'rent'],
    default: 'sale'
  },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  location: {
    city: { type: String, trim: true },
    zone: { type: String, trim: true },
    address: { type: String, trim: true },
    lat: { type: Number },
    lng: { type: Number },
  },
  images: [String],
  // Property specs
  bedrooms: { type: Number, default: 0, min: 0 },
  bathrooms: { type: Number, default: 0, min: 0 },
  area: { type: Number, default: 0, min: 0 }, // in sqft
  floors: { type: Number, default: 1, min: 1 },
  yearBuilt: { type: Number },
  parkingSpaces: { type: Number, default: 0, min: 0 },
  // Features & amenities
  features: [{ type: String }],
  amenities: [{ type: String }],
  // Stats
  views: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  isFurnished: { type: Boolean, default: false },
  // Agent info
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

// Indexes for search performance
propertySchema.index({ 'location.city': 1 });
propertySchema.index({ price: 1 });
propertySchema.index({ bedrooms: 1 });
propertySchema.index({ status: 1 });
propertySchema.index({ featured: -1, createdAt: -1 });

const Property = mongoose.model('Property', propertySchema);
export default Property;
