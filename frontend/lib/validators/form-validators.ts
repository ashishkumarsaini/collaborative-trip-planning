import z from 'zod';

export const FIRST_NAME_MAX_LIMIT = 25;
export const FIRST_NAME_MIN_LIMIT = 2;
export const LAST_NAME_MAX_LIMIT = 25;

// sign up schema
export const signUpFormSchema = z.object({
  firstName: z.string().min(FIRST_NAME_MIN_LIMIT, `First Name should be min ${FIRST_NAME_MIN_LIMIT}`).max(FIRST_NAME_MAX_LIMIT),
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