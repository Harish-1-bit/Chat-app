import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface MessageBubbleProps {
  username: string
  message: string
  timestamp: string
  isOwn: boolean
}

export default function MessageBubble({ username, message, timestamp, isOwn }: MessageBubbleProps) {
  return (
    <div className={`flex gap-2 ${isOwn ? "flex-row-reverse" : ""}`}>
      <Avatar className="mt-0.5 size-8 shrink-0">
        <AvatarFallback className="text-xs">
          {username.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className={`max-w-[75%] ${isOwn ? "items-end" : "items-start"} flex flex-col`}>
        <div className="flex items-baseline gap-2 mb-0.5">
          <span className="text-xs font-medium text-muted-foreground">
            {isOwn ? "You" : username}
          </span>
          <span className="text-[10px] text-muted-foreground/60">{timestamp}</span>
        </div>
        <div
          className={`rounded-2xl px-3 py-2 text-sm ${
            isOwn
              ? "bg-primary text-primary-foreground rounded-tr-md"
              : "bg-muted rounded-tl-md"
          }`}
        >
          {message}
        </div>
      </div>
    </div>
  )
}
