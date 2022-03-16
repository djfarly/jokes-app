import Joke from "../../../schema/Joke";
import { connectDb } from "../../../utils/db";

export default async function handler(request, response) {
  try {
    connectDb();

    switch (request.method) {
      case "GET":
        const jokes = await Joke.find().limit(100);
        response.status(200).json(jokes);
        break;

      case "POST":
        const createdJoke = await Joke.create(request.body);
        response.status(200).json({ success: true, data: createdJoke });
        break;

      default:
        console.log("request method was neither GET or POST");
        response.status(405).json({ error: "Method not allowed" });
        break;
    }
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: error.message });
  }
}
