import { LoaderCircle, Send } from "lucide-react";

interface ButtonProps {
  loading: boolean;
  disabled: boolean;
}

export default function Button({ loading, disabled }: ButtonProps) {
  return (
    <button
      className="py-1 px-2 font-bold border rounded-lg bg-blue-500 text-white"
      disabled={disabled}
    >
      {loading ?
        <LoaderCircle className="animate-spin" />
        :
        <Send />
      }
    </button>
  )
}
