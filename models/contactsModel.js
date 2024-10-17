import mongoose from "mongoose";
import { Schema } from "mongoose";

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
    index: 1,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = mongoose.model("contact", contactSchema);

export { Contact };
