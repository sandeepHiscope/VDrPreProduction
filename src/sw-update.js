import { useEffect, useState } from "react";
import { registerSW } from "virtual:pwa-register";

export function useSWUpdateToast() {
  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    const updateSW = registerSW({
      onNeedRefresh() {
        setShowUpdate(true);
      },
    });

    return () => updateSW?.unregister?.();
  }, []);

  return { showUpdate, reload: () => location.reload() };
}
