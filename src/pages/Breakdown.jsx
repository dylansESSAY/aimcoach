import { useNavigate } from 'react-router-dom'

const s = {
  page: { background: '#0e0e10', minHeight: '100vh', color: '#f0f0f0', padding: '28px 28px 90px', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" },
  nav: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' },
  logo: { fontSize: '15px', fontWeight: '500', flex: 1 },
  pill: (color) => ({
    fontSize: '11px', padding: '3px 10px', borderRadius: '20px',
    background: color === 'purple' ? 'rgba(127,119,221,0.15)' : 'rgba(29,158,117,0.15)',
    border: `0.5px solid ${color === 'purple' ? 'rgba(127,119,221,0.25)' : 'rgba(29,158,117,0.25)'}`,
    color: color === 'purple' ? '#AFA9EC' : '#5DCAA5'
  }),
  tag: { fontSize: '11px', fontWeight: '500', color: '#7F77DD', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' },
  title: { fontSize: '22px', fontWeight: '500', marginBottom: '4px' },
  sub: { fontSize: '13px', color: 'rgba(255,255,255,0.35)', marginBottom: '24px' },
  card: { background: '#141416', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '16px 18px', marginBottom: '16px' },
  cardTitle: { fontSize: '13px', fontWeight: '500', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '7px' },
  btn: { background: '#7F77DD', color: '#EEEDFE', border: 'none', borderRadius: '10px', padding: '13px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', width: '100%', fontFamily: 'inherit' },
}

const patterns = [
  {
    skill: 'Micro-adjustment',
    rate: '67%',
    rateColor: '#F09595',
    rateBg: 'rgba(226,75,74,0.15)',
    stat: '22 of 33 attempts',
    desc: 'After landing on target your crosshair hesitates before settling. Consistent across all three scenarios that involve small targets — not isolated to one moment.',
    timestamps: ['2:38', '11:14', '29:52'],
    rootCause: 'Grip tension',
    rootColor: '#FAC775',
    rootBg: 'rgba(239,159,39,0.15)',
    what: 'The correction lag is consistent enough that it\'s almost certainly grip-related. Your hand is bracing the mouse after landing — tension in a palm grip creates exactly this hesitation pattern.',
    action: 'Consciously reduce grip pressure this week. Fingers should guide the mouse, not squeeze it. The jitter and hesitation should drop within 2–3 sessions of deliberate loose grip practice.',
  },
  {
    skill: 'Flick overshoot',
    rate: '63%',
    rateColor: '#F09595',
    rateBg: 'rgba(226,75,74,0.15)',
    stat: '17 of 27 rightward flicks',
    desc: 'Rightward overshoot is consistent throughout the entire session. It\'s not fatigue — the rate is similar in the first scenario and the last. A technique or sensitivity pattern.',
    timestamps: ['0:14', '8:41', '31:07'],
    rootCause: 'Sensitivity + technique',
    rootColor: '#AFA9EC',
    rootBg: 'rgba(127,119,221,0.15)',
    what: 'The right-side bias and your eDPI together point to wrist-only movement on fast rightward flicks. You\'re running out of wrist range and overcorrecting at the end.',
    action: 'Let your arm start fast flicks, wrist finishes the last 20%. Don\'t change sensitivity yet — fix the arm-wrist coordination first. If the pattern persists past week 7, revisit sens.',
  },
  {
    skill: 'Click timing',
    rate: '51%',
    rateColor: '#FAC775',
    rateBg: 'rgba(239,159,39,0.15)',
    stat: '19 of 37 clicks',
    desc: 'Early clicks happen across all scenarios but are more pronounced on smaller targets. You\'re firing as soon as you\'re close, not when you\'re on.',
    timestamps: ['3:55', '18:22'],
    rootCause: 'Ingrained habit',
    rootColor: '#F09595',
    rootBg: 'rgba(226,75,74,0.15)',
    what: 'You\'re firing as soon as you\'re close to target, not when you\'re on it. This is a speed-chasing habit built from grinding scenarios that reward fast clicks.',
    action: 'Add a deliberate beat between landing and clicking this week. Score will drop. That\'s fine — you\'re rewiring a habit, not chasing points. It becomes automatic after 2–3 weeks.',
  },
  {
    skill: 'Strafe tracking',
    rate: '48%',
    rateColor: '#FAC775',
    rateBg: 'rgba(239,159,39,0.15)',
    stat: '13 of 27 left-moving targets',
    desc: 'Early deceleration on leftward strafes specifically. Right-moving targets are fine at 31% — only left has the pattern. Dominant-hand follow-through bias.',
    timestamps: ['1:02', '22:18'],
    rootCause: 'Technique',
    rootColor: '#F09595',
    rootBg: 'rgba(226,75,74,0.15)',
    what: 'You\'re decelerating before the target stops — anticipating the end of the strafe rather than following it. Eyes may be drifting to the crosshair instead of staying on the target.',
    action: 'Watch the target, not the crosshair. Keep your eyes locked on where the target is going and let the crosshair follow. Follow through fully until the target fully stops.',
  },
]

const skillBars = [
  { name: 'Flicking', prev: 79, now: 83, color: '#5DCAA5' },
  { name: 'Flick overshoot', prev: 38, now: 42, color: '#EF9F27' },
  { name: 'Smooth tracking', prev: 55, now: 67, color: '#5DCAA5' },
  { name: 'Reactive tracking', prev: 48, now: 53, color: '#EF9F27' },
  { name: 'Strafe tracking', prev: 28, now: 52, color: '#EF9F27' },
  { name: 'Target switching', prev: 61, now: 64, color: '#5DCAA5' },
  { name: 'Micro-adjustment', prev: 18, now: 41, color: '#E24B4A' },
  { name: 'Click timing', prev: 44, now: 47, color: '#EF9F27' },
  { name: 'Stopping accuracy', prev: 70, now: 73, color: '#5DCAA5' },
  { name: 'Crosshair placement', prev: 79, now: 81, color: '#5DCAA5' },
]

const scenarios = [
  { num: 1, name: '1w4ts_Aimbooster', tag: 'micro-adj', tagColor: '#85B7EB', tagBg: 'rgba(55,138,221,0.15)', time: '8 min', why: 'Targets your highest failure rate at 67%. Focus entirely on loose grip — the scenario will feel harder but correction lag should drop within days.', goal: 'Correction time under 100ms. Zero grip tension.' },
  { num: 2, name: 'VoxTargetSwitch Easy', tag: 'flick overshoot', tagColor: '#AFA9EC', tagBg: 'rgba(127,119,221,0.15)', time: '8 min', why: '63% failure on rightward flicks. Arm initiation — your arm starts the motion, wrist finishes. Landing is the priority, not speed.', goal: 'Land within target bounds on first attempt, every flick.' },
  { num: 3, name: 'Kinetic Strafe Track', tag: 'strafe', tagColor: '#FAC775', tagBg: 'rgba(239,159,39,0.15)', time: '6 min', why: '48% failure on leftward strafes. Eyes on the target, not the crosshair. Follow through fully until the target completely stops.', goal: 'No early deceleration on leftward targets.' },
  { num: 4, name: 'Smoothbot', tag: 'click timing', tagColor: '#F09595', tagBg: 'rgba(226,75,74,0.15)', time: '6 min', why: '51% early click rate. Score does not matter this week. Use this scenario to build one habit: pause before clicking.', goal: 'Zero clicks before the crosshair fully settles.' },
]

const ignored = [
  'Reactive tracking · 31%',
  'Target switching · 28%',
  'Stopping accuracy · 22%',
  'Smooth tracking · 19%',
  'Flicking · 17%',
  'Crosshair placement · 11%',
]

const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

function Breakdown() {
  const navigate = useNavigate()

  return (
    <div style={s.page}>
      <div style={s.nav}>
        <div style={s.logo}>⊕ AimCoach</div>
        <span style={s.pill('purple')}>Week 1 breakdown</span>
        <span style={{ ...s.pill('green'), marginLeft: '4px' }}>Analysis complete</span>
      </div>

      <div style={s.tag}>Week 1 — benchmark analysis</div>
      <div style={s.title}>Here's what the AI found</div>
      <div style={s.sub}>Based on your full 42 min benchmark recording · only recurring patterns are flagged — isolated mistakes are ignored</div>

      {/* Summary stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: '10px', marginBottom: '20px' }}>
        {[
          ['Overall rank', 'Bronze I', 'rgba(255,255,255,0.3)', 'first benchmark'],
          ['Patterns confirmed', '4', '#F09595', 'all above 40% failure rate'],
          ['Ignored mistakes', '6', 'rgba(255,255,255,0.3)', 'below threshold · not drilled'],
          ['Timestamps flagged', '11', 'rgba(255,255,255,0.3)', 'across all 9 scenarios'],
        ].map(([label, val, color, sub]) => (
          <div key={label} style={{ background: '#141416', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '12px 14px' }}>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginBottom: '4px' }}>{label}</div>
            <div style={{ fontSize: '18px', fontWeight: '500', color }}>{val}</div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '2px' }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* Two col — patterns + skill bars */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,0.9fr)', gap: '14px', marginBottom: '20px' }}>

        {/* Patterns */}
        <div style={s.card}>
          <div style={s.cardTitle}>📊 Confirmed weakness patterns</div>
          {patterns.map((p, i) => (
            <div key={p.skill} style={{ borderBottom: i < patterns.length - 1 ? '0.5px solid rgba(255,255,255,0.05)' : 'none', padding: '14px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ fontSize: '13px', fontWeight: '500', flex: 1 }}>{p.skill}</span>
                <span style={{ fontSize: '11px', padding: '2px 9px', borderRadius: '20px', background: p.rateBg, color: p.rateColor }}>{p.rate} failure rate</span>
              </div>
              <div style={{ fontSize: '13px', fontWeight: '500', color: p.rateColor, marginBottom: '4px' }}>
                <span style={{ color: p.rateColor }}>{p.stat}</span> showed this pattern
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', lineHeight: '1.55', marginBottom: '8px' }}>{p.desc}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)' }}>See it at →</span>
                {p.timestamps.map(t => (
                  <span key={t} style={{ fontSize: '11px', background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)', padding: '2px 8px', borderRadius: '4px' }}>{t}</span>
                ))}
              </div>
            </div>
          ))}

          {/* Ignored */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '0.5px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '10px 14px', marginTop: '14px' }}>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', marginBottom: '8px' }}>Mistakes below the 40% threshold — noticed but not drilled this week</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {ignored.map(item => (
                <span key={item} style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.04)', padding: '2px 8px', borderRadius: '4px' }}>{item}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Skill bars */}
        <div style={s.card}>
          <div style={s.cardTitle}>📈 Skill scores — week 1</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {skillBars.map(skill => (
              <div key={skill.name} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', minWidth: '108px' }}>{skill.name}</span>
                <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${skill.now}%`, borderRadius: '3px', background: skill.color }}></div>
                </div>
                <span style={{ fontSize: '11px', minWidth: '28px', textAlign: 'right', color: skill.color }}>{skill.now}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Root cause coaching */}
      <div style={s.card}>
        <div style={s.cardTitle}>💡 Root cause coaching — why these patterns are happening</div>
        {patterns.map((p, i) => (
          <div key={p.skill} style={{ borderBottom: i < patterns.length - 1 ? '0.5px solid rgba(255,255,255,0.05)' : 'none', padding: '14px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ fontSize: '13px', fontWeight: '500', flex: 1 }}>{p.skill} — {p.rate} failure rate</span>
              <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '20px', background: p.rootBg, color: p.rootColor }}>{p.rootCause}</span>
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginBottom: '6px' }}>
              Seen in <span style={{ color: '#F09595', fontWeight: '500' }}>{p.stat}</span>
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', lineHeight: '1.55', marginBottom: '8px' }}>{p.what}</div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', background: 'rgba(127,119,221,0.07)', borderRadius: '6px', padding: '9px 11px' }}>
              <span style={{ fontSize: '11px', fontWeight: '500', color: '#7F77DD', whiteSpace: 'nowrap', marginTop: '1px' }}>Try this →</span>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', lineHeight: '1.5' }}>{p.action}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Weekly routine */}
      <div style={s.card}>
        <div style={s.cardTitle}>✅ Week 1 routine — Mon through Sat</div>
        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginBottom: '16px' }}>Same 4 scenarios every day · 28 minutes · hard cap · targeting your 4 confirmed patterns only</div>

        {/* Day strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,minmax(0,1fr))', gap: '5px', marginBottom: '16px' }}>
          {days.map((day, i) => (
            <div key={day} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', marginBottom: '4px' }}>{day}</div>
              <div style={{ width: '26px', height: '26px', borderRadius: '50%', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', background: i === 0 ? '#7F77DD' : i === 6 ? 'rgba(239,159,39,0.2)' : 'rgba(255,255,255,0.06)', color: i === 0 ? '#EEEDFE' : i === 6 ? '#FAC775' : 'rgba(255,255,255,0.25)' }}>
                {i === 6 ? '🏆' : day[0]}
              </div>
            </div>
          ))}
        </div>

        {/* Scenarios */}
        {scenarios.map(sc => (
          <div key={sc.num} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '12px 14px', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)', minWidth: '16px' }}>{sc.num}</span>
              <span style={{ fontSize: '13px', fontWeight: '500', flex: 1 }}>{sc.name}</span>
              <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '20px', background: sc.tagBg, color: sc.tagColor }}>{sc.tag}</span>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>{sc.time}</span>
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginBottom: '5px', paddingLeft: '24px', lineHeight: '1.5' }}>{sc.why}</div>
            <div style={{ fontSize: '11px', color: '#7F77DD', background: 'rgba(127,119,221,0.1)', padding: '3px 9px', borderRadius: '5px', display: 'inline-block', marginLeft: '24px' }}>Goal: {sc.goal}</div>
          </div>
        ))}

        {/* Skipped */}
        <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '12px 14px', display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '4px' }}>
          <span style={{ color: '#5DCAA5', fontSize: '16px', marginTop: '1px' }}>✓</span>
          <div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)', marginBottom: '6px' }}>Not drilled this week — all below 40% failure threshold</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {ignored.map(item => (
                <span key={item} style={{ fontSize: '11px', padding: '2px 9px', borderRadius: '20px', background: 'rgba(29,158,117,0.15)', border: '0.5px solid rgba(29,158,117,0.25)', color: '#5DCAA5' }}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button style={s.btn} onClick={() => navigate('/routine')}>
        Go to today's routine →
      </button>
    </div>
  )
}

export default Breakdown