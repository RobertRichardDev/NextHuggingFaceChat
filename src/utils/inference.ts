import { HfInference } from "@huggingface/inference";
export const hf = new HfInference(process.env.HUGGINGFACEHUB_API_KEY);