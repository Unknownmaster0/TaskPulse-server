import mongoose from "mongoose";
import ApiReponse from "../../utils/ApiResponse.js"
import STATUS_CODES from "../../utils/status_code.js"
import Task from "../../models/task.model.js";
import taskCreateInputZodSchema from "../../validation/task.input.js";

const CreateTask = async (req, res) => {
    let task = req.body; // this come after validation only.

    const validInput = taskCreateInputZodSchema.safeParse(task);
    if(!validInput.success) {
        const formatted = validInput.error.format();
        return res.status(STATUS_CODES.BAD_REQUEST.code).json(new ApiReponse({
            statusCode: STATUS_CODES.BAD_REQUEST.code,
            message: STATUS_CODES.BAD_REQUEST.message,
            data: formatted
        }))
    }

    task = validInput.data;

    // have to check whether optional field is provided by the user or not, and based on that create the task.
    // like have to check -- status, dueDate, description, priority.
    // then have to create one mongodb transaction for the priority, such that when more than one user creating the tasks at the same time in case of the workspace, then position will update accordingly.
    const taskData = {
        title: task.title,
        user: req.id
    };

    if(task.description) taskData.description = task.description;
    if(task.status) taskData.status = task.status;
    if(task.priority) taskData.priority = task.priority;
    if(task.dueDate) taskData.dueDate = task.dueDate;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // I think from here I should start the mongoose transaction.
        const inputStatus = taskData.status || "To-Do";
        const nextPosition = await Task.countDocuments({status: inputStatus, user: req.id}, {session});

        taskData.position = nextPosition + 1;

        const taskCreated = await Task.create([taskData], {session});

        // after successfull creation of the task, commit the transaction.
        session.commitTransaction();

        // send the success response.
        return res.status(STATUS_CODES.CREATED.code).json(new ApiReponse({
            statusCode: STATUS_CODES.CREATED.code,
            message: "Task created successfully 🎉",
            data: taskCreated[0]
        }))
    } catch (error) {
        // at the time of error, abort the session created.
        await session.abortTransaction();
        console.log(`error while creating the task: ${error}`);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR.code).json(new ApiReponse({
            statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR.code,
            message: "Error while creating the task from db"
        }))
    } finally {
        // after either success or error, end the session.
        session.endSession();
    }
}

export default CreateTask;