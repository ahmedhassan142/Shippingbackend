import { ShippingModel } from "../model/shipping";
const express = require('express');
import {Response, Request} from 'express';
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const router = express.Router();


interface JwtPayload {
  _id: string;
}

router.put("/:id",async (req: Request, res: Response) => {
 

  try {
    
    const { id } = req.params;
    const { 
      fullname, 
      Country, 
      Streetaddress, 
      Apartment, 
      City, 
      State_Province, 
      Postalcode, 
      Phonenumber 
    } = req.body;

    const shipping = await ShippingModel.findOne({ _id: id });
    if (!shipping) {
      return res.status(404).json({ error: "Shipping address not found" });
    }

    if (fullname) shipping.fullname = fullname;
    if (Country) shipping.Country = Country;
    if (Streetaddress) shipping.Streetaddress = Streetaddress;
    if (Apartment) shipping.Apartment = Apartment;
    if (City) shipping.City = City;
    if (State_Province) shipping.State_Province = State_Province;
    if (Postalcode) shipping.Postalcode = Postalcode;
    if (Phonenumber) shipping.Phonenumber = Phonenumber;

    await shipping.save();
    res.json(shipping);
  } catch (err) {
    console.error('Update shipping error:', err);
    res.status(500).json({ error: "Server error" });
  }
}) 

router.post('/post', async (req: Request, res: Response) => {
    try {
        const {fullname, Country, Streetaddress, Postalcode, State_Province, City, Phonenumber} = req.body;
        
        if(!fullname || !Country || !Streetaddress || !Postalcode || !State_Province || !City || !Phonenumber){
            return res.status(400).json({message: "All fields are required"});
        }

        const shipping = new ShippingModel({
            fullname, 
            Country, 
            Streetaddress, 
            Postalcode, 
            State_Province, 
            City, 
            Phonenumber
        });

        await shipping.save();
        return res.status(201).json(shipping);
    } catch (error) {
        return res.status(500).json({message: "Server error"});
    }
});

router.get('/find/:id', async (req: Request, res: Response) => {
  try {
    // Validate the ID format first
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid shipping ID format" });
    }

    const shipping = await ShippingModel.findById(req.params.id);
    
    if (!shipping) {
      return res.status(404).json({ message: "Shipping not found" });
    }
    
    return res.status(200).json(shipping);
  } catch (error) {
    console.error("Shipping lookup error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});
router.get('/', async (req: Request, res: Response) => {
  try {
    const { category, search } = req.query;

    const query: any = {};
    
    if (category) query.category = category;
    if (search) query.$text = { $search: search as string };

    const ships = await ShippingModel.find(query);

    return res.json({
      success: true,
      data: ships
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch products'
    });
  }
});
export default router;