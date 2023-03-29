import { DatePicker, Select, Checkbox, TimePicker } from "antd";
import { Field, Form, Formik, useField } from "formik";
import { useState } from "react";
import dayjs from "dayjs"
import { EnumPicker } from "utils/enums";
import { usePost } from "utils/requests";
import { useNavigate } from "react-router-dom";
import BotaoVoltar from "components/BotaoVoltar";

export default function TurmasCreate() {
  const { mutate, isLoading } = usePost('turmas')
  const navigate = useNavigate()
  return (
    <div className="text-start">
      <Formik
        initialValues={{
          sede: 'Arclo',
          dia: 'Segunda e Quarta',
          horario: dayjs('19:00', 'HH:mm').toString(),
          professor: 'Arlen',
          valor: 115
        }}
        onSubmit={(values, { setSubmitting }) => {
          mutate(values, {
            onSuccess(data) {
              navigate('/turmas/' + data.turma_id)
            },
          })
        }}
      >
        {({
          isSubmitting, values, setFieldValue
          /* and other goodies */
        }) => (
          <Form>
            <div className="md:col-span-2 md:mt-0">
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">

                    <div className="col-span-6">
                      <BotaoVoltar />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-sm font-medium leading-6 text-gray-900">Sede:</label>
                      <EnumPicker tipo="sede" onChange={e => setFieldValue('sede', e)} value={values.sede} />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-sm font-medium leading-6 text-gray-900">Dias:</label>
                      <EnumPicker tipo="dias" onChange={e => setFieldValue('dia', e)} value={values.dia} />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-sm font-medium leading-6 text-gray-900">Professor:</label>
                      <EnumPicker tipo="professor" onChange={e => setFieldValue('professor', e)} value={values.professor} />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-sm font-medium leading-6 text-gray-900">Horário:</label>
                      <TimePicker onSelect={d => setFieldValue('horario', d.toString())} value={dayjs(values.horario)} format="HH:mm"
                        minuteStep={15} showNow={false} className='w-full' />
                    </div>

                    <div className="block col-span-3 sm:col-span-3">
                      <label className="text-sm font-medium leading-6 text-gray-900 mr-2 align-middle">Valor da Mensalidade:</label>
                      <Field name='valor' type='number'
                        className='align-middle block w-full rounded-md border-2 p-1' />
                    </div>


                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button type="submit" className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Save</button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div >
  )
}
