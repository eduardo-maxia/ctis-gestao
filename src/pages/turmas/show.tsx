import { DatePicker, Select, Checkbox, TimePicker, Button, Card } from "antd";
import { Field, Form, Formik, useField } from "formik";
import { useState } from "react";
import dayjs from "dayjs"
import { EnumPicker } from "utils/enums";
import { useGetSchema, usePatch, usePost } from "utils/requests";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { cloneDeep, difference, isEqual } from "lodash";
import { tTurmaShowSchema } from "schemas/schemas";
import { diff } from "deep-object-diff";
import AdicionarAluno from "./AdicionarAluno";
import BotaoVoltar from "components/BotaoVoltar";

export default function TurmasShow() {
  const { turma_id } = useParams()
  const { data, refetch, isFetching } = useGetSchema('turmas/' + turma_id, tTurmaShowSchema)
  const { mutate, isLoading } = usePatch('turmas/' + turma_id)
  const [disabled, setDisabled] = useState(true)

  const [adicionarAluno, setAdicionarAluno] = useState(false)


  return (
    <div className="text-start">
      {isFetching && <Card loading style={{ width: '100%' }}></Card>}
      {data && <Formik
        initialValues={cloneDeep(data)}
        onSubmit={(values) => {
          mutate(diff(data, values), {
            onSuccess: () => {
              setDisabled(true);
              refetch()
            }
          })
        }}
      >
        {({
          values, setFieldValue, initialValues
          /* and other goodies */
        }) => (
          <>
            <Form>
              <div className="md:col-span-2 md:mt-0">
                <div className="overflow-hidden sm:shadow sm:rounded-md">
                  <div className="bg-white py-5 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">

                      <BotaoVoltar />

                      <div className="col-span-5 flex justify-end">
                        <Button onClick={() => setDisabled(prev => !prev)}>{disabled ? 'Editar' : 'Cancelar'}</Button>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Sede:</label>
                        <EnumPicker disabled={disabled} tipo="sede" onChange={e => setFieldValue('sede', e)} value={values.sede} />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Dias:</label>
                        <EnumPicker disabled={disabled} tipo="dias" onChange={e => setFieldValue('dia', e)} value={values.dia} />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Professor:</label>
                        <EnumPicker disabled={disabled} tipo="professor" onChange={e => setFieldValue('professor', e)} value={values.professor} />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Horário:</label>
                        <TimePicker onSelect={d => setFieldValue('horario', d.toString())} value={dayjs(values.horario)} format="HH:mm"
                          minuteStep={15} showNow={false} className='w-full' disabled={disabled} />
                      </div>

                      <div className="block col-span-3 sm:col-span-3">
                        <label className="text-sm font-medium leading-6 text-gray-900 mr-2 align-middle">Valor da Mensalidade:</label>
                        <Field name='valor' type='number' disabled={disabled}
                          className='align-middle block w-full rounded-md border-2 p-1' />
                      </div>


                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button type="submit" disabled={isEqual(initialValues, values) || disabled || isLoading}
                      className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Salvar</button>
                  </div>
                </div>
              </div>
            </Form>
            {!adicionarAluno && <Button className="mt-7" onClick={() => setAdicionarAluno(true)}>Adicionar Aluno</Button>}
            {adicionarAluno && <AdicionarAluno />}
          </>
        )}
      </Formik>}
    </div >
  )
}
