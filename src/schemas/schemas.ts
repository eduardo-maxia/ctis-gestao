import { Dias, Professor, Sede } from "utils/enums"
import { z } from "zod"

const professorSchema = z.union([
  z.literal("Arlen"),
  z.literal("Andr\u00E9"),
  z.literal("Iury")
])
export const sedeSchema = z.union([
  z.literal("Arclo"),
  z.literal("Viva Esportes")
])
export const diasSchema = z.union([
  z.literal("Segunda e Quarta"),
  z.literal("Ter\u00E7a e Quinta"),
  z.literal("Outros")
])

export const tTurmaShowSchema = z.object({
  id: z.number().optional(),
  sede: sedeSchema,
  dia: diasSchema,
  horario: z.string(),
  professor: professorSchema,
  valor: z.number()
})

export const tTurmaIndexSchema = z.array(z.object({
  id: z.number(),
  sede: sedeSchema,
  dia: diasSchema,
  horario: z.string(),
  professor: professorSchema,
}))

const tAlunoCreateSchema = z.object({
  telefone: z.string(),
  apelido: z.string(),
  responsavel_checked: z.boolean().optional(),
  responsavel_nome: z.string().optional(),
  responsavel_telefone: z.string().optional(),
  data_inicio: z.string(),
  dia_vencimento: z.number()
})

export const tAlunoShowSchema = z.object({
  id: z.number(),
  name: z.string().nullable(),
  apelido: z.string(),
  email: z.string().nullable(),
  data_nascimento: z.string().nullable(),
  telefone: z.string(),
  tipo_sanguineo: z.string().nullable(),
  tamanho_pe: z.string().nullable(),
  tamanho_camisa: z.string().nullable(),
  contato_emergencia_nome: z.string().nullable(),
  contato_emergencia_telefone: z.string().nullable(),
  responsavel_nome: z.string().nullable(),
  responsavel_telefone: z.string().nullable(),
  responsavel_parentesco: z.string().nullable(),
  endereco: z.string().nullable(),
  cep: z.string().nullable(),
  foto_id: z.string().nullable(),
  data_inicio: z.string().nullable(),
  alergias: z.string().nullable(),
  expo_push_token: z.string().nullable(),
  desconto: z.number().nullable(),
  dia_vencimento: z.number(),
})

export const tAlunoIndexSchema = z.array(tAlunoShowSchema)
