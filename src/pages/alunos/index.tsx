import { Button, Card, Input, List } from "antd"
import { cloneDeep } from "lodash"
import { useState } from "react"
import { Link } from "react-router-dom"
import { tAlunoIndexSchema } from "schemas/schemas"
import { fuzzyStringMatcher } from "utils/general"
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
            maxHeight: '80vh',
            overflowY: 'auto'
          }}
          itemLayout="horizontal"
          dataSource={filteredData}
          renderItem={(aluno, index) => (
            <Card className="my-3">
              <Link to={aluno.id?.toString() || ''} className=''>
                <>
                  {['Apelido: ' + aluno.apelido, 'Nome: ' + aluno.name, 'Telefone: ' + aluno.telefone].join('  |  ')}
                </>
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