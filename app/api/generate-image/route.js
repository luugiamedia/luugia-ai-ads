import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req) {

  try {

    const body = await req.json();

    const output = await replicate.run(
      "black-forest-labs/flux-schnell",
      {
        input: {
          prompt: `
cinematic storyboard frame,
luxury advertising,
ultra realistic,
movie lighting,
${body.prompt}
          `,
        },
      }
    );

    console.log(output);

    return Response.json({
      image: output[0],
    });

  } catch (error) {

    console.log(error);

    return Response.json({
      error: error.message,
    });

  }

}