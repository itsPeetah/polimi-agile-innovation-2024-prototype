import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agile Innovation Prototype (2024)",
  description: "Bander-snatched amirite?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-screen h-screen bg-black text-white">{children}</body>
    </html>
  );
}
