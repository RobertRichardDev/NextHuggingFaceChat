import React from 'react'
import Form from '../ui/form'
import Button from '../ui/button';

interface TextToImageFormProps {
  handleFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  setInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  input: string;
  loading: boolean;
}

export default function TextToImageForm({ handleFormSubmit, setInput, loading, input }: TextToImageFormProps) {
  return (
    <Form handleFormSubmit={handleFormSubmit}>
      <input
        type="text"
        value={input}
        className="flex-1 py-1 px-2 font-medium border border-slate-300 focus:outline-none focus:border-slate-500 rounded-lg"
        onChange={setInput}
        disabled={loading}
      />
      <Button
        loading={loading}
        disabled={loading}
      />
    </Form>
  )
}
