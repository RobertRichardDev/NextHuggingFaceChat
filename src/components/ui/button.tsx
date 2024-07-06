import { Loader, Send } from "../icons/icons";

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
        <Loader className="w-5 h-5 text-white" />
        :
        <Send />
      }
    </button>
  )
}
