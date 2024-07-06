import { ClipLoader } from "react-spinners";

import { Clip, Send } from "../icons/icons";
import Form from "../ui/form";

interface FormProps {
  handleFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  setMessage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  input: string;
}

export default function PdfForm({ handleFormSubmit, setMessage, loading, input }: FormProps) {
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    try {
      const formData = new FormData();
      formData.set("file", event.target.files[0]);

      await fetch("/api/pdf/upload", {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form handleFormSubmit={handleFormSubmit}>
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
    </Form>
  )
}