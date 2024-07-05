import React from "react";

import { ClipLoader } from "react-spinners";

import { Clip, Send } from "../icons/icons";

interface FormProps {
  handleFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  setMessage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  input: string;
  type: "chat" | "pdf";
}

export default function Form({ handleFormSubmit, setMessage, loading, input, type }: FormProps) {
  const [file, setFile] = React.useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <form
      className="flex justify-center items-center w-full border-t border-slate-300 px-2 py-4 gap-2"
      onSubmit={handleFormSubmit}
    >
      {type === "pdf" && (
        <>
          <label htmlFor="file" className="py-1 px-2 font-medium border border-slate-300 focus:outline-none focus:border-slate-500 rounded-lg">
            <Clip className="w-4 h-4" />
          </label>
          <input
            type="file"
            id="file"
            className="hidden"
            onChange={handleFileChange}
            accept=".pdf"
            disabled={loading}
          />
        </>
      )}
      <input
        type="text"
        value={input}
        className="flex-1 py-1 px-2 font-medium border border-slate-300 focus:outline-none focus:border-slate-500 rounded-lg"
        onChange={setMessage}
        disabled={loading}
      />
      <button className="py-1 px-2 font-bold border rounded-lg bg-blue-500 text-white">
        {loading ? <ClipLoader size={20} color="#ffffff" /> : <Send />}
      </button>
    </form>
  )
}