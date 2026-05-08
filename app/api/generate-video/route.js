import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req) {

  try {

    const body = await req.json();

    const output = await replicate.run(
      "wavespeedai/wan-2.1-i2v-480p",
      {
        input: {
          prompt: `
cinematic commercial video,
luxury advertising,
ultra realistic,
smooth camera movement,
${body.prompt}
          `,
          num_frames: 81,
        },
      }
    );

    console.log(output);

    return Response.json({
      video: Array.isArray(output)
        ? output[0]
        : output,
    });

  } catch (error) {

    console.log(error);

    return Response.json({
      error: error.message,
    });

  }

}