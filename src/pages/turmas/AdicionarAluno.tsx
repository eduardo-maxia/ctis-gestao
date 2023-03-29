import { Button, Card, List } from "antd"
import Transfer, { TransferDirection } from "antd/es/transfer"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { tAlunoIndexSchema } from "schemas/schemas"
import { fuzzyStringMatcher } from "utils/general"
import { useGetSchema, usePatch, usePost } from "utils/requests"
import './styles.scss'

interface RecordType {
  key: string;
  title: string;
  description: string;
  chosen: boolean;
}

export default function AdicionarAluno() {
  const { turma_id } = useParams()
  const { data, isFetching } = useGetSchema('users', tAlunoIndexSchema)

  const { mutate, isLoading } = usePatch('turma_alunos/update_all/' + turma_id)
  const [targetKeys, setTargetKeys] = useState<string[]>([]);

  const filterOption = (inputValue: string, option: RecordType) => {
    return fuzzyStringMatcher(inputValue, [option.description])
  }

  const selectedIds = data?.filter(a => a.turmas.filter(t => t.id?.toString() === turma_id).length > 0).map(a => a.id.toString())
  useEffect(() => {
    selectedIds && setTargetKeys(selectedIds)
  }, [data])


  return (
    <div className="mt-7">
      Alunos
      {isFetching && <Card loading style={{ width: '100%' }}></Card>}
      {data &&
        <>
          <Transfer
            disabled={isLoading}
            dataSource={data.map(aluno => ({
              key: aluno.id.toString(),
              title: [aluno.apelido, aluno.name, aluno.telefone].join('  |  '),
              description: [aluno.apelido, aluno.name, aluno.telefone].join('  |  '),
              chosen: aluno.turmas.filter(t => t.id?.toString() === turma_id).length > 0
            }))}
            showSearch
            filterOption={filterOption}
            targetKeys={targetKeys}
            onChange={newTargetKeys => {
              setTargetKeys(newTargetKeys);
            }}
            render={(item) => item.title}
          />

          <div className="px-4 py-3 text-right sm:px-6">
            <button onClick={() => mutate({ user_id: targetKeys.map(k => +k) })}
              className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Salvar</button>
          </div>
        </>
      }

    </div>
  )
}