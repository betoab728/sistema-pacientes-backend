import mongoose from 'mongoose';

const specialtySchema = new mongoose.Schema({
    specialty: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Specialty = mongoose.model('Specialty', specialtySchema);

export default Specialty;
