"use client";

import type { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  IoCalendarOutline,
  IoCheckmarkCircle,
  IoLocationOutline,
} from "react-icons/io5";
import { MdOutlineLocalGasStation } from "react-icons/md";
import { TbCar, TbSettings } from "react-icons/tb";
import { getCarById } from "@/api/api";
import { RentalForm } from "@/components/RentalForm";
import type { Car } from "@/types/car";
import styles from "../CarDetailPage.module.css";

function formatMileage(mileage: number): string {
  return mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function extractCatalogImageId(imgUrl: string): string | null {
  const m = imgUrl.match(/\/(\d+)-ai\.jpg$/i);
  return m?.[1] ?? null;
}

function flattenConditionLines(conditions: string[]): string[] {
  return conditions.flatMap((line) =>
    line.split(/\n/).map((s) => s.trim()).filter(Boolean),
  );
}

function highlightNumbers(text: string): ReactNode {
  const parts = text.split(/(\d+)/g);
  return parts.map((part, index) =>
    /^\d+$/.test(part) ? (
      <span key={`n-${index}`} className={styles.highlight}>
        {part}
      </span>
    ) : (
      <span key={`t-${index}`}>{part}</span>
    ),
  );
}

function capitalizeType(type: string): string {
  if (!type) return type;
  return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
}

export default function CatalogCarDetailPage() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : "";

  const { data: car, isPending, isError, error } = useQuery({
    queryKey: ["car", id],
    queryFn: () => getCarById(id),
    enabled: Boolean(id),
  });

  if (!id) {
    return (
      <div className={styles.page}>
        <p className={styles.state}>Invalid car link.</p>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className={styles.page}>
        <p className={styles.state}>Loading…</p>
      </div>
    );
  }

  if (isError || !car) {
    return (
      <div className={styles.page}>
        <p className={styles.state} role="alert">
          {error instanceof Error ? error.message : "Car not found."}
        </p>
        <p className={styles.state}>
          <Link href="/catalog" className={styles.back}>
            ← Back to catalog
          </Link>
        </p>
      </div>
    );
  }

  return <CarDetailContent car={car} carId={id} />;
}

function CarDetailContent({ car, carId }: { car: Car; carId: string }) {
  const displayId = extractCatalogImageId(car.img) ?? car.id;
  const locationLabel = [car.location.city, car.location.country]
    .filter(Boolean)
    .join(", ");

  const conditionLines = flattenConditionLines(car.rentalConditions);
  const accessoryItems = [...car.accessories, ...car.functionalities];

  return (
    <div className={styles.page}>
      <Link href="/catalog" className={styles.back}>
        ← Back to catalog
      </Link>

      <div className={styles.layout}>
        <div className={styles.leftColumn}>
          <div className={styles.imageBox}>
            <Image
              src={car.img}
              alt={`${car.brand} ${car.model}`}
              width={640}
              height={512}
              className={styles.image}
              sizes="640px"
              priority
            />
          </div>
          <RentalForm carId={carId} />
        </div>

        <div className={styles.rightColumn}>
          <header className={styles.infoHeader}>
            <div className={styles.titleRow}>
              <h1 className={styles.title}>
                {car.brand} {car.model}, {car.year}
              </h1>
              <span className={styles.idLabel}>Id: {displayId}</span>
            </div>
            <div className={styles.metaRow}>
              <IoLocationOutline className={styles.metaIcon} aria-hidden />
              <span>{locationLabel || "—"}</span>
              <span className={styles.metaSep} aria-hidden />
              <span>{`Mileage: ${formatMileage(car.mileage)} km`}</span>
            </div>
            <p className={styles.priceHero}>{`$${car.rentalPrice}`}</p>
            <p className={styles.leadDescription}>{car.description}</p>
          </header>

          <section className={styles.section} aria-labelledby="rent-title">
            <h2 id="rent-title" className={styles.sectionTitle}>
              Rental Conditions:
            </h2>
            <ul className={styles.badges}>
              {conditionLines.map((line) => (
                <li key={line} className={styles.badge}>
                  <IoCheckmarkCircle
                    className={styles.listIcon}
                    aria-hidden
                  />
                  <span>{highlightNumbers(line)}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.section} aria-labelledby="spec-title">
            <h2 id="spec-title" className={styles.sectionTitle}>
              Car Specifications:
            </h2>
            <ul className={styles.specs}>
              <li className={styles.specRow}>
                <IoCalendarOutline className={styles.specIcon} aria-hidden />
                <span className={styles.specText}>
                  <span className={styles.specLabel}>Year:</span><span className={styles.specValue}>{car.year}</span>
                </span>
              </li>
              <li className={styles.specRow}>
                <TbCar className={styles.specIcon} aria-hidden />
                <span className={styles.specText}>
                  <span className={styles.specLabel}>Type:</span><span className={styles.specValue}>{capitalizeType(car.type)}</span>
                </span>
              </li>
              <li className={styles.specRow}>
                <MdOutlineLocalGasStation
                  className={styles.specIcon}
                  aria-hidden
                />
                <span className={styles.specText}>
                  <span className={styles.specLabel}>Fuel Consumption:</span><span className={styles.specValue}>{car.fuelConsumption}</span>
                </span>
              </li>
              <li className={styles.specRow}>
                <TbSettings className={styles.specIcon} aria-hidden />
                <span className={styles.specText}>
                  <span className={styles.specLabel}>Engine Size:</span><span className={styles.specValue}>{car.engineSize}</span>
                </span>
              </li>
            </ul>
          </section>

          <section className={styles.section} aria-labelledby="acc-title">
            <h2 id="acc-title" className={styles.sectionTitle}>
              Accessories and functionalities:
            </h2>
            <ul className={styles.accessoriesList}>
              {accessoryItems.map((item) => (
                <li key={item} className={styles.accessoryItem}>
                  <IoCheckmarkCircle
                    className={styles.listIcon}
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
