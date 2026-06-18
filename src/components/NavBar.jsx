import { useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const navItems = [
  { path: '/routine', icon: '📋', label: 'Routine' },
  { path: '/upload', icon: '📹', label: 'Upload' },
  { path: '/breakdown', icon: '📊', label: 'Breakdown' },
  { path: '/ranks', icon: '🏆', label: 'Ranks' },
  { path: '/progress', icon: '📈', label: 'Progress' },
]

function NavBar() {
  const navigate = useNavigate()
  const location = useLocation()

  const hiddenPaths = ['/', '/onboarding', '/signup', '/login']
  if (hiddenPaths.includes(location.pathname)) return null

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: '#0e0e10',
      borderTop: '0.5px solid rgba(255,255,255,0.08)',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '10px 0 14px',
      zIndex: 1000,
    }}>
      {navItems.map(item => {
        const isActive = location.pathname === item.path
        return (
          <div
            key={item.path}
            onClick={() => navigate(item.path)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              padding: '4px 12px',
              borderRadius: '8px',
              background: isActive ? 'rgba(127,119,221,0.1)' : 'transparent',
              transition: 'background 0.15s',
            }}>
            <span style={{ fontSize: '18px' }}>{item.icon}</span>
            <span style={{
              fontSize: '10px',
              fontWeight: isActive ? '500' : '400',
              color: isActive ? '#AFA9EC' : 'rgba(255,255,255,0.35)',
            }}>
              {item.label}
            </span>
          </div>
        )
      })}
      <div
        onClick={handleLogout}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          cursor: 'pointer',
          padding: '4px 12px',
          borderRadius: '8px',
        }}>
        <span style={{ fontSize: '18px' }}>🚪</span>
        <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)' }}>Logout</span>
      </div>
    </div>
  )
}

export default NavBar