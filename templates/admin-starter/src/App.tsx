import { Button } from "@ui/shadcn/button"
import { useState } from "react"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="p-16 flex flex-col items-center gap-8">
      <Button onClick={() => setCount((count) => count + 1)}>
        Button clicked + {count}
      </Button>
      <div className="text-sky-600 font-bold">{"text-sky-600 font-bold"}</div>
    </div>
  )
}

export default App
