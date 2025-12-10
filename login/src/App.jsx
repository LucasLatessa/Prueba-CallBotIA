import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './login'

function Dashboard() {
  const logout = () => {
    localStorage.removeItem('logueado')
    window.location.reload()
  }

  return (
    <div className="dashboard">
      <div className="card">
        <h1>Bienvenido al dashboard</h1>
        <p>Estas logueado como {localStorage.getItem('usuario')}</p>
        <button
          onClick={logout}
          className="small-button"
        >
          cerrar sesion
        </button>
      </div>
    </div>
  )
}

function RutaPrivada({ children }) {
  const logueado = localStorage.getItem('logueado')
  return logueado ? children : <Navigate to="/" />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={
            <RutaPrivada>
              <Dashboard />
            </RutaPrivada>
          } 
        />
      </Routes>
    </BrowserRouter>
  )
}