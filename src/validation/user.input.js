import { z } from "zod";

const emailRegex = process.env.EMAIL_REGEX;
const passwordRegex = process.env.PASSWORD_REGEX;

// todo: check if error occur in feature about the zod error with the regex message. 
// todo: Does the regex message is with {message: "message"} or just message: "message" 
const userInputSchema = z.object({
    username: z.string(),
    email: z.string().email({message: "Invalid email format"}).regex(emailRegex, "Invalid email format"),
    password: z.string().regex(passwordRegex, "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number"),
})

export default userInputSchema;