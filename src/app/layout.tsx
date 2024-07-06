import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hugging Face Chat",
  description: "Basic chat created with Nextjs and Hugging face",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="bg-white flex flex-col justify-between h-screen lg:h-[90vh] lg:w-1/2 lg:my-8 mx-auto border rounded-lg shadow-xl">
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}