import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const scenarios = [
  {
    id: 1,
    name: '1w4ts_Aimbooster',
    tag: 'micro-adj',
    tagColor: '#85B7EB',
    tagBg: 'rgba(55,138,221,0.15)',
    time: '8 min',
    mins: 8,
    why: 'Targets your highest failure rate at 67%. The goal this week is loose grip — let the mouse settle naturally after landing rather than bracing it.',
    goal: 'Correction time under 100ms. Zero grip tension. If you feel your hand tighten, shake it out and reset.',
    cues: [
      "Don't chase score — focus entirely on how loose your grip feels",
      'After landing on a target, let your fingers settle the crosshair — don\'t push it',
      'If correction feels slow, you\'re probably tensing up mid-scenario',
    ],
  },
  {
    id: 2,
    name: 'VoxTargetSwitch Easy',
    tag: 'flick overshoot',
    tagColor: '#AFA9EC',
    tagBg: 'rgba(127,119,221,0.15)',
    time: '8 min',
    mins: 8,
    why: '63% failure on rightward flicks. Arm initiation — your arm starts the motion, wrist finishes the last 20%. Landing is the priority, not speed.',
    goal: 'Land within target bounds on first attempt, every flick. Slow the end of every flick slightly.',
    cues: [
      'Feel your arm engage first on any fast target — especially rightward',
      'Slow the last 20% of every flick deliberately',
      'If you overshoot, note whether it\'s right-side only — that confirms the wrist bias',
    ],
  },
  {
    id: 3,
    name: 'Kinetic Strafe Track',
    tag: 'strafe',
    tagColor: '#FAC775',
    tagBg: 'rgba(239,159,39,0.15)',
    time: '6 min',
    mins: 6,
    why: '48% failure on leftward strafes. Eyes on the target, not the crosshair. Follow through fully until the target completely stops.',
    goal: 'No early deceleration on leftward targets. Watch where the target is going, not where your crosshair is.',
    cues: [
      'Lock eyes on the target itself — not your crosshair',
      'Follow through until the target fully stops moving',
      'Left-side targets are the specific pattern — pay extra attention there',
    ],
  },
  {
    id: 4,
    name: 'Smoothbot',
    tag: 'click timing',
    tagColor: '#F09595',
    tagBg: 'rgba(226,75,74,0.15)',
    time: '6 min',
    mins: 6,
    why: '51% early click rate. Score does not matter this week. Use this scenario to build one habit: pause before clicking.',
    goal: 'Zero clicks before the crosshair fully settles. Every single run. This will feel painfully slow — that\'s correct.',
    cues: [
      'Land on target → pause → then click. Make it a rhythm.',
      'Score will drop. Ignore it completely this week.',
      'After 2–3 weeks this pause becomes automatic and speed returns',
    ],
  },
]

const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
const totalMins = 28

const reminders = [
  'Loose grip throughout — fingers guide, don\'t squeeze. Tension is causing your micro-adjustment hesitation.',
  'Arm initiates fast flicks, wrist finishes the last 20%. Don\'t start with wrist alone on rightward targets.',
  'Eyes on the target, not the crosshair. Let the crosshair follow naturally.',
  'Add a beat before clicking. Score doesn\'t matter this week — habit does.',
]

const skipped = [
  'Flicking · 17%',
  'Smooth tracking · 19%',
  'Crosshair placement · 11%',
  'Stopping accuracy · 22%',
  'Target switching · 28%',
  'Reactive tracking · 31%',
]

