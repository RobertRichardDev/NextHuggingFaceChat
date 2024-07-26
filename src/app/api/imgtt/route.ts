import { NextRequest, NextResponse } from "next/server";
import { hf } from "@/utils/inference";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const image = data.get("image") as File;

    const buffer = Buffer.from(await image.arrayBuffer());

    const text = await hf.imageToText({
      data: buffer,
      model: 'Salesforce/blip-image-captioning-large'
    });

    return NextResponse.json(text);
  } catch (error: any) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}