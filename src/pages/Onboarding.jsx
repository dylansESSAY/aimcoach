import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function Onboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const totalSteps = 5

  const [grip, setGrip] = useState('')
  const [experience, setExperience] = useState('')
  const [game, setGame] = useState('')
  const [sens, setSens] = useState('')
  const [dpi, setDpi] = useState('')
  const [mouse, setMouse] = useState('')
  const [pollingRate, setPollingRate] = useState('')
  const [padSize, setPadSize] = useState('')
  const [padSurface, setPadSurface] = useState('')
  const [monitorHz, setMonitorHz] = useState('')
  const [targetGame, setTargetGame] = useState('')
  const [frustration, setFrustration] = useState('')
  const [daysPerWeek, setDaysPerWeek] = useState('')

  const edpi = sens && dpi ? Math.round(parseFloat(sens) * parseFloat(dpi)) : null
  const edpiRange = edpi
    ? edpi < 400 ? 'Very low'
    : edpi < 600 ? 'Low'
    : edpi < 900 ? 'Medium — common range'
    : edpi < 1400 ? 'High'
    : 'Very high'
    : null

  const progress = (step / totalSteps) * 100

  const s = {
    page: { background: '#0e0e10', minHeight: '100vh', color: '#f0f0f0', padding: '32px 28px', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" },
    nav: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '36px' },
    logo: { fontSize: '15px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '7px' },
    counter: { fontSize: '12px', color: 'rgba(255,255,255,0.35)' },
    progressTrack: { width: '100%', height: '2px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', marginBottom: '40px' },
    progressFill: { height: '100%', borderRadius: '2px', background: '#7F77DD', width: `${progress}%`, transition: 'width 0.3s' },
    tag: { fontSize: '11px', fontWeight: '500', color: '#7F77DD', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' },
    title: { fontSize: '22px', fontWeight: '500', marginBottom: '6px' },
    sub: { fontSize: '14px', color: 'rgba(255,255,255,0.4)', lineHeight: '1.6', marginBottom: '28px' },
    label: { fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: '7px', display: 'block' },
    hint: { fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '5px' },
    input: { width: '100%', background: '#1a1a1e', border: '0.5px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '10px 14px', color: '#f0f0f0', fontSize: '14px', outline: 'none', fontFamily: 'inherit' },
    select: { width: '100%', background: '#1a1a1e', border: '0.5px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '10px 14px', color: '#f0f0f0', fontSize: '14px', outline: 'none', fontFamily: 'inherit', appearance: 'none' },
    field: { marginBottom: '18px' },
    twoCol: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' },
    navRow: { display: 'flex', gap: '10px', marginTop: '28px' },
    btnNext: { flex: 1, background: '#7F77DD', color: '#EEEDFE', border: 'none', borderRadius: '8px', padding: '11px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', fontFamily: 'inherit' },
    btnBack: { background: 'transparent', color: 'rgba(255,255,255,0.4)', border: '0.5px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '11px 20px', fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit' },
    infoBox: { background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px 14px', marginBottom: '18px', fontSize: '12px', color: 'rgba(255,255,255,0.35)', lineHeight: '1.6' },
  }

  const gripOptions = [
    { id: 'palm', label: 'Palm', desc: 'Full hand rests on mouse' },
    { id: 'claw', label: 'Claw', desc: 'Arched fingers, palm on back' },
    { id: 'fingertip', label: 'Fingertip', desc: 'Only fingertips touch mouse' },
  ]

  const expOptions = [
    { id: 'new', label: 'Just starting', sub: 'Under 3 months' },
    { id: 'some', label: 'Some experience', sub: '3 months – 1 year' },
    { id: 'experienced', label: 'Experienced', sub: '1 – 3 years' },
    { id: 'veteran', label: 'Veteran', sub: '3+ years' },
  ]

  const games = ['Valorant', 'CS2', 'Apex', 'Fortnite', 'Overwatch 2', 'Other']

  const summaryRows = [
    ['Grip', grip || '—'],
    ['Experience', expOptions.find(e => e.id === experience)?.label || '—'],
    ['Game', game || '—'],
    ['Sensitivity', sens || '—'],
    ['eDPI', edpi?.toLocaleString() || '—'],
    ['Mouse', mouse || '—'],
    ['Polling rate', pollingRate || '—'],
    ['Monitor', monitorHz || '—'],
    ['Training days', daysPerWeek || '—'],
  ]
async function saveProfile() {
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    navigate('/login')
    return
  }

  const { error } = await supabase
    .from('profiles')
    .insert({
      user_id: session.user.id,
      grip,
      experience,
      game,
      sensitivity: sens,
      dpi,
      edpi: edpi?.toString() || '',
      mouse,
      polling_rate: pollingRate,
      pad_size: padSize,
      pad_surface: padSurface,
      monitor_hz: monitorHz,
      target_game: targetGame,
      frustration,
      days_per_week: daysPerWeek,
    })

  if (error) {
    console.error('Error saving profile:', error)
  }

  setStep(6)
}
  return (
    <div style={s.page}>
      <div style={s.nav}>
        <div style={s.logo}>⊕ AimCoach</div>
        <div style={s.counter}>{step < 6 ? `Step ${step} of ${totalSteps}` : 'Complete'}</div>
      </div>

      <div style={s.progressTrack}>
        <div style={s.progressFill}></div>
      </div>

      {/* Step 1 — Grip & Experience */}
      {step === 1 && (
        <div>
          <div style={s.tag}>Step 1 — grip & experience</div>
          <div style={s.title}>How do you hold your mouse?</div>
          <div style={s.sub}>Your grip directly affects how the AI interprets your movement patterns.</div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: '8px', marginBottom: '24px' }}>
            {gripOptions.map(g => (
              <div
                key={g.id}
                onClick={() => setGrip(g.id)}
                style={{ background: '#1a1a1e', border: grip === g.id ? '1.5px solid #7F77DD' : '0.5px solid rgba(255,255,255,0.12)', borderRadius: '10px', padding: '14px 10px', textAlign: 'center', cursor: 'pointer', background: grip === g.id ? 'rgba(127,119,221,0.08)' : '#1a1a1e' }}>
                <div style={{ fontSize: '22px', marginBottom: '8px' }}>🖱️</div>
                <div style={{ fontSize: '13px', fontWeight: '500', color: grip === g.id ? '#AFA9EC' : 'rgba(255,255,255,0.6)', marginBottom: '3px' }}>{g.label}</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>{g.desc}</div>
              </div>
            ))}
          </div>

          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: '10px' }}>How long have you been aim training?</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '18px' }}>
            {expOptions.map(e => (
              <div
                key={e.id}
                onClick={() => setExperience(e.id)}
                style={{ background: experience === e.id ? 'rgba(127,119,221,0.08)' : '#1a1a1e', border: experience === e.id ? '1.5px solid #7F77DD' : '0.5px solid rgba(255,255,255,0.12)', borderRadius: '10px', padding: '12px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '500', color: experience === e.id ? '#AFA9EC' : 'rgba(255,255,255,0.55)' }}>{e.label}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.28)', marginTop: '1px' }}>{e.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={s.navRow}>
            <button style={s.btnNext} onClick={() => setStep(2)}>Continue →</button>
          </div>
        </div>
      )}

      {/* Step 2 — Sensitivity */}
      {step === 2 && (
        <div>
          <div style={s.tag}>Step 2 — sensitivity</div>
          <div style={s.title}>What's your in-game sensitivity?</div>
          <div style={s.sub}>The AI uses this to flag whether your sensitivity might be contributing to issues like overshoot or slow switching.</div>

          <div style={s.infoBox}>
            ℹ️ Enter your sensitivity from the game you play most — not your Kovaaks number. AimCoach will convert it automatically.
          </div>

          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: '10px' }}>Which game?</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: '8px', marginBottom: '18px' }}>
            {games.map(g => (
              <div
                key={g}
                onClick={() => setGame(g)}
                style={{ background: game === g ? 'rgba(127,119,221,0.08)' : '#1a1a1e', border: game === g ? '1.5px solid #7F77DD' : '0.5px solid rgba(255,255,255,0.12)', borderRadius: '10px', padding: '11px 10px', textAlign: 'center', cursor: 'pointer' }}>
                <div style={{ fontSize: '12px', fontWeight: '500', color: game === g ? '#AFA9EC' : 'rgba(255,255,255,0.55)' }}>{g}</div>
              </div>
            ))}
          </div>

          <div style={s.twoCol}>
            <div style={s.field}>
              <label style={s.label}>In-game sensitivity</label>
              <input style={s.input} type="number" placeholder="e.g. 0.35" step="0.01" value={sens} onChange={e => setSens(e.target.value)} />
              <div style={s.hint}>The number in your game settings</div>
            </div>
            <div style={s.field}>
              <label style={s.label}>Mouse DPI</label>
              <input style={s.input} type="number" placeholder="e.g. 800" value={dpi} onChange={e => setDpi(e.target.value)} />
              <div style={s.hint}>Found in your mouse software</div>
            </div>
          </div>

          {edpi && (
            <div style={{ background: 'rgba(127,119,221,0.1)', border: '0.5px solid rgba(127,119,221,0.25)', borderRadius: '8px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
              <div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>Your eDPI</div>
                <div style={{ fontSize: '20px', fontWeight: '500', color: '#AFA9EC' }}>{edpi.toLocaleString()}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>Range</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginTop: '2px' }}>{edpiRange}</div>
              </div>
            </div>
          )}

          <div style={s.navRow}>
            <button style={s.btnBack} onClick={() => setStep(1)}>← Back</button>
            <button style={s.btnNext} onClick={() => setStep(3)}>Continue →</button>
          </div>
        </div>
      )}

      {/* Step 3 — Hardware */}
      {step === 3 && (
        <div>
          <div style={s.tag}>Step 3 — hardware</div>
          <div style={s.title}>Tell us about your setup</div>
          <div style={s.sub}>Hardware factors like polling rate and mousepad surface affect aim in ways the AI accounts for when coaching you.</div>

          <div style={s.twoCol}>
            <div style={s.field}>
              <label style={s.label}>Mouse model</label>
              <input style={s.input} type="text" placeholder="e.g. Logitech G Pro X" value={mouse} onChange={e => setMouse(e.target.value)} />
            </div>
            <div style={s.field}>
              <label style={s.label}>Polling rate</label>
              <select style={s.select} value={pollingRate} onChange={e => setPollingRate(e.target.value)}>
                <option value="">Select polling rate</option>
                {['125 Hz', '500 Hz', '1000 Hz', '2000 Hz', '4000 Hz', '8000 Hz'].map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
          </div>

          <div style={s.twoCol}>
            <div style={s.field}>
              <label style={s.label}>Mousepad size</label>
              <select style={s.select} value={padSize} onChange={e => setPadSize(e.target.value)}>
                <option value="">Select size</option>
                {['Small (under 30cm)', 'Medium (30–45cm)', 'Large (45–60cm)', 'XL (60cm+)'].map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div style={s.field}>
              <label style={s.label}>Mousepad surface</label>
              <select style={s.select} value={padSurface} onChange={e => setPadSurface(e.target.value)}>
                <option value="">Select surface</option>
                {['Speed / slick', 'Balanced', 'Control / rough'].map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
          </div>

          <div style={s.field}>
            <label style={s.label}>Monitor refresh rate</label>
            <select style={s.select} value={monitorHz} onChange={e => setMonitorHz(e.target.value)}>
              <option value="">Select refresh rate</option>
              {['60 Hz', '144 Hz', '240 Hz', '360 Hz', '540 Hz'].map(r => <option key={r}>{r}</option>)}
            </select>
          </div>

          <div style={s.navRow}>
            <button style={s.btnBack} onClick={() => setStep(2)}>← Back</button>
            <button style={s.btnNext} onClick={() => setStep(4)}>Continue →</button>
          </div>
        </div>
      )}

      {/* Step 4 — Goals */}
      {step === 4 && (
        <div>
          <div style={s.tag}>Step 4 — goals</div>
          <div style={s.title}>What are you training for?</div>
          <div style={s.sub}>This helps the AI weight your routine toward what matters most for your game and goals.</div>

          <div style={s.field}>
            <label style={s.label}>Primary game you want to improve in</label>
            <input style={s.input} type="text" placeholder="e.g. Valorant, CS2, Apex..." value={targetGame} onChange={e => setTargetGame(e.target.value)} />
          </div>

          <div style={s.field}>
            <label style={s.label}>What's your biggest aim frustration right now?</label>
            <select style={s.select} value={frustration} onChange={e => setFrustration(e.target.value)}>
              <option value="">Select one</option>
              {[
                'Missing flicks on fast targets',
                'Losing tracking when targets strafe',
                'Inconsistent aim game to game',
                'Slow target switching in gunfights',
                'Clicking before crosshair settles',
                'Micro-adjustments feel off',
                "Don't know — that's why I'm here",
              ].map(f => <option key={f}>{f}</option>)}
            </select>
            <div style={s.hint}>The AI will verify or challenge this against your benchmark footage</div>
          </div>

          <div style={s.field}>
            <label style={s.label}>How many days per week can you train?</label>
            <select style={s.select} value={daysPerWeek} onChange={e => setDaysPerWeek(e.target.value)}>
              <option value="">Select</option>
              {['3 days', '4 days', '5 days', '6 days', 'Every day'].map(d => <option key={d}>{d}</option>)}
            </select>
            <div style={s.hint}>Be honest — the consistency bonus only rewards days you actually show up</div>
          </div>

          <div style={s.navRow}>
            <button style={s.btnBack} onClick={() => setStep(3)}>← Back</button>
            <button style={s.btnNext} onClick={() => setStep(5)}>Review & finish →</button>
          </div>
        </div>
      )}

      {/* Step 5 — Confirm */}
      {step === 5 && (
        <div>
          <div style={s.tag}>Step 5 — confirm</div>
          <div style={s.title}>Your setup profile</div>
          <div style={s.sub}>The AI uses this every week when analyzing your benchmark. You can update it anytime from settings.</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
            {summaryRows.map(([key, val]) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#1a1a1e', borderRadius: '8px' }}>
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>{key}</span>
                <span style={{ fontSize: '13px', fontWeight: '500' }}>{val}</span>
              </div>
            ))}
          </div>

          <div style={s.infoBox}>
            ✦ The AI will cross-reference this profile against your benchmark footage every week — connecting what it sees in your movement to your specific setup, not generic advice.
          </div>

          <div style={s.navRow}>
            <button style={s.btnBack} onClick={() => setStep(4)}>← Back</button>
            <button style={s.btnNext} onClick={saveProfile}>Start my first benchmark →</button>
          </div>
        </div>
      )}

      {/* Done */}
      {step === 6 && (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(29,158,117,0.15)', border: '0.5px solid rgba(29,158,117,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '24px' }}>✓</div>
          <div style={{ fontSize: '22px', fontWeight: '500', marginBottom: '8px' }}>You're all set</div>
          <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', lineHeight: '1.6', maxWidth: '360px', margin: '0 auto 32px' }}>
            Your profile is saved. Now run the AimCoach benchmark playlist in Kovaaks, record your session, and upload it to get your first coaching breakdown.
          </div>
          <div style={{ background: '#1a1a1e', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '20px', maxWidth: '380px', margin: '0 auto 24px', textAlign: 'left' }}>
            <div style={{ fontSize: '12px', fontWeight: '500', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px' }}>Your first Sunday checklist</div>
            {['Open Kovaaks', 'Load the AimCoach benchmark playlist', 'Start your screen recording', 'Play through every scenario', 'Upload the recording here'].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: '10px' }}>
                <span style={{ color: '#5DCAA5' }}>✓</span>{item}
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('/upload')}
            style={{ background: '#7F77DD', color: '#EEEDFE', border: 'none', borderRadius: '10px', padding: '13px 32px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
            Go to upload →
          </button>
        </div>
      )}
    </div>
  )
}

export default Onboarding