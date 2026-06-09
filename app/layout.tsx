"use client";
import type { Metadata } from "next";
import { manrope, figtree, inter } from "./lib/fonts";
import "./styles/globals.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from "sonner";
import { useState } from "react";




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;




}>) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: { staleTime: 60 * 1000 }, // 1 min
    },
  }));
  return (
    <html
      lang="en"
      className={` ${manrope.variable} ${figtree.variable} ${inter.variable} h-full antialiased`}
    >


      <body className={`${figtree.className} min-h-full flex flex-col`} suppressHydrationWarning>

        <QueryClientProvider client={queryClient}>
          {children}
          <Toaster position="top-right" richColors />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </body>
    </html>
  );
}
