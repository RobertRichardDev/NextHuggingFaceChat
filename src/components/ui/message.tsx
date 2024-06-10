import { MessageType } from "../../app/interfaces";

import { Assistant, User } from "../icons/icons";

interface MessageProps {
  message: MessageType;
}

export default function Message({ message }: MessageProps) {
  return (
    <div className="border-b p-5">
      <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} gap-2`}>
        {message.role === 'user' ? <User className="w-10 h-10" /> : <Assistant className="w-10 h-10" />}
        <p className={`${message.role === 'user' ? 'text-green-500' : 'text-blue-500'} font-bold text-lg`}>
          {message.role}
        </p>
      </div>
      <p className={`${message.role === 'user' ? 'text-right' : 'text-left'} font-medium`}>{message.content}</p>
    </div>
  )
}