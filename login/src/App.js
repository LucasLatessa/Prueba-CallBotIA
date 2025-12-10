import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './login'
import Dashboard from './dashboard' 
import SignUp from './signUp'
function RutaProtegida({ children }) {
  const usuario = localStorage.getItem('usuario')
  return usuario ? children : <Navigate to="/" />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route 
          path="/dashboard" 
          element={
            <RutaProtegida>
              <Dashboard />
            </RutaProtegida>
          } 
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App