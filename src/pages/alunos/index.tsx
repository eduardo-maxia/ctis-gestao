import { Button, List } from "antd"
import { Link } from "react-router-dom"
import { tAlunoIndexSchema } from "schemas/schemas"
import { useGetSchema } from "utils/requests"

export default function AlunosIndex() {
  const { data } = useGetSchema('users', tAlunoIndexSchema)
  return (
    <div>
      Alunos INDEX
      <br />
      Filtros
      <br />

      {data &&
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(aluno, index) => (
            <List.Item>
              <Link to={aluno.id?.toString() || ''} className=''>
                <>
                  {aluno.apelido} |
                  {aluno.name} |
                  {aluno.telefone}
                </>
              </Link>
            </List.Item>
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