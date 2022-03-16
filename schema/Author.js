import { Schema, model } from "mongoose";

const authorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  rank: { type: Number, default: 0 },
  age: Number,
});

export default model("Author", authorSchema);
