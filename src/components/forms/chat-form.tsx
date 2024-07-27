import Form from "../ui/form";
import Button from "../ui/button";

interface FormProps {
  handleFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  setMessage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  input: string;
}

export default function ChatForm({ handleFormSubmit, setMessage, loading, input }: FormProps) {
  return (
    <Form handleFormSubmit={handleFormSubmit}>
      <input
        type="text"
        value={input}
        className="flex-1 py-1 px-2 font-medium border border-slate-300 focus:outline-none focus:border-slate-500 rounded-lg"
        onChange={setMessage}
        disabled={loading}
      />
      <Button
        loading={loading}
        disabled={!input || loading}
      />
    </Form>
  )
}