import { jokes } from "../../../utils/jokes";

export default function handler(request, response) {
  if (request.method === "GET") {
    response.status(200).json(jokes);
  } else if (request.method === "POST") {
    console.log(request.body);
    response.status(200).json({
      success: true,
      insertedId: "randomly-generated-id",
    });
  }
}
