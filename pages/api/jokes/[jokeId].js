import { getSession } from "next-auth/react";
import Joke from "../../../schema/Joke";
import { connectDb } from "../../../utils/db";

export default async function handler(request, response) {
  const { jokeId } = request.query;

  try {
    connectDb();

    const session = await getSession({ req: request });

    switch (request.method) {
      case "PATCH":
        // patch the correct joke
        const updatedJoke = await Joke.findByIdAndUpdate(
          jokeId,
          {
            $set: request.body,
          },
          { returnDocument: "after", runValidators: true }
        ).where({ userId: session.user.id });

        if (updatedJoke) {
          response.status(200).json({
            success: true,
            data: updatedJoke,
          });
        } else {
          response.status(404).json({ error: "Not found" });
        }

        break;

      case "DELETE":
        const deletedJoke = await Joke.findByIdAndDelete(jokeId).where({
          userId: session.user.id,
        });

        if (deletedJoke) {
          response.status(200).json({
            success: true,
            data: deletedJoke,
          });
        } else {
          response.status(404).json({ error: "Not found" });
        }
        break;

      default:
        console.log("request method was neither PATCH or DELETE");
        response.status(405).json({ error: "Method not allowed" });
        break;
    }
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: error.message });
  }
}
