import { Message as MessageType } from "@/type"

import { Bot, User } from "lucide-react"

interface MessageProps {
  message: MessageType
}

export default function Message({ message }: MessageProps) {
  return (
    <div className="border-b space-y-2 p-5">
      <div className={`flex items-center ${message.role === 'user' ? 'justify-end' : 'justify-start'} gap-2 `}>
        {message.role === 'user' ? <User /> : <Bot />}
        <p className={`${message.role === 'user' ? 'text-green-500' : 'text-blue-500'} font-bold text-lg`}>
          {message.role}
        </p>
      </div>
      <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
        {message.content.startsWith('blob') ? (
          <div className="w-72 h-52">
            <img src={message.content} alt="preview" className="w-full h-full object-cover rounded-lg" />
          </div>
        ) : (
          <p className="font-medium">
            {message.content}
          </p>
        )
        }
      </div>
    </div >
  )
}