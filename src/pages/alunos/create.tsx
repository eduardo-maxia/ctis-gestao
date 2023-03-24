import { DatePicker, Select, Checkbox } from "antd";
import { Field, Form, Formik, useField } from "formik";
import { useState } from "react";
import dayjs from "dayjs"
import { usePost } from "utils/requests";
import { useNavigate } from "react-router-dom";

export default function AlunosCreate() {
  const { mutate, isLoading } = usePost('users')
  const navigate = useNavigate()
  return (
    <div className="text-start">
      <Formik
        initialValues={{
          telefone: '',
          apelido: '',
          responsavel_checked: false,
          responsavel_nome: '',
          responsavel_telefone: '',
          data_inicio: dayjs(),
          dia_vencimento: 5
        }}
        onSubmit={(values) => {
          mutate(values, {
            onSuccess(data) {
              navigate('/alunos/' + data.aluno_id)
            },
          })
        }}
      >
        {({
          values, setFieldValue
        }) => (
          <Form>
            <div className="mt-10 sm:mt-0">
              <div className="mt-5 md:col-span-2 md:mt-0">
                <div className="overflow-hidden shadow sm:rounded-md">
                  <div className="bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Telefone</label>
                        <Field type="text" name="telefone" id="telefone"
                          className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Apelido</label>
                        <Field type="text" name="apelido" id="apelido" className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>

                      <Responsavel />

                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Data início</label>
                        <DatePicker onChange={d => setFieldValue('data_inicio', d)} value={values.data_inicio} />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Dia vencimento</label>
                        <Select className="mt-2 block w-full rounded-md border-0 py-1.5"
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
                      className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Save</button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
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