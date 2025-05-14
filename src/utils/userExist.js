import User from "../models/user.model.js";

export const UserExist = async (email) => {
    try {
        const user = await User.findOne({email});
        if(user) {
            return 1;
        }
        return 0;
    } catch (error) {
        console.log(`error while finding user exist: ${error}`);
        return 2;
    }
}