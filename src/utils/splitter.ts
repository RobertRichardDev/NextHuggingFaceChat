import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import path from "path";

const loader = new PDFLoader(path.join(process.cwd(), 'src/doc/document.pdf'));

console.log("Loading documents...");
const docs = await loader.load();

console.log("Splitting documents...");
const textSplitter = new RecursiveCharacterTextSplitter({
	chunkSize: 1000,
	chunkOverlap: 200,
});
 
export const splits = await textSplitter.splitDocuments(docs);