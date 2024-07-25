"use client"

import { Message } from '@/type';
import { useState } from 'react';

import Messages from "@/components/ui/messages"
import TextToImageForm from '@/components/forms/ttimg-form';

export default function TextToImage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;

    try {
      setLoading(true);
      setInput('');
      setMessages((prev: Message[]) => [
        ...prev,
        {
          role: 'user',
          content: input,
        },
      ]);

      const response = await fetch('/api/ttimg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input }),
      });

      if (response.ok) {
        const data = await response.blob();
        const blobURL = URL.createObjectURL(data);
        setMessages((prev: Message[]) => [
          ...prev,
          {
            role: 'bot',
            content: blobURL,
          },
        ]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Messages messages={messages} />
      <TextToImageForm
        handleFormSubmit={handleFormSubmit}
        setInput={handleChange}
        loading={loading}
        input={input}
      />
    </>
  )
}
