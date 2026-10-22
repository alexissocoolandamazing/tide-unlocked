import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UNLOCKED Starter",
  description: "A starter project for the Tide UNLOCKED hackathon challenge"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-AU"><body>{children}</body></html>;
}
