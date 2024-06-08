import { MessageType } from "../interfaces";

export const getContent = async (messages: MessageType[]) => {
  const response = await fetch("/api/chat", {
    method: "POST",
    body: JSON.stringify({
      messages,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const content = await response.json();

  return content;
}