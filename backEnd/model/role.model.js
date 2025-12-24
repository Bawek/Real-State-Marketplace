import { models } from "mongoose";
import { mongoose } from "mongoose ";
const roleSchema = new mongoose.Schema({
  name: {
    type: String,

    required: true,
    unique: true,
  },
  prevalage:{
    type: [String],
    required: true,
    default: ["Create user","Delete user","view Dashbord"]
  },
timeStamps: true,})
models.Role || mongoose.model("Role", roleSchema);
export const roleModel = models.Role || mongoose.model("Role", roleSchema);