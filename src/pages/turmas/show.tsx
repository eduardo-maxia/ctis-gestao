import { DatePicker, Select, Checkbox, TimePicker } from "antd";
import { Field, Form, Formik, useField } from "formik";
import { useState } from "react";
import dayjs from "dayjs"
import { EnumPicker } from "utils/enums";

export default function TurmasShow() {
  return (
    <div className="text-start">
      Tumas Show
      <Formik
        initialValues={{
          sede: 1,
          dias: 1,
          horario: dayjs('19', 'HH:mm'),
          professor: 1,
          valor_mensalidade: 115
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          isSubmitting, values, setFieldValue
          /* and other goodies */
        }) => (
          <Form>
            <div className="mt-10 sm:mt-0">
              <div className="mt-5 md:col-span-2 md:mt-0">
                <div className="overflow-hidden shadow sm:rounded-md">
                  <div className="bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">

                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Sede:</label>
                        <EnumPicker tipo="sede" onChange={e => setFieldValue('sede', e)} value={values.sede} />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Dias:</label>
                        <EnumPicker tipo="dias" onChange={e => setFieldValue('dias', e)} value={values.dias} />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Professor:</label>
                        <EnumPicker tipo="professor" onChange={e => setFieldValue('professor', e)} value={values.professor} />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Horário:</label>
                        <TimePicker onSelect={d => setFieldValue('horario', d)} value={values.horario} format="HH:mm"
                          minuteStep={15} showNow={false} className='w-full' />
                      </div>

                      <div className="block col-span-3 sm:col-span-3">
                        <label className="text-sm font-medium leading-6 text-gray-900 mr-2 align-middle">Valor da Mensalidade:</label>
                        <Field name='valor_mensalidade' type='number'
                          className='align-middle block w-full rounded-md border-2 p-1' />
                      </div>


                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button type="submit" className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Save</button>
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div >
  )
}
