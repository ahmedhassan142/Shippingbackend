import mongoose from "mongoose";

const shippingSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  Country: { type: String, required: true },
  Streetaddress: { type: String, required: true },
  Apartment: { type: String, required: false },
  City: { type: String, required: true },
  State_Province: { type: String, required: true },
  Postalcode: { type: String, required: true },
  Phonenumber: { type: String, required: true },
  status: { type: String, default: "Processing" },
  createdAt: { type: Date, default: Date.now }
});

// Better way to handle model definition
export const ShippingModel = mongoose.models.Shipping || mongoose.model("Shipping", shippingSchema);