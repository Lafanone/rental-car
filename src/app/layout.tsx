import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { QueryProvider } from "@/providers/QueryProvider";
import { ToasterHost } from "@/providers/ToasterHost";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RentalCar",
  description: "Find your perfect rental car",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <QueryProvider>
          <Header />
          {children}
          <ToasterHost />
        </QueryProvider>
      </body>
    </html>
  );
}
