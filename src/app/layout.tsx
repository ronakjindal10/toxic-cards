import type { Metadata } from "next";
import { Anton, Courier_Prime } from "next/font/google";
import "./globals.css";

const anton = Anton({ 
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

const courier = Courier_Prime({ 
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-courier",
});

export const metadata: Metadata = {
  title: "Toxic Cards",
  description: "The 90s Trading Card Game: Roast Edition",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${anton.variable} ${courier.variable} antialiased font-[family-name:var(--font-body)]`}>
        {children}
      </body>
    </html>
  );
}