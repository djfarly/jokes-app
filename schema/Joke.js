import { Schema, model } from "mongoose";

const jokeSchema = new Schema(
  {
    text: { type: String, required: true, minlength: 5 },
  },
  { timestamps: true }
);

export default model("Joke", jokeSchema, "jokes", { overwriteModels: true });
