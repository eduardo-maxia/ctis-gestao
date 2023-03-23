import { z } from "zod"

export const tTurmaShowSchema = z.object({
  sede: z.string(),
  dia: z.string(),
  horario: z.string(),
  professor: z.string(),
  valor: z.number()
})