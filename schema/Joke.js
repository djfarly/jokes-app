import { Schema, model } from "mongoose";
import "./User";

const jokeSchema = new Schema(
  {
    text: { type: String, required: true, minlength: 5 },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default model("Joke", jokeSchema, "jokes", { overwriteModels: true });
