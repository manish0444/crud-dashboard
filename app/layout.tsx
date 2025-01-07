import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeRegistry from './theme-registry';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Posts Dashboard",
  description: "A CRUD dashboard for managing posts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
