import { getSession } from "next-auth/react";
import Joke from "../../../schema/Joke";
import { connectDb } from "../../../utils/db";

export default async function handler(request, response) {
  try {
    connectDb();

    const session = await getSession({ req: request });

    switch (request.method) {
      case "GET":
        if (session) {
          const jokes = await Joke.find()
            .sort({ createdAt: -1 })
            .limit(100)
            .where({ userId: session.user.id })
            .populate("userId");
          response.status(200).json(jokes);
        } else {
          response.status(401).json({ error: "Not authenticated" });
        }
        break;

      case "POST":
        if (session) {
          const createdJoke = await Joke.create({
            ...request.body,
            userId: session.user.id,
          });
          response.status(200).json({ success: true, data: createdJoke });
        } else {
          response.status(401).json({ error: "Not authenticated" });
        }
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
