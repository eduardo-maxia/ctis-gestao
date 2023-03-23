import { useGetSchema } from "utils/requests"

export default function AlunosIndex() {
  const { data } = useGetSchema('users')
  console.log("🚀 ~ file: index.tsx:5 ~ AlunosIndex ~ data:", data)
  return (
    <div>Alunos INDEX</div>
  )
}