import { useEffect, useState } from "react";

const useDetectScroll = () => {
  const [isSmall, setSmall] = useState(false);

  const handleSetSmall = () => {
    setSmall(window.pageYOffset > window.screen.availHeight - 200);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleSetSmall);
    }

    return () => window.removeEventListener("scroll", handleSetSmall);
  }, []);

  return { isSmall };
};

export { useDetectScroll };
