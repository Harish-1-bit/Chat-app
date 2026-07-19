import { useState } from "react"
import TopBar from "@/components/TopBar"
import Sidebar from "@/components/Sidebar"
import ChatWindow from "@/components/ChatWindow"

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen flex-col">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <aside
          className={`w-72 shrink-0 transition-all duration-200 ${
            sidebarOpen ? "block" : "hidden lg:block lg:w-16"
          }`}
        >
          <Sidebar />
        </aside>
        <main className="flex-1">
          <ChatWindow />
        </main>
      </div>
    </div>
  )
}

export default App
