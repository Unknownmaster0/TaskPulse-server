import { z } from "zod";

// learn: about the errorMap method of the zod. to give the custom error message.
const taskCreateInputZodSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z
    .enum(["To-Do", "In Progress", "Completed"], {
      errorMap: () => ({ message: "Invalid status" }),
    })
    .optional(),
  priority: z
    .enum(["Low", "Medium", "High"], {
      errorMap: () => ({ message: "Invalid priority" }),
    })
    .optional(),
  dueDate: z.string().datetime().optional(),
  position: z.number().int().positive(),
});

export default taskCreateInputZodSchema;

export const taskUpdateInputZodSchema = z
  .object({
    description: z.string().optional(),
    status: z
      .enum(["To-Do", "In Progress", "Completed"], {
        errorMap: () => ({ message: "Invalid status" }),
      })
      .optional(),
    priority: z
      .enum(["Low", "Medium", "High"], {
        errorMap: () => ({ message: "Invalid priority" }),
      })
      .optional(),
    dueDate: z
      .string()
      .optional()
      .refine(
        (val) => !val || !isNaN(Date.parse(val)), // Check if valid date
        { message: "Invalid date format" }
      ),
    position: z.preprocess(
      (val) => (typeof val === "string" ? parseInt(val, 10) : val), // Convert string to number
      z.number().int().positive().optional()
    ),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required to update",
  });
