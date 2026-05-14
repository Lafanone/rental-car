"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import type { Car } from "@/types/car";
import styles from "./CarCard.module.css";

type CarCardProps = {
  car: Car;
};

function formatLocationLine(car: Car): string {
  const { city, country } = car.location;
  return [city, country, car.rentalCompany].filter(Boolean).join(" | ");
}

function formatMileage(mileage: number): string {
  return mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function CarCard({ car }: CarCardProps) {
  const [favorite, setFavorite] = useState(false);

  const line1 = formatLocationLine(car);
  
  const line2 = [car.type, `${formatMileage(car.mileage)} km`]
    .filter(Boolean)
    .join(" | ");

  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <Image
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          fill
          sizes="(max-width: 1440px) 25vw, 320px"
          className={styles.image}
          style={{ objectFit: "cover" }}
        />
        <button
          type="button"
          className={styles.favorite}
          aria-pressed={favorite}
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          onClick={() => setFavorite((v) => !v)}
        >
          {favorite ? (
            <AiFillHeart className={styles.favoriteIcon} aria-hidden />
          ) : (
            <AiOutlineHeart className={styles.favoriteIcon} aria-hidden />
          )}
        </button>
      </div>

      <div className={styles.titleRow}>
        <h2 className={styles.title}>
          <span className={styles.brand}>{car.brand}</span>{" "}
          <span className={styles.model}>{car.model}</span>
          <span className={styles.year}>, {car.year}</span>
        </h2>
        <span className={styles.price}>{`$${car.rentalPrice}`}</span>
      </div>

      <p className={styles.details}>{line1}</p>
      <p className={styles.details}>{line2}</p>

      <Link href={`/catalog/${car.id}`} className={styles.readMore}>
        Read more
      </Link>
    </article>
  );
}