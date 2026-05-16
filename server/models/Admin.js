import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  email: String,
  password: String,
});

export default mongoose.model("Admin", AdminSchema);