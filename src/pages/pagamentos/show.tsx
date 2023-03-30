import { useParams } from "react-router-dom"
import { useGetSchema } from "utils/requests"

export default function PagamentosShow() {
  const { pagamento_id } = useParams()
  const { data } = useGetSchema('pagamentos/' + pagamento_id)
  console.log("🚀 ~ file: show.tsx:7 ~ PagamentosShow ~ data:", data)
  return (
    <div>Pagamentos Show</div>
  )
}