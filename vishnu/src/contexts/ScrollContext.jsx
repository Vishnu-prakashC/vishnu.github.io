import { createContext, useContext, useRef, useCallback } from "react";

const ScrollContext = createContext({
  scrollToSection: () => {},
  scrollToTop: () => {},
});

export function useScroll() {
  return useContext(ScrollContext);
}

export { ScrollContext };
