"use client";

import { useQuery } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "react";
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

  // States for custom dropdowns
  const [brandOpen, setBrandOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("");
  
  const [priceOpen, setPriceOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState("");

  // Refs to handle click outside
  const brandRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (brandRef.current && !brandRef.current.contains(event.target as Node)) {
        setBrandOpen(false);
      }
      if (priceRef.current && !priceRef.current.contains(event.target as Node)) {
        setPriceOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const minMileageRaw = String(fd.get("minMileage") ?? "")
      .replace(/,/g, "")
      .replace(/\s/g, "")
      .trim();
    const maxMileageRaw = String(fd.get("maxMileage") ?? "")
      .replace(/,/g, "")
      .replace(/\s/g, "")
      .trim();

    const minMileage = minMileageRaw ? Number(minMileageRaw) : undefined;
    const maxMileage = maxMileageRaw ? Number(maxMileageRaw) : undefined;

    const next: FilterParams = {};
    if (selectedBrand) next.brand = selectedBrand;
    if (selectedPrice) next.price = selectedPrice;
    if (minMileage != null && !Number.isNaN(minMileage)) next.minMileage = minMileage;
    if (maxMileage != null && !Number.isNaN(maxMileage)) next.maxMileage = maxMileage;

    onSearch(next);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {/* Brand Dropdown */}
      <div className={styles.field} ref={brandRef}>
        <label className={styles.label} id="filter-brand-label">
          Car brand
        </label>
        <div className={styles.customSelectWrap}>
          <div 
            className={`${styles.customSelect} ${brandOpen ? styles.isOpen : ""} ${isPending ? styles.disabled : ""}`}
            onClick={() => !isPending && setBrandOpen(!brandOpen)}
            aria-haspopup="listbox"
            aria-expanded={brandOpen}
            aria-labelledby="filter-brand-label"
          >
            <span>{selectedBrand || "Choose a brand"}</span>
            <IoChevronDown className={styles.selectIcon} aria-hidden />
          </div>
          {brandOpen && (
            <ul className={styles.dropdownList} role="listbox">
              <li 
                className={styles.dropdownItem} 
                onClick={() => { setSelectedBrand(""); setBrandOpen(false); }}
                role="option"
                aria-selected={selectedBrand === ""}
              >
                Choose a brand
              </li>
              {brands.map((b) => (
                <li 
                  key={b} 
                  className={styles.dropdownItem} 
                  onClick={() => { setSelectedBrand(b); setBrandOpen(false); }}
                  role="option"
                  aria-selected={selectedBrand === b}
                >
                  {b}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Price Dropdown */}
      <div className={`${styles.field} ${styles.fieldPrice}`} ref={priceRef}>
        <label className={styles.label} id="filter-price-label">
          Price / 1 hour
        </label>
        <div className={styles.customSelectWrap}>
          <div 
            className={`${styles.customSelect} ${priceOpen ? styles.isOpen : ""}`}
            onClick={() => setPriceOpen(!priceOpen)}
            aria-haspopup="listbox"
            aria-expanded={priceOpen}
            aria-labelledby="filter-price-label"
          >
            <span>{selectedPrice ? `To ${selectedPrice}` : "Choose a price"}</span>
            <IoChevronDown className={styles.selectIcon} aria-hidden />
          </div>
          {priceOpen && (
            <ul className={styles.dropdownList} role="listbox">
              <li 
                className={styles.dropdownItem} 
                onClick={() => { setSelectedPrice(""); setPriceOpen(false); }}
                role="option"
                aria-selected={selectedPrice === ""}
              >
                Choose a price
              </li>
              {PRICE_OPTIONS.map((p) => (
                <li 
                  key={p} 
                  className={styles.dropdownItem} 
                  onClick={() => { setSelectedPrice(String(p)); setPriceOpen(false); }}
                  role="option"
                  aria-selected={selectedPrice === String(p)}
                >
                  {p}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Mileage Inputs (Unchanged) */}
      <div className={`${styles.field} ${styles.mileageField}`}>
        <span className={styles.label} id="mileage-label">
          Car mileage / km
        </span>
        <div className={styles.mileageGroup} role="group" aria-labelledby="mileage-label">
          <div className={styles.mileageInputWrap}>
            <span className={styles.mileagePrefix}>From </span>
            <input
              className={`${styles.mileageInput} ${styles.mileageInputWithPrefix}`}
              name="minMileage"
              type="text"
              inputMode="numeric"
              aria-label="Mileage from"
            />
          </div>
          <div className={styles.mileageInputWrap}>
            <span className={styles.mileagePrefix}>To </span>
            <input
              className={`${styles.mileageInput} ${styles.mileageInputWithPrefix}`}
              name="maxMileage"
              type="text"
              inputMode="numeric"
              aria-label="Mileage to"
            />
          </div>
        </div>
      </div>

      {/* Submit Button (Unchanged) */}
      <div className={styles.searchWrap}>
        <div className={styles.searchSpacer} aria-hidden />
        <button type="submit" className={styles.search}>
          Search
        </button>
      </div>
    </form>
  );
}
