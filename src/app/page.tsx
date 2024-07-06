"use client";

import { useChat } from '@ai-sdk/react';

import ChatForm from "@/components/forms/chat-form";
import Messages from "@/components/ui/messages";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  return (
    <>
      <Messages messages={messages} />
      <ChatForm
        handleFormSubmit={handleSubmit}
        setMessage={handleInputChange}
        loading={isLoading}
        input={input}
      />
    </>
  );
}