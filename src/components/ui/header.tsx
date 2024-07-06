import { Logo } from "../icons/logo";

interface HeaderProps {
  type: "chat" | "pdf"
  setType: (type: "chat" | "pdf") => void
}

export default function Header({ type, setType }: HeaderProps) {
  return (
    <div className="w-full flex flex-col items-center border-b px-4 pb-2 shadow">
      <div className="flex items-center gap-2">
        <h1 className="font-bold text-3xl">Hugging Face Chat</h1>
        <Logo className="w-20 h-20" />
      </div>
      <div className="flex items-center gap-2">
        <button
          className={`${type === "chat" ? "bg-yellow-700" : "bg-yellow-600 hover:bg-yellow-700"} text-white font-bold py-2 px-4 rounded transition-colors duration-150 ease-in-out`}
          onClick={() => setType("chat")}
        >
          Chat
        </button>
        <button
          className={`${type === "pdf" ? "bg-yellow-700" : "bg-yellow-600 hover:bg-yellow-700"} text-white font-bold py-2 px-4 rounded transition-colors duration-150 ease-in-out`}
          onClick={() => setType("pdf")}
        >
          Chat with PDF
        </button>
      </div>
    </div>
  )
}