export type TripType = 'one way' | 'return'
export type Location = {
  address: string;
  postcode: string;
  latitude: number;
  longitude: number;
  isAirport?: boolean;
  city: string;
  state: string;
  country: string;
};
export type Image = {
  id: number;
  name: string;
  alternativeText?: string | null;
  caption?: string | null;
  width: number;
  height: number;
  formats: Record<string, unknown>;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string | null;
  provider: string;
  provider_metadata?: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
  documentId: string;
  publishedAt: string;
};
export type IPackage = {
  id: number | undefined;
  name: string;
  type: string;
  num_of_passengers: number;
  num_of_big_suits: number;
  num_of_small_suits: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  documentId: string;
  image?: Image;
  order: number;
  price_options: {
    baseFare: number;
    perMin: number;
    commission: number;
    distanceBands: {
      limit: number;
      rate: number;
    }[];
  };
};
export interface IBooking {
  id?: string;
  type: "return" | "one way";
  passengers: number;
  luggage: number;
  from_location: Location | null;
  to_location: Location | null;
  date?: Date;
  time: string;
  from_package?: IPackage;
  from_distance: number;
  from_duration: number | null;
  from_amount: number | null;

  // The return section should only be present if the type is 'return'
  return_from?: Location | null;
  return_to?: Location | null;
  return_date?: Date;
  return_time?: string | null;
  return_package?: IPackage | undefined;
  return_distance?: number | undefined;
  return_duration?: number | undefined;
  return_amount?: number | null;

  // Optional fields for both 'one way' and 'return' booking types
  meet_greet: boolean;
  child_seat: number;
  airport_fee: number;
  flight_number?: string;
  totalFare: number;
  user?: IGuestUser;
}
export type IGuestUser = {
  id?: string;
  username?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  gender?: string;
  birth_date?: string;
  flight_number?: string;
};
