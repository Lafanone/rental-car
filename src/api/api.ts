import axios from "axios";
import type { Car, CarsResponse, GetCarsParams } from "@/types/car";

const BASE_URL = "https://car-rental-api.goit.global";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getCars(params: GetCarsParams): Promise<CarsResponse> {
  const { page, limit, brand, rentalPrice, mileageMin, mileageMax } = params;
  const { data } = await api.get<CarsResponse>("/cars", {
    params: {
      page,
      limit,
      ...(brand ? { brand } : {}),
      ...(rentalPrice != null ? { rentalPrice } : {}),
      ...(mileageMin != null ? { mileageMin } : {}),
      ...(mileageMax != null ? { mileageMax } : {}),
    },
  });
  return data;
}

export async function getBrands(): Promise<string[]> {
  const { data } = await api.get<string[]>("/brands");
  return data;
}

export async function getCarById(id: string): Promise<Car> {
  const { data } = await api.get<Car>(`/cars/${id}`);
  return data;
}
