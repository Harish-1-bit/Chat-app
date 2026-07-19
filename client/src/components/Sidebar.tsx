import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, Search } from "lucide-react"

const rooms = [
  { id: "1", name: "General", unread: 2, active: true },
  { id: "2", name: "Random Talk", unread: 0, active: false },
  { id: "3", name: "Design Chat", unread: 5, active: false },
  { id: "4", name: "Dev Team", unread: 0, active: false },
  { id: "5", name: "Music Lovers", unread: 1, active: false },
]

export default function Sidebar() {
  return (
    <div className="flex h-full flex-col border-r bg-muted/30">
      <div className="p-3">
        <div className="relative">
          <Search className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search rooms..." className="pl-8" />
        </div>
      </div>
      <ScrollArea className="flex-1 px-2">
        <div className="space-y-1">
          {rooms.map((room) => (
            <button
              key={room.id}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                room.active
                  ? "bg-primary/10 text-primary font-medium"
                  : "hover:bg-muted"
              }`}
            >
              <span className="size-2 shrink-0 rounded-full bg-primary/40" />
              <span className="flex-1 truncate">{room.name}</span>
              {room.unread > 0 && (
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  {room.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </ScrollArea>
      <div className="border-t p-3">
        <Button className="w-full gap-2">
          <Plus className="size-4" />
          New Room
        </Button>
      </div>
    </div>
  )
}
