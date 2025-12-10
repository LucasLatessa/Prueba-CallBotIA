import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from './supabase'
import './login.css'

export default function SignUp() {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  document.title = "Registrarse"
  // Funcion para hashear
  const sha256 = async (str) => {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const passHash = await sha256(pass)
      if (!user || !pass) {
        alert('Completa todos los campos')
        setLoading(false)
        return
      }

      const { error } = await supabase
        .from('usuarios')
        .insert([
          { user: user, password: passHash }
        ])

      if (error) {
        if (error.code === '23505') {
          alert('¡Ese nombre de usuario ya existe!')
        } else {
        console.error('error supabase', error)
        alert('error al crear usuario: ' + error.message)}
      } else {
        alert('Usuario creado con exito!')
        navigate('/')
      }

    } catch (error) {
      console.error('error inesperado', error)
      alert('ocurrio un error inesperado')
    } finally {
      setLoading(false)
    }
  }

  return (
    
    <div className="login-page">
      <form className="login-form" onSubmit={handleSignUp}>
        <h2 className="login-title">Crear Cuenta</h2>
        
        <label className="login-label">Nuevo usuario</label>
        <input 
          className="login-input"
          type="text" 
          value={user} 
          onChange={(e) => setUser(e.target.value)}
        />

        <label className="login-label">Nueva contraseña</label>
        <input 
          className="login-input"
          type="password" 
          value={pass} 
          onChange={(e) => setPass(e.target.value)} 
        />
        <Link to="/" style={{ color: '#3b3838ff', fontSize: '0.9rem' }}>
            ¿Ya tenés usuario? Ingresá acá
        </Link>
        <button 
          className="login-button"
          type="submit" 
          disabled={loading}
          style={{
            background: '#ffffff',
            color: '#000',
            border: '2px solid #000',
          }}
        >
          {loading ? 'Creando...' : 'Registrarse'}
        </button>

      </form>
    </div>
  )
}