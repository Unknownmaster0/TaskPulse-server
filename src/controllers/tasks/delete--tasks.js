import Task from "../../models/task.model.js";
import ApiReponse from "../../utils/ApiResponse.js";
import STATUS_CODES from "../../utils/status_code.js";

const DeleteTask = async (req, res) => {
    const taskId = req.params.taskId;
    console.log(`taskId: ${taskId}`);
    try {
        const task = await Task.findByIdAndDelete({_id: taskId, user: req.id});

        if(task == null) {
            return res.status(STATUS_CODES.NO_CONTENT.code).json(new ApiReponse({
                statusCode: STATUS_CODES.NO_CONTENT.code,
                message: "Task not found"
            }));
        }

        return res.status(STATUS_CODES.SUCCESS.code).json(new ApiReponse({
            statusCode: STATUS_CODES.SUCCESS.code,
            message: "Task deleted successfully"
        }))
    } catch (error) {
        console.log(`error while deleting the task: ${error}`);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR.code).json(new ApiReponse({
            statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR.code,
            message: "Error while deleting the task from db"
        }))
    }
}

export default DeleteTask;