"use client";

import { useQuery } from "@tanstack/react-query";
import { IoChevronDown } from "react-icons/io5";
import { getBrands } from "@/api/api";
import type { FilterParams } from "@/types/car";
import styles from "./Filters.module.css";

const PRICE_OPTIONS: number[] = [];
for (let p = 30; p <= 150; p += 10) {
  PRICE_OPTIONS.push(p);
}

type FiltersProps = {
  onSearch: (filters: FilterParams) => void;
};

export function Filters({ onSearch }: FiltersProps) {
  const { data: brands = [], isPending } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const brand = String(fd.get("brand") ?? "").trim();
    const rentalPrice = String(fd.get("rentalPrice") ?? "").trim();
    const mileageMinRaw = String(fd.get("mileageMin") ?? "").trim();
    const mileageMaxRaw = String(fd.get("mileageMax") ?? "").trim();

    const mileageMin = mileageMinRaw ? Number(mileageMinRaw) : undefined;
    const mileageMax = mileageMaxRaw ? Number(mileageMaxRaw) : undefined;

    const next: FilterParams = {};
    if (brand) next.brand = brand;
    if (rentalPrice) next.rentalPrice = rentalPrice;
    if (mileageMin != null && !Number.isNaN(mileageMin)) next.mileageMin = mileageMin;
    if (mileageMax != null && !Number.isNaN(mileageMax)) next.mileageMax = mileageMax;

    onSearch(next);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="filter-brand">
          Car brand
        </label>
        <div className={styles.selectWrap}>
          <select
            id="filter-brand"
            name="brand"
            className={styles.select}
            defaultValue=""
            disabled={isPending}
            aria-busy={isPending}
          >
            <option value="">Choose a brand</option>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
          <IoChevronDown className={styles.selectIcon} aria-hidden />
        </div>
      </div>

      <div className={`${styles.field} ${styles.fieldPrice}`}>
        <label className={styles.label} htmlFor="filter-price">
          Price / 1 hour
        </label>
        <div className={styles.selectWrap}>
          <select
            id="filter-price"
            name="rentalPrice"
            className={styles.select}
            defaultValue=""
          >
            <option value="">Choose a price</option>
            {PRICE_OPTIONS.map((price) => (
              <option key={price} value={String(price)}>
                {`$${price}`}
              </option>
            ))}
          </select>
          <IoChevronDown className={styles.selectIcon} aria-hidden />
        </div>
      </div>

      <div className={`${styles.field} ${styles.mileageField}`}>
        <span className={styles.label} id="mileage-label">
          Car mileage / km
        </span>
        <div
          className={styles.mileageGroup}
          role="group"
          aria-labelledby="mileage-label"
        >
          <input
            className={styles.mileageInput}
            name="mileageMin"
            type="number"
            inputMode="numeric"
            min={0}
            placeholder="From"
            aria-label="Mileage from"
          />
          <span className={styles.mileageDivider} aria-hidden />
          <input
            className={styles.mileageInput}
            name="mileageMax"
            type="number"
            inputMode="numeric"
            min={0}
            placeholder="To"
            aria-label="Mileage to"
          />
        </div>
      </div>

      <div className={styles.searchWrap}>
        <div className={styles.searchSpacer} aria-hidden />
        <button type="submit" className={styles.search}>
          Search
        </button>
      </div>
    </form>
  );
}
