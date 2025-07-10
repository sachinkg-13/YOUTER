"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export function PageLoader() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();
  const timer = useRef<NodeJS.Timeout | null>(null);

  // Start loader on route change
  useEffect(() => {
    setLoading(true);
    setProgress(0);
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => {
      setProgress((prev) => {
        if (prev < 90) return prev + Math.random() * 10;
        return prev;
      });
    }, 120);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [pathname]);

  // Complete loader after route change
  useEffect(() => {
    if (!loading) return;
    // Simulate route ready after short delay
    const done = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 300);
    }, 400);
    return () => clearTimeout(done);
  }, [loading, pathname]);

  return loading ? (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: `${progress}%`,
        height: 3,
        background: "var(--loader-color, hsl(var(--primary)))",
        zIndex: 9999,
        transition: "width 0.2s cubic-bezier(.4,0,.2,1)",
        boxShadow: "0 1px 5px rgba(0,0,0,0.1)",
      }}
      className="dark:before:bg-primary-foreground before:bg-primary"
    />
  ) : null;
}
