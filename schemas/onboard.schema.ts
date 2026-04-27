import z from "zod";

export const onboardSchema = z.object({
  name: z.string().min(2, "O nome é obrigatório"),
  email: z.email("Informe um email valido"),
});

export type OnboardInput = z.infer<typeof onboardSchema>;
