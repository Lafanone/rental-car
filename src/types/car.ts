/** Single car from GoIT Car Rental API */
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
  address: string;
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

/** Query params supported by the catalog filter */
export interface FilterParams {
  brand?: string;
  rentalPrice?: string;
  mileageMin?: number;
  mileageMax?: number;
}

/** Request params for `GET /cars` */
export type GetCarsParams = {
  page: number;
  limit: number;
  brand?: string;
  rentalPrice?: number;
  mileageMin?: number;
  mileageMax?: number;
};

/** Client-side payload for the “Rent” / booking modal */
export interface RentalFormData {
  name: string;
  email: string;
  phone: string;
  carId: string;
  comment?: string;
}
