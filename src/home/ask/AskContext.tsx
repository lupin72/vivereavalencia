import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

type AskState = { isOpen: boolean; query: string; nonce: number }
type AskApi = AskState & { open: (query?: string) => void; close: () => void }

const Ctx = createContext<AskApi | null>(null)

export function AskProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AskState>({
    isOpen: false,
    query: "",
    nonce: 0,
  })

  const open = useCallback((query = "") => {
    setState((s) => ({ isOpen: true, query, nonce: s.nonce + 1 }))
  }, [])
  const close = useCallback(
    () => setState((s) => ({ ...s, isOpen: false })),
    [],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setState((s) =>
          s.isOpen
            ? { ...s, isOpen: false }
            : { isOpen: true, query: "", nonce: s.nonce + 1 },
        )
      } else if (e.key === "Escape") {
        close()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [close])

  return (
    <Ctx.Provider value={{ ...state, open, close }}>{children}</Ctx.Provider>
  )
}

export function useAsk() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error("useAsk must be used inside AskProvider")
  return ctx
}
