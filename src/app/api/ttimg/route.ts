import { NextRequest, NextResponse } from "next/server";

import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HUGGINGFACEHUB_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { input } = await req.json();

    const image = await hf.textToImage({
      inputs: input,
      model: 'stabilityai/stable-diffusion-2',
      parameters: {
        negative_prompt: 'blurry',
      }
    });

    return new Response(image);
  } catch (error: any) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}