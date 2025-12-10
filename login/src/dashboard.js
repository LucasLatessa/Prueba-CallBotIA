import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const [usuario, setUsuario] = useState('')
  const navigate = useNavigate()
  document.title = "Dashboard"

  useEffect(() => {
    const userGuardado = localStorage.getItem('usuario')
    if (userGuardado) {
      setUsuario(userGuardado)
    } else {
      navigate('/')
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('usuario')
    navigate('/')
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1>¡Bienvenido al Dashboard!</h1>
        <p>Estas logeado como: <strong>{usuario}</strong></p>

        <button 
          onClick={handleLogout} 
          className="logout-button"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  )
}