import z from "zod";

export const LoginSchema = z.object({
  email: z.email("E-mail invalido"),
});

export type LoginInput = z.infer<typeof LoginSchema>;
