import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Upload() {
  const navigate = useNavigate()
  const [state, setState] = useState('upload') // upload | preview | analyzing | done

  const benchmarkScenarios = [
    'Gridshot Uncaged',
    '1w6ts Reload',
    'Smoothbot',
    'Kinetic Track Jump',
    'Strafe Bot Voltaic',
    'Fast Strafes Voltaic',
    '1w4ts_Aimbooster',
    'Tile Frenzy',
    'VT Smoothbot Switch',
  ]

  const analysisSteps = [
    { label: 'Video uploaded', detail: '47 min 22 sec · 1.84 GB received', status: 'done' },
    { label: 'Scenarios detected', detail: '9 of 9 benchmark scenarios found in footage', status: 'done' },
    { label: 'Crosshair tracking', detail: 'Frame-by-frame crosshair position extracted across all scenarios', status: 'done' },
    { label: 'Pattern analysis', detail: 'Identifying recurring failure patterns across all 10 skill categories — only patterns above 40% failure rate will be flagged...', status: 'active' },
    { label: 'Setup cross-reference', detail: 'Connecting findings to your eDPI, grip style, polling rate and hardware profile', status: 'waiting' },
    { label: 'Routine generation', detail: 'Building your personalized weekly routine and coaching breakdown', status: 'waiting' },
  ]

  const s = {
    page: { background: '#0e0e10', minHeight: '100vh', color: '#f0f0f0', padding: '28px 28px 90px', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" },
    nav: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' },
    logo: { fontSize: '15px', fontWeight: '500', flex: 1 },
    pill: (color) => ({ fontSize: '11px', padding: '3px 10px', borderRadius: '20px', background: color === 'purple' ? 'rgba(127,119,221,0.15)' : 'rgba(29,158,117,0.15)', border: `0.5px solid ${color === 'purple' ? 'rgba(127,119,221,0.25)' : 'rgba(29,158,117,0.25)'}`, color: color === 'purple' ? '#AFA9EC' : '#5DCAA5' }),
    tag: { fontSize: '11px', fontWeight: '500', color: '#7F77DD', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' },
    title: { fontSize: '22px', fontWeight: '500', marginBottom: '6px' },
    sub: { fontSize: '13px', color: 'rgba(255,255,255,0.35)', marginBottom: '24px' },
    card: { background: '#141416', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '16px 18px', marginBottom: '16px' },
    btn: { background: '#7F77DD', color: '#EEEDFE', border: 'none', borderRadius: '10px', padding: '13px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', width: '100%', fontFamily: 'inherit' },
  }

  return (
    <div style={s.page}>
      <div style={s.nav}>
        <div style={s.logo}>⊕ AimCoach</div>
        <span style={s.pill('purple')}>Week 1 — benchmark Sunday</span>
      </div>

      {/* Upload state */}
      {state === 'upload' && (
        <div>
          <div style={s.tag}>Sunday benchmark upload</div>
          <div style={s.title}>Upload this week's recording</div>
          <div style={s.sub}>Drop your full session clip below. The AI will watch it and have your coaching breakdown and next week's routine ready within minutes.</div>

          <div
            onClick={() => setState('preview')}
            style={{ border: '1px dashed rgba(255,255,255,0.12)', borderRadius: '14px', padding: '52px 28px', textAlign: 'center', cursor: 'pointer', marginBottom: '20px' }}>
            <div style={{ fontSize: '36px', marginBottom: '14px' }}>📹</div>
            <div style={{ fontSize: '16px', fontWeight: '500', marginBottom: '6px' }}>Drop your benchmark recording here</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', marginBottom: '18px' }}>One full session clip — record from the first scenario to the last</div>
            <button style={{ background: '#7F77DD', color: '#EEEDFE', border: 'none', borderRadius: '8px', padding: '10px 22px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>
              Choose video file
            </button>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', marginTop: '12px' }}>MP4 · MOV · MKV · up to 4GB</div>
          </div>

          <div style={s.card}>
            <div style={{ fontSize: '12px', fontWeight: '500', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px' }}>Before you upload — quick check</div>
            {[
              [true, 'Recording started before the first scenario'],
              [true, 'All 9 benchmark scenarios are in the clip'],
              [true, 'Crosshair is clearly visible throughout'],
              [true, 'No major frame drops or lag in the recording'],
              [false, "Don't upload edited or cut clips — the AI needs the full session"],
            ].map(([good, text], i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: i < 4 ? '0.5px solid rgba(255,255,255,0.05)' : 'none' }}>
                <span style={{ color: good ? '#5DCAA5' : 'rgba(255,255,255,0.2)', fontSize: '16px' }}>{good ? '✓' : '✗'}</span>
                <span style={{ fontSize: '13px', color: good ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.3)' }}>{text}</span>
              </div>
            ))}
          </div>

          <div style={{ background: 'rgba(127,119,221,0.08)', borderLeft: '2px solid #7F77DD', padding: '12px 16px', marginBottom: '20px' }}>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', lineHeight: '1.6' }}>
              <span style={{ color: '#AFA9EC' }}>Tip:</span> Record at 1080p or higher. The AI reads crosshair position and target movement — higher resolution means more accurate coaching.
            </div>
          </div>

          <div style={s.card}>
            <div style={{ fontSize: '12px', fontWeight: '500', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px' }}>This week's benchmark playlist</div>
            {benchmarkScenarios.map((scenario, i) => (
              <div key={scenario} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: i < benchmarkScenarios.length - 1 ? '0.5px solid rgba(255,255,255,0.05)' : 'none' }}>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', minWidth: '20px' }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', flex: 1 }}>{scenario}</span>
              </div>
            ))}
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', marginTop: '12px', paddingTop: '12px', borderTop: '0.5px solid rgba(255,255,255,0.05)' }}>Total: ~40 minutes · play in order · record the full session</div>
          </div>
        </div>
      )}

      {/* Preview state */}
      {state === 'preview' && (
        <div>
          <div style={s.tag}>Sunday benchmark upload</div>
          <div style={s.title}>Ready to analyze</div>
          <div style={s.sub}>Looks good. Hit upload and the AI will get to work.</div>

          <div style={{ ...s.card, display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontSize: '24px', color: '#7F77DD' }}>🎬</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '3px' }}>kovaaks_session_week1.mp4</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>1.84 GB · MP4 · 42 min 18 sec</div>
            </div>
            <span onClick={() => setState('upload')} style={{ fontSize: '14px', color: 'rgba(255,255,255,0.25)', cursor: 'pointer' }}>✕</span>
          </div>

          <div style={s.card}>
            <div style={{ fontSize: '12px', fontWeight: '500', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px' }}>What the AI will analyze</div>
            {[
              'Crosshair movement — overshoot, jitter, smoothness',
              'Target acquisition speed and consistency',
              'Click timing — early, late, or on target',
              'Strafe and tracking direction bias',
              'Micro-adjustment lag after landing on target',
              'Crosshair placement between engagements',
              'Cross-referenced against your setup profile',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: i < 6 ? '0.5px solid rgba(255,255,255,0.05)' : 'none' }}>
                <span style={{ color: '#5DCAA5' }}>✓</span>
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)' }}>{item}</span>
              </div>
            ))}
          </div>

          <button style={s.btn} onClick={() => setState('analyzing')}>Upload & analyze →</button>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', textAlign: 'center', marginTop: '10px' }}>Analysis usually takes 3–6 minutes depending on video length</div>
        </div>
      )}

      {/* Analyzing state */}
      {state === 'analyzing' && (
        <div>
          <div style={{ textAlign: 'center', padding: '20px 0 32px' }}>
            <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(127,119,221,0.1)', border: '1px solid rgba(127,119,221,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '28px' }}>⚙️</div>
            <div style={{ fontSize: '20px', fontWeight: '500', marginBottom: '6px' }}>Analyzing your session</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)' }}>The AI is watching your footage. This usually takes 3–6 minutes.</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0', marginBottom: '28px' }}>
            {analysisSteps.map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', padding: '14px 0', borderBottom: i < analysisSteps.length - 1 ? '0.5px solid rgba(255,255,255,0.05)' : 'none' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '2px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: step.status === 'done' ? '#5DCAA5' : step.status === 'active' ? '#7F77DD' : 'rgba(255,255,255,0.12)', flexShrink: 0 }}></div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: '500', color: step.status === 'done' ? '#5DCAA5' : step.status === 'active' ? '#f0f0f0' : 'rgba(255,255,255,0.25)', marginBottom: '3px' }}>{step.label}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', lineHeight: '1.5' }}>{step.detail}</div>
                  {step.status === 'done' && <span style={{ fontSize: '11px', background: 'rgba(29,158,117,0.15)', color: '#5DCAA5', padding: '2px 8px', borderRadius: '20px', display: 'inline-block', marginTop: '4px' }}>Done</span>}
                  {step.status === 'active' && <span style={{ fontSize: '11px', background: 'rgba(127,119,221,0.15)', color: '#AFA9EC', padding: '2px 8px', borderRadius: '20px', display: 'inline-block', marginTop: '4px' }}>In progress</span>}
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: '#141416', borderRadius: '10px', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
            <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '55%', background: '#7F77DD', borderRadius: '2px' }}></div>
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', whiteSpace: 'nowrap' }}>~3 min remaining</div>
          </div>

          <div style={{ textAlign: 'center', fontSize: '12px', color: 'rgba(255,255,255,0.2)', marginBottom: '24px' }}>
            You can close this tab — we'll email you when it's ready
          </div>

          <button style={s.btn} onClick={() => setState('done')}>
            Skip to results (demo) →
          </button>
        </div>
      )}

      {/* Done state */}
      {state === 'done' && (
        <div>
          <div style={{ textAlign: 'center', padding: '20px 0 28px' }}>
            <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(29,158,117,0.12)', border: '1px solid rgba(29,158,117,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '28px' }}>✓</div>
            <div style={{ fontSize: '20px', fontWeight: '500', marginBottom: '6px' }}>Analysis complete</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', marginBottom: '28px' }}>Your week 1 breakdown is ready. Here's a quick preview.</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
            {[
              ['Patterns found', '4', 'above 40% failure rate'],
              ['Strengths confirmed', '3', 'skipped from routine'],
              ['Timestamps flagged', '11', 'specific moments in footage'],
              ['Routine length', '28 min', '4 scenarios · daily'],
            ].map(([label, val, sub]) => (
              <div key={label} style={s.card}>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginBottom: '4px' }}>{label}</div>
                <div style={{ fontSize: '20px', fontWeight: '500' }}>{val}</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '2px' }}>{sub}</div>
              </div>
            ))}
          </div>

          <div style={{ ...s.card, marginBottom: '12px' }}>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginBottom: '10px' }}>Confirmed weakness patterns this week</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {['Micro-adjustment · 67%', 'Flick overshoot · 63%', 'Click timing · 51%', 'Strafe tracking · 48%'].map(s => (
                <span key={s} style={{ fontSize: '12px', background: 'rgba(226,75,74,0.12)', color: '#F09595', borderRadius: '6px', padding: '4px 10px' }}>{s}</span>
              ))}
            </div>
          </div>

          <div style={{ ...s.card, marginBottom: '20px' }}>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginBottom: '10px' }}>Strengths — not in this week's routine</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {['Flicking · 17%', 'Crosshair placement · 11%', 'Stopping accuracy · 22%'].map(s => (
                <span key={s} style={{ fontSize: '12px', background: 'rgba(29,158,117,0.12)', color: '#5DCAA5', borderRadius: '6px', padding: '4px 10px' }}>{s}</span>
              ))}
            </div>
          </div>

          <button style={s.btn} onClick={() => navigate('/breakdown')}>
            View full breakdown & this week's routine →
          </button>
        </div>
      )}
    </div>
  )
}

export default Upload