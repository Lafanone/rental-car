"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { getCars } from "@/api/api";
import { CarCard } from "@/components/CarCard";
import { Filters } from "@/components/Filters";
import type { FilterParams } from "@/types/car";
import styles from "./CatalogPage.module.css";

function filtersToQuery(filters: FilterParams) {
  return {
    brand: filters.brand,
    price:
      filters.price != null && filters.price !== ""
        ? Number(filters.price)
        : undefined,
    minMileage: filters.minMileage,
    maxMileage: filters.maxMileage,
  };
}

export default function CatalogPage() {
  const [filters, setFilters] = useState<FilterParams>({});

  const query = useInfiniteQuery({
    queryKey: ["cars", filters] as const,
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getCars({
        page: pageParam,
        perPage: 12,
        ...filtersToQuery(filters),
      }),
    getNextPageParam: (lastPage) => {
      const current = Number(lastPage.page);
      if (current < lastPage.totalPages) {
        return current + 1;
      }
      return undefined;
    },
  });

  const cars = useMemo(
    () => query.data?.pages.flatMap((p) => p.cars) ?? [],
    [query.data],
  );

  return (
    <div className={styles.page}>
      <section className={styles.toolbar} aria-label="Filters">
        <Filters onSearch={setFilters} />
      </section>

      {query.isPending ? (
        <p className={styles.state}>Loading cars…</p>
      ) : query.isError ? (
        <p className={styles.state} role="alert">
          {query.error instanceof Error
            ? query.error.message
            : "Something went wrong"}
        </p>
      ) : cars.length === 0 ? (
        <p className={styles.state}>No cars match your filters.</p>
      ) : (
        <>
          <div className={styles.grid}>
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>

          {query.hasNextPage ? (
            <div className={styles.loadMoreWrap}>
              <button
                type="button"
                className={styles.loadMore}
                disabled={query.isFetchingNextPage}
                onClick={() => query.fetchNextPage()}
              >
                {query.isFetchingNextPage ? "Loading…" : "Load more"}
              </button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
