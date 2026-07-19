import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import socket from "@/socket"

interface MessageInputProps {
  username: string
}

export default function MessageInput({ username }: MessageInputProps) {
  const [text, setText] = useState("")

  const sendMessage = () => {
    if (!text.trim()) return
    const msg = {
      id: crypto.randomUUID(),
      username,
      message: text.trim(),
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }
    socket.emit("send_message", msg)
    setText("")
  }

  return (
    <div className="flex items-center gap-2 border-t p-3">
      <Input
        placeholder="Type a message..."
        className="flex-1"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") sendMessage()
        }}
      />
      <Button size="icon" className="shrink-0" onClick={sendMessage}>
        <Send className="size-4" />
      </Button>
    </div>
  )
}
