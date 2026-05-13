import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catalog — RentalCar",
};

export default function CatalogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
