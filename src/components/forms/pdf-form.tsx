import { useState } from "react";

import { FileCheck, FileUp } from "lucide-react";

import Form from "../ui/form";
import Button from "../ui/button";

interface FormProps {
  handleFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  setMessage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  input: string;
}

export default function PdfForm({ handleFormSubmit, setMessage, loading, input }: FormProps) {
  const [isUploaded, setIsUploaded] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    try {
      const formData = new FormData();
      formData.set("file", event.target.files[0]);

      const res = await fetch("/api/pdf/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setIsUploaded(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form handleFormSubmit={handleFormSubmit}>
      <label htmlFor="file" className="py-1 px-2 font-medium border border-slate-300 focus:outline-none focus:border-slate-500 rounded-lg">
        {isUploaded ?
          <FileCheck className="text-green-600" />
          :
          <FileUp className="text-blue-600" />
        }
      </label>
      <input
        type="file"
        id="file"
        className="hidden"
        onChange={handleFileChange}
        accept=".pdf"
        disabled={loading}
      />
      <input
        type="text"
        value={input}
        className="flex-1 py-1 px-2 font-medium border border-slate-300 focus:outline-none focus:border-slate-500 rounded-lg"
        onChange={setMessage}
        disabled={loading}
      />
      <Button
        loading={loading}
        disabled={loading}
      />
    </Form>
  )
}