import { z } from "zod";
// schemas/profileSchema.ts

// export const profileSchema = z.object({
//   username: z.string().min(2, "Username is required"),
//   email: z.string().email("Invalid email address"),
//   first_name: z.string().min(1, "First name is required"),
//   last_name: z.string().min(1, "Last name is required"),
//   user_detail: z.object({
//     documentId: z.string().optional(),// Optional for new users, required for updates
//     user: z.number().optional(),
//     phone_number: z.string().optional(),
//     gender: z.enum(["Male", "Female"]),
//     birth_date: z
//       .string(),
//   }),
// });

// export type ProfileFormData = z.infer<typeof profileSchema>;

export const LoginSchema = z.object({
  identifier: z.string(),
  password: z.string(),
});
export const ForgotPasswordSchema = z.object({
  email: z.email(),
});

export const EmailConfirmationSchema = z.object({
  otp: z.string().min(4, "OTP is required"),
});

export const ChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(6, "Current is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    passwordConfirmation: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });
export const ResetPasswordSchema = z
  .object({
    code: z.string().min(6, "Code is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    passwordConfirmation: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });

export const locationSchema = z.object({
  address: z.string().min(1, "Address is required"),
  postcode: z.string().min(1, "Postcode is required"),
  latitude: z.number(),
  longitude: z.number(),
  isAirport: z.boolean().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
});
export const tripSchema = z.object({
  type: z.enum(["one way", "return"]).refine((val) => !!val, {
    message: "Trip type is required",
  }),
  from: z.string(),
  to: z.string(),
  date: z.any(),
  time: z.string().min(1, "Pickup time is required"),
});
export const tripDetailsSchema = z.object({
  type: z.enum(["one way", "return"]).refine((val) => !!val, {
    message: "Trip type is required",
  }),
  from: z.string(),
  to: z.string(),
  date: z.any(),
  time: z.string().min(1, "Pickup time is required"),
  passengers: z.string({ error: "Number is required" }),
  luggages: z.string(),
  flight_number: z.string().optional(),
  return_date: z.any().optional(),
  return_time: z.string().optional(),
  meet_greet: z.boolean().optional(),
});
// export const CoordinatesSchema = z.object({
//   lat: z.number(),
//   lng: z.number(),
// })

// export const ImageSchema = z.object({
//   id: z.number(),
//   name: z.string(),
//   alternativeText: z.string().nullable(),
//   caption: z.string().nullable(),
//   width: z.number(),
//   height: z.number(),
//   formats: z.record(z.unknown()), // Replace with specific structure if known
//   hash: z.string(),
//   ext: z.string(),
//   mime: z.string(),
//   size: z.number(),
//   url: z.string(),
//   previewUrl: z.string().nullable(),
//   provider: z.string(),
//   provider_metadata: z.record(z.unknown()).nullable(),
//   createdAt: z.string().datetime(),
//   updatedAt: z.string().datetime(),
//   documentId: z.string(),
//   publishedAt: z.string().datetime(),
// })

// export const PackageSchema = z.object({
//   id: z.number(),
//   name: z.string(),
//   type: z.string(),
//   num_of_passengers: z.number(),
//   num_of_big_suits: z.number(),
//   num_of_small_suits: z.number(),
//   createdAt: z.string().datetime(),
//   updatedAt: z.string().datetime(),
//   publishedAt: z.string().datetime(),
//   documentId: z.string(),
//   price_options: z.object({
//     baseFare: z.number(),
//     perMin: z.number(),
//     commission: z.number(),
//     distanceBands: z.array(
//       z.object({
//         limit: z.number(),
//         rate: z.number(),
//       })
//     ),
//   }),
//   image: ImageSchema.optional(),
// })

// export const BookingTypeSchema = z
//   .enum(['one way', 'return'])
//   .default('one way')
//   export const AddressSchema = z.object({
//     postcode: z.string(),
//     line_1: z.string(),
//     line_2: z.string().optional(),
//     line_3: z.string().optional(),
//     post_town: z.string(),
//     county: z.string(),
//     country: z.string(),
//     building_number: z.string().optional(),
//     building_name: z.string().optional(),
//     sub_building_name: z.string().optional(),
//     department_name: z.string().optional(),
//     organisation_name: z.string().optional(),
//     udprn: z.string(),
//     postcode_type: z.string(),
//     su_organisation_indicator: z.string(),
//     delivery_point_suffix: z.string(),
//   });
// export const LocationSchema = z.object({
//   address: z.string(),
//   country: z.string(),
//   state: z.string(),
//   city: z.string(),
//   postcode: z.string(),
//   latitude: z.number(),
//   longitude: z.number(),
//   isAirport: z.boolean().optional(),
// })
// export const PickupReturnDateSchema = z.object({
//   date: z.string().datetime(),
// });
// export const BookingSchema = z
//   .object({
//     passengers: z.string().optional(),
//     type: BookingTypeSchema,

//     from_location: LocationSchema,
//     to_location: LocationSchema,
//     date: z.string().datetime().optional().nullable(),
//     from_package: PackageSchema.optional(),
//     from_distance: z.number().optional(),
//     from_duration: z.number().optional(),
//     from_amount: z.number().optional(),
//     return_from: LocationSchema.optional(),
//     return_to: LocationSchema.optional(),
//     return_date: z.string().datetime().optional().nullable(),
//     return_package: PackageSchema.optional(),
//     return_distance: z.number().optional(),
//     return_duration: z.number().optional(),
//     return_amount: z.number().optional(),
//     meet_greet: z.number().optional(),
//     flight_number: z.string().optional(),
//     airport_fee: z.number().optional(),
//   })
//   .refine(
//     data =>
//       data.type === 'return'
//         ? data.return_from && data.return_to && data.return_date
//         : true,
//     {
//       message: 'Return details are required for a return trip.',
//       path: ['return_from', 'return_to', 'return_date', 'return_package'],
//     }
//   )

export const GuestSchema = z.object({
  username: z.string(),
  gender: z.string(),
  birth_date: z.date(),
  phone_number: z.string(),
  email: z.email(),
  first_name: z.string().min(3),
  last_name: z.string().min(3),
});

export const UserRegisterSchema = z.object({
  first_name: z.string().min(3),
  last_name: z.string().min(3),
  email: z.string().email(),
  phone_number: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number format" }),
  gender: z.string(),
  birth_date: z.string(),
});

export const RegisterSchema = z
  .object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const ContactFormSchema = z.object({
  name: z.string().min(3),
  email: z.email(),
  phone: z.string().max(15),
  description: z.string().max(255),
});

export const UserProfileFormSchema = z.object({
  username: z
    .string()
    .min(3, { error: "Username must be at least 3 characters" })
    .max(20, { error: "Username cannot exceed 20 characters" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores",
    }),

  email: z.email(),

  first_name: z
    .string()
    .min(1, "Required")
    .max(50, "First name cannot exceed 50 characters")
    .regex(/^[a-zA-Z]+$/, {
      message: "First name can only contain letters",
    }),

  last_name: z
    .string()
    .min(1, "required")
    .max(50, "Last name cannot exceed 50 characters")
    .regex(/^[a-zA-Z]+$/, {
      message: "Last name can only contain letters",
    }),

  phone_number: z.string().regex(/^\+?[0-9\s\-]+$/, {
    message: "Please enter a valid phone number",
  }),

  gender: z.string().min(1, "Required"),

  birth_date: z
    .date()
    .max(new Date(), {
      message: "Birth date cannot be in the future",
    })
    .refine(
      (date) => {
        const ageDiff = Date.now() - date.getTime();
        const ageDate = new Date(ageDiff);
        const age = Math.abs(ageDate.getUTCFullYear() - 1970);
        return age >= 13;
      },
      {
        message: "You must be at least 13 years old",
      }
    ),
});