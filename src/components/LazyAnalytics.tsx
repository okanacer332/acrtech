"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

export function LazyAnalytics({ gaId }: { gaId: string }) {
  const [loadAnalytics, setLoadAnalytics] = useState(false);

  useEffect(() => {
    // Load GA after user interaction or 5 seconds
    const timer = setTimeout(() => setLoadAnalytics(true), 5000);

    const handleInteraction = () => {
      setLoadAnalytics(true);
      clearTimeout(timer);
    };

    window.addEventListener("scroll", handleInteraction, { once: true });
    window.addEventListener("click", handleInteraction, { once: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("click", handleInteraction);
    };
  }, []);

  if (!loadAnalytics) return null;

  return <GoogleAnalytics gaId={gaId} />;
}
