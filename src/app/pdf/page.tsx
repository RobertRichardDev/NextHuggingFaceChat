"use client";

import { useEffect, useRef } from 'react'

import { useChat } from '@ai-sdk/react';

import Message from '@/components/ui/message'
import PdfForm from '@/components/forms/pdf-form'

export default function PDF() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/pdf",
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
    <>
      <div
        ref={messagesRef}
        className="chat-list flex-1 overflow-auto space-y-4 px-4"
      >
        {messages.map(m => (
          <Message key={m.id} message={m} />
        ))}
      </div>

      <PdfForm
        handleFormSubmit={handleSubmit}
        setMessage={handleInputChange}
        loading={isLoading}
        input={input}
      />
    </>
  )
}