"use client";

import { useEffect, useRef } from "react";

import { Message as MessageType } from "ai";

import Message from "./message";

interface MessageProps {
  messages: MessageType[];
}

export default function Messages({ messages }: MessageProps) {
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={messagesRef}
      className="chat-list flex-1 overflow-auto space-y-4 px-4"
    >
      {messages.map(m => (
        <Message key={m.id} message={m} />
      ))}
    </div>
  )
}