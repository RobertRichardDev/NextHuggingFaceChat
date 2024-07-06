"use client"

import { useChat } from '@ai-sdk/react';

import PdfForm from '@/components/forms/pdf-form'
import Messages from '@/components/ui/messages';

export default function PDF() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/pdf",
    onResponse: (response) => {
      if (response.status === 404) {
        alert("A PDF file was not found. Please upload a PDF file and try again.")
      };
    },
  });

  return (
    <>
      <Messages messages={messages} />
      <PdfForm
        handleFormSubmit={handleSubmit}
        setMessage={handleInputChange}
        loading={isLoading}
        input={input}
      />
    </>
  )
}