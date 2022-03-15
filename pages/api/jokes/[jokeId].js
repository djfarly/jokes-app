import { jokes } from "../../../utils/jokes";

export default function handler(request, response) {
  const { jokeId } = request.query;

  switch (request.method) {
    case "GET":
      // get the correct joke
      const joke = jokes.find((joke) => joke.id === jokeId);
      response.status(200).json(joke);
      break;

    case "PATCH":
      // patch the correct joke
      console.log(request.body);
      response.status(200).json({
        success: true,
        updatedId: jokeId,
      });
      break;

    case "DELETE":
      // delete the correct joke
      response.status(200).json({
        success: true,
        deletedId: jokeId,
      });
      break;

    default:
      console.log("request method was neither GET, PATCH or DELETE");
      break;
  }
}
