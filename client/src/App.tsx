import { useState } from "react"
import TopBar from "@/components/TopBar"
import Sidebar from "@/components/Sidebar"
import ChatWindow from "@/components/ChatWindow"

function App() {
  const [username, setUsername] = useState("")

  if (!username) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col gap-3">
          <h1 className="text-xl font-semibold">Enter your name</h1>
          <input
            className="rounded-lg border px-3 py-2 text-sm"
            placeholder="Username..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.currentTarget.value.trim()) {
                setUsername(e.currentTarget.value.trim())
              }
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col">
      <TopBar username={username} />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-72 shrink-0 border-r">
          <Sidebar />
        </aside>
        <main className="flex-1">
          <ChatWindow username={username} />
        </main>
      </div>
    </div>
  )
}

export default App
