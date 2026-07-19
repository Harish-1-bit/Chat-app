import { ScrollArea } from "@/components/ui/scroll-area"
import MessageBubble from "./MessageBubble"
import MessageInput from "./MessageInput"

const messages = [
  { id: "1", username: "Alice", message: "Hey everyone! 👋", timestamp: "10:32 AM", isOwn: false },
  { id: "2", username: "John Doe", message: "Hey Alice! How's it going?", timestamp: "10:33 AM", isOwn: true },
  { id: "3", username: "Alice", message: "Doing great! Just finished the new design mockups.", timestamp: "10:34 AM", isOwn: false },
  { id: "4", username: "John Doe", message: "That's awesome! Can't wait to see them 🎉", timestamp: "10:35 AM", isOwn: true },
  { id: "5", username: "Bob", message: "Same here, Alice! When can we review?", timestamp: "10:36 AM", isOwn: false },
  { id: "6", username: "Alice", message: "I'll share the link in a bit, just polishing some details.", timestamp: "10:37 AM", isOwn: false },
  { id: "7", username: "John Doe", message: "Take your time, no rush!", timestamp: "10:38 AM", isOwn: true },
  { id: "8", username: "Bob", message: "By the way, anyone up for a quick sync at 2 PM?", timestamp: "10:39 AM", isOwn: false },
  { id: "9", username: "John Doe", message: "Sounds good to me 👍", timestamp: "10:40 AM", isOwn: true },
  { id: "10", username: "Alice", message: "Count me in!", timestamp: "10:41 AM", isOwn: false },
  { id: "11", username: "Sarah", message: "I'll join too, see you all at 2!", timestamp: "10:42 AM", isOwn: false },
  { id: "12", username: "Bob", message: "Great, see everyone there.", timestamp: "10:43 AM", isOwn: false },
]

export default function ChatWindow() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b px-4 py-3">
        <span className="size-2 rounded-full bg-green-500" />
        <h2 className="text-sm font-semibold">General</h2>
        <span className="text-xs text-muted-foreground">4 members</span>
      </div>

      <ScrollArea className="flex-1 px-4 py-3">
        <div className="space-y-4">
          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              username={msg.username}
              message={msg.message}
              timestamp={msg.timestamp}
              isOwn={msg.isOwn}
            />
          ))}
        </div>
      </ScrollArea>

      <div className="px-2">
        <MessageInput />
      </div>
    </div>
  )
}
