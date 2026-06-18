import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const skills = [
  {
    name: 'Micro-adjustment',
    icon: '✛',
    rank: 'Bronze III',
    rankColor: '#D85A30',
    pts: 580,
    prev: 360,
    delta: '+220',
    deltaColor: '#5DCAA5',
    barColor: '#E24B4A',
    barNow: 97,
    barPrev: 44,
    next: '20 pts to Silver I',
    type: 'weak',
    failRate: '67% this benchmark',
    failColor: '#F09595',
    routine: 'Week 1 of 1w4ts',
    history: [10, 18, 24, 32, 41, 52, 64, 78, 97],
  },
  {
    name: 'Click timing',
    icon: '🖱️',
    rank: 'Silver I',
    rankColor: '#888780',
    pts: 620,
    prev: 590,
    delta: '+30',
    deltaColor: 'rgba(255,255,255,0.3)',
    barColor: '#888780',
    barNow: 7,
    barPrev: 3,
    next: '80 pts to Silver II',
    type: 'weak',
    failRate: '51% this benchmark',
    failColor: '#F09595',
    routine: 'Week 1 of Smoothbot',
    history: [55, 58, 59, 60, 61, 62, 63, 64, 66],
  },
  {
    name: 'Flick overshoot control',
    icon: '🎯',
    rank: 'Silver III',
    rankColor: '#D3D1C7',
    pts: 1140,
    prev: 980,
    delta: '+160',
    deltaColor: '#5DCAA5',
    barColor: '#888780',
    barNow: 90,
    barPrev: 75,
    next: '60 pts to Gold I',
    type: 'weak',
    failRate: '63% this benchmark',
    failColor: '#FAC775',
    routine: 'Week 1 of VoxSwitch',
    history: [18, 28, 38, 50, 60, 68, 76, 84, 90],
  },
  {
    name: 'Strafe tracking',
    icon: '↔️',
    rank: 'Gold I',
    rankColor: '#EF9F27',
    pts: 1310,
    prev: 1170,
    delta: '+140',
    deltaColor: '#5DCAA5',
    barColor: '#EF9F27',
    barNow: 18,
    barPrev: 9,
    next: '90 pts to Gold II',
    type: 'weak',
    failRate: '48% this benchmark',
    failColor: '#FAC775',
    routine: 'Week 1 of Kinetic',
    history: [8, 18, 30, 44, 56, 64, 72, 80, 87],
  },
  {
    name: 'Flicking',
    icon: '⚡',
    rank: 'Diamond I',
    rankColor: '#5DCAA5',
    pts: 3080,
    prev: 2890,
    delta: '+190',
    deltaColor: '#5DCAA5',
    barColor: '#1D9E75',
    barNow: 27,
    barPrev: 24,
    next: '270 pts to Diamond II',
    type: 'strong',
    failRate: '17% — below threshold',
    failColor: '#5DCAA5',
    routine: 'Skipped · confirmed strong',
    history: [55, 65, 72, 80, 82, 84, 87, 89, 92],
  },
  {
    name: 'Smooth tracking',
    icon: '〰️',
    rank: 'Gold III',
    rankColor: '#EF9F27',
    pts: 1880,
    prev: 1670,
    delta: '+210',
    deltaColor: '#5DCAA5',
    barColor: '#EF9F27',
    barNow: 73,
    barPrev: 58,
    next: '120 pts to Platinum I',
    type: 'strong',
    failRate: '19% — below threshold',
    failColor: '#5DCAA5',
    routine: 'Skipped · improving naturally',
    history: [30, 42, 54, 68, 70, 72, 74, 76, 78],
  },
  {
    name: 'Reactive tracking',
    icon: '⚡',
    rank: 'Gold II',
    rankColor: '#EF9F27',
    pts: 1620,
    prev: 1540,
    delta: '+80',
    deltaColor: '#5DCAA5',
    barColor: '#EF9F27',
    barNow: 52,
    barPrev: 45,
    next: '180 pts to Gold III',
    type: 'strong',
    failRate: '31% — below threshold',
    failColor: '#5DCAA5',
    routine: 'Skipped · below threshold',
    history: [20, 30, 38, 45, 47, 48, 49, 50, 52],
  },
  {
    name: 'Target switching',
    icon: '🔄',
    rank: 'Gold II',
    rankColor: '#EF9F27',
    pts: 1560,
    prev: 1440,
    delta: '+120',
    deltaColor: '#5DCAA5',
    barColor: '#EF9F27',
    barNow: 46,
    barPrev: 30,
    next: '240 pts to Gold III',
    type: 'strong',
    failRate: '28% — below threshold',
    failColor: '#5DCAA5',
    routine: 'Skipped · below threshold',
    history: [18, 28, 36, 43, 45, 46, 47, 48, 55],
  },
  {
    name: 'Stopping accuracy',
    icon: '⏹️',
    rank: 'Gold III',
    rankColor: '#EF9F27',
    pts: 1920,
    prev: 1830,
    delta: '+90',
    deltaColor: '#5DCAA5',
    barColor: '#EF9F27',
    barNow: 76,
    barPrev: 69,
    next: '80 pts to Platinum I',
    type: 'strong',
    failRate: '22% — below threshold',
    failColor: '#5DCAA5',
    routine: 'Skipped · below threshold',
    history: [40, 52, 60, 69, 70, 71, 73, 75, 76],
  },
  {
    name: 'Crosshair placement',
    icon: '👁️',
    rank: 'Diamond I',
    rankColor: '#5DCAA5',
    pts: 3010,
    prev: 2900,
    delta: '+110',
    deltaColor: '#5DCAA5',
    barColor: '#1D9E75',
    barNow: 23,
    barPrev: 20,
    next: '340 pts to Diamond II',
    type: 'strong',
    failRate: '11% — well below threshold',
    failColor: '#5DCAA5',
    routine: 'Skipped · confirmed strong',
    history: [60, 70, 77, 83, 84, 85, 86, 88, 90],
  },
]

const tiers = [
  ['#D85A30', '#F0997B', 'Bronze', '0–599'],
  ['#888780', '#D3D1C7', 'Silver', '600–1,199'],
  ['#EF9F27', '#FAC775', 'Gold', '1,200–1,999'],
  ['#378ADD', '#85B7EB', 'Platinum', '2,000–2,999'],
  ['#1D9E75', '#5DCAA5', 'Diamond', '3,000–3,999'],
  ['#7F77DD', '#AFA9EC', 'Elite', '4,000+'],
]

function SkillRanks() {
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState([])
  const [filter, setFilter] = useState('all')

  function toggleExpand(name) {
    setExpanded(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name])
  }

  const filtered = skills.filter(s => filter === 'all' ? true : s.type === filter)

  const s = {
    page: { background: '#0e0e10', minHeight: '100vh', color: '#f0f0f0', padding: '28px 28px 90px', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" },
    nav: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' },
    logo: { fontSize: '15px', fontWeight: '500', flex: 1 },
    tag: { fontSize: '11px', fontWeight: '500', color: '#7F77DD', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' },
    title: { fontSize: '22px', fontWeight: '500', marginBottom: '4px' },
    sub: { fontSize: '13px', color: 'rgba(255,255,255,0.35)', marginBottom: '24px' },
    btn: { background: '#7F77DD', color: '#EEEDFE', border: 'none', borderRadius: '10px', padding: '13px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', width: '100%', fontFamily: 'inherit', marginTop: '8px' },
  }

  return (
    <div style={s.page}>

      <div style={s.nav}>
        <div style={s.logo}>⊕ AimCoach</div>
        <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '20px', background: 'rgba(127,119,221,0.15)', border: '0.5px solid rgba(127,119,221,0.25)', color: '#AFA9EC' }}>Week 1 ranks</span>
        <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '20px', background: 'rgba(29,158,117,0.15)', border: '0.5px solid rgba(29,158,117,0.25)', color: '#5DCAA5', marginLeft: '4px' }}>↑ Bronze I</span>
      </div>

      <div style={s.tag}>Skill rankings</div>
      <div style={s.title}>Your ranks — week 1</div>
      <div style={s.sub}>Every skill ranked independently · tap any skill to expand · overall rank is the average of all 10</div>

      {/* Overall hero */}
      <div style={{ background: '#141416', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '20px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(213,90,48,0.12)', border: '1.5px solid rgba(213,90,48,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '28px' }}>🥉</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '24px', fontWeight: '500' }}>Bronze I</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginTop: '3px' }}>Overall — average of all 10 skill ranks · week 1</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '28px', fontWeight: '500' }}>1,714</div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>overall score</div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginBottom: '6px' }}>
          <span>Bronze I · 1,714 pts</span>
          <span>286 pts to Bronze II</span>
        </div>
        <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden', marginBottom: '12px' }}>
          <div style={{ height: '100%', width: '43%', borderRadius: '3px', background: '#D85A30' }}></div>
        </div>
        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', lineHeight: '1.6', paddingTop: '12px', borderTop: '0.5px solid rgba(255,255,255,0.05)' }}>
          Your two weakest skills — <span style={{ color: '#F09595' }}>micro-adjustment (Bronze III)</span> and <span style={{ color: '#F09595' }}>click timing (Silver I)</span> — are pulling your overall rank down. Fixing those will push your overall rank up fast.
        </div>
      </div>

      {/* Delta strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: '10px', marginBottom: '24px' }}>
        {[
          ['Overall score', '1,714', 'rgba(255,255,255,0.3)', 'first benchmark'],
          ['Skills in routine', '4', '#5DCAA5', 'being actively drilled'],
          ['Skills solid', '6', '#5DCAA5', 'below 40% threshold'],
          ['Rank ups', '—', 'rgba(255,255,255,0.3)', 'first week baseline'],
        ].map(([label, val, color, sub]) => (
          <div key={label} style={{ background: '#141416', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '11px 13px' }}>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginBottom: '4px' }}>{label}</div>
            <div style={{ fontSize: '18px', fontWeight: '500', color }}>{val}</div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '2px' }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
        {[['all', 'All skills'], ['weak', 'Needs work'], ['strong', 'Solid']].map(([val, label]) => (
          <button
            key={val}
            onClick={() => setFilter(val)}
            style={{ fontSize: '12px', padding: '5px 12px', borderRadius: '20px', border: filter === val ? 'none' : '0.5px solid rgba(255,255,255,0.1)', background: filter === val ? 'rgba(127,119,221,0.15)' : 'transparent', color: filter === val ? '#AFA9EC' : 'rgba(255,255,255,0.4)', cursor: 'pointer', fontFamily: 'inherit' }}>
            {label}
          </button>
        ))}
      </div>

      {/* Needs work label */}
      {(filter === 'all' || filter === 'weak') && (
        <div style={{ fontSize: '12px', fontWeight: '500', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          Needs work — in this week's routine
          <div style={{ flex: 1, height: '0.5px', background: 'rgba(255,255,255,0.06)' }}></div>
        </div>
      )}

      {/* Skill cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
        {filtered.filter(sk => sk.type === 'weak').map(sk => (
          <SkillCard key={sk.name} sk={sk} expanded={expanded} toggleExpand={toggleExpand} />
        ))}
      </div>

      {(filter === 'all' || filter === 'strong') && (
        <div style={{ fontSize: '12px', fontWeight: '500', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          Solid — not in this week's routine
          <div style={{ flex: 1, height: '0.5px', background: 'rgba(255,255,255,0.06)' }}></div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
        {filtered.filter(sk => sk.type === 'strong').map(sk => (
          <SkillCard key={sk.name} sk={sk} expanded={expanded} toggleExpand={toggleExpand} />
        ))}
      </div>

      {/* Rank key */}
      <div style={s.tag}>Rank key</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,minmax(0,1fr))', gap: '6px', marginBottom: '24px' }}>
        {tiers.map(([bg, color, name, range]) => (
          <div key={name} style={{ background: '#141416', border: '0.5px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '10px 6px', textAlign: 'center' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: bg, margin: '0 auto 5px' }}></div>
            <div style={{ fontSize: '11px', fontWeight: '500', color }}>{name}</div>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', marginTop: '2px' }}>{range}</div>
          </div>
        ))}
      </div>

      <button style={s.btn} onClick={() => navigate('/progress')}>
        View full progress history →
      </button>

    </div>
  )
}

function SkillCard({ sk, expanded, toggleExpand }) {
  const isOpen = expanded.includes(sk.name)
  const isWeak = sk.type === 'weak'

  return (
    <div style={{
      background: '#141416',
      borderRadius: '12px',
      overflow: 'hidden',
      borderLeft: isWeak ? `2px solid ${sk.barColor}44` : 'none',
      border: isWeak ? undefined : '0.5px solid rgba(255,255,255,0.07)',
      borderRadius: isWeak ? '0 12px 12px 0' : '12px',
    }}>
      <div onClick={() => toggleExpand(sk.name)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 16px', cursor: 'pointer' }}>
        <span style={{ fontSize: '15px', minWidth: '20px' }}>{sk.icon}</span>
        <span style={{ fontSize: '13px', fontWeight: '500', flex: 1 }}>{sk.name}</span>
        <span style={{ fontSize: '13px', fontWeight: '500', color: sk.rankColor, minWidth: '80px', textAlign: 'right' }}>{sk.rank}</span>
        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', minWidth: '50px', textAlign: 'right' }}>{sk.pts.toLocaleString()} pts</span>
        <span style={{ fontSize: '11px', color: sk.deltaColor, minWidth: '36px', textAlign: 'right' }}>{sk.delta}</span>
      </div>

      <div style={{ padding: '0 16px 10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ flex: 1, height: '5px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${sk.barPrev}%`, borderRadius: '3px', background: sk.barColor, opacity: 0.2 }}></div>
            <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${sk.barNow}%`, borderRadius: '3px', background: sk.barColor }}></div>
          </div>
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', whiteSpace: 'nowrap' }}>{sk.next}</span>
        </div>
      </div>

      {isOpen && (
        <div style={{ padding: '0 16px 14px', borderTop: '0.5px solid rgba(255,255,255,0.05)', paddingTop: '12px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '10px' }}>
            {[
              ['This week', `${sk.rank} · ${sk.pts.toLocaleString()}`, sk.rankColor],
              ['Last week', `${sk.pts - parseInt(sk.delta)} pts`, 'rgba(255,255,255,0.5)'],
              ['Failure rate', sk.failRate, sk.failColor],
              ['Routine', sk.routine, 'rgba(255,255,255,0.5)'],
            ].map(([label, val, color]) => (
              <div key={label} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '6px', padding: '8px 10px' }}>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', marginBottom: '3px' }}>{label}</div>
                <div style={{ fontSize: '13px', fontWeight: '500', color }}>{val}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', marginBottom: '5px' }}>Score history</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '36px' }}>
            {sk.history.map((h, i) => (
              <div key={i} style={{ flex: 1, borderRadius: '2px 2px 0 0', background: sk.barColor, height: `${h}%`, minHeight: '2px' }}></div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3px' }}>
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(w => (
              <div key={w} style={{ fontSize: '9px', color: 'rgba(255,255,255,0.2)', flex: 1, textAlign: 'center' }}>W{w}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SkillRanks