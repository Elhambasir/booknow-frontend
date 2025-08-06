// export type BookingType = 'one way' | 'return'

// export type BookingProps = {
//   tab: string
// }

// export type ICoordinates = {
//   lat: number
//   lng: number
// }

// export interface Address {
//   postcode: string;
//   line_1: string;
//   line_2?: string;
//   line_3?: string;
//   post_town: string;
//   county: string;
//   country: string;
//   building_number?: string;
//   building_name?: string;
//   sub_building_name?: string;
//   department_name?: string;
//   organisation_name?: string;
//   udprn: string;
//   postcode_type: string;
//   su_organisation_indicator: string;
//   delivery_point_suffix: string;
// }

// export interface LocationSearchResult {
//   id: string;
//   display_name: string;
//   address: Address;
//   type: 'postcode' | 'address' | 'airport' | 'station';
//   coordinates?: {
//     lat: number;
//     lng: number;
//   };
// }

// export interface UserDetail {
//   documentId?: string;
//   user: number;
//   phone_number: string;
//   gender: 'Male' | 'Female';
//   birth_date: string;
// }

// export interface AddressSuggestion {
//   id: string;
//   summaryline: string;
//   addressline1: string;
//   addressline2?: string;
//   addressline3?: string;
//   posttown: string;
//   county?: string;
//   postcode: string;
//   type: 'ADD' | 'CACHE' | string;
//   count?: number;
//   locationsummary?: string;
// }

// export interface CacheItem {
//   url: string;
//   suggestions: AddressSuggestion[];
//   label: string;
// }

// export interface PostcoderConfig {
//   apikey: string;
//   geolocate?: boolean;
//   searchterm: string;
//   singlesummary?: boolean;
//   suggestions: string;
//   country?: string;
//   countrycode?: string;
//   organisation?: string;
//   addressline1: string;
//   addressline2?: string;
//   addressline3?: string;
//   addressline4?: string;
//   county?: string;
//   posttown: string;
//   postcode: string;
// }

// export interface SuggestionItem {
//   type: string;
//   dataId: string;
// }

// export interface User {
//   id: number;
//   username: string;
//   email: string;
//   documentId?: string;
//   first_name: string;
//   last_name: string;
//   avatar?: string;
//   user_detail?: UserDetail;
// }

// export type Location = {
//   address: string;
//   postcode: string;
//   latitude: number;
//   longitude: number;
//   isAirport?: boolean;
//   city: string;
//   state: string;
//   country: string;
// }

// export type Image = {
//   id: number
//   name: string
//   alternativeText?: string | null
//   caption?: string | null
//   width: number
//   height: number
//   formats: Record<string, unknown>
//   hash: string
//   ext: string
//   mime: string
//   size: number
//   url: string
//   previewUrl?: string | null
//   provider: string
//   provider_metadata?: Record<string, unknown> | null
//   createdAt: string
//   updatedAt: string
//   documentId: string
//   publishedAt: string
// }

// export type IPackage = {
//   id: number | undefined
//   name: string
//   type: string
//   num_of_passengers: number
//   num_of_big_suits: number
//   num_of_small_suits: number
//   createdAt: string
//   updatedAt: string
//   publishedAt: string
//   documentId: string
//   image?: Image
//   price_options: {
//     baseFare: number
//     perMin: number
//     commission: number
//     distanceBands: {
//       limit: number,
//       rate: number
//     }[]
//   }
// }

// export interface Package {
//   id: string;
//   name: string;
//   type: 'economy' | 'standard' | 'premium' | 'luxury';
//   num_of_passengers: number;
//   num_of_big_suits: number;
//   num_of_small_suits: number;
//   image?: string;
// }

// export interface Booking {
//   id: string;
//   user_id: string;
//   date: string;
//   time: string;
//   passengers: number;
//   distance: number;
//   package_id: string;
//   package: Package;
//   amount: number;
//   luggages: number;
//   has_return: boolean;
//   type: 'one_way' | 'return' | 'hourly';
//   cancel_reason?: string;
//   flight_number?: string;
//   from: {
//     city: string;
//     state: string;
//     address: string;
//     country: string;
//     zipCode: string;
//     coordinates: {
//       lat: number;
//       lng: number;
//     };
//   };
//   to: {
//     city: string;
//     state: string;
//     address: string;
//     country: string;
//     zipCode: string;
//     coordinates: {
//       lat: number;
//       lng: number;
//     };
//   };
//   booking_status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
//   created_at: string;
// }

// export interface IBooking {
//   id?: string
//   type?: 'return' | 'one way'
//   passengers?: string
//   from_location: Location | null
//   to_location: Location | null
//   date: Date
//   from_package?: IPackage
//   from_distance?: number
//   from_duration?: number | null
//   from_amount?: number | null

//   // The return section should only be present if the type is 'return'
//   return_from?: Location | null
//   return_to?: Location | null
//   return_date?: string | null
//   return_package?: IPackage | undefined
//   return_distance?: number | undefined
//   return_duration?: number | undefined
//   return_amount?: number | null

//   // Optional fields for both 'one way' and 'return' booking types
//   meet_greet: boolean
//   child_seat?: number
//   airport_fee?: number
//   flight_number?: string

//   user?: IGuestUser
// }

// export type IGuestUser = {
//   id?: string
//   username?: string
//   email?: string
//   first_name?: string
//   last_name?: string
//   phone_number?: string
//   gender?: string
//   birth_date?: string
//   flight_number?: string
// }