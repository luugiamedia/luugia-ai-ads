import { NextResponse } from "next/server";

export async function POST(req) {

  try {

    const body = await req.json();

    return NextResponse.json({
      success: true,
      video:
        "https://storage.cdn-luma.com/videos/tutorial.mp4",
    });

  } catch (error) {

    return NextResponse.json({
      success: false,
      error: error.message,
    });

  }

}