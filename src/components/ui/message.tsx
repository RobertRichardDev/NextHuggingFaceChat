import { Bot, User } from "lucide-react"

interface MessageProps {
  message: {
    role: string
    content: string
  }
}

export default function Message({ message }: MessageProps) {
  return (
    <div className="border-b p-5">
      <div className={`flex items-center ${message.role === 'user' ? 'justify-end' : 'justify-start'} gap-2 `}>
        {message.role === 'user' ? <User /> : <Bot />}
        <p className={`${message.role === 'user' ? 'text-green-500' : 'text-blue-500'} font-bold text-lg`}>
          {message.role}
        </p>
      </div>
      <p className={`${message.role === 'user' ? 'text-right' : 'text-left'} font-medium`}>{message.content}</p>
    </div>
  )
}