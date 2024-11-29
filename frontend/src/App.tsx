// import './App.css'

import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner";
import { ToastContainer } from "react-bootstrap";
import AuthRoute from "./routes/AuthRoute";
import AppRoute from "./routes/AppRoute";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  return (
<<<<<<< HEAD
<<<<<<< HEAD
    <BrowserRouter>
      {loading && <LoadingSpinner/>}
      <ToastContainer position='top-center'/>
      <Routes>
        <Route path='/*' element={<AuthRoute setLoading={setLoading}/>}/>
        <Route path='/admin/*' element={<AppRoute setLoading={setLoading}/>}/>
      </Routes>
    </BrowserRouter>
=======
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
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
      <p className='text-red-600'>
        Installation de TailwindCSS
      </p>
    </>
>>>>>>> b524c8bf9b59d73a934590e3c838332ad198bac6
=======
    <Provider store={store}>
      <BrowserRouter>
        {loading && <LoadingSpinner/>}
        <ToastContainer position='top-center'/>
        <Routes>
          <Route path='/*' element={<AuthRoute setLoading={setLoading}/>}/>
          <Route path='/admin/*' element={<AppRoute setLoading={setLoading}/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
>>>>>>> feat/authentification
  )
}

export default App
