import jwt from 'jsonwebtoken';
import ApiResponse from '../utils/ApiResponse.js';
import status_code from '../utils/status_code.js';

const AuthenticateUser = function (req, res, next) {
  const token = req.headers.authorization;
  //   if token is empty means the user is not logged in, then not to do anything, send to login page to the user.
  if (!token) {
    return res
      .status(status_code.UNAUTHORIZED.code)
      .json(new ApiResponse({
        statusCode: status_code.UNAUTHORIZED.code, 
        message: status_code.UNAUTHORIZED.message,
    }));
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET); // have the data of the user.
    req.id = payload.id;
    next();
  } catch (err) {
    console.error(`Error while verifying user in AuthenticateUser: ${err}`);
    return res.status(status_code.BAD_REQUEST.code).json(new ApiResponse({
        statusCode: status_code.BAD_REQUEST.code,
        message: status_code.BAD_REQUEST.message
    }));
  }
};

export default AuthenticateUser;