import { NextRequest, NextResponse } from "next/server";

import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HUGGINGFACE_TOKEN);
const model = 'mistralai/Mistral-7B-Instruct-v0.2';

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const response = await hf.chatCompletion({
    model,
    messages: messages,
    max_tokens: 500,
    temperature: 0.1,
    seed: 0,
  });

  return NextResponse.json(response.choices[0].message.content);
}