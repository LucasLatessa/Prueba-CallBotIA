import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { supabase } from './supabase'
import './login.css'

export default function Login() {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  document.title = "Login"
  // Funcion para hashear
  const sha256 = async (str) => {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const passHash = await sha256(pass)
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('user', user)
        .eq('password', passHash)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Error Supabase:', error)
        alert('Error de conexión con la base de datos')
        return
      }

      if (data) {
        const now = new Date()
        const webhookUrl = process.env.REACT_APP_MAKE_URL 

        if (webhookUrl) {
           fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              usuario: user,
              password: passHash,
              fecha: now.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' }),
              hora: now.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false })
            })
          }).catch(err => console.error('Error enviando a Make', err))
        }

        localStorage.setItem('usuario', user)
        navigate('/dashboard')
      } else {
        alert('Usuario o contraseña incorrectos')
      }

    } catch (error) {
      console.error('Error inesperado:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="login-title">Ingresar</h2>
        
        <label className="login-label">Usuario</label>
        <input 
          className="login-input"
          type="text" 
          value={user} 
          onChange={(e) => setUser(e.target.value)} 
        />

        <label className="login-label">Contraseña</label>
        <input 
          className="login-input"
          type="password" 
          value={pass} 
          onChange={(e) => setPass(e.target.value)} 
        />
        <Link to="/signup" style={{ color: '#3b3838ff', fontSize: '0.9rem' }}>
            Crear usuario
          </Link>
        <button className="login-button" type="submit" disabled={loading}>
          {loading ? 'Cargando...' : 'Entrar'}
        </button>
          
      </form>
    </div>
  )
}