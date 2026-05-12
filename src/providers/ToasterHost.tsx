"use client";

import { Toaster } from "react-hot-toast";

export function ToasterHost() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          fontFamily: "var(--font-manrope), system-ui, sans-serif",
        },
      }}
    />
  );
}
