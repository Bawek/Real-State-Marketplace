import Appointment from '../model/appointment.model.js';

// Create a new appointment
export const createAppointment = async (req, res) => {
  try {
    const appointment = new Appointment({
      ...req.body,
      buyerId: req.user?._id || req.body.buyerId,
    });
    await appointment.save();
    await appointment.populate([
      { path: 'propertyId', select: 'title location price images' },
      { path: 'agentId', select: 'username email' },
    ]);
    res.status(201).json({ message: 'Appointment created successfully', appointment });
  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({ message: 'Error creating appointment', error: error.message });
  }
};

// Get all appointments (optionally filtered by user)
export const getAllAppointments = async (req, res) => {
  try {
    const { buyerId, agentId, status, page = 1, limit = 20 } = req.query;
    const query = {};
    if (buyerId) query.buyerId = buyerId;
    if (agentId) query.agentId = agentId;
    if (status) query.status = status;

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Appointment.countDocuments(query);
    const appointments = await Appointment.find(query)
      .populate('propertyId', 'title location price images')
      .populate('agentId', 'username email photo')
      .populate('buyerId', 'username email')
      .sort({ visitDate: 1 })
      .skip(skip)
      .limit(Number(limit))
      .lean();

    res.status(200).json({ appointments, total, page: Number(page) });
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({ message: 'Error fetching appointments', error: error.message });
  }
};

// Get appointments for a specific user (buyer)
export const getUserAppointments = async (req, res) => {
  try {
    const { userId } = req.params;
    const appointments = await Appointment.find({ buyerId: userId })
      .populate('propertyId', 'title location price images')
      .populate('agentId', 'username email photo')
      .sort({ visitDate: 1 })
      .lean();

    res.status(200).json({ appointments });
  } catch (error) {
    console.error('Get user appointments error:', error);
    res.status(500).json({ message: 'Error fetching user appointments', error: error.message });
  }
};

// Get a specific appointment by ID
export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('propertyId', 'title location price images')
      .populate('agentId', 'username email photo')
      .populate('buyerId', 'username email');

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json(appointment);
  } catch (error) {
    console.error('Get appointment error:', error);
    res.status(500).json({ message: 'Error fetching appointment', error: error.message });
  }
};

// Update appointment (status, notes, time)
export const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('propertyId', 'title location').populate('agentId', 'username');

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json({ message: 'Appointment updated successfully', appointment });
  } catch (error) {
    console.error('Update appointment error:', error);
    res.status(500).json({ message: 'Error updating appointment', error: error.message });
  }
};

// Delete appointment
export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Delete appointment error:', error);
    res.status(500).json({ message: 'Error deleting appointment', error: error.message });
  }
};

// Confirm or cancel appointment
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.status(200).json({ message: `Appointment ${status}`, appointment });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ message: 'Error updating appointment status', error: error.message });
  }
};