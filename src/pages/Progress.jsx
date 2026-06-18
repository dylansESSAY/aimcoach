import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const weeklyLog = [
  {
    week: 'Week 9',
    rank: 'Platinum II',
    rankColor: '#85B7EB',
    score: '2,340',
    delta: '+180',
    deltaColor: '#5DCAA5',
    days: ['done', 'done', 'done', 'done', 'done', 'done', 'bench'],
    improved: ['Micro-adj +220', 'Strafe +140', 'Flick overshoot +160'],
    stalled: ['Click timing +30'],
    regressed: [],
    daysCount: '6 of 6',
    daysColor: '#5DCAA5',
    bonus: '+36 pts',
    bonusColor: '#5DCAA5',
    patterns: '4',
  },
  {
    week: 'Week 8',
    rank: 'Platinum II',
    rankColor: '#85B7EB',
    score: '2,160',
    delta: '+210',
    deltaColor: '#5DCAA5',
    days: ['done', 'done', 'missed', 'done', 'done', 'done', 'bench'],
    improved: ['Strafe +180', 'Micro-adj +190'],
    stalled: ['Click timing +25', 'Flick overshoot +40'],
    regressed: [],
    daysCount: '5 of 6',
    daysColor: 'rgba(255,255,255,0.3)',
    bonus: '+24 pts',
    bonusColor: 'rgba(255,255,255,0.3)',
    patterns: '4',
  },
  {
    week: 'Week 7',
    rank: 'Platinum I',
    rankColor: '#85B7EB',
    score: '1,950',
    delta: '+190',
    deltaColor: '#5DCAA5',
    days: ['done', 'done', 'done', 'done', 'done', 'done', 'bench'],
    improved: ['Flick overshoot +200', 'Micro-adj +160'],
    stalled: [],
    regressed: ['Reactive tracking −20'],
    daysCount: '6 of 6',
    daysColor: '#5DCAA5',
    bonus: '+38 pts',
    bonusColor: '#5DCAA5',
    patterns: '5',
  },
  {
    week: 'Week 6',
    rank: 'Gold III',
    rankColor: '#FAC775',
    score: '1,760',
    delta: '+80',
    deltaColor: 'rgba(255,255,255,0.3)',
    days: ['done', 'missed', 'missed', 'done', 'done', 'done', 'bench'],
    improved: ['Strafe +120'],
    stalled: ['Micro-adj +40', 'Click timing +20'],
    regressed: [],
    daysCount: '4 of 6',
    daysColor: '#F09595',
    bonus: '+8 pts',
    bonusColor: '#F09595',
    patterns: '4',
  },
  {
    week: 'Week 5',
    rank: 'Gold III',
    rankColor: '#FAC775',
    score: '1,680',
    delta: '+240',
    deltaColor: '#5DCAA5',
    days: ['done', 'done', 'done', 'done', 'done', 'done', 'bench'],
    improved: ['Strafe +240', 'Micro-adj +220', 'Flick overshoot +160'],
    stalled: ['Click timing +30'],
    regressed: [],
    daysCount: '6 of 6',
    daysColor: '#5DCAA5',
    bonus: '+48 pts',
    bonusColor: '#5DCAA5',
    patterns: '4',
  },
  {
    week: 'Week 4',
    rank: 'Gold II',
    rankColor: '#FAC775',
    score: '1,440',
    delta: '+180',
    deltaColor: '#5DCAA5',
    days: ['done', 'done', 'done', 'missed', 'done', 'done', 'bench'],
    improved: ['Flick overshoot +190', 'Strafe +150'],
    stalled: ['Micro-adj +60'],
    regressed: [],
    daysCount: '5 of 6',
    daysColor: 'rgba(255,255,255,0.3)',
    bonus: '+24 pts',
    bonusColor: 'rgba(255,255,255,0.3)',
    patterns: '4',
  },
  {
    week: 'Week 3',
    rank: 'Gold I',
    rankColor: '#FAC775',
    score: '1,260',
    delta: '+310',
    deltaColor: '#5DCAA5',
    days: ['done', 'done', 'done', 'done', 'done', 'done', 'bench'],
    improved: ['Smooth tracking +240', 'Strafe +200', 'Flick overshoot +180'],
    stalled: [],
    regressed: [],
    daysCount: '6 of 6',
    daysColor: '#5DCAA5',
    bonus: '+62 pts',
    bonusColor: '#5DCAA5',
    patterns: '5',
  },
  {
    week: 'Week 2',
    rank: 'Silver III',
    rankColor: '#D3D1C7',
    score: '950',
    delta: '+310',
    deltaColor: '#5DCAA5',
    days: ['done', 'done', 'done', 'done', 'done', 'missed', 'bench'],
    improved: ['Micro-adj +280', 'Flick overshoot +220', 'Click timing +80'],
    stalled: [],
    regressed: [],
    daysCount: '5 of 6',
    daysColor: 'rgba(255,255,255,0.3)',
    bonus: '+24 pts',
    bonusColor: 'rgba(255,255,255,0.3)',
    patterns: '6',
  },
  {
    week: 'Week 1',
    rank: 'Bronze I',
    rankColor: '#F0997B',
    score: '640',
    delta: 'baseline',
    deltaColor: 'rgba(255,255,255,0.3)',
    days: ['done', 'done', 'done', 'done', 'done', 'done', 'bench'],
    improved: [],
    stalled: [],
    regressed: [],
    daysCount: '6 of 6',
    daysColor: '#5DCAA5',
    bonus: '+36 pts',
    bonusColor: '#5DCAA5',
    patterns: '4',
  },
]

const skillHistory = [
  { name: 'Micro-adjustment', icon: '✛', color: '#E24B4A', rank: 'Bronze III', type: 'weak', bars: [10, 18, 24, 32, 41, 52, 64, 78, 97], rankHistory: ['Wk1: Bronze I', 'Wk3: Bronze II', 'Wk6: Bronze III'] },
  { name: 'Click timing', icon: '🖱️', color: '#888780', rank: 'Silver I', type: 'weak', bars: [55, 58, 59, 60, 61, 62, 63, 64, 66], rankHistory: ['Wk1: Silver I', '⚠ stalled 3 weeks'] },
  { name: 'Flick overshoot', icon: '🎯', color: '#888780', rank: 'Silver III', type: 'weak', bars: [18, 28, 38, 50, 60, 68, 76, 84, 90], rankHistory: ['Wk1: Bronze III', '↑ Wk3: Silver I', '↑ Wk6: Silver II', '↑ Wk8: Silver III'] },
  { name: 'Strafe tracking', icon: '↔️', color: '#EF9F27', rank: 'Gold I', type: 'weak', bars: [8, 18, 30, 44, 56, 64, 72, 80, 87], rankHistory: ['Wk1: Bronze I', '↑ Wk2: Bronze II', '↑ Wk4: Silver II', '↑ Wk7: Silver III', '↑ Wk9: Gold I'] },
  { name: 'Flicking', icon: '⚡', color: '#1D9E75', rank: 'Diamond I', type: 'strong', bars: [55, 65, 72, 80, 82, 84, 87, 89, 92], rankHistory: ['Wk1: Gold II', '↑ Wk3: Gold III', '↑ Wk5: Platinum II', '↑ Wk7: Diamond I', '✓ graduated wk 4'] },
  { name: 'Smooth tracking', icon: '〰️', color: '#EF9F27', rank: 'Gold III', type: 'strong', bars: [30, 42, 54, 68, 70, 72, 74, 76, 78], rankHistory: ['Wk1: Bronze III', '↑ Wk3: Silver II', '↑ Wk6: Gold I', '↑ Wk9: Gold III', '✓ graduated wk 5'] },
  { name: 'Stopping accuracy', icon: '⏹️', color: '#EF9F27', rank: 'Gold III', type: 'strong', bars: [40, 52, 60, 69, 70, 71, 73, 75, 76], rankHistory: ['Wk1: Bronze II', '↑ Wk3: Silver I', '↑ Wk6: Gold I', '↑ Wk9: Gold III', '✓ graduated wk 6'] },
  { name: 'Crosshair placement', icon: '👁️', color: '#1D9E75', rank: 'Diamond I', type: 'strong', bars: [60, 70, 77, 83, 84, 85, 86, 88, 90], rankHistory: ['Wk1: Gold I', '↑ Wk4: Platinum I', '↑ Wk7: Diamond I', '✓ graduated wk 2'] },
]

const graduated = [
  { name: 'Crosshair placement', icon: '👁️', week: 'Week 2', rank: 'Diamond I', rankColor: '#5DCAA5' },
  { name: 'Flicking', icon: '⚡', week: 'Week 4', rank: 'Diamond I', rankColor: '#5DCAA5' },
  { name: 'Smooth tracking', icon: '〰️', week: 'Week 5', rank: 'Gold III', rankColor: '#EF9F27' },
  { name: 'Stopping accuracy', icon: '⏹️', week: 'Week 6', rank: 'Gold III', rankColor: '#EF9F27' },
]

const chartPoints = [148, 138, 120, 104, 88, 72, 58, 44, 30]

function Progress() {
  const navigate = useNavigate()
  const [openWeeks, setOpenWeeks] = useState([])
  const [skillFilter, setSkillFilter] = useState('all')

  function toggleWeek(week) {
    setOpenWeeks(prev => prev.includes(week) ? prev.filter(w => w !== week) : [...prev, week])
  }

  const filteredSkills = skillHistory.filter(s => skillFilter === 'all' ? true : s.type === skillFilter)

  const s = {
    page: { background: '#0e0e10', minHeight: '100vh', color: '#f0f0f0', padding: '28px 28px 90px', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" },
    nav: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' },
    logo: { fontSize: '15px', fontWeight: '500', flex: 1 },
    tag: { fontSize: '11px', fontWeight: '500', color: '#7F77DD', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' },
    title: { fontSize: '22px', fontWeight: '500', marginBottom: '4px' },
    sub: { fontSize: '13px', color: 'rgba(255,255,255,0.35)', marginBottom: '24px' },
    card: { background: '#141416', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '16px 18px', marginBottom: '16px' },
    btn: { background: '#7F77DD', color: '#EEEDFE', border: 'none', borderRadius: '10px', padding: '13px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', width: '100%', fontFamily: 'inherit', marginTop: '8px' },
  }

  return (
    <div style={s.page}>

      <div style={s.nav}>
        <div style={s.logo}>⊕ AimCoach</div>
        <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '20px', background: 'rgba(127,119,221,0.15)', border: '0.5px solid rgba(127,119,221,0.25)', color: '#AFA9EC' }}>Progress history</span>
        <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '20px', background: 'rgba(29,158,117,0.15)', border: '0.5px solid rgba(29,158,117,0.25)', color: '#5DCAA5', marginLeft: '4px' }}>9 weeks tracked</span>
      </div>

      <div style={s.tag}>Long-term progress</div>
      <div style={s.title}>Your journey — week 1 to now</div>
      <div style={s.sub}>Every benchmark recorded, every skill tracked. This is what consistent weekly training looks like.</div>

      {/* Stat strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: '10px', marginBottom: '24px' }}>
        {[
          ['Started at', 'Bronze I', 'rgba(255,255,255,0.3)', 'week 1 overall rank'],
          ['Current rank', 'Platinum II', '#85B7EB', '↑ 11 divisions climbed'],
          ['Days trained', '49 of 54', '#5DCAA5', '91% consistency'],
          ['Skills graduated', '4', '#5DCAA5', 'confirmed strong'],
        ].map(([label, val, color, sub]) => (
          <div key={label} style={{ background: '#141416', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '12px 14px' }}>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginBottom: '4px' }}>{label}</div>
            <div style={{ fontSize: '18px', fontWeight: '500', color }}>{val}</div>
            <div style={{ fontSize: '11px', color: sub.startsWith('↑') ? '#5DCAA5' : 'rgba(255,255,255,0.3)', marginTop: '2px' }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div style={s.card}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '7px' }}>📈 Overall score — week 1 to week 9</div>
          <div style={{ display: 'flex', gap: '14px' }}>
            {[['#378ADD', 'Overall'], ['rgba(255,255,255,0.15)', 'Rank threshold']].map(([c, l]) => (
              <div key={l} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: c }}></div>{l}
              </div>
            ))}
          </div>
        </div>

        <svg width="100%" viewBox="0 0 640 160" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#378ADD" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#378ADD" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[
            [130, 'rgba(255,255,255,0.06)', 'rgba(255,255,255,0.2)', 'Bronze'],
            [100, 'rgba(255,255,255,0.06)', 'rgba(255,255,255,0.2)', 'Silver'],
            [70, 'rgba(255,255,255,0.06)', 'rgba(255,255,255,0.2)', 'Gold'],
            [42, 'rgba(55,138,221,0.25)', '#85B7EB', 'Platinum'],
            [14, 'rgba(29,158,117,0.2)', '#5DCAA5', 'Diamond'],
          ].map(([y, stroke, textColor, label]) => (
            <g key={label}>
              <line x1="0" y1={y} x2="640" y2={y} stroke={stroke} strokeWidth="1" strokeDasharray="4,4" />
              <text x="4" y={y - 3} fontSize="9" fill={textColor} fontFamily="sans-serif">{label}</text>
            </g>
          ))}
          <polygon
            points={`${chartPoints.map((y, i) => `${36 + i * 72},${y}`).join(' ')} 612,155 36,155`}
            fill="url(#grad)" />
          <polyline
            points={chartPoints.map((y, i) => `${36 + i * 72},${y}`).join(' ')}
            fill="none" stroke="#378ADD" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
          {chartPoints.map((y, i) => (
            <circle key={i} cx={36 + i * 72} cy={y} r={i === chartPoints.length - 1 ? 4 : 3} fill="#378ADD" stroke={i === chartPoints.length - 1 ? '#1a1a1e' : 'none'} strokeWidth="2" />
          ))}
          <line x1="252" y1="108" x2="252" y2="155" stroke="rgba(239,159,39,0.3)" strokeWidth="1" strokeDasharray="2,2" />
          <text x="248" y="153" fontSize="8" fill="#FAC775" fontFamily="sans-serif">Gold</text>
          <line x1="468" y1="60" x2="468" y2="155" stroke="rgba(55,138,221,0.3)" strokeWidth="1" strokeDasharray="2,2" />
          <text x="455" y="153" fontSize="8" fill="#85B7EB" fontFamily="sans-serif">Platinum</text>
        </svg>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
          {['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6', 'Wk 7', 'Wk 8', 'Wk 9'].map(w => (
            <div key={w} style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', flex: 1, textAlign: 'center' }}>{w}</div>
          ))}
        </div>
      </div>

      {/* Skill progress */}
      <div style={s.tag}>Skill progress</div>
      <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', marginBottom: '14px' }}>Each skill's score tracked across every benchmark.</div>

      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
        {[['all', 'All skills'], ['weak', 'Weak skills'], ['strong', 'Strong skills']].map(([val, label]) => (
          <button key={val} onClick={() => setSkillFilter(val)} style={{ fontSize: '12px', padding: '5px 12px', borderRadius: '20px', border: skillFilter === val ? 'none' : '0.5px solid rgba(255,255,255,0.1)', background: skillFilter === val ? 'rgba(127,119,221,0.15)' : 'transparent', color: skillFilter === val ? '#AFA9EC' : 'rgba(255,255,255,0.4)', cursor: 'pointer', fontFamily: 'inherit' }}>
            {label}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
        {filteredSkills.map(sk => (
          <div key={sk.name} style={{ background: '#141416', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '12px 14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '14px' }}>{sk.icon}</span>
              <span style={{ fontSize: '13px', fontWeight: '500', flex: 1 }}>{sk.name}</span>
              <span style={{ fontSize: '12px', fontWeight: '500', color: sk.color }}>{sk.rank}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '32px', marginBottom: '4px' }}>
              {sk.bars.map((h, i) => (
                <div key={i} style={{ flex: 1, borderRadius: '2px 2px 0 0', background: sk.color, height: `${h}%`, minHeight: '2px' }}></div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(w => (
                <div key={w} style={{ fontSize: '9px', color: 'rgba(255,255,255,0.2)', flex: 1, textAlign: 'center' }}>W{w}</div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
              {sk.rankHistory.map((r, i) => (
                <span key={i} style={{ fontSize: '10px', padding: '2px 7px', borderRadius: '4px', background: r.startsWith('↑') ? 'rgba(29,158,117,0.1)' : r.startsWith('✓') ? 'rgba(29,158,117,0.1)' : r.startsWith('⚠') ? 'rgba(239,159,39,0.1)' : 'rgba(255,255,255,0.04)', color: r.startsWith('↑') ? '#5DCAA5' : r.startsWith('✓') ? '#5DCAA5' : r.startsWith('⚠') ? '#FAC775' : 'rgba(255,255,255,0.25)' }}>{r}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Weekly log */}
      <div style={s.tag}>Week by week log</div>
      <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', marginBottom: '14px' }}>Every benchmark week recorded. Tap to expand.</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
        {weeklyLog.map(w => {
          const isOpen = openWeeks.includes(w.week)
          return (
            <div key={w.week} style={{ background: '#141416', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '10px', overflow: 'hidden' }}>
              <div onClick={() => toggleWeek(w.week)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 16px', cursor: 'pointer' }}>
                <span style={{ fontSize: '13px', fontWeight: '500', minWidth: '56px' }}>{w.week}</span>
                <span style={{ fontSize: '13px', fontWeight: '500', flex: 1, color: w.rankColor }}>{w.rank}</span>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', minWidth: '56px', textAlign: 'right' }}>{w.score} pts</span>
                <span style={{ fontSize: '12px', color: w.deltaColor, minWidth: '40px', textAlign: 'right' }}>{w.delta}</span>
              </div>

              <div style={{ padding: '0 16px 10px', display: 'flex', gap: '3px' }}>
                {w.days.map((day, i) => (
                  <div key={i} style={{ width: '24px', height: '24px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', background: day === 'done' ? 'rgba(127,119,221,0.2)' : day === 'bench' ? 'rgba(239,159,39,0.2)' : 'rgba(255,255,255,0.05)', color: day === 'done' ? '#AFA9EC' : day === 'bench' ? '#FAC775' : 'rgba(255,255,255,0.2)' }}>
                    {day === 'done' ? '✓' : day === 'bench' ? '🏆' : '—'}
                  </div>
                ))}
              </div>

              {isOpen && (
                <div style={{ padding: '12px 16px 14px', borderTop: '0.5px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: '6px', marginBottom: '12px' }}>
                    {[
                      ['Days trained', w.daysCount, w.daysColor],
                      ['Patterns flagged', w.patterns, 'rgba(255,255,255,0.5)'],
                      ['Consistency bonus', w.bonus, w.bonusColor],
                    ].map(([label, val, color]) => (
                      <div key={label} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '6px', padding: '8px' }}>
                        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', marginBottom: '3px' }}>{label}</div>
                        <div style={{ fontSize: '13px', fontWeight: '500', color }}>{val}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {w.improved.map(s => <span key={s} style={{ fontSize: '10px', background: 'rgba(29,158,117,0.1)', color: '#5DCAA5', borderRadius: '4px', padding: '2px 7px' }}>↑ {s}</span>)}
                    {w.stalled.map(s => <span key={s} style={{ fontSize: '10px', background: 'rgba(239,159,39,0.1)', color: '#FAC775', borderRadius: '4px', padding: '2px 7px' }}>→ {s}</span>)}
                    {w.regressed.map(s => <span key={s} style={{ fontSize: '10px', background: 'rgba(226,75,74,0.1)', color: '#F09595', borderRadius: '4px', padding: '2px 7px' }}>↓ {s}</span>)}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Graduated */}
      <div style={s.card}>
        <div style={{ fontSize: '13px', fontWeight: '500', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '7px' }}>
          ✅ Graduated skills — permanently removed from routine
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {graduated.map(g => (
            <div key={g.name} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px' }}>
              <span style={{ fontSize: '14px', color: '#5DCAA5' }}>✓</span>
              <span style={{ fontSize: '13px', flex: 1 }}>{g.icon} {g.name}</span>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)' }}>{g.week}</span>
              <span style={{ fontSize: '11px', fontWeight: '500', color: g.rankColor }}>{g.rank}</span>
            </div>
          ))}
        </div>
      </div>

      <button style={s.btn} onClick={() => navigate('/routine')}>
        Go to today's routine →
      </button>

    </div>
  )
}

export default Progress