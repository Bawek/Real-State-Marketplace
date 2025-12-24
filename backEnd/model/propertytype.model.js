import { Mongoose } from "mongoose";    
const propertyTypeSchema = new Mongoose.Schema({
  name: {
    type: String,
    unique: true},timeStamps: true,})