import mongoose from "mongoose";

const groupsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  members: [{ type: String }],
});

export default mongoose.model("Groups", groupsSchema);
