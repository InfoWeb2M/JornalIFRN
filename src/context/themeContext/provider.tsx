"use client";

import { ThemeProvider } from "next-themes";

export function ThemeContext({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-tema"
      defaultTheme="system"
      enableSystem
    >
      {children}
    </ThemeProvider>
  );
}