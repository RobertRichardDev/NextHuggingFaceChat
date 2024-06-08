import { Logo } from "../icons/logo";

export default function Header() {
  return (
    <div className="w-full flex items-center justify-center border-b gap-2 px-4 shadow">
      <h1 className="font-bold text-3xl">Hugging Face Chat</h1>
      <Logo className="w-20 h-20" />
    </div>
  )
}