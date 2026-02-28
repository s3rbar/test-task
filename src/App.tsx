import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';

import LoginForm from "./LoginForm"
import SignUpForm from "./SignUpForm"
import Orders from "./Orders"
import NewOrder from "./NewOrder"

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/neworder" element={<NewOrder />} />
        </Routes>
      </BrowserRouter>
      
  )
}

export default App
