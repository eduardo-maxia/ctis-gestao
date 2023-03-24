import { Collapse, Avatar, List, Segmented, Button } from "antd"
import { tTurmaIndexSchema } from "schemas/schemas";
import { useGetSchema } from "utils/requests"
import dayjs from "dayjs"
import { formatDate } from "utils/general";
import { Link } from "react-router-dom";


export default function TurmasIndex() {
  const { data } = useGetSchema('turmas', tTurmaIndexSchema)
  return (
    <div>
      Turmas INDEX
      <br />
      Filtros
      <br />
      <Segmented
        options={[
          {
            label: (
              <div style={{ padding: 4 }}>
                <div>Todos</div>
              </div>
            ),
            value: 'spring',
          },
          {
            label: (
              <div style={{ padding: 4 }}>
                <div>Segunda</div>
                <div>e Quarta</div>
              </div>
            ),
            value: 'summer',
          },
          {
            label: (
              <div style={{ padding: 4 }}>
                <div>Terça e</div>
                <div>Quinta</div>
              </div>
            ),
            value: 'autumn',
          },
          {
            label: (
              <div style={{ padding: 4 }}>
                <div>Outros</div>
              </div>
            ),
            value: 'winter',
          },
        ]}
      />

      {data && <Collapse>
        <Collapse.Panel header='Arclo' key='Arclo'>
          <List
            itemLayout="horizontal"
            dataSource={data.filter(t => t.sede === 'Arclo')}
            renderItem={(turma, index) => (
              <List.Item>
                <Link to={turma.id?.toString() || ''} className=''>
                  <>
                    {turma.dia} |
                    {formatDate(turma.horario, 'time')} |
                    {turma.professor}
                  </>
                </Link>
              </List.Item>
            )}
          />
        </Collapse.Panel>

        <Collapse.Panel header='Viva Esportes' key='Viva Esportes'>
          <List
            itemLayout="horizontal"
            dataSource={data.filter(t => t.sede === 'Viva Esportes')}
            renderItem={(turma, index) => (
              <List.Item>
                <Link to={turma.id?.toString() || ''} className=''>
                  <>
                    {turma.dia} |
                    {formatDate(turma.horario, 'time')} |
                    {turma.professor}
                  </>
                </Link>
              </List.Item>
            )}
          />
        </Collapse.Panel>
      </Collapse>}

      <Link to='create'>
        <Button>
          Criar nova turma
        </Button>
      </Link>

    </div>
  )
}