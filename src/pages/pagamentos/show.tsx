import { useParams } from "react-router-dom"
import { useGetSchema } from "utils/requests"
import { DatePicker, Select, Checkbox, TimePicker, Button, Descriptions } from "antd";
import { Field, Form, Formik, useField } from "formik";
import { useState } from "react";
import dayjs from "dayjs"
import { EnumPicker } from "utils/enums";
import { usePost } from "utils/requests";
import { useNavigate } from "react-router-dom";
import BotaoVoltar from "components/BotaoVoltar";
import { isEqual } from "lodash";

export default function PagamentosShow() {
  const { pagamento_id } = useParams()
  const { data, isLoading } = useGetSchema('pagamentos/' + pagamento_id)
  const [disabled, setDisabled] = useState(true)
  console.log("🚀 ~ file: show.tsx:7 ~ PagamentosShow ~ data:", data)
  return (
    <div className="text-start">
      {data && <Formik
        initialValues={{
          ...data,
          tipo_pagamento: data.tipo,
        }}
        onSubmit={(values, { setSubmitting }) => {

        }}
      >
        {({
          isSubmitting, values, setFieldValue, initialValues
          /* and other goodies */
        }) => (
          <Form>
            <div className="md:col-span-2 md:mt-0">
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <BotaoVoltar />

                    <div className="col-span-5 flex justify-end">
                      <Button onClick={() => setDisabled(prev => !prev)}>{disabled ? 'Editar' : 'Cancelar'}</Button>
                    </div>

                    <div className="col-span-6 sm:col-span-2">
                      <label className="block text-sm font-medium leading-6 text-gray-900">Mês:</label>
                      Select Meses
                    </div>

                    <div className="col-span-6 sm:col-span-2">
                      <label className="block text-sm font-medium leading-6 text-gray-900">Dia Vencimento:</label>
                      <Field name='dia_vencimento' type='number' disabled={disabled}
                        className='align-middle block w-full rounded-md border-2 p-1' />
                    </div>

                    <div className="col-span-6 sm:col-span-2">
                      <label className="block text-sm font-medium leading-6 text-gray-900">Tipo do pagamento:</label>
                      <EnumPicker disabled={disabled} tipo="tipo_pagamentos" onChange={e => setFieldValue('tipo_pagamento', e)} value={values.tipo_pagamento} />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-sm font-medium leading-6 text-gray-900">Status:</label>
                      <EnumPicker disabled={disabled} tipo="status_pagamentos" onChange={e => setFieldValue('status', e)} value={values.status} />
                    </div>

                    <div className="block col-span-3 sm:col-span-3">
                      <label className="text-sm font-medium leading-6 text-gray-900 mr-2 align-middle">Valor:</label>
                      <Field name='valor' type='number' disabled={disabled}
                        className='align-middle block w-full rounded-md border-2 p-1' />
                    </div>

                    <div className="col-span-6">
                      <Descriptions title="Artista" bordered>
                        <Descriptions.Item label="Nome">Iury</Descriptions.Item>
                        <Descriptions.Item label="Apelido">MININU VUANDO</Descriptions.Item>
                        <Descriptions.Item label="Telefone">+45463213124</Descriptions.Item>
                      </Descriptions>
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
        )}
      </Formik>}
    </div >
  )
}