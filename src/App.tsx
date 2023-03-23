import { useEffect, useState } from 'react'
import reactLogo from 'assets/react.svg'
import viteLogo from '/vite.svg'
import 'App.scss'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import TurmasIndex from 'pages/turmas'
import TurmasShow from 'pages/turmas/show'
import PagamentosIndex from 'pages/pagamentos'
import PagamentosShow from 'pages/pagamentos/show'
import AlunosIndex from 'pages/alunos'
import AlunosShow from 'pages/alunos/show'
import Login from 'pages/login'
import Axios from "axios";

function App() {
  const [auth, setAuth] = useState(false)

  useEffect(() => {
    Axios.defaults.headers.common = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
      'access-token': localStorage.getItem('access-token')
    };

    if (localStorage.getItem('access-token')) setAuth(true)
  }, [])


  return (
    <BrowserRouter>
      <Routes>
        {/* Unauthenticated */}
        {!auth ?
          <>
            <Route path='*' element={<Login setAuth={setAuth} />} />
          </>
          :
          <>
            {/* Authenticated */}
            <Route path='/' element={<Base />} />

            <Route path='turmas' element={<Outlet />}>
              <Route index element={<TurmasIndex />} />
              <Route path=':turma_id' element={<TurmasShow />} />
            </Route>

            <Route path='alunos' element={<Outlet />}>
              <Route index element={<AlunosIndex />} />
              <Route path=':user_id' element={<AlunosShow />} />
            </Route>

            <Route path='pagamentos' element={<Outlet />}>
              <Route index element={<PagamentosIndex />} />
              <Route path=':pagamento_id' element={<PagamentosShow />} />
            </Route>
          </>}



      </Routes>

    </BrowserRouter>
  )
}

function Base() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
