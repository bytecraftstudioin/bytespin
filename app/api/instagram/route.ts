import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    const response = await fetch(
      `https://${process.env.RAPIDAPI_HOST}/download?url=${encodeURIComponent(
        url
      )}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
          "x-rapidapi-host": process.env.RAPIDAPI_HOST!,
        },
        cache: "no-store",
      }
    );

    const data = await response.json();

    console.log("RapidAPI Response:", JSON.stringify(data, null, 2));

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}