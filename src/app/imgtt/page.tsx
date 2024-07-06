"use client"

import { Message } from '@/type';
import { useState } from 'react';

import ImageToTextForm from '@/components/forms/imgtt';
import Messages from '@/components/ui/messages';

export default function PDF() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image) return;

    try {
      setLoading(true);
      setMessages((prev: Message[]) => [
        ...prev,
        {
          role: 'user',
          content: preview,
        },
      ]);
  
      const formData = new FormData();
      formData.append('image', image);
  
      console.log('Form submitted');
    } catch (error) {
      setMessages((prev: Message[]) => [
        ...prev,
        {
          role: 'bot',
          content: 'An error occurred. Please try again later.',
        },
      ]);
    } finally {
      setLoading(false);
      setPreview('');
    }
  };

  return (
    <>
      <Messages messages={messages} />
      <ImageToTextForm
        handleFormSubmit={handleFormSubmit}
        handleDrop={handleDrop}
        handleChange={handleChange}
        preview={preview}
        loading={loading}
      />
    </>
  )
}