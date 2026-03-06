import { createContext, useContext, useRef, useCallback } from "react";

const ScrollContext = createContext({ scrollToSection: () => {} });

export function useScroll() {
  return useContext(ScrollContext);
}

export { ScrollContext };
