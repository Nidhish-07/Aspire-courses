import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    organizationId:{
      type:String,required:true
    },
    title: {
      type: String,
      required: true,
    },

    category: {
      type: [String],
      required: true,
    },
    mode: {
      type: String,
      required: true,
    },
    tutor: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    desc: { type: String, required: true },
    startDate: {
      type: String,
      required: true,
    },
    enrollmentDeadline: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
