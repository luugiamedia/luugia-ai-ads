import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req) {

  try {

    const body = await req.json();

    const { prompt } = body;

    const output = await replicate.run(
      "black-forest-labs/flux-schnell",
      {
        input: {
          prompt: prompt,
        },
      }
    );

    return Response.json({
      image: output[0],
    });

  } catch (error) {

    return Response.json({
      error: error.message,
    });
  }
}