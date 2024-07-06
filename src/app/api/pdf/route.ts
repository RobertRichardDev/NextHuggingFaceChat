import path from "path";

import { NextRequest } from "next/server";

import { LangChainAdapter, StreamingTextResponse } from 'ai';

import { HuggingFaceInference } from "@langchain/community/llms/hf";
import { RunnablePassthrough, RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { formatDocumentsAsString } from "langchain/util/document";

import { prompt } from "@/utils/prompt";
import { retriever } from "@/utils/retriever";

const llm = new HuggingFaceInference({
  model: "meta-llama/Meta-Llama-3-8B-Instruct",
  maxTokens: 500,
  temperature: 0.5,
});

export async function POST(req: NextRequest) {
  const body = await req.json();

  const messages = body.messages ?? [];
  const question = messages[messages.length - 1].content;

  const chain = RunnableSequence.from([
    {
      context: retriever.pipe(formatDocumentsAsString),
      question: new RunnablePassthrough(),
    },
    prompt,
    llm,
    new StringOutputParser(),
  ]);

  console.log("Asking question...");

  const stream = await chain.stream(question);
  const aiStream = LangChainAdapter.toAIStream(stream);
  
  return new StreamingTextResponse(aiStream);
}