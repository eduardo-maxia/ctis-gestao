import { DatePicker, Select, Checkbox, Input, Card, Button, Descriptions } from "antd";
import { Field, Form, Formik, useField } from "formik";
import { useState } from "react";
import dayjs from "dayjs"
import { useGetSchema, usePatch, usePost } from "utils/requests";
import { Link, useNavigate, useParams } from "react-router-dom";
import { tAlunoShowSchema } from "schemas/schemas";
import { cloneDeep } from "lodash";
import { diff } from "deep-object-diff";
import BotaoVoltar from "components/BotaoVoltar";

export default function AlunosShow() {
  const { user_id } = useParams()
  const { data, isFetching } = useGetSchema('users/' + user_id, tAlunoShowSchema)
  console.log("🚀 ~ file: show.tsx:15 ~ AlunosShow ~ data:", data)
  const { mutate, isLoading } = usePatch('users/' + user_id)
  const navigate = useNavigate()
  const [disabled, setDisabled] = useState(true)

  return (
    <div className="text-start">
      {isFetching && <Card loading style={{ width: '100%' }}></Card>}
      {data && <Formik
        initialValues={cloneDeep(data)}
        onSubmit={(values) => {
          mutate(diff(data, values), {
            onSuccess: () => {
              setDisabled(true);
            }
          })
        }}
      >
        {({
          values, setFieldValue
        }) => (
          <Form>
            <div className="md:col-span-2 md:mt-0">
              <div className="overflow-hidden sm:rounded-md">
                <div className="py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <BotaoVoltar />

                    <div className="col-span-5 flex justify-end">
                      <Button onClick={() => setDisabled(prev => !prev)}>{disabled ? 'Editar' : 'Cancelar'}</Button>
                    </div>
                    {/* <button type='button' className="col-span-5" onClick={() => setDisabled(false)}>Editar</button> */}

                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-sm font-medium leading-6 text-gray-900">Telefone</label>
                      <Field as={Input} type="text" name="telefone" id="telefone" disabled={disabled}
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-sm font-medium leading-6 text-gray-900">Apelido</label>
                      <Field as={Input} type="text" name="apelido" id="apelido" disabled={disabled}
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>

                    <Responsavel />

                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-sm font-medium leading-6 text-gray-900">Data início</label>
                      <DatePicker onChange={d => setFieldValue('data_inicio', d?.toString())}
                        value={dayjs(values.data_inicio || new Date())} disabled={disabled} />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-sm font-medium leading-6 text-gray-900">Dia vencimento</label>
                      <Select disabled={disabled} className="mt-2 block w-full rounded-md border-0 py-1.5"
                        onChange={e => setFieldValue('dia_vencimento', e)} value={values.dia_vencimento}>
                        <Select.Option value={5}>5</Select.Option>
                        <Select.Option value={10}>10</Select.Option>
                        <Select.Option value={15}>15</Select.Option>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button type="submit" disabled={isLoading}
                    className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Salvar</button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>}

      <Descriptions title="Informações" bordered className="my-3">
        <Descriptions.Item label="Contato de Emergência">{data?.contato_emergencia_nome} | {data?.contato_emergencia_telefone}</Descriptions.Item>
        <Descriptions.Item label="CEP">{data?.cep}</Descriptions.Item>
        <Descriptions.Item label="Endereço">{data?.endereco}</Descriptions.Item>
        <Descriptions.Item label="Data Nascimento">{data?.data_nascimento}</Descriptions.Item>
        <Descriptions.Item label="Alergias">{data?.alergias}</Descriptions.Item>
        <Descriptions.Item label="Email">{data?.email}</Descriptions.Item>
        <Descriptions.Item label="Responsável">{data?.responsavel_nome} | {data?.responsavel_parentesco} | {data?.responsavel_telefone}</Descriptions.Item>
        <Descriptions.Item label="Camisa">{data?.tamanho_camisa}</Descriptions.Item>
        <Descriptions.Item label="Pé">{data?.tamanho_pe}</Descriptions.Item>
        <Descriptions.Item label="Tipo Sanguíneo">{data?.tipo_sanguineo}</Descriptions.Item>
      </Descriptions>

      <Descriptions title="Turmas" bordered className="my-3">
        {data?.turmas?.map(t => (
          <Descriptions.Item label={t.sede}>{t.dia} | {t.horario}</Descriptions.Item>
        ))}
        {!data?.turmas?.length && <div>Nenhuma turma.</div>}
      </Descriptions>

      <Descriptions title="Pagamentos" bordered className="my-3">
        {data?.pagamentos?.sort((a, b) => a.month_id - b.month_id).map(({ mes, status, valor, data_pagamento, id }) => (
          <Descriptions.Item label={mes}>
            R$ {valor},00 | {status} | {data_pagamento}
            <Link to={"/pagamentos/" + id}>Ícone</Link>
          </Descriptions.Item>
        ))}
        {!data?.pagamentos?.length && <div>Nenhum pagamento.</div>}
      </Descriptions>
    </div >
  )
}

function Responsavel() {
  const checked = useField('responsavel_checked')[0].value
  return (
    <div className={"col-span-6 sm:col-span-6 grid grid-cols-6 gap-6 " + (checked ? 'p-3 border-2' : '')}>
      <div className="block col-span-6 sm:col-span-6">
        <label className="text-sm font-medium leading-6 text-gray-900 mr-2 align-middle">Responsavel</label>
        <Field name='responsavel_checked' as={Checkbox} className='align-middle' />
      </div>

      {checked && <>
        <div className="col-span-3 sm:col-span-3">
          <label className="block text-sm font-medium leading-6 text-gray-900">Nome</label>
          <Field type="text" name="responsavel_nome" id="responsavel_nome"
            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

          />
        </div>

        <div className="col-span-3 sm:col-span-3">
          <label className="block text-sm font-medium leading-6 text-gray-900">Telefone</label>
          <Field type="text" name="responsavel_telefone" id="responsavel_telefone" className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </>}
    </div>
  )
}