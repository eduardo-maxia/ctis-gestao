import { Button, List } from "antd"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { tAlunoIndexSchema } from "schemas/schemas"
import { useGetSchema, usePost } from "utils/requests"

export default function AdicionarAluno() {
  const { turma_id } = useParams()
  const { data } = useGetSchema('users', tAlunoIndexSchema)
  const { mutate, isLoading } = usePost('turma_alunos')

  function submitHandler(id: number) {
    mutate({ user_id: id, turma_id, status: 'ativo' })
  }

  return (
    <div>
      Adicionar um aluno
      {data && <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(aluno, index) => (
          <List.Item>
            <Button className=''>
              <>
                {aluno.apelido} |
                {aluno.name} |
                {aluno.telefone}
              </>
            </Button>
          </List.Item>
        )}
      />}
    </div>
  )
}