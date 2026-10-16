import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QuickBite | Online Ordering",
  description: "QuickBite online food ordering capstone project",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
