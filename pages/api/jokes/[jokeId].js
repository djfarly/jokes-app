import Joke from "../../../schema/Joke";
import { connectDb } from "../../../utils/db";

export default async function handler(request, response) {
  const { jokeId } = request.query;

  try {
    connectDb();

    switch (request.method) {
      case "GET":
        // get the correct joke
        const joke = await Joke.findById(jokeId);
        if (joke) {
          response.status(200).json(joke);
        } else {
          response.status(404).json({ error: "Not found" });
        }
        break;

      case "PATCH":
        // patch the correct joke
        const updatedJoke = await Joke.findByIdAndUpdate(
          jokeId,
          {
            $set: request.body,
          },
          { returnDocument: "after", runValidators: true }
        );
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
        const deletedJoke = await Joke.findByIdAndDelete(jokeId);
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
        console.log("request method was neither GET, PATCH or DELETE");
        response.status(405).json({ error: "Method not allowed" });
        break;
    }
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: error.message });
  }
}
