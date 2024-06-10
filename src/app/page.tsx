"use client";

import React, { useEffect, useRef } from "react";

import { useChat } from '@ai-sdk/react';

import { SyncLoader } from "react-spinners";

import { Assistant, User } from "@/components/icons/icons";

import Header from "../components/ui/header";
import Form from "../components/ui/form";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  const messagesRef = useRef<HTMLDivElement>(null);

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
        {messages.map(m => (
          <div key={m.id} className="border-b p-5">
            <div className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} gap-2`}>
              {m.role === 'user' ? <User className="w-10 h-10" /> : <Assistant className="w-10 h-10" />}
              <p className={`${m.role === 'user' ? 'text-green-500' : 'text-blue-500'} font-bold text-lg`}>
                {m.role}
              </p>
            </div>
            <p className={`${m.role === 'user' ? 'text-right' : 'text-left'} font-medium`}>{m.content}</p>
          </div>
        ))}
      </div>

      <Form
        handleFormSubmit={handleSubmit}
        setMessage={handleInputChange}
        loading={isLoading}
        input={input}
      />
    </main>
  );
}