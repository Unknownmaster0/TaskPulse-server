import { z } from "zod";

// todo: check if error occur in feature about the zod error with the regex message. 
// todo: Does the regex message is with {message: "message"} or just message: "message" 
export const SignUpZodSchema = z.object({
    username: z.string(),
    email: z.string().email().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format"),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number"),
})

export const LoginZodSchema = z.object({
    email: z.string().email().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format"),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number"),
})