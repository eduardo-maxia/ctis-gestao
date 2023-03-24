import { DatePicker, Select, Checkbox, TimePicker, Button } from "antd";
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

export default function TurmasShow() {
  const { turma_id } = useParams()
  const { data, refetch } = useGetSchema('turmas/' + turma_id, tTurmaShowSchema)
  const { mutate, isLoading } = usePatch('turmas/' + turma_id)
  const [disabled, setDisabled] = useState(true)

  const [adicionarAluno, setAdicionarAluno] = useState(false)


  return (
    <div className="text-start">
      Turma {turma_id}
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
          <div>
            <Form>
              <div className="mt-10 sm:mt-0">
                <div className="mt-5 md:col-span-2 md:mt-0">
                  <div className="overflow-hidden shadow sm:rounded-md">
                    <div className="bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">

                        <button type='button' className="col-span-6" onClick={() => setDisabled(false)}>Editar</button>

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
                        className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Save</button>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
            <Button onClick={() => setAdicionarAluno(true)}>Adicionar Aluno</Button>
            {adicionarAluno && <AdicionarAluno />}
          </div>
        )}
      </Formik>}
    </div >
  )
}
