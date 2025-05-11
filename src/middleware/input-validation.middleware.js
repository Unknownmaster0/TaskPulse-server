import ApiReponse from "../utils/ApiResponse.js";
import status_code from "../utils/status_code.js";
import userInputSchema from "../validation/user.input.js";

export const inputValidationMiddleware = (req, res, next) => {
    const { username, email, password } = req.body;
    const validBody = userInputSchema.safeParse({ username, email, password });
    if(!validBody.success) {
        const formatted = validBody.error.format();
        return res.status(status_code.BAD_REQUEST.code).json(new ApiReponse({
            statusCode: status_code.BAD_REQUEST.code,
            message: status_code.BAD_REQUEST.message,
            data: formatted
        }))
    }
    next();
}