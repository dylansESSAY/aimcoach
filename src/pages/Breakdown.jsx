import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { getRankBadge, getRankColor } from '../lib/ranks'

function Breakdown() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchLatestBreakdown() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { navigate('/login'); return }

      const { data: benchmarks, error: benchmarkError } = await supabase
        .from('benchmarks')
        .select('*')
        .eq('user_id', session.user.id)
        .order('week_number', { ascending: false })
        .limit(1)

      if (benchmarkError || !benchmarks || benchmarks.length === 0) {
        setError('No benchmark found. Complete your first benchmark upload to see your breakdown.')
        setLoading(false)
        return
      }

      const benchmark = benchmarks[0]
      const coaching = JSON.parse(benchmark.coaching_output)

      const { data: skillScores } = await supabase
        .from('skill_scores')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('week_number', benchmark.week_number)

      const { data: routine } = await supabase
        .from('routines')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('week_number', benchmark.week_number)
        .single()

      setData({
        benchmark,
        coaching,
        skillScores: skillScores || [],
        routine: routine ? {
          scenarios: JSON.parse(routine.scenarios),
          reminders: JSON.parse(routine.reminders),
          total_mins: routine.total_mins,
        } : null,
        weekNumber: benchmark.week_number,
      })

      setLoading(false)
    }

    fetchLatestBreakdown()
  }, [])

  const s = {
    page: { background: '#0e0e10', minHeight: '100vh', color: '#f0f0f0', padding: '28px 28px 90px', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" },
    nav: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' },
    logo: { fontSize: '15px', fontWeight: '500', flex: 1 },
    tag: { fontSize: '11px', fontWeight: '500', color: '#7F77DD', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' },
    title: { fontSize: '22px', fontWeight: '500', marginBottom: '4px' },
    sub: { fontSize: '13px', color: 'rgba(255,255,255,0.35)', marginBottom: '24px' },
    card: { background: '#141416', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '16px 18px', marginBottom: '16px' },
    cardTitle: { fontSize: '13px', fontWeight: '500', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '7px' },
    btn: { background: '#7F77DD', color: '#EEEDFE', border: 'none', borderRadius: '10px', padding: '13px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', width: '100%', fontFamily: 'inherit' },
  }

  if (loading) {
    return (
      <div style={{ ...s.page, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '28px', marginBottom: '12px' }}>⚙️</div>
          <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)' }}>Loading your breakdown...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ ...s.page }}>
        <div style={s.nav}>
          <div style={s.logo}>⊕ AimCoach</div>
        </div>
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <div style={{ fontSize: '32px', marginBottom: '16px' }}>📊</div>
          <div style={{ fontSize: '16px', fontWeight: '500', marginBottom: '8px' }}>No breakdown yet</div>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '24px', lineHeight: '1.6' }}>{error}</div>
          <button style={{ ...s.btn, width: 'auto', padding: '11px 24px' }} onClick={() => navigate('/upload')}>
            Go to benchmark upload →
          </button>
        </div>
      </div>
    )
  }

  const { benchmark, coaching, skillScores, routine, weekNumber } = data
  const overallRank = benchmark.overall_rank
  const overallBadge = getRankBadge(overallRank)
  const overallColor = getRankColor(overallRank)
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

  return (
    <div style={s.page}>
      <div style={s.nav}>
        <div style={s.logo}>⊕ AimCoach</div>
        <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '20px', background: 'rgba(127,119,221,0.15)', border: '0.5px solid rgba(127,119,221,0.25)', color: '#AFA9EC' }}>Week {weekNumber} breakdown</span>
        <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '20px', background: 'rgba(29,158,117,0.15)', border: '0.5px solid rgba(29,158,117,0.25)', color: '#5DCAA5', marginLeft: '4px' }}>Complete</span>
      </div>

      <div style={s.tag}>Week {weekNumber} — benchmark analysis</div>
      <div style={s.title}>Here's what the AI found</div>
      <div style={s.sub}>Only recurring patterns are flagged — isolated mistakes are ignored</div>

      {/* Overall rank hero */}
      <div style={{ ...s.card, display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
        <div style={{ width: '64px', height: '64px', flexShrink: 0 }}>
          {overallBadge
            ? <img src={overallBadge} alt={overallRank} style={{ width: '64px', height: '64px', objectFit: 'contain' }} />
            : <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: `${overallColor}22`, border: `1.5px solid ${overallColor}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>🏆</div>
          }
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '20px', fontWeight: '500', color: overallColor }}>{overallRank}</div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginTop: '2px' }}>Overall rank — week {weekNumber}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '24px', fontWeight: '500' }}>{benchmark.overall_score}</div>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>overall score</div>
        </div>
      </div>

      {/* Summary stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: '10px', marginBottom: '20px' }}>
        {[
          ['Patterns confirmed', benchmark.patterns_found, '#F09595', 'above 40% failure rate'],
          ['Ignored mistakes', 9 - benchmark.patterns_found, 'rgba(255,255,255,0.3)', 'below threshold'],
          ['Routine length', routine ? `${routine.total_mins} min` : '—', '#AFA9EC', 'daily this week'],
        ].map(([label, val, color, sub]) => (
          <div key={label} style={{ background: '#141416', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '12px 14px' }}>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginBottom: '4px' }}>{label}</div>
            <div style={{ fontSize: '20px', fontWeight: '500', color }}>{val}</div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '2px' }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* Overall summary */}
      <div style={s.card}>
        <div style={s.cardTitle}>💬 AI coaching summary</div>
        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: '1.7' }}>{coaching.overall_summary}</div>
      </div>

      {/* Two col — patterns + skill bars */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,0.9fr)', gap: '14px', marginBottom: '16px' }}>

        {/* Patterns */}
        <div style={s.card}>
          <div style={s.cardTitle}>📊 Confirmed weakness patterns</div>
          {coaching.weak_skills?.map((w, i) => (
            <div key={w.skill} style={{ borderBottom: i < coaching.weak_skills.length - 1 ? '0.5px solid rgba(255,255,255,0.05)' : 'none', padding: '12px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                <span style={{ fontSize: '13px', fontWeight: '500', flex: 1 }}>{w.skill}</span>
                <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '20px', background: 'rgba(226,75,74,0.15)', color: '#F09595' }}>{w.failure_rate}% failure</span>
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', lineHeight: '1.55', marginBottom: '6px' }}>{w.pattern}</div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', background: 'rgba(127,119,221,0.07)', borderRadius: '6px', padding: '8px 10px' }}>
                <span style={{ fontSize: '11px', fontWeight: '500', color: '#7F77DD', whiteSpace: 'nowrap' }}>Try this →</span>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', lineHeight: '1.5' }}>{w.action}</span>
              </div>
            </div>
          ))}

          {/* Ignored */}
          {coaching.strong_skills && coaching.strong_skills.length > 0 && (
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '0.5px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '10px 12px', marginTop: '12px' }}>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', marginBottom: '7px' }}>Strong — below threshold, not drilled this week</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {coaching.strong_skills.map(s => (
                  <span key={s.skill} style={{ fontSize: '11px', color: '#5DCAA5', background: 'rgba(29,158,117,0.1)', padding: '2px 8px', borderRadius: '4px' }}>{s.skill}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Skill bars */}
        <div style={s.card}>
          <div style={s.cardTitle}>📈 Skill scores</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {skillScores.map(skill => {
              const color = getRankColor(skill.rank)
              return (
                <div key={skill.skill_name} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', minWidth: '110px' }}>{skill.skill_name.replace(/_/g, ' ')}</span>
                  <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${skill.score}%`, borderRadius: '3px', background: color }}></div>
                  </div>
                  <span style={{ fontSize: '11px', color, minWidth: '28px', textAlign: 'right' }}>{skill.score}%</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Root cause coaching */}
      <div style={s.card}>
        <div style={s.cardTitle}>💡 Root cause coaching</div>
        {coaching.weak_skills?.map((w, i) => (
          <div key={w.skill} style={{ borderBottom: i < coaching.weak_skills.length - 1 ? '0.5px solid rgba(255,255,255,0.05)' : 'none', padding: '12px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
              <span style={{ fontSize: '13px', fontWeight: '500', flex: 1 }}>{w.skill}</span>
              <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '20px', background: 'rgba(239,159,39,0.15)', color: '#FAC775' }}>{w.root_cause_category?.replace(/_/g, ' ')}</span>
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', lineHeight: '1.55', marginBottom: '8px' }}>{w.root_cause}</div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', background: 'rgba(127,119,221,0.07)', borderRadius: '6px', padding: '9px 11px' }}>
              <span style={{ fontSize: '11px', fontWeight: '500', color: '#7F77DD', whiteSpace: 'nowrap', marginTop: '1px' }}>Try this →</span>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', lineHeight: '1.5' }}>{w.action}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Weekly routine */}
      {routine && (
        <div style={s.card}>
          <div style={s.cardTitle}>✅ Week {weekNumber} routine — Mon through Sat</div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginBottom: '16px' }}>
            Same {routine.scenarios.length} scenarios every day · {routine.total_mins} minutes · hard cap
          </div>

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
          {routine.scenarios.map((sc, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '12px 14px', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)', minWidth: '16px' }}>{i + 1}</span>
                <span style={{ fontSize: '13px', fontWeight: '500', flex: 1 }}>{sc.scenario}</span>
                <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '20px', background: 'rgba(127,119,221,0.15)', color: '#AFA9EC' }}>{sc.skill_target}</span>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>{sc.duration_mins} min</span>
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginBottom: '5px', paddingLeft: '24px', lineHeight: '1.5' }}>{sc.why}</div>
              <div style={{ fontSize: '11px', color: '#7F77DD', background: 'rgba(127,119,221,0.1)', padding: '3px 9px', borderRadius: '5px', display: 'inline-block', marginLeft: '24px' }}>Goal: {sc.goal}</div>
            </div>
          ))}

          {/* Coaching reminders */}
          <div style={{ background: 'rgba(239,159,39,0.06)', border: '0.5px solid rgba(239,159,39,0.15)', borderRadius: '8px', padding: '12px 14px', marginTop: '12px' }}>
            <div style={{ fontSize: '12px', fontWeight: '500', color: '#FAC775', marginBottom: '8px' }}>💡 This week's reminders</div>
            {routine.reminders.map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '7px', fontSize: '12px', color: 'rgba(255,255,255,0.4)', lineHeight: '1.5', marginBottom: i < routine.reminders.length - 1 ? '6px' : '0' }}>
                <span style={{ color: '#FAC775', flexShrink: 0 }}>·</span>{r}
              </div>
            ))}
          </div>
        </div>
      )}

      <button style={s.btn} onClick={() => navigate('/routine')}>
        Go to today's routine →
      </button>
    </div>
  )
}

export default Breakdown