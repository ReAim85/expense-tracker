import { z } from "zod";

const registerUserSchema = z.object({
  name: z.string().min(3).max(20),
  email: z.string().email({ message: "Not a valid email id" }),
  password: z
    .string()
    .min(6, { message: "Password should be atleast 6 character long" })
    .max(15, { message: "Password Should not be longer then 15 characters" })
    .regex(/[!@#$%^&*(),.?"':;\|{}<>]/, {
      message: "Password must contain at least one special character.",
    }),
});

const userLoginSchema = z.object({
  email: z.string().email({ message: "Not a valid email id" }),
});

export { registerUserSchema, userLoginSchema };
