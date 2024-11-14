import { z } from "zod";
import { patterns } from "../../../constants";
export const schema = z
  .intersection(
    z.object({
      name: z.string().min(1, { message: "name is required" }),
      email: z
        .string()
        .min(1, { message: "Email is required" })
        .refine((val) => patterns.email.test(val), {
          message: "please enter a valid email",
        }),
      state: z
        .array(z.string())
        .min(1, { message: "must have at least state selected" })
        .max(3, { message: "select max 3 states" }),
      languages: z
        .array(z.string())
        .min(1, { message: "please select at least one" }),
      gender: z.enum(["Male", "Female"]),
      skills: z.array(z.string()).max(3, "select only 3 skills"),
      registerationDateAndTime: z.date(),
      salaryRange: z.array(z.number()).min(2).max(2),
      isTeacher: z.boolean(),
    }),
    z.discriminatedUnion("variant", [
      z.object({ variant: z.literal("create") }),
      z.object({ variant: z.literal("edit"), id: z.string().min(1) }),
    ])
  )
  .and(
    z.union([
      z.object({ isTeacher: z.literal(false) }),
      z.object({
        isTeacher: z.literal(true),
        students: z.array(
          z.object({
            name: z.string().min(4, "you must have at least 4 characters"),
          })
        ),
      }),
    ])
  );

export type Schema = z.infer<typeof schema>;

export const defaultValues: Schema = {
  variant: "create",
  name: "",
  email: "",
  state: [],
  languages: [],
  gender: "Male",
  skills: [],
  registerationDateAndTime: new Date(),
  salaryRange: [0, 2000],
  isTeacher: true,
  students: [],
};
