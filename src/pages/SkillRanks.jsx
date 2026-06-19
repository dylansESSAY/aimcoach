import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { getRankBadge, getRankColor } from '../lib/ranks'

function SkillRanks() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [skillScores, setSkillScores] = useState([])
  const [benchmark, setBenchmark] = useState(null)
  const [filter, setFilter] = useState('all')
  const [expanded, setExpanded] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchRanks() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { navigate('/login'); return }

      const { data: benchmarks } = await supabase
        .from('benchmarks')
        .select('*')
        .eq('user_id', session.user.id)
        .order('week_number', { ascending: false })
        .limit(1)

      if (!benchmarks || benchmarks.length === 0) {
        setError('No benchmark found. Complete your first benchmark to see your ranks.')
        setLoading(false)
        return
      }

      const latest = benchmarks[0]
      setBenchmark(latest)

      const { data: scores } = await supabase
        .from('skill_scores')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('week_number', latest.week_number)

      setSkillScores(scores || [])
      setLoading(false)
    }

    fetchRanks()
  }, [])

  function toggleExpand(name) {
    setExpanded(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name])
  }

  const tiers = [
    ['#D85A30', '#F0997B', 'Bronze', '0–29'],
    ['#888780', '#D3D1C7', 'Silver', '30–59'],
    ['#EF9F27', '#FAC775', 'Gold', '60–73'],
    ['#378ADD', '#85B7EB', 'Platinum', '74–84'],
    ['#1D9E75', '#5DCAA5', 'Diamond', '85–93'],
    ['#7F77DD', '#AFA9EC', 'Elite', '94–98'],
    ['#FF4ECD', '#FF9EE8', 'Mythic', '99–100'],
  ]

  const s = {
    page: { background: '#0e0e10', minHeight: '100vh', color: '#f0f0f0', padding: '28px 28px 90px', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" },
    nav: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' },
    logo: { fontSize: '15px', fontWeight: '500', flex: 1 },
    tag: { fontSize: '11px', fontWeight: '500', color: '#7F77DD', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' },
    title: { fontSize: '22px', fontWeight: '500', marginBottom: '4px' },
    sub: { fontSize: '13px', color: 'rgba(255,255,255,0.35)', marginBottom: '24px' },
    btn: { background: '#7F77DD', color: '#EEEDFE', border: 'none', borderRadius: '10px', padding: '13px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', width: '100%', fontFamily: 'inherit', marginTop: '8px' },
  }

  if (loading) {
    return (
      <div style={{ ...s.page, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '28px', marginBottom: '12px' }}>🏆</div>
          <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)' }}>Loading your ranks...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={s.page}>
        <div style={s.nav}><div style={s.logo}>⊕ AimCoach</div></div>
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <div style={{ fontSize: '32px', marginBottom: '16px' }}>🏆</div>
          <div style={{ fontSize: '16px', fontWeight: '500', marginBottom: '8px' }}>No ranks yet</div>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '24px', lineHeight: '1.6' }}>{error}</div>
          <button style={{ ...s.btn, width: 'auto', padding: '11px 24px' }} onClick={() => navigate('/upload')}>
            Go to benchmark upload →
          </button>
        </div>
      </div>
    )
  }

  const overallRank = benchmark?.overall_rank || 'Bronze I'
  const overallBadge = getRankBadge(overallRank)
  const overallColor = getRankColor(overallRank)

  const coaching = benchmark?.coaching_output ? JSON.parse(benchmark.coaching_output) : null
  const weakSkillNames = coaching?.weak_skills?.map(w => w.skill.toLowerCase()) || []

  const filteredScores = skillScores.filter(s => {
    if (filter === 'all') return true
    const isWeak = weakSkillNames.some(w => w.includes(s.skill_name.replace(/_/g, ' ')))
    if (filter === 'weak') return isWeak
    if (filter === 'strong') return !isWeak
    return true
  })

  const weakScores = filteredScores.filter(s => weakSkillNames.some(w => w.includes(s.skill_name.replace(/_/g, ' '))))
  const strongScores = filteredScores.filter(s => !weakSkillNames.some(w => w.includes(s.skill_name.replace(/_/g, ' '))))

  return (
    <div style={s.page}>
      <div style={s.nav}>
        <div style={s.logo}>⊕ AimCoach</div>
        <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '20px', background: 'rgba(127,119,221,0.15)', border: '0.5px solid rgba(127,119,221,0.25)', color: '#AFA9EC' }}>Week {benchmark?.week_number} ranks</span>
      </div>

      <div style={s.tag}>Skill rankings</div>
      <div style={s.title}>Your ranks</div>
      <div style={s.sub}>Every skill ranked independently · tap any skill to expand · overall rank is the average of all skills</div>

      {/* Overall hero */}
      <div style={{ background: '#141416', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '20px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <div style={{ width: '72px', height: '72px', flexShrink: 0 }}>
            {overallBadge
              ? <img src={overallBadge} alt={overallRank} style={{ width: '72px', height: '72px', objectFit: 'contain' }} />
              : <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: `${overallColor}22`, border: `1.5px solid ${overallColor}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🏆</div>
            }
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '24px', fontWeight: '500', color: overallColor }}>{overallRank}</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginTop: '3px' }}>Overall — average of all skill ranks</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '28px', fontWeight: '500' }}>{benchmark?.overall_score}</div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>overall score</div>
          </div>
        </div>
        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', lineHeight: '1.6', paddingTop: '12px', borderTop: '0.5px solid rgba(255,255,255,0.05)' }}>
          {coaching?.overall_summary}
        </div>
      </div>

      {/* Delta strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: '10px', marginBottom: '24px' }}>
        {[
          ['Overall score', benchmark?.overall_score, 'rgba(255,255,255,0.8)', 'this week'],
          ['Skills in routine', benchmark?.patterns_found, '#F09595', 'being drilled'],
          ['Skills solid', (skillScores.length - (benchmark?.patterns_found || 0)), '#5DCAA5', 'below threshold'],
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
          <button key={val} onClick={() => setFilter(val)} style={{ fontSize: '12px', padding: '5px 12px', borderRadius: '20px', border: filter === val ? 'none' : '0.5px solid rgba(255,255,255,0.1)', background: filter === val ? 'rgba(127,119,221,0.15)' : 'transparent', color: filter === val ? '#AFA9EC' : 'rgba(255,255,255,0.4)', cursor: 'pointer', fontFamily: 'inherit' }}>
            {label}
          </button>
        ))}
      </div>

      {/* Needs work */}
      {(filter === 'all' || filter === 'weak') && weakScores.length > 0 && (
        <>
          <div style={{ fontSize: '12px', fontWeight: '500', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            Needs work — in this week's routine
            <div style={{ flex: 1, height: '0.5px', background: 'rgba(255,255,255,0.06)' }}></div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
            {weakScores.map(sk => <SkillCard key={sk.skill_name} sk={sk} expanded={expanded} toggleExpand={toggleExpand} isWeak={true} />)}
          </div>
        </>
      )}

      {/* Solid */}
      {(filter === 'all' || filter === 'strong') && strongScores.length > 0 && (
        <>
          <div style={{ fontSize: '12px', fontWeight: '500', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            Solid — not in this week's routine
            <div style={{ flex: 1, height: '0.5px', background: 'rgba(255,255,255,0.06)' }}></div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
            {strongScores.map(sk => <SkillCard key={sk.skill_name} sk={sk} expanded={expanded} toggleExpand={toggleExpand} isWeak={false} />)}
          </div>
        </>
      )}

      {/* Rank key */}
      <div style={s.tag}>Rank key</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: '8px', marginBottom: '24px' }}>
        {tiers.map(([bg, color, name, range]) => {
          const badge = getRankBadge(`${name} I`) || getRankBadge(name)
          return (
            <div key={name} style={{ background: '#141416', border: '0.5px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '12px 8px', textAlign: 'center' }}>
              {badge
                ? <img src={badge} alt={name} style={{ width: '36px', height: '36px', objectFit: 'contain', margin: '0 auto 6px', display: 'block' }} />
                : <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: bg, margin: '0 auto 8px' }}></div>
              }
              <div style={{ fontSize: '12px', fontWeight: '500', color }}>{name}</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', marginTop: '2px' }}>{range}</div>
              {name !== 'Mythic' && <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)', marginTop: '1px' }}>I · II · III</div>}
            </div>
          )
        })}
      </div>

      <button style={s.btn} onClick={() => navigate('/progress')}>
        View full progress history →
      </button>
    </div>
  )
}

function SkillCard({ sk, expanded, toggleExpand, isWeak }) {
  const isOpen = expanded.includes(sk.skill_name)
  const rankColor = getRankColor(sk.rank)
  const badge = getRankBadge(sk.rank)

  const barColor = isWeak ? '#E24B4A' : rankColor

  return (
    <div style={{
      background: '#141416',
      borderLeft: isWeak ? `2px solid ${barColor}66` : 'none',
      border: isWeak ? undefined : '0.5px solid rgba(255,255,255,0.07)',
      borderRadius: isWeak ? '0 12px 12px 0' : '12px',
      overflow: 'hidden',
    }}>
      <div onClick={() => toggleExpand(sk.skill_name)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', cursor: 'pointer' }}>
        <span style={{ fontSize: '13px', fontWeight: '500', flex: 1 }}>{sk.skill_name.replace(/_/g, ' ')}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {badge && <img src={badge} alt={sk.rank} style={{ width: '22px', height: '22px', objectFit: 'contain' }} />}
          <span style={{ fontSize: '12px', fontWeight: '500', color: rankColor }}>{sk.rank}</span>
        </div>
        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', minWidth: '36px', textAlign: 'right' }}>{sk.score}%</span>
      </div>

      <div style={{ padding: '0 16px 10px' }}>
        <div style={{ height: '5px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${sk.score}%`, borderRadius: '3px', background: barColor }}></div>
        </div>
      </div>

      {isOpen && (
        <div style={{ padding: '0 16px 14px', borderTop: '0.5px solid rgba(255,255,255,0.05)', paddingTop: '12px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {[
              ['Rank', sk.rank, rankColor],
              ['Score', `${sk.score}%`, 'rgba(255,255,255,0.7)'],
              ['Failure rate', sk.failure_rate > 0 ? `${sk.failure_rate}%` : 'Below threshold', sk.failure_rate > 40 ? '#F09595' : '#5DCAA5'],
              ['Status', isWeak ? 'In this week\'s routine' : 'Solid — not drilled', isWeak ? '#F09595' : '#5DCAA5'],
            ].map(([label, val, color]) => (
              <div key={label} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '6px', padding: '8px 10px' }}>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', marginBottom: '3px' }}>{label}</div>
                <div style={{ fontSize: '13px', fontWeight: '500', color }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SkillRanks