import { z } from "zod";

// learn: about the errorMap method of the zod. to give the custom error message.
const taskInputSchema = z.object({
    userId: z.string(),
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    status: z.enum(['To-Do', 'In Progress', 'Completed'], {
        errorMap: () => ({ message: "Invalid status" }),
    }),
    priority: z.enum(['Low', 'Medium', 'High'], {
        errorMap: () => ({ message: "Invalid priority" }),
    }),
    dueDate: z.string().datetime().optional(),
    position: z.number().int().positive()
})

export default taskInputSchema;