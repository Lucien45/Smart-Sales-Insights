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
    <Provider store={store}>
      <BrowserRouter>
        {loading && <LoadingSpinner/>}
        <ToastContainer position='top-center'/>
        <Routes>
          <Route path='/*' element={<AuthRoute setLoading={setLoading}/>}/>
          <Route path='/admin/*' element={ <AppRoute setLoading={setLoading}/> }/>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
