import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  type: { type: mongoose.Schema.Types.ObjectId, ref: 'PropertyType', required: true }, // dynamic type
  status: { type: String, enum: ['available', 'sold', 'rented'], default: 'available' },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  location: {
    city: String,
    zone: String,
    address: String
  },
  images: [String]
}, { timestamps: true });

const Property = mongoose.model('Property', propertySchema);
export default Property;
