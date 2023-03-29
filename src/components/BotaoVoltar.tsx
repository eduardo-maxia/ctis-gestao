import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons"

export default function BotaoVoltar() {
  const navigate = useNavigate()
  return (
    <Button onClick={() => navigate(-1)} style={{
      position: 'relative', borderWidth: 0, boxShadow: 'none',
      display: 'flex', alignItems: 'center'
    }}>
      <LeftOutlined />
      Voltar
    </Button>
  )
}