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
    const price = String(fd.get("price") ?? "").trim();
    const minMileageRaw = String(fd.get("minMileage") ?? "").trim();
    const maxMileageRaw = String(fd.get("maxMileage") ?? "").trim();

    const minMileage = minMileageRaw ? Number(minMileageRaw) : undefined;
    const maxMileage = maxMileageRaw ? Number(maxMileageRaw) : undefined;

    const next: FilterParams = {};
    if (brand) next.brand = brand;
    if (price) next.price = price;
    if (minMileage != null && !Number.isNaN(minMileage)) next.minMileage = minMileage;
    if (maxMileage != null && !Number.isNaN(maxMileage)) next.maxMileage = maxMileage;

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
            name="price"
            className={styles.select}
            defaultValue=""
          >
            <option value="">Choose a price</option>
            {PRICE_OPTIONS.map((p) => (
              <option key={p} value={String(p)}>
                {`$${p}`}
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
            name="minMileage"
            type="number"
            inputMode="numeric"
            min={0}
            placeholder="From"
            aria-label="Mileage from"
          />
          <span className={styles.mileageDivider} aria-hidden />
          <input
            className={styles.mileageInput}
            name="maxMileage"
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
