import axios from "axios";
import type {
  BookingRequestPayload,
  Car,
  CarsResponse,
  GetCarsParams,
} from "@/types/car";

const BASE_URL = "https://car-rental-api.goit.global";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/** Raw car JSON from API (legacy `address` or new `location`) */
type CarApiResponse = {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string;
  engineSize: string;
  accessories: string[];
  functionalities: string[];
  rentalPrice: string;
  rentalCompany: string;
  address?: string;
  location?: { city: string; country: string };
  rentalConditions: string[];
  mileage: number;
};

function parseLocationFromAddress(address: string): {
  city: string;
  country: string;
} {
  const parts = address
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return {
    city: parts[1] ?? "",
    country: parts[2] ?? "",
  };
}

export function normalizeCar(raw: CarApiResponse): Car {
  const location =
    raw.location ??
    (raw.address ? parseLocationFromAddress(raw.address) : { city: "", country: "" });

  return {
    id: raw.id,
    year: raw.year,
    brand: raw.brand,
    model: raw.model,
    type: raw.type,
    img: raw.img,
    description: raw.description,
    fuelConsumption: raw.fuelConsumption,
    engineSize: raw.engineSize,
    accessories: raw.accessories,
    functionalities: raw.functionalities,
    rentalPrice: raw.rentalPrice,
    rentalCompany: raw.rentalCompany,
    location,
    rentalConditions: raw.rentalConditions,
    mileage: raw.mileage,
  };
}

export async function getCars(params: GetCarsParams): Promise<CarsResponse> {
  const { page, perPage, brand, price, minMileage, maxMileage } = params;
  const { data } = await api.get<{
    cars: CarApiResponse[];
    totalCars: number;
    page: string;
    totalPages: number;
  }>("/cars", {
    params: {
      page,
      perPage,
      ...(brand ? { brand } : {}),
      ...(price != null ? { price } : {}),
      ...(minMileage != null ? { minMileage } : {}),
      ...(maxMileage != null ? { maxMileage } : {}),
    },
  });

  return {
    cars: data.cars.map(normalizeCar),
    totalCars: data.totalCars,
    page: data.page,
    totalPages: data.totalPages,
  };
}

export async function getBrands(): Promise<string[]> {
  const { data } = await api.get<string[]>("/brands");
  return data;
}

export async function getCarById(id: string): Promise<Car> {
  const { data } = await api.get<CarApiResponse>(`/cars/${id}`);
  return normalizeCar(data);
}

export async function bookCar(
  carId: string,
  payload: BookingRequestPayload,
): Promise<void> {
  const response = await api.post(`/cars/${carId}/booking-requests`, payload);
  if (response.status !== 201) {
    throw new Error(`Unexpected response status: ${response.status}`);
  }
}
