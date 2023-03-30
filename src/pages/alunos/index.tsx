import { Button, Card, Descriptions, Input, List } from "antd"
import { cloneDeep } from "lodash"
import { useState } from "react"
import { Link } from "react-router-dom"
import { tAlunoIndexSchema } from "schemas/schemas"
import { formatDate, fuzzyStringMatcher } from "utils/general"
import { useGetSchema } from "utils/requests"

export default function AlunosIndex() {
  const { data, isFetching } = useGetSchema('users', tAlunoIndexSchema)
  const [filtro, setFiltro] = useState('')
  let filteredData = cloneDeep(data)?.filter(a => fuzzyStringMatcher(filtro, [a.apelido, a.name ?? '', a.responsavel_nome ?? '', a.telefone]))

  return (
    <div className="">
      <Input.Search placeholder="Busca avançada" onChange={e => setFiltro(e.target.value)}
        style={{ width: 200 }} className="my-5" />
      <br />

      {isFetching && <Card loading style={{ width: '100%' }}></Card>}
      {data &&
        <List
          style={{
            maxHeight: '70vh',
            overflowY: 'auto'
          }}
          className="mb-2 px-2"
          itemLayout="horizontal"
          dataSource={filteredData}
          renderItem={(aluno, index) => (
            <Card className="my-3">
              <Link to={aluno.id?.toString() || ''} className=''>
                <Descriptions title={aluno.apelido} bordered>
                  <Descriptions.Item label="Nome">{aluno.name}</Descriptions.Item>
                  <Descriptions.Item label="Telefone">{aluno.telefone}</Descriptions.Item>
                  <Descriptions.Item label="Dia de vencimento">{aluno.dia_vencimento}</Descriptions.Item>
                  {aluno.turmas?.map(t => (
                    <Descriptions.Item label={t.sede}>{t.dia} | {formatDate(t.horario, 'time')}</Descriptions.Item>
                  ))}
                </Descriptions>
              </Link>
            </Card>

          )}
        />}

      <Link to='create'>
        <Button>
          Cadastrar novo aluno
        </Button>
      </Link>

    </div>
  )
}