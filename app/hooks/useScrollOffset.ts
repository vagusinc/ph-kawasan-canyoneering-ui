import { useEffect, useState } from "react";

const useScrollOffset = () => {
  const [offset, setOffset] = useState(0);

  const onScroll = () => setOffset(window.scrollY);

  useEffect(() => {
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return offset;
};

export { useScrollOffset };
