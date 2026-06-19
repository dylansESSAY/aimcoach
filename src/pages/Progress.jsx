import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { getRankBadge, getRankColor } from '../lib/ranks'

function Progress() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [benchmarks, setBenchmarks] = useState([])
  const [skillHistory, setSkillHistory] = useState({})
  const [openWeeks, setOpenWeeks] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchProgress() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { navigate('/login'); return }

      const { data: benchmarkData } = await supabase
        .from('benchmarks')
        .select('*')
        .eq('user_id', session.user.id)
        .order('week_number', { ascending: false })

      if (!benchmarkData || benchmarkData.length === 0) {
        setError('No progress yet. Complete your first benchmark to start tracking.')
        setLoading(false)
        return
      }

      setBenchmarks(benchmarkData)

      const { data: allScores } = await supabase
        .from('skill_scores')
        .select('*')
        .eq('user_id', session.user.id)
        .order('week_number', { ascending: true })

      const history = {}
      allScores?.forEach(score => {
        if (!history[score.skill_name]) history[score.skill_name] = []
        history[score.skill_name].push({
          week: score.week_number,
          score: score.score,
          rank: score.rank,
        })
      })

      setSkillHistory(history)
      setLoading(false)
    }

    fetchProgress()
  }, [])

  function toggleWeek(week) {
    setOpenWeeks(prev => prev.includes(week) ? prev.filter(w => w !== week) : [...prev, week])
  }

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

  if (loading) {
    return (
      <div style={{ ...s.page, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '28px', marginBottom: '12px' }}>📈</div>
          <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)' }}>Loading your progress...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={s.page}>
        <div style={s.nav}><div style={s.logo}>⊕ AimCoach</div></div>
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <div style={{ fontSize: '32px', marginBottom: '16px' }}>📈</div>
          <div style={{ fontSize: '16px', fontWeight: '500', marginBottom: '8px' }}>No progress yet</div>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '24px', lineHeight: '1.6' }}>{error}</div>
          <button style={{ ...s.btn, width: 'auto', padding: '11px 24px' }} onClick={() => navigate('/upload')}>
            Go to benchmark upload →
          </button>
        </div>
      </div>
    )
  }

  const latest = benchmarks[0]
  const first = benchmarks[benchmarks.length - 1]
  const latestRank = latest?.overall_rank || 'Bronze I'
  const latestBadge = getRankBadge(latestRank)
  const latestColor = getRankColor(latestRank)

  const chartPoints = benchmarks
    .slice()
    .reverse()
    .map((b, i) => {
      const x = 36 + i * (568 / Math.max(benchmarks.length - 1, 1))
      const y = 155 - (b.overall_score / 100) * 140
      return { x, y, score: b.overall_score, rank: b.overall_rank, week: b.week_number }
    })

  return (
    <div style={s.page}>
      <div style={s.nav}>
        <div style={s.logo}>⊕ AimCoach</div>
        <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '20px', background: 'rgba(127,119,221,0.15)', border: '0.5px solid rgba(127,119,221,0.25)', color: '#AFA9EC' }}>Progress history</span>
        <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '20px', background: 'rgba(29,158,117,0.15)', border: '0.5px solid rgba(29,158,117,0.25)', color: '#5DCAA5', marginLeft: '4px' }}>{benchmarks.length} week{benchmarks.length !== 1 ? 's' : ''} tracked</span>
      </div>

      <div style={s.tag}>Long-term progress</div>
      <div style={s.title}>Your journey</div>
      <div style={s.sub}>Every benchmark recorded, every skill tracked.</div>

      {/* Stat strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: '10px', marginBottom: '24px' }}>
        {[
          ['Started at', first?.overall_rank || '—', 'rgba(255,255,255,0.5)', 'week 1'],
          ['Current rank', latestRank, latestColor, `week ${latest?.week_number}`],
          ['Weeks tracked', benchmarks.length, '#5DCAA5', 'total benchmarks'],
          ['Best score', Math.max(...benchmarks.map(b => b.overall_score)), '#AFA9EC', 'overall score'],
        ].map(([label, val, color, sub]) => (
          <div key={label} style={{ background: '#141416', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '12px 14px' }}>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginBottom: '4px' }}>{label}</div>
            <div style={{ fontSize: benchmarks.length > 1 && label === 'Current rank' ? '14px' : '18px', fontWeight: '500', color }}>{val}</div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '2px' }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* Current rank hero */}
      <div style={s.card}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '64px', height: '64px', flexShrink: 0 }}>
            {latestBadge
              ? <img src={latestBadge} alt={latestRank} style={{ width: '64px', height: '64px', objectFit: 'contain' }} />
              : <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: `${latestColor}22`, border: `1.5px solid ${latestColor}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>🏆</div>
            }
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '20px', fontWeight: '500', color: latestColor }}>{latestRank}</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginTop: '2px' }}>Current overall rank — week {latest?.week_number}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '24px', fontWeight: '500' }}>{latest?.overall_score}</div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>overall score</div>
          </div>
        </div>
      </div>

      {/* Score chart */}
      {benchmarks.length > 1 && (
        <div style={s.card}>
          <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '7px' }}>
            📈 Overall score over time
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
            {chartPoints.length > 1 && (
              <>
                <polygon
                  points={`${chartPoints.map(p => `${p.x},${p.y}`).join(' ')} ${chartPoints[chartPoints.length - 1].x},155 ${chartPoints[0].x},155`}
                  fill="url(#grad)" />
                <polyline
                  points={chartPoints.map(p => `${p.x},${p.y}`).join(' ')}
                  fill="none" stroke="#378ADD" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
              </>
            )}
            {chartPoints.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r={i === chartPoints.length - 1 ? 4 : 3} fill="#378ADD" stroke={i === chartPoints.length - 1 ? '#1a1a1e' : 'none'} strokeWidth="2" />
            ))}
          </svg>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
            {chartPoints.map(p => (
              <div key={p.week} style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', flex: 1, textAlign: 'center' }}>Wk {p.week}</div>
            ))}
          </div>
        </div>
      )}

      {/* Skill history */}
      {Object.keys(skillHistory).length > 0 && (
        <>
          <div style={s.tag}>Skill progress</div>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', marginBottom: '14px' }}>Each skill tracked across every benchmark.</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
            {Object.entries(skillHistory).map(([skill, history]) => {
              const latest = history[history.length - 1]
              const color = getRankColor(latest.rank)
              const maxScore = Math.max(...history.map(h => h.score))
              return (
                <div key={skill} style={{ background: '#141416', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '12px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '500', flex: 1 }}>{skill.replace(/_/g, ' ')}</span>
                    <span style={{ fontSize: '12px', fontWeight: '500', color }}>{latest.rank}</span>
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>{latest.score}%</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '28px', marginBottom: '4px' }}>
                    {history.map((h, i) => (
                      <div key={i} style={{ flex: 1, borderRadius: '2px 2px 0 0', background: color, height: `${maxScore > 0 ? (h.score / maxScore) * 100 : 0}%`, minHeight: '2px', opacity: i === history.length - 1 ? 1 : 0.5 }}></div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {history.map((h, i) => (
                      <div key={i} style={{ fontSize: '9px', color: 'rgba(255,255,255,0.2)', flex: 1, textAlign: 'center' }}>W{h.week}</div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}

      {/* Weekly log */}
      <div style={s.tag}>Week by week log</div>
      <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', marginBottom: '14px' }}>Every benchmark recorded. Tap to expand.</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
        {benchmarks.map((b, i) => {
          const isOpen = openWeeks.includes(b.week_number)
          const rankColor = getRankColor(b.overall_rank)
          const prevBenchmark = benchmarks[i + 1]
          const delta = prevBenchmark ? b.overall_score - prevBenchmark.overall_score : null
          const coaching = b.coaching_output ? JSON.parse(b.coaching_output) : null

          return (
            <div key={b.week_number} style={{ background: '#141416', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '10px', overflow: 'hidden' }}>
              <div onClick={() => toggleWeek(b.week_number)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 16px', cursor: 'pointer' }}>
                <span style={{ fontSize: '13px', fontWeight: '500', minWidth: '56px' }}>Week {b.week_number}</span>
                <span style={{ fontSize: '13px', fontWeight: '500', flex: 1, color: rankColor }}>{b.overall_rank}</span>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', minWidth: '56px', textAlign: 'right' }}>{b.overall_score} pts</span>
                <span style={{ fontSize: '12px', minWidth: '40px', textAlign: 'right', color: delta === null ? 'rgba(255,255,255,0.3)' : delta > 0 ? '#5DCAA5' : delta < 0 ? '#F09595' : 'rgba(255,255,255,0.3)' }}>
                  {delta === null ? 'baseline' : delta > 0 ? `+${delta}` : delta}
                </span>
              </div>

              {isOpen && coaching && (
                <div style={{ padding: '12px 16px 14px', borderTop: '0.5px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: '6px', marginBottom: '12px' }}>
                    {[
                      ['Overall score', b.overall_score, 'rgba(255,255,255,0.7)'],
                      ['Patterns found', b.patterns_found, '#F09595'],
                    ].map(([label, val, color]) => (
                      <div key={label} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '6px', padding: '8px' }}>
                        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', marginBottom: '3px' }}>{label}</div>
                        <div style={{ fontSize: '13px', fontWeight: '500', color }}>{val}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', lineHeight: '1.6', marginBottom: '10px' }}>
                    {coaching.overall_summary}
                  </div>
                  {coaching.weak_skills?.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {coaching.weak_skills.map(w => (
                        <span key={w.skill} style={{ fontSize: '10px', background: 'rgba(226,75,74,0.1)', color: '#F09595', borderRadius: '4px', padding: '2px 7px' }}>{w.skill}</span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <button style={s.btn} onClick={() => navigate('/routine')}>
        Go to today's routine →
      </button>
    </div>
  )
}

export default Progress