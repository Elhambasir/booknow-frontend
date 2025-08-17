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

export type UserDetails = {
  id: number,
  username: string,
  email: string,
  first_name: string,
  last_name: string,
  user_detail: {
    id?: number,
    phone_number: string,
    birth_date: Date,
    gender: string,
    user: any,
    documentId?: string,
  }
}
export interface BookingCreateInterface {
  id?: string;
  type: "return" | "one way";
  booking_status: string;
  passengers: number;
  luggages: number;
  from: Location | null;
  to: Location | null;
  date: Date;
  time: string;
  package?: IPackage;
  distance: number;
  ETA: number;
  amount: number;

  // The return section should only be present if the type is 'return'
  return_date?: Date;
  return_time?: string | null;

  // Optional fields for both 'one way' and 'return' booking types
  meet_greet: boolean;
  child_seat: number;
  airport_fee: number;
  flight_number?: string;
  user?: IGuestUser;
}
export interface BookingSelectInterface {
  id: string;
  documentId: string;
  booking_status: string;
  hasReturn: boolean;
  date: Date;
  time: string;
  passengers: number;
  distance: number;
  driver_id?: number;
  amount: number;
  luggages?: number;
  ETA?: number | null;
  type: "return" | "one way";
  from: Location;
  to: Location;
  flight_number?: string;
  gm_fees_percentage: number;
  vehicle_details?: unknown;
  canceled_by?: unknown;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  package: IPackage;

  return_date?: Date;
  return_time?: string | null;

  // Optional fields for both 'one way' and 'return' booking types
  meet_greet: boolean;
  child_seat: number;
  airport_fee: number;
}