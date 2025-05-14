import Task from "../../models/task.model.js"
import ApiReponse from "../../utils/ApiResponse.js";
import STATUS_CODES from "../../utils/status_code.js";


const GetAllTasks = async (req, res) => {
    try {
        // after getting authenticated, id of the user is stored in req.id
        const tasks =  await Task.find({ user: req.id }).sort({ position: 1 });
        return res.status(STATUS_CODES.SUCCESS.code).json(new ApiReponse({
            statusCode: STATUS_CODES.SUCCESS.code,
            message: "Tasks send successfully 🎉",
            data: tasks
        }))
    } catch (error) {
        console.log(`error while getting the tasks of the particular user: ${error}`);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR.code).json(new ApiReponse({
            statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR.code,
            message: "Error while getting the tasks of the particular user from db"
        }))
    }
}

export default GetAllTasks;