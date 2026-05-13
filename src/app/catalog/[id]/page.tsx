import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCarById } from "@/api/api";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function CatalogCarPage({ params }: PageProps) {
  const { id } = await params;

  try {
    const car = await getCarById(id);
    return (
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "48px 72px 72px",
          fontFamily: "var(--font-sans)",
        }}
      >
        <p style={{ marginBottom: 24 }}>
          <Link href="/catalog" style={{ color: "var(--primary)" }}>
            ← Back to catalog
          </Link>
        </p>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 700,
            marginBottom: 24,
            color: "var(--color-text)",
          }}
        >
          {car.brand} {car.model}, {car.year}
        </h1>
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 640,
            aspectRatio: "16 / 10",
            borderRadius: 14,
            overflow: "hidden",
            background: "var(--color-bg-muted)",
          }}
        >
          <Image
            src={car.img}
            alt={`${car.brand} ${car.model}`}
            fill
            sizes="640px"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <p
          style={{
            marginTop: 24,
            fontSize: 16,
            lineHeight: 1.5,
            color: "var(--color-text-secondary)",
          }}
        >
          {car.description}
        </p>
      </div>
    );
  } catch {
    notFound();
  }
}
