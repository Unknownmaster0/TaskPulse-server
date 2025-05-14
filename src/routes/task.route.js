import { Router } from "express";
import AuthenticateUser from "../middleware/authentication.middleware.js";
import DeleteTask from "../controllers/tasks/delete--tasks.js";
import GetAllTasks from "../controllers/tasks/get-all-tasks.js";
import CreateTask from "../controllers/tasks/create-task.js";
import UpdateTask from "../controllers/tasks/update-task.js";

const router = Router();

router.route("/view").get(AuthenticateUser, GetAllTasks);
router.route("/create").post(AuthenticateUser, CreateTask);
router.route("/delete/:taskId").delete(AuthenticateUser, DeleteTask);
router.route("/update/:taskId").put(AuthenticateUser, UpdateTask);

export default router;