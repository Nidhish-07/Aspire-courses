import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    address: {
      type: String,
      required: true,
    },
    about: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Organization", organizationSchema);
