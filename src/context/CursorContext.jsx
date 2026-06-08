import { createContext, useContext } from "react";
import { useSmoothPointer } from "../hooks/useSmoothPointer";

const CursorContext = createContext({ x: 0.5, y: 0.5, px: 0, py: 0 });

export function CursorProvider({ children }) {
  const pos = useSmoothPointer(true);
  return <CursorContext.Provider value={pos}>{children}</CursorContext.Provider>;
}

export function useCursor() {
  return useContext(CursorContext);
}
