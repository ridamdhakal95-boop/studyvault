import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ExamPrep — Study smarter",
  description: "A fast, database-driven exam preparation platform.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
