import ApiReponse from "../utils/ApiResponse.js";
import status_code from "../utils/status_code.js";
import { UserExist } from "../utils/userExist.js";
import { SignUpZodSchema } from "../validation/user.input.js";

export const SignupinputValidationMiddleware = async (req, res, next) => {
    const { username, email, password } = req.body;
    const inputEmail = email.toLowerCase();
    const validBody = SignUpZodSchema.safeParse({ username, email: inputEmail, password });
    if(!validBody.success) {
        const formatted = validBody.error.format();
        return res.status(status_code.BAD_REQUEST.code).json(new ApiReponse({
            statusCode: status_code.BAD_REQUEST.code,
            message: status_code.BAD_REQUEST.message,
            data: formatted
        }))
    }
    // check if user exist with this email already.
    const userExist = await UserExist(inputEmail);
    if(userExist === 1) {
        return res.status(status_code.BAD_REQUEST.code).json(new ApiReponse({
            statusCode: status_code.BAD_REQUEST.code,
            message: "User with this email already exist"
        }))
    } else if(userExist === 2) {
        return res.status(status_code.INTERNAL_SERVER_ERROR.code).json(new ApiReponse({
            statusCode: status_code.INTERNAL_SERVER_ERROR.code,
            message: status_code.INTERNAL_SERVER_ERROR.message
        }))
    }
    next();
}