function Routine() {
  const navigate = useNavigate()
  const [completed, setCompleted] = useState([])
  const [expanded, setExpanded] = useState([1])
  const [showComplete, setShowComplete] = useState(false)

  const completedMins = scenarios.filter(s => completed.includes(s.id)).reduce((sum, s) => sum + s.mins, 0)
  const progress = Math.round((completedMins / totalMins) * 100)

  const currentScenario = scenarios.find(s => !completed.includes(s.id))

  function markDone(id) {
    const newCompleted = [...completed, id]
    setCompleted(newCompleted)

    const next = scenarios.find(s => !newCompleted.includes(s.id))
    if (next) {
      setExpanded([next.id])
    } else {
      setShowComplete(true)
    }
  }

  function toggleExpand(id) {
    setExpanded(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id])
  }

  const s = {
    page: { background: '#0e0e10', minHeight: '100vh', color: '#f0f0f0', padding: '28px 28px 90px', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" },
    nav: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' },
    logo: { fontSize: '15px', fontWeight: '500', flex: 1 },
    tag: { fontSize: '11px', fontWeight: '500', color: '#7F77DD', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' },
    title: { fontSize: '22px', fontWeight: '500', marginBottom: '4px' },
    sub: { fontSize: '13px', color: 'rgba(255,255,255,0.35)', marginBottom: '24px' },
    btn: { background: '#7F77DD', color: '#EEEDFE', border: 'none', borderRadius: '10px', padding: '13px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', width: '100%', fontFamily: 'inherit' },
  }

  return (
    <div style={s.page}>

      {/* Nav */}
      <div style={s.nav}>
        <div style={s.logo}>⊕ AimCoach</div>
        <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '20px', background: 'rgba(127,119,221,0.15)', border: '0.5px solid rgba(127,119,221,0.25)', color: '#AFA9EC' }}>Week 1 · Day 1</span>
        <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '20px', background: 'rgba(239,159,39,0.15)', border: '0.5px solid rgba(239,159,39,0.25)', color: '#FAC775', marginLeft: '4px' }}>Monday</span>
      </div>

      <div style={s.tag}>Today's routine</div>
      <div style={s.title}>Monday grind</div>
      <div style={s.sub}>Same 4 scenarios as every day this week. Open Kovaaks and work through them in order.</div>

      {/* Day strip */}
      <div style={{ background: '#141416', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '16px 18px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <span style={{ fontSize: '13px', fontWeight: '500' }}>Week 1 progress</span>
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>Sunday = benchmark day</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,minmax(0,1fr))', gap: '6px' }}>
          {days.map((day, i) => (
            <div key={day} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', marginBottom: '5px' }}>{day}</div>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: i === 6 ? '12px' : '11px', background: i === 0 ? '#7F77DD' : i === 6 ? 'rgba(239,159,39,0.15)' : 'rgba(255,255,255,0.04)', color: i === 0 ? '#EEEDFE' : i === 6 ? '#FAC775' : 'rgba(255,255,255,0.2)', fontWeight: i === 0 ? '600' : '400', border: i === 6 ? '0.5px solid rgba(239,159,39,0.25)' : 'none' }}>
                {i === 6 ? '🏆' : day[0]}
              </div>
              <div style={{ fontSize: '9px', marginTop: '4px', color: i === 0 ? '#AFA9EC' : 'rgba(255,255,255,0.2)' }}>{i === 0 ? 'today' : i === 6 ? 'bench' : '—'}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Focus card */}
      <div style={{ background: 'linear-gradient(135deg, rgba(127,119,221,0.12) 0%, rgba(127,119,221,0.04) 100%)', border: '0.5px solid rgba(127,119,221,0.2)', borderRadius: '14px', padding: '18px 20px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <span style={{ fontSize: '22px' }}>🔥</span>
          <div>
            <div style={{ fontSize: '16px', fontWeight: '500' }}>Today's focus</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '2px' }}>From this week's AI coaching — keep these in mind the entire session</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: '8px' }}>
          {[['Primary target', 'Micro-adjustment', '#85B7EB'], ['Total time', '28 min', '#f0f0f0'], ['Scenarios', '4', '#f0f0f0']].map(([label, val, color]) => (
            <div key={label} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '8px', padding: '10px 12px' }}>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginBottom: '3px' }}>{label}</div>
              <div style={{ fontSize: '15px', fontWeight: '500', color }}>{val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Time progress */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginBottom: '6px' }}>
          <span>{completedMins} of {totalMins} min completed</span>
          <span>{progress}%</span>
        </div>
        <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progress}%`, background: '#7F77DD', borderRadius: '3px', transition: 'width 0.3s' }}></div>
        </div>
      </div>

      {/* Coaching reminders */}
      <div style={{ background: 'rgba(239,159,39,0.06)', border: '0.5px solid rgba(239,159,39,0.15)', borderRadius: '10px', padding: '12px 14px', marginBottom: '24px' }}>
        <div style={{ fontSize: '12px', fontWeight: '500', color: '#FAC775', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          💡 This week's coaching reminders
        </div>
        {reminders.map((r, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '7px', fontSize: '12px', color: 'rgba(255,255,255,0.4)', lineHeight: '1.5', marginBottom: i < reminders.length - 1 ? '6px' : '0' }}>
            <span style={{ color: '#FAC775', marginTop: '1px', flexShrink: 0 }}>·</span>{r}
          </div>
        ))}
      </div>

      {/* Scenarios */}
      <div style={s.tag}>Scenarios — in order</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
        {scenarios.map(sc => {
          const isDone = completed.includes(sc.id)
          const isActive = currentScenario?.id === sc.id
          const isOpen = expanded.includes(sc.id)

          return (
            <div
              key={sc.id}
              style={{
                background: '#141416',
                border: isDone ? '0.5px solid rgba(29,158,117,0.3)' : isActive ? '0.5px solid rgba(127,119,221,0.4)' : '0.5px solid rgba(255,255,255,0.07)',
                borderRadius: '12px',
                overflow: 'hidden',
              }}>

              {/* Header */}
              <div
                onClick={() => toggleExpand(sc.id)}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 16px', cursor: 'pointer' }}>
                <div style={{ width: '26px', height: '26px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', flexShrink: 0, background: isDone ? 'rgba(29,158,117,0.15)' : isActive ? 'rgba(127,119,221,0.2)' : 'rgba(255,255,255,0.06)', color: isDone ? '#5DCAA5' : isActive ? '#AFA9EC' : 'rgba(255,255,255,0.4)' }}>
                  {isDone ? '✓' : sc.id}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: '500', marginBottom: '3px' }}>{sc.name}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '10px', padding: '2px 7px', borderRadius: '20px', background: sc.tagBg, color: sc.tagColor }}>{sc.tag}</span>
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>{sc.time}</span>
                  </div>
                </div>
                <span style={{ fontSize: '11px', color: isDone ? '#5DCAA5' : isActive ? '#AFA9EC' : 'rgba(255,255,255,0.2)' }}>
                  {isDone ? 'Completed ✓' : isActive ? '↑ Up now' : 'Pending'}
                </span>
              </div>

              {/* Body */}
              {isOpen && (
                <div style={{ padding: '0 16px 14px', borderTop: '0.5px solid rgba(255,255,255,0.05)', paddingTop: '14px' }}>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', lineHeight: '1.6', marginBottom: '10px' }}>{sc.why}</div>

                  <div style={{ background: 'rgba(127,119,221,0.07)', borderLeft: '2px solid rgba(127,119,221,0.4)', padding: '10px 12px', marginBottom: '10px' }}>
                    <div style={{ fontSize: '10px', fontWeight: '500', color: '#7F77DD', marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>This week's goal</div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', lineHeight: '1.5' }}>{sc.goal}</div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: isDone ? '0' : '12px' }}>
                    {sc.cues.map((cue, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '7px', fontSize: '12px', color: 'rgba(255,255,255,0.35)', lineHeight: '1.4' }}>
                        <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', flexShrink: 0, marginTop: '6px' }}></div>
                        {cue}
                      </div>
                    ))}
                  </div>

                  {isDone ? (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#5DCAA5', background: 'rgba(29,158,117,0.1)', borderRadius: '6px', padding: '4px 10px', marginTop: '10px' }}>
                      ✓ Marked complete — great work
                    </div>
                  ) : (
                    <button
                      onClick={() => markDone(sc.id)}
                      style={{ width: '100%', background: '#7F77DD', color: '#EEEDFE', border: 'none', borderRadius: '8px', padding: '11px', fontSize: '13px', fontWeight: '500', cursor: 'pointer', fontFamily: 'inherit' }}>
                      Mark as complete →
                    </button>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Complete card */}
      {showComplete && (
        <div style={{ background: 'linear-gradient(135deg, rgba(29,158,117,0.12) 0%, rgba(29,158,117,0.03) 100%)', border: '0.5px solid rgba(29,158,117,0.25)', borderRadius: '14px', padding: '24px 20px', textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(29,158,117,0.15)', border: '1px solid rgba(29,158,117,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', fontSize: '26px' }}>✓</div>
          <div style={{ fontSize: '18px', fontWeight: '500', marginBottom: '6px' }}>Session complete</div>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', marginBottom: '18px' }}>Monday done. 6 days left until benchmark Sunday.</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: '8px', marginBottom: '20px' }}>
            {[['Time trained', '28 min'], ['Scenarios done', '4 of 4'], ['Streak', '1 day']].map(([label, val]) => (
              <div key={label} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '8px', padding: '10px' }}>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginBottom: '3px' }}>{label}</div>
                <div style={{ fontSize: '14px', fontWeight: '500' }}>{val}</div>
              </div>
            ))}
          </div>
          <button style={s.btn} onClick={() => navigate('/ranks')}>View my skill ranks →</button>
        </div>
      )}

      {/* Skipped */}
      <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '8px', padding: '10px 14px', marginBottom: '24px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
        <span style={{ color: '#5DCAA5', fontSize: '16px', marginTop: '1px', flexShrink: 0 }}>✓</span>
        <div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)', marginBottom: '6px' }}>Not in this week's routine — all below 40% failure threshold</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {skipped.map(item => (
              <span key={item} style={{ fontSize: '11px', padding: '2px 9px', borderRadius: '20px', background: 'rgba(29,158,117,0.15)', border: '0.5px solid rgba(29,158,117,0.25)', color: '#5DCAA5' }}>{item}</span>
            ))}
          </div>
        </div>
      </div>

      <button style={{ ...s.btn, background: 'transparent', color: 'rgba(255,255,255,0.4)', border: '0.5px solid rgba(255,255,255,0.1)' }} onClick={() => navigate('/ranks')}>
        View my skill ranks →
      </button>

    </div>
  )
}

export default Routine