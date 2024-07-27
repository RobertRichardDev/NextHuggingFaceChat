import { LoaderCircle, Send } from "lucide-react";

interface ButtonProps {
  loading: boolean;
  disabled: boolean;
}

export default function Button({ loading, disabled }: ButtonProps) {
  return (
    <button
      className={`${disabled || loading ? "bg-slate-500 cursor-not-allowed" : "bg-blue-500 cursor-pointer"} py-1 px-2 font-bold border rounded-lg text-white transition-colors duration-300 ease-out`}
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
