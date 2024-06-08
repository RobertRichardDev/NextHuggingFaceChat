"use client";

import React, { useEffect, useRef, useState } from "react";

import { SyncLoader } from "react-spinners";

import { MessageType } from "./interfaces";

import { getContent } from "./services/chat";

import Header from "./components/ui/header";
import Form from "./components/ui/form";
import Message from "./components/ui/message";

export default function Home() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const messagesRef = useRef<HTMLDivElement>(null);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!message || message.trim() === '') return;

    const updatedMessages: MessageType[] = [...messages, { role: 'user', content: message }];

    setMessages(updatedMessages);
    setMessage('');
    setLoading(true);

    const content = await getContent(updatedMessages);

    setMessages((prevMessages) => [...prevMessages, { role: 'assistant', content }]);
    setLoading(false);
  }

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <main className="bg-white flex flex-col justify-between h-screen lg:h-[90vh] lg:w-1/2 lg:my-8 mx-auto border rounded-lg shadow-xl">
      <Header />
      <div
        ref={messagesRef}
        className="chat-list flex-1 overflow-auto space-y-4 px-4 scroll-smooth"
      >
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
        {loading && (
          <SyncLoader size={10} color="#3b82f6" />
        )}
      </div>
      <Form
        handleFormSubmit={handleFormSubmit}
        setMessage={(e) => setMessage(e.target.value)}
        loading={loading}
        message={message}
      />
    </main>
  );
}