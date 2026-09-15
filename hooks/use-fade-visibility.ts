import { useEffect, useState } from "react";

export function useFadeVisibility(visible: boolean, duration = 150) {
  const [mounted, setMounted] = useState(visible);

  useEffect(() => {
    if (visible) {
      setMounted(true);
      return;
    }

    const timeout = setTimeout(() => {
      setMounted(false);
    }, duration);

    return () => clearTimeout(timeout);
  }, [visible, duration]);

  return { mounted, visible };
}
