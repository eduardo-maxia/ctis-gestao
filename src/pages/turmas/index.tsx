import { Collapse, List, Segmented, Button, Card } from "antd"
import { tTurmaIndexSchema } from "schemas/schemas";
import { useGetSchema } from "utils/requests"
import { formatDate } from "utils/general";
import { Link } from "react-router-dom";
import { useState } from "react";
import { cloneDeep } from "lodash";


export default function TurmasIndex() {
  const { data, isFetching } = useGetSchema('turmas', tTurmaIndexSchema)
  const [filtroDias, setFiltroDias] = useState('')
  const [filtroProfessor, setFiltroProfessor] = useState('')

  let filteredData = cloneDeep(data)?.filter(t => filtroDias === '' || t.dia === filtroDias)
  filteredData = filteredData?.filter(t => filtroProfessor === '' || t.professor === filtroProfessor)

  return (
    <div className="">
      <Segmented
        options={[
          {
            label: (
              <div style={{ padding: 4 }}>
                <div>Todos</div>
              </div>
            ),
            value: '',
          },
          {
            label: (
              <div style={{ padding: 4 }}>
                <div>Segunda</div>
                <div>e Quarta</div>
              </div>
            ),
            value: 'Segunda e Quarta',
          },
          {
            label: (
              <div style={{ padding: 4 }}>
                <div>Terça e</div>
                <div>Quinta</div>
              </div>
            ),
            value: 'Terça e Quinta',
          },
          {
            label: (
              <div style={{ padding: 4 }}>
                <div>Outros</div>
              </div>
            ),
            value: 'Outros',
          },
        ]}
        className="my-5"
        onChange={e => setFiltroDias(e.toString())}
      />
      <br />
      <Segmented
        options={[
          {
            label: (
              <div style={{ padding: 4 }}>
                <div>Todos</div>
              </div>
            ),
            value: '',
          },
          {
            label: (
              <div style={{ padding: 4 }}>
                <div>Arlen</div>
              </div>
            ),
            value: 'Arlen',
          },
          {
            label: (
              <div style={{ padding: 4 }}>
                <div>André</div>
              </div>
            ),
            value: 'André',
          },
          {
            label: (
              <div style={{ padding: 4 }}>
                <div>Iury</div>
              </div>
            ),
            value: 'Iury',
          },
        ]}
        className="my-5"
        onChange={e => setFiltroProfessor(e.toString())}
      />
      <br />

      {isFetching && <Card loading style={{ width: '100%' }}></Card>}
      {filteredData && <Collapse className="my-5">
        <Collapse.Panel header={`Arclo (${filteredData.filter(t => t.sede === 'Arclo').length})`} key='Arclo'>
          <List
            itemLayout="horizontal"
            dataSource={filteredData.filter(t => t.sede === 'Arclo')}
            renderItem={(turma) => (
              <List.Item>
                <Link to={turma.id?.toString() || ''} className=''>
                  <>
                    {[turma.dia, formatDate(turma.horario, 'time'), turma.professor].join('  |  ')}
                  </>
                </Link>
              </List.Item>
            )}
          />
        </Collapse.Panel>

        <Collapse.Panel header={`Viva Esportes (${filteredData.filter(t => t.sede === 'Viva Esportes').length})`} key='Viva Esportes'>
          <List
            itemLayout="horizontal"
            dataSource={filteredData.filter(t => t.sede === 'Viva Esportes')}
            renderItem={(turma) => (
              <List.Item>
                <Link to={turma.id?.toString() || ''} className=''>
                  <>
                    {[turma.dia, formatDate(turma.horario, 'time'), turma.professor].join('  |  ')}
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