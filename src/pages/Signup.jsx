import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function Signup() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleSignup() {
    setError('')

    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setLoading(true)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    setSuccess(true)
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
    link: { fontSize: '13px', color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginTop: '20px', cursor: 'pointer' },
    linkSpan: { color: '#AFA9EC', cursor: 'pointer' },
  }

  if (success) {
    return (
      <div style={s.page}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>✉️</div>
          <div style={{ fontSize: '22px', fontWeight: '500', marginBottom: '8px' }}>Check your email</div>
          <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', lineHeight: '1.6', marginBottom: '28px' }}>
            We sent a confirmation link to <span style={{ color: '#AFA9EC' }}>{email}</span>. Click it to activate your account then come back to log in.
          </div>
          <button style={s.btn} onClick={() => navigate('/login')}>Go to login →</button>
        </div>
      </div>
    )
  }

  return (
    <div style={s.page}>
      <div style={s.logo}>⊕ AimCoach</div>
      <div style={s.tag}>Create your account</div>
      <div style={s.title}>Start improving your aim</div>
      <div style={s.sub}>Free to start. No credit card required.</div>

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
          placeholder="At least 6 characters"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      <div style={s.field}>
        <label style={s.label}>Confirm password</label>
        <input
          style={s.input}
          type="password"
          placeholder="Same password again"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
      </div>

      <button
        style={{ ...s.btn, opacity: loading ? 0.6 : 1 }}
        onClick={handleSignup}
        disabled={loading}>
        {loading ? 'Creating account...' : 'Create account →'}
      </button>

      <div style={s.link}>
        Already have an account?{' '}
        <span style={s.linkSpan} onClick={() => navigate('/login')}>Log in</span>
      </div>
    </div>
  )
}

export default Signup