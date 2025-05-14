import ApiReponse from "../utils/ApiResponse.js";
import STATUS_CODES from "../utils/status_code.js";
import { LoginZodSchema } from "../validation/user.input.js";

export const LoginInputValidationMiddleware = (req, res, next) => {
    const {email, password} = req.body;
    const inputEmail = email.toLowerCase();
    const validBody = LoginZodSchema.safeParse({email: inputEmail, password});
    if(!validBody.success) {
        const formatted = validBody.error.format();
        return res.status(STATUS_CODES.BAD_REQUEST.code).json(new ApiReponse({
            statusCode: STATUS_CODES.BAD_REQUEST.code,
            message: STATUS_CODES.BAD_REQUEST.message,
            data: formatted
        }))
    }
    req.email = inputEmail;
    req.password = password;
    next();
}