import { useCallback, useState } from "react";

const useCollapse = (defaultCollapsed?: boolean) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(
    defaultCollapsed || true
  );

  const toggle = useCallback(() => {
    setIsCollapsed(!isCollapsed);
  }, [isCollapsed]);

  return { isCollapsed, toggle };
};

export { useCollapse };
