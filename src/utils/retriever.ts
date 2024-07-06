import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { splits } from "./splitter";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";

console.log("Generating embeddings...");
const vectorStore = await MemoryVectorStore.fromDocuments(
	splits,
	new HuggingFaceInferenceEmbeddings()
);

export const retriever = vectorStore.asRetriever();