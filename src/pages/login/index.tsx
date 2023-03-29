import { Field } from "formik";
import { usePost } from "utils/requests";
import Axios from "axios";
import { Button, Checkbox, Form, Input } from "antd";
import './styles.scss'
import { useNavigate } from "react-router-dom";

export default function Login({ setAuth }: { setAuth: (auth: boolean) => void }) {
  const { mutate, isLoading } = usePost('auth/sign_in', {}, true)
  const navigate = useNavigate()
  const onFinish = (values: any) => {
    mutate(values, {
      onSuccess(data) {
        localStorage.setItem('client', data.headers['client'])
        localStorage.setItem('uid', data.headers['uid'])
        localStorage.setItem('access-token', data.headers['access-token'])

        Axios.defaults.headers.common = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          client: data.headers['client'],
          uid: data.headers['uid'],
          'access-token': data.headers['access-token'],
        };
        setAuth(true)
        navigate('/turmas')
      }
    })
  };

  const onFinishFailed = () => {
    console.log('Failed:');
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="illustration-wrapper">
          <img src="/logo-no-bg.png" alt="Login" />
        </div>
        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <p className="form-title">Gestão CTIS</p>
          <p>Login</p>
          <Form.Item
            name="telefone"
            rules={[{ required: true, message: 'Macho, coloca o usuário...' }]}
          >
            <Input
              placeholder="Telefone"
              style={{ height: 40 }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vai entrar sem senha eh bonito?' }]}
          >
            <Input.Password
              placeholder="Senha"
              style={{ height: 40 }}
            />
          </Form.Item>

          <Form.Item>
            <Button loading={isLoading} type="primary" htmlType="submit" className="login-form-button">
              LOGIN
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
    // <div className="text-start">
    //   Login
    //   <Formik
    //     initialValues={{
    //       telefone: '',
    //       password: ''
    //     }}
    //     onSubmit={(values, { setSubmitting }) => {
    //       setSubmitting(true)
    //       mutate(values, {
    //         onSuccess(data) {
    //           localStorage.setItem('client', data.headers['client'])
    //           localStorage.setItem('uid', data.headers['uid'])
    //           localStorage.setItem('access-token', data.headers['access-token'])

    //           Axios.defaults.headers.common = {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //             client: data.headers['client'],
    //             uid: data.headers['uid'],
    //             'access-token': data.headers['access-token'],
    //           };
    //           setAuth(true)
    //         },
    //         onSettled: () => setSubmitting(false)
    //       })
    //     }}
    //   >
    //     {({
    //       isSubmitting
    //       /* and other goodies */
    //     }) => (
    //       <Form>
    //         <div className="overflow-hidden shadow sm:rounded-md">
    //           <div className="bg-white px-4 py-5 sm:p-6">
    //             <div className="grid grid-cols-6 gap-6">
    //               <div className="col-span-6 sm:col-span-3">
    //                 <label className="block text-sm font-medium leading-6 text-gray-900">Telefone</label>
    //                 <Field type="text" name="telefone" id="telefone"
    //                   className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

    //                 />
    //               </div>

    //               <div className="col-span-6 sm:col-span-3">
    //                 <label className="block text-sm font-medium leading-6 text-gray-900">Senha</label>
    //                 <Field type="password" name="password" id="password" className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <button type="submit" disabled={isSubmitting}>
    //           Submit
    //         </button>
    //       </Form>
    //     )}
    //   </Formik>
    // </div >
  )
}
