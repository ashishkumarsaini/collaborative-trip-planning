import z from 'zod';

export const FIRST_NAME_MAX_LIMIT = 25;
export const FIRST_NAME_MIN_LIMIT = 2;
export const LAST_NAME_MAX_LIMIT = 25;

// sign up schema
export const signUpFormSchema = z.object({
  firstName: z.string().min(FIRST_NAME_MIN_LIMIT, `First Name should be min ${FIRST_NAME_MIN_LIMIT}`).max(FIRST_NAME_MAX_LIMIT, `First Name should be max ${FIRST_NAME_MAX_LIMIT}`),
  lastName: z.string().max(LAST_NAME_MAX_LIMIT),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be atleast 8 characters.").max(20, "Password must be at most 20 characters."),
  confirmPassword: z.string().min(8, "Confirm password must be atleast 8 characters.").max(20, "Confirm password must be at most 20 characters.")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type SignUpFormSchemaType = z.infer<typeof signUpFormSchema>;

// log in schema
export const loginFormSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be atleast 8 characters.").max(20, "Password must be at most 20 characters."),
});

export type LoginFormSchemaType = z.infer<typeof loginFormSchema>;

export const TRIP_NAME_MIN_LENGTH = 5;
export const TRIP_NAME_MAX_LENGTH = 100;

// create trip schema
export const tripSchema = z.object({
  name: z.string().min(TRIP_NAME_MIN_LENGTH, `Name should be min ${TRIP_NAME_MIN_LENGTH}`).max(TRIP_NAME_MAX_LENGTH,),
  description: z.string(),
  startDate: z.date(),
});

export type TripSchemaType = z.infer<typeof tripSchema>;

// create activity schema
export const activitySchema = z.object({
  name: z.string().min(TRIP_NAME_MIN_LENGTH, `Name should be min ${TRIP_NAME_MIN_LENGTH}`).max(TRIP_NAME_MAX_LENGTH,),
  description: z.string(),
  numberOfDays: z.number().min(1, "Min days is 1").max(50, 'Max days is 50'),
  startDate: z.date(),
  location: z.object({ city: z.string(), description: z.string() }),
});

export type ActivitySchemaType = z.infer<typeof activitySchema>;
