"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shipping_1 = require("../model/shipping");
const express = require('express');
const mongoose_1 = __importDefault(require("mongoose"));
const router = express.Router();
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { fullname, Country, Streetaddress, Apartment, City, State_Province, Postalcode, Phonenumber } = req.body;
        const shipping = yield shipping_1.ShippingModel.findOne({ _id: id });
        if (!shipping) {
            return res.status(404).json({ error: "Shipping address not found" });
        }
        if (fullname)
            shipping.fullname = fullname;
        if (Country)
            shipping.Country = Country;
        if (Streetaddress)
            shipping.Streetaddress = Streetaddress;
        if (Apartment)
            shipping.Apartment = Apartment;
        if (City)
            shipping.City = City;
        if (State_Province)
            shipping.State_Province = State_Province;
        if (Postalcode)
            shipping.Postalcode = Postalcode;
        if (Phonenumber)
            shipping.Phonenumber = Phonenumber;
        yield shipping.save();
        res.json(shipping);
    }
    catch (err) {
        console.error('Update shipping error:', err);
        res.status(500).json({ error: "Server error" });
    }
}));
router.post('/post', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullname, Country, Streetaddress, Postalcode, State_Province, City, Phonenumber } = req.body;
        if (!fullname || !Country || !Streetaddress || !Postalcode || !State_Province || !City || !Phonenumber) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const shipping = new shipping_1.ShippingModel({
            fullname,
            Country,
            Streetaddress,
            Postalcode,
            State_Province,
            City,
            Phonenumber
        });
        yield shipping.save();
        return res.status(201).json(shipping);
    }
    catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
}));
router.get('/find/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate the ID format first
        if (!mongoose_1.default.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid shipping ID format" });
        }
        const shipping = yield shipping_1.ShippingModel.findById(req.params.id);
        if (!shipping) {
            return res.status(404).json({ message: "Shipping not found" });
        }
        return res.status(200).json(shipping);
    }
    catch (error) {
        console.error("Shipping lookup error:", error);
        return res.status(500).json({ message: "Server error" });
    }
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category, search } = req.query;
        const query = {};
        if (category)
            query.category = category;
        if (search)
            query.$text = { $search: search };
        const ships = yield shipping_1.ShippingModel.find(query);
        return res.json({
            success: true,
            data: ships
        });
    }
    catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch products'
        });
    }
}));
exports.default = router;
