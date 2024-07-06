"use client";

import { useEffect, useRef, useState } from "react";

import { useChat } from '@ai-sdk/react';

import Header from "../components/ui/header";
import Form from "../components/ui/form";
import Message from "../components/ui/message";

export default function Home() {
  const [type, setType] = useState<"chat" | "pdf">("chat");

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: type === "chat" ? "/api/chat" : "/api/pdf",
    onResponse: (response) => {
      if (response.status === 404) {
        alert("A PDF file was not found. Please upload a PDF file and try again.")
      };
    },
  });

  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <main className="bg-white flex flex-col justify-between h-screen lg:h-[90vh] lg:w-1/2 lg:my-8 mx-auto border rounded-lg shadow-xl">
      <Header
        type={type}
        setType={setType}
      />

      <div
        ref={messagesRef}
        className="chat-list flex-1 overflow-auto space-y-4 px-4"
      >
        {messages.map(m => (
          <Message key={m.id} message={m} />
        ))}
      </div>

      <Form
        handleFormSubmit={handleSubmit}
        setMessage={handleInputChange}
        loading={isLoading}
        input={input}
        type={type}
      />
    </main>
  );
}