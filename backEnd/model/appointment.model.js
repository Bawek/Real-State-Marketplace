import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  visitDate: { type: Date, required: true },
  time: { type: String }, // e.g. "10:00 AM"
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  notes: { type: String, trim: true },
  reminderSent: { type: Boolean, default: false },
}, { timestamps: true });

// Aliases for frontend compatibility
appointmentSchema.virtual('date').get(function () { return this.visitDate; });

appointmentSchema.index({ buyerId: 1, status: 1 });
appointmentSchema.index({ propertyId: 1 });
appointmentSchema.index({ visitDate: 1 });

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;
