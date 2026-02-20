"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function useAppTheme() {
  const { resolvedTheme } = useTheme();
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    setTheme(resolvedTheme as "light" | "dark");
  }, [resolvedTheme]);

  return theme;
}
