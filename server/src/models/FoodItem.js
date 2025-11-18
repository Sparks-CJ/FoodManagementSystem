import mongoose from 'mongoose';

const FoodItemSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, default: 0, min: 0 },
  unit: { type: String, default: 'pcs' },
  expiryDate: { type: Date },
  donate: { type: Boolean, default: false },
  notes: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('FoodItem', FoodItemSchema);
