import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin() {
    setError('')

    if (!email || !password) {
      setError('Please fill in all fields.')
      return
    }

    setLoading(true)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    navigate('/routine')
  }

  const s = {
    page: { background: '#0e0e10', minHeight: '100vh', color: '#f0f0f0', padding: '28px', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: '420px', margin: '0 auto' },
    logo: { fontSize: '15px', fontWeight: '500', marginBottom: '48px', textAlign: 'center' },
    tag: { fontSize: '11px', fontWeight: '500', color: '#7F77DD', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px', textAlign: 'center' },
    title: { fontSize: '24px', fontWeight: '500', marginBottom: '6px', textAlign: 'center' },
    sub: { fontSize: '14px', color: 'rgba(255,255,255,0.4)', marginBottom: '32px', textAlign: 'center' },
    field: { marginBottom: '16px' },
    label: { fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: '7px', display: 'block' },
    input: { width: '100%', background: '#1a1a1e', border: '0.5px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '11px 14px', color: '#f0f0f0', fontSize: '14px', outline: 'none', fontFamily: 'inherit' },
    btn: { width: '100%', background: '#7F77DD', color: '#EEEDFE', border: 'none', borderRadius: '10px', padding: '13px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', fontFamily: 'inherit', marginTop: '8px' },
    error: { fontSize: '13px', color: '#F09595', background: 'rgba(226,75,74,0.1)', border: '0.5px solid rgba(226,75,74,0.2)', borderRadius: '8px', padding: '10px 14px', marginBottom: '16px' },
    link: { fontSize: '13px', color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginTop: '20px' },
    linkSpan: { color: '#AFA9EC', cursor: 'pointer' },
  }

  return (
    <div style={s.page}>
      <div style={s.logo}>⊕ AimCoach</div>
      <div style={s.tag}>Welcome back</div>
      <div style={s.title}>Log in to AimCoach</div>
      <div style={s.sub}>Pick up where you left off.</div>

      {error && <div style={s.error}>{error}</div>}

      <div style={s.field}>
        <label style={s.label}>Email</label>
        <input
          style={s.input}
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>

      <div style={s.field}>
        <label style={s.label}>Password</label>
        <input
          style={s.input}
          type="password"
          placeholder="Your password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      <button
        style={{ ...s.btn, opacity: loading ? 0.6 : 1 }}
        onClick={handleLogin}
        disabled={loading}>
        {loading ? 'Logging in...' : 'Log in →'}
      </button>

      <div style={s.link}>
        Don't have an account?{' '}
        <span style={s.linkSpan} onClick={() => navigate('/signup')}>Sign up free</span>
      </div>

      <div style={{ ...s.link, marginTop: '10px' }}>
        <span style={s.linkSpan} onClick={() => navigate('/')}>← Back to home</span>
      </div>
    </div>
  )
}

export default Login