import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shon Pazarker",
  description: "Financial Consultant & Software Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
