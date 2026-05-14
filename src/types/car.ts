/** Single car (normalized for app; API may still return legacy `address`) */
export interface Car {
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
  /** Daily rental price as returned by API (e.g. `"40"`) */
  rentalPrice: string;
  rentalCompany: string;
  location: { city: string; country: string };
  rentalConditions: string[];
  mileage: number;
}

/** Paginated list response from `GET /cars` */
export interface CarsResponse {
  cars: Car[];
  totalCars: number;
  /** API returns numeric page as string (e.g. `"1"`) */
  page: string;
  totalPages: number;
}

/** Catalog filter state (UI → mapped to query params in `getCars`) */
export interface FilterParams {
  brand?: string;
  price?: string;
  minMileage?: number;
  maxMileage?: number;
}

/** Request params for `GET /cars` (Swagger-aligned query keys) */
export type GetCarsParams = {
  page: number;
  perPage: number;
  brand?: string;
  price?: number;
  minMileage?: number;
  maxMileage?: number;
};

/** POST `/cars/{carId}/booking-requests` body */
export interface BookingRequestPayload {
  name: string;
  email: string;
  bookingDate: string;
  comment?: string;
}

/** Alias for booking form values */
export type RentalFormData = BookingRequestPayload;
