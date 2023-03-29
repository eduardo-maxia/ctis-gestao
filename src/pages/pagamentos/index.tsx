import { Button, Card, Statistic } from "antd";
import MyPie from "components/Nivo/PieChart";
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { MyResponsiveLine } from "components/Nivo/LineChart";

export default function PagamentosIndex() {
  return (
    <div>
      <Card title="Painel de estatísticas" style={{ height: 400 }}>
        <div className="flex flex-row">
          {/* USO */}
          <MyPie />
          <Statistic
            title="Faturamento"
            value={12500}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            prefix={<ArrowUpOutlined />}
            suffix="(12%)"
          />
          <Statistic
            title="Quantidade de alunos"
            value={190}
            precision={0}
            valueStyle={{ color: '#3f8600' }}
            prefix={<ArrowUpOutlined />}
            suffix="/225 (1%)"
          />
          <Statistic
            title="Aderência ao App"
            value={10}
            precision={0}
            valueStyle={{ color: '#3f8600' }}
            prefix={<ArrowUpOutlined />}
            suffix="/225 (1%)"
          />
{/* <MyResponsiveLine /> */}
          
          {/* PAGAMENTOS */}
          {/* RECEITA */}
        </div>
        
      </Card>

      <Card title="Painel de Pagamentos">
        Geração de Pagamentos
        <br />
        <Button>
          Gerar pagamentos
          <br />
          do mês de Abril
        </Button>

        <br />

        Notificações
        <br />
        <div className="flex flex-row gap-4 justify-center">
          <Button>5</Button>
          <Button>10</Button>
          <Button>15</Button>
        </div>
      </Card >


    </div >
  )
}