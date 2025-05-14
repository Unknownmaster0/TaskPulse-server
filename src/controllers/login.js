import User from "../models/user.model.js";
import ApiReponse from "../utils/ApiResponse.js";
import STATUS_CODES from "../utils/status_code.js";
import jwt from "jsonwebtoken"

const LoginController = async (req, res) => {
    const email = req.email;
    const password = req.password;
    try {
        const user = await User.findOne({email});
        if(!user) {
            return res.status(STATUS_CODES.BAD_REQUEST.code).json(new ApiReponse({
                statusCode: STATUS_CODES.BAD_REQUEST.code,
                message: "No such user with this email",
            }));
        }

        const isValidPassword = await user.comparePassword(password);
        if(!isValidPassword) {
            return res.status(STATUS_CODES.BAD_REQUEST.code).json(new ApiReponse({
                statusCode: STATUS_CODES.BAD_REQUEST.code,
                message: "Invalid password"
            }));
        }

        // now the user and password both are valid here.
        // create the token and send it back to the user.
        // console.log("jwt secret: ", jwt_secret);
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        return res.status(STATUS_CODES.SUCCESS.code).json(new ApiReponse({
            statusCode: STATUS_CODES.SUCCESS.code,
            message: STATUS_CODES.SUCCESS.message,
            data: {
                name: user.username,
                email: user.email,
                token
            }
        }));
    } catch (error) {
        console.log('error while logging in: ', error);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR.code).json(new ApiReponse({
            statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR.code,
            message: STATUS_CODES.INTERNAL_SERVER_ERROR.message
        }))
    }
}

export default LoginController;