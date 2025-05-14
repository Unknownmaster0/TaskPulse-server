import Task from "../../models/task.model.js";
import ApiReponse from "../../utils/ApiResponse.js";
import STATUS_CODES from "../../utils/status_code.js";
import { taskUpdateInputZodSchema } from "../../validation/task.input.js";

const UpdateTask = async (req, res) => {
  const taskId = req.params.taskId;
  let updateInput = req.body;

  const validInput = taskUpdateInputZodSchema.safeParse(updateInput);
  if (!validInput.success) {
    const formatted = validInput.error.format();
    return res.status(STATUS_CODES.BAD_REQUEST.code).json(
      new ApiReponse({
        statusCode: STATUS_CODES.BAD_REQUEST.code,
        message: STATUS_CODES.BAD_REQUEST.message,
        data: formatted,
      })
    );
  }

  updateInput = validInput.data;

  const updateData = {};
  if (updateInput.description) updateData.description = updateInput.description;
  if (updateInput.status) updateData.status = updateInput.status;
  if (updateInput.priority) updateData.priority = updateInput.priority;
  if (updateInput.dueDate) updateData.dueDate = updateInput.dueDate;
  if (updateInput.position) updateData.position = updateInput.position;

  // if updateInput is still empty, then no need to update anything. User not provided any data to update.
  if (Object.keys(updateData).length == 0) {
    return res.status(STATUS_CODES.BAD_REQUEST.code).json(
      new ApiReponse({
        statusCode: STATUS_CODES.BAD_REQUEST.code,
        message: "No data provided to update",
      })
    );
  }

  try {
    const task = await Task.findOneAndUpdate(
      { _id: taskId, user: req.id },
      updateData,
      { new: true }
    );

    if (task == null)
      return res.status(STATUS_CODES.NO_CONTENT.code).json(
        new ApiReponse({
          statusCode: STATUS_CODES.NO_CONTENT.code,
          message: "Task not found",
        })
      );

    return res.status(STATUS_CODES.SUCCESS.code).json(
      new ApiReponse({
        statusCode: STATUS_CODES.SUCCESS.code,
        message: "Task updated successfully",
        data: {
          id: task._id,
          title: task.title,
          description: task.description,
          status: task.status,
          priority: task.priority,
          dueDate: task.dueDate,
          position: task.position,
        },
      })
    );
  } catch (error) {
    console.log(`error while updating the task: ${error}`);
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR.code).json(
      new ApiReponse({
        statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR.code,
        message: "Error while updating the task from db",
      })
    );
  }
};

export default UpdateTask;
