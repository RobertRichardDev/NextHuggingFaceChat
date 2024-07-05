import path from "path";

import { NextRequest } from "next/server";

import { LangChainAdapter, StreamingTextResponse } from 'ai';

import { HuggingFaceInference } from "@langchain/community/llms/hf";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnablePassthrough, RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { formatDocumentsAsString } from "langchain/util/document";

const llm = new HuggingFaceInference({
  model: "meta-llama/Meta-Llama-3-8B-Instruct",
  maxTokens: 500,
  temperature: 0.5,
});
const embeddings = new HuggingFaceInferenceEmbeddings();

export async function POST(req: NextRequest) {
  const body = await req.json();

  const messages = body.messages ?? [];
  const question = messages[messages.length - 1].content;

  const loader = new PDFLoader(path.join(process.cwd(), 'src/doc/document.pdf'));

  console.log("Loading documents...");
  const docs = await loader.load();

  console.log("Splitting documents...");
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  const splits = await textSplitter.splitDocuments(docs);

  console.log("Generating embeddings...");
  const vectorStore = await MemoryVectorStore.fromDocuments(
    splits,
    embeddings
  );
  const retriever = vectorStore.asRetriever();

  const template = `Use the following pieces of context to answer the question at the end.
  If you don't know the answer, just say that you don't know, don't try to make up an answer.
  Use three sentences maximum and keep the answer as concise as possible.
  Always say "thanks for asking!" at the end of the answer.

  {context}

  Question: {question}

  Helpful Answer:`;
  const prompt = ChatPromptTemplate.fromTemplate(template)

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