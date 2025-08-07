"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const shippingSchema = new mongoose_1.default.Schema({
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
exports.ShippingModel = mongoose_1.default.models.Shipping || mongoose_1.default.model("Shipping", shippingSchema);
