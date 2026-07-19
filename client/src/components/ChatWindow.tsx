import { useEffect, useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import MessageBubble from "./MessageBubble"
import MessageInput from "./MessageInput"
import socket from "@/socket"

interface ChatWindowProps {
  username: string
}

interface Message {
  id: string
  username: string
  message: string
  timestamp: string
}

export default function ChatWindow({ username }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    socket.on("receive_message", (data: Message) => {
      setMessages((prev) => [...prev, data])
    })
    return () => {
      socket.off("receive_message")
    }
  }, [])

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b px-4 py-3">
        <span className="size-2 rounded-full bg-green-500" />
        <h2 className="text-sm font-semibold">General</h2>
      </div>

      <ScrollArea className="flex-1 px-4 py-3">
        <div className="space-y-4">
          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              username={msg.username}
              message={msg.message}
              timestamp={msg.timestamp}
              isOwn={msg.username === username}
            />
          ))}
        </div>
      </ScrollArea>

      <div className="px-2">
        <MessageInput username={username} />
      </div>
    </div>
  )
}
