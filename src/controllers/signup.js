import User from "../models/user.model.js";
import ApiReponse from "../utils/ApiResponse.js";
import status_code from "../utils/status_code.js";
import jwt from "jsonwebtoken";

const Signup = async (req, res) => {
    const { username, email, password } = req.body;
    // console.log(username, email, password); // this come after validation only.
    // convert the email to lowercase. 
    try {
        const user = await User.create({username, email: email.toLowerCase(), password});
        const AccessToken = jwt.sign({id: user._id, name: user.username}, process.env.JWT_SECRET)
        return res.status(status_code.CREATED.code).json(new ApiReponse({
            statusCode: status_code.CREATED.code,
            message: status_code.CREATED.message,
            data: {
                name: user.username,
                email: user.email,
                AccessToken
            }
        }))
    } catch (error) {
        console.error(`Error while creating user: ${error}`);
        return res.status(status_code.INTERNAL_SERVER_ERROR.code).json(new ApiReponse({
            statusCode: status_code.INTERNAL_SERVER_ERROR.code,
            message: status_code.INTERNAL_SERVER_ERROR.message
        }))
    }
}

export default Signup;