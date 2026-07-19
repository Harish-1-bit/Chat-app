import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send, Smile } from "lucide-react"

export default function MessageInput() {
  return (
    <div className="flex items-center gap-2 border-t p-3">
      <Button variant="ghost" size="icon" className="shrink-0" disabled>
        <Smile className="size-5" />
      </Button>
      <Input placeholder="Type a message..." className="flex-1" />
      <Button size="icon" className="shrink-0">
        <Send className="size-4" />
      </Button>
    </div>
  )
}
