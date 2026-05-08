import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req) {

  try {

    const body = await req.json();

    const { prompt } = body;

    const output = await replicate.run(
      "wavespeedai/wan-2.1-i2v-480p",
      {
        input: {
          prompt: prompt,
        },
      }
    );

    return Response.json({
      video: output,
    });

  } catch (error) {

    return Response.json({
      error: error.message,
    });
  }
}