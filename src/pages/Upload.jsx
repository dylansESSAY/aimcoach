import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const benchmarkScenarios = [
  { id: 'flicking', scenario: 'Gridshot Uncaged', skill: 'Flicking', duration: '5 min' },
  { id: 'flick_overshoot', scenario: '1w6ts Reload', skill: 'Flick overshoot control', duration: '4 min' },
  { id: 'smooth_tracking', scenario: 'Smoothbot', skill: 'Smooth tracking', duration: '5 min' },
  { id: 'reactive_tracking', scenario: 'Kinetic Track Jump', skill: 'Reactive tracking', duration: '4 min' },
  { id: 'strafe_tracking', scenario: 'Strafe Bot Voltaic', skill: 'Strafe tracking', duration: '4 min' },
  { id: 'target_switching', scenario: 'Fast Strafes Voltaic', skill: 'Target switching', duration: '4 min' },
  { id: 'micro_adjustment', scenario: '1w4ts_Aimbooster', skill: 'Micro-adjustment', duration: '5 min' },
  { id: 'click_timing', scenario: 'Tile Frenzy', skill: 'Click timing', duration: '4 min' },
  { id: 'stopping_accuracy', scenario: 'VT Smoothbot Switch', skill: 'Stopping accuracy', duration: '5 min' },
]

function Upload() {
  const navigate = useNavigate()
  const [scores, setScores] = useState({})
  const [state, setState] = useState('entry') // entry | analyzing | done
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  function updateScore(id, value) {
    setScores(prev => ({ ...prev, [id]: value }))
  }

  const allFilled = benchmarkScenarios.every(s => scores[s.id] && scores[s.id] !== '')

  async function analyzeScores() {
    setError('')

    if (!allFilled) {
      setError('Please enter a score for every scenario before submitting.')
      return
    }

    setState('analyzing')

    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        navigate('/login')
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', session.user.id)
        .single()

      const scenarioScores = benchmarkScenarios.map(s => ({
        scenario: s.scenario,
        skill: s.skill,
        score: parseFloat(scores[s.id])
      }))

      const prompt = `You are AimCoach, a professional aim training coach with expert knowledge of mouse mechanics, sensitivity, grip styles, hardware, posture, mental factors, and Kovaaks scenario training.

The user has completed the AimCoach benchmark playlist. Here are their scores:

${scenarioScores.map(s => `${s.scenario} (${s.skill}): ${s.score}`).join('\n')}

Here is their setup profile:
- Grip: ${profile?.grip || 'unknown'}
- eDPI: ${profile?.edpi || 'unknown'}
- Mouse: ${profile?.mouse || 'unknown'}
- Polling rate: ${profile?.polling_rate || 'unknown'}
- Mousepad: ${profile?.pad_surface || 'unknown'} ${profile?.pad_size || ''}
- Monitor: ${profile?.monitor_hz || 'unknown'}
- Experience: ${profile?.experience || 'unknown'}
- Primary game: ${profile?.target_game || 'unknown'}
- Self-reported frustration: ${profile?.frustration || 'unknown'}

Analyze their scores and produce the following in JSON format only. No other text, no markdown, just raw JSON:

{
  "skill_scores": {
    "flicking": <0-100>,
    "flick_overshoot": <0-100>,
    "smooth_tracking": <0-100>,
    "reactive_tracking": <0-100>,
    "strafe_tracking": <0-100>,
    "target_switching": <0-100>,
    "micro_adjustment": <0-100>,
    "click_timing": <0-100>,
    "stopping_accuracy": <0-100>
  },
  "weak_skills": [
    {
      "skill": "<skill name>",
      "failure_rate": <percentage as number>,
      "pattern": "<what the scores reveal about this weakness>",
      "root_cause": "<what is likely causing this based on their setup and scores>",
      "root_cause_category": "<grip_tension|sensitivity|habit|technique|hardware|physical>",
      "action": "<specific thing to focus on this week>"
    }
  ],
  "strong_skills": [
    {
      "skill": "<skill name>",
      "note": "<brief note on why this is a strength>"
    }
  ],
  "weekly_routine": [
    {
      "scenario": "<kovaaks scenario name>",
      "skill_target": "<skill being trained>",
      "duration_mins": <number>,
      "why": "<why this scenario was chosen based on their weakness>",
      "goal": "<specific measurable goal for this week>"
    }
  ],
  "coaching_reminders": [
    "<reminder 1>",
    "<reminder 2>",
    "<reminder 3>",
    "<reminder 4>"
  ],
  "overall_summary": "<2-3 sentence summary of their biggest issues and what to focus on>"
}

Rules:
- Only flag a skill as weak if scores clearly indicate struggle relative to their other scores
- Weekly routine must total 20-30 minutes maximum
- Maximum 4-5 scenarios in the routine
- Focus routine entirely on weak skills only
- Root cause must connect to their specific setup profile where possible
- Be direct and specific — no generic advice
- Return only valid JSON, nothing else`

      await new Promise(resolve => setTimeout(resolve, 3000))

const scoreValues = Object.values(scores).map(s => parseFloat(s))
const avgScore = scoreValues.reduce((a, b) => a + b, 0) / scoreValues.length

const skillKeys = ['flicking', 'flick_overshoot', 'smooth_tracking', 'reactive_tracking', 'strafe_tracking', 'target_switching', 'micro_adjustment', 'click_timing', 'stopping_accuracy']

const skillScores = {}
benchmarkScenarios.forEach((s, i) => {
  skillScores[s.id] = Math.min(100, Math.max(0, parseFloat(scores[s.id]) / 10))
})

const sortedSkills = Object.entries(skillScores).sort((a, b) => a[1] - b[1])
const weakSkills = sortedSkills.slice(0, 4)
const strongSkills = sortedSkills.slice(6)

const scenarioMap = {
  flicking: { scenario: 'Gridshot Uncaged', why: 'Your flicking score was below average — this scenario isolates pure flick speed and accuracy.', goal: 'Focus on landing the first shot cleanly rather than chasing speed.' },
  flick_overshoot: { scenario: 'VoxTargetSwitch Easy', why: 'Your overshoot control needs work — this scenario rewards precision over speed.', goal: 'Slow the last 20% of every flick. Land within target bounds on first attempt.' },
  smooth_tracking: { scenario: 'Smoothbot', why: 'Your smooth tracking score indicates difficulty maintaining consistent crosshair contact.', goal: 'Keep your crosshair centered on the target throughout its entire movement.' },
  reactive_tracking: { scenario: 'Kinetic Track Jump', why: 'Reactive tracking needs improvement — this scenario forces fast direction change responses.', goal: 'React to direction changes immediately — no delay between seeing the change and responding.' },
  strafe_tracking: { scenario: 'Kinetic Strafe Track', why: 'Your strafe tracking score shows early deceleration before targets stop.', goal: 'Follow through until the target fully stops. Eyes on target not crosshair.' },
  target_switching: { scenario: 'Fast Strafes Voltaic', why: 'Target switching speed needs work — this scenario trains rapid multi-target acquisition.', goal: 'Commit to each target fully before switching to the next.' },
  micro_adjustment: { scenario: '1w4ts_Aimbooster', why: 'Micro-adjustment is your weakest area — small corrections after initial landing need work.', goal: 'Loose grip throughout. Let fingers settle the crosshair rather than forcing it.' },
  click_timing: { scenario: 'Smoothbot', why: 'Your click timing shows early firing before crosshair fully settles.', goal: 'Add a deliberate pause between landing on target and clicking. Score does not matter this week.' },
  stopping_accuracy: { scenario: 'VT Smoothbot Switch', why: 'Stopping accuracy needs improvement — you are not holding targets after acquisition.', goal: 'Hold the crosshair on target for a full beat before the next movement.' },
}

const rootCauses = {
  flicking: { cause: 'Wrist-only movement on fast flicks — arm is not initiating the motion', category: 'technique', action: 'Initiate flicks with your arm, let your wrist finish the last 20% of the movement.' },
  flick_overshoot: { cause: 'Overcorrection at end of flick motion, possibly sensitivity related', category: 'sensitivity', action: 'Try slowing the end of your flick deliberately. If overshoot persists after 2 weeks consider lowering sensitivity 5%.' },
  smooth_tracking: { cause: 'Inconsistent mouse speed — accelerating and decelerating unpredictably', category: 'technique', action: 'Focus on matching the exact speed of the target. Smooth and consistent beats fast and jerky.' },
  reactive_tracking: { cause: 'Delayed response to direction changes — anticipating instead of reacting', category: 'habit', action: 'Watch the target itself not where you think it is going. React to what you see not what you predict.' },
  strafe_tracking: { cause: 'Early deceleration before target stops — predicting end of strafe', category: 'habit', action: 'Follow through until the target fully stops every single time. Do not anticipate the stop.' },
  target_switching: { cause: 'Hesitation between targets — not committing to full acquisition before switching', category: 'habit', action: 'Land cleanly on each target before moving to the next. Speed comes after consistency.' },
  micro_adjustment: { cause: 'Grip tension causing hesitation after initial landing on target', category: 'grip_tension', action: 'Consciously loosen your grip this week. Fingers should guide the mouse not squeeze it.' },
  click_timing: { cause: 'Speed-chasing habit — firing before crosshair fully settles', category: 'habit', action: 'Add a deliberate beat between landing and clicking. This will feel slow at first — that is correct.' },
  stopping_accuracy: { cause: 'Not holding crosshair on target after acquisition', category: 'technique', action: 'Practice holding on target for a full beat before moving. Control before speed.' },
}

const routine = weakSkills.slice(0, 4).map(([skill]) => ({
  scenario: scenarioMap[skill]?.scenario || '1w4ts_Aimbooster',
  skill_target: skill.replace('_', ' '),
  duration_mins: 7,
  why: scenarioMap[skill]?.why || 'Targets your weakest skill directly.',
  goal: scenarioMap[skill]?.goal || 'Focus on improvement over score.',
}))

const totalMins = routine.reduce((sum, s) => sum + s.duration_mins, 0)
if (totalMins > 30) {
  routine.forEach(s => s.duration_mins = Math.floor(28 / routine.length))
}

const parsed = {
  skill_scores: skillScores,
  weak_skills: weakSkills.map(([skill, score]) => ({
    skill: skill.replace(/_/g, ' '),
    failure_rate: Math.round(100 - score),
    pattern: `Your ${skill.replace(/_/g, ' ')} score of ${score.toFixed(0)} is below your average of ${avgScore.toFixed(0)} — this is a consistent gap not an isolated mistake.`,
    root_cause: rootCauses[skill]?.cause || 'Technique needs refinement.',
    root_cause_category: rootCauses[skill]?.category || 'technique',
    action: rootCauses[skill]?.action || 'Focus on this skill deliberately this week.',
  })),
  strong_skills: strongSkills.map(([skill, score]) => ({
    skill: skill.replace(/_/g, ' '),
    note: `Score of ${score.toFixed(0)} is one of your strongest areas — no need to drill this week.`,
  })),
  weekly_routine: routine,
  coaching_reminders: [
    weakSkills[0] ? rootCauses[weakSkills[0][0]]?.action || 'Focus on your weakest skill first.' : 'Stay consistent this week.',
    weakSkills[1] ? rootCauses[weakSkills[1][0]]?.action || 'Address your second weakest skill.' : 'Quality over quantity every session.',
    'Do not chase scores this week — focus on the specific goal for each scenario.',
    'Same scenarios every day. Repetition is how motor memory forms.',
  ],
  overall_summary: `Your scores show a clear gap between your stronger skills and weaker ones. The biggest areas to address this week are ${weakSkills[0]?.[0]?.replace(/_/g, ' ')} and ${weakSkills[1]?.[0]?.replace(/_/g, ' ')}. Stick to the routine every day and benchmark again on Sunday to measure real improvement.`,
}

      const { data: { count } } = await supabase
        .from('benchmarks')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', session.user.id)

      const weekNumber = (count || 0) + 1

      const { data: benchmark } = await supabase
        .from('benchmarks')
        .insert({
          user_id: session.user.id,
          week_number: weekNumber,
          overall_score: Math.round(Object.values(parsed.skill_scores).reduce((a, b) => a + b, 0) / 9),
          overall_rank: getRank(Math.round(Object.values(parsed.skill_scores).reduce((a, b) => a + b, 0) / 9)),
          patterns_found: parsed.weak_skills.length,
          coaching_output: JSON.stringify(parsed),
        })
        .select()
        .single()

      for (const [skill, score] of Object.entries(parsed.skill_scores)) {
        await supabase.from('skill_scores').insert({
          user_id: session.user.id,
          benchmark_id: benchmark.id.toString(),
          week_number: weekNumber,
          skill_name: skill,
          score: Math.round(score),
          rank: getRank(score),
          failure_rate: parsed.weak_skills.find(w => w.skill.toLowerCase().includes(skill.replace('_', ' ')))?.failure_rate || 0,
        })
      }

      if (parsed.weekly_routine) {
        await supabase.from('routines').insert({
          user_id: session.user.id,
          week_number: weekNumber,
          scenarios: JSON.stringify(parsed.weekly_routine),
          reminders: JSON.stringify(parsed.coaching_reminders),
          total_mins: parsed.weekly_routine.reduce((sum, s) => sum + s.duration_mins, 0),
        })
      }

      setResult(parsed)
      setState('done')

    } catch (err) {
      console.error(err)
      setError('Something went wrong. Please try again.')
      setState('entry')
    }
  }

  function getRank(score) {
    if (score < 20) return 'Bronze I'
    if (score < 35) return 'Bronze II'
    if (score < 50) return 'Bronze III'
    if (score < 60) return 'Silver I'
    if (score < 65) return 'Silver II'
    if (score < 70) return 'Silver III'
    if (score < 74) return 'Gold I'
    if (score < 78) return 'Gold II'
    if (score < 82) return 'Gold III'
    if (score < 85) return 'Platinum I'
    if (score < 88) return 'Platinum II'
    if (score < 91) return 'Platinum III'
    if (score < 94) return 'Diamond I'
    if (score < 97) return 'Diamond II'
    if (score < 99) return 'Diamond III'
    return 'Elite'
  }

  const s = {
    page: { background: '#0e0e10', minHeight: '100vh', color: '#f0f0f0', padding: '28px 28px 90px', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" },
    nav: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' },
    logo: { fontSize: '15px', fontWeight: '500', flex: 1 },
    tag: { fontSize: '11px', fontWeight: '500', color: '#7F77DD', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' },
    title: { fontSize: '22px', fontWeight: '500', marginBottom: '4px' },
    sub: { fontSize: '13px', color: 'rgba(255,255,255,0.35)', marginBottom: '24px' },
    card: { background: '#141416', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '16px 18px', marginBottom: '16px' },
    input: { background: '#0e0e10', border: '0.5px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '8px 10px', color: '#f0f0f0', fontSize: '14px', outline: 'none', width: '90px', textAlign: 'center', fontFamily: 'inherit' },
    btn: { background: '#7F77DD', color: '#EEEDFE', border: 'none', borderRadius: '10px', padding: '13px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', width: '100%', fontFamily: 'inherit' },
    error: { fontSize: '13px', color: '#F09595', background: 'rgba(226,75,74,0.1)', border: '0.5px solid rgba(226,75,74,0.2)', borderRadius: '8px', padding: '10px 14px', marginBottom: '16px' },
  }

  return (
    <div style={s.page}>
      <div style={s.nav}>
        <div style={s.logo}>⊕ AimCoach</div>
        <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '20px', background: 'rgba(127,119,221,0.15)', border: '0.5px solid rgba(127,119,221,0.25)', color: '#AFA9EC' }}>Sunday benchmark</span>
      </div>

      {/* Score entry state */}
      {state === 'entry' && (
        <div>
          <div style={s.tag}>Enter your benchmark scores</div>
          <div style={s.title}>How did you do this week?</div>
          <div style={s.sub}>Play all 9 scenarios in Kovaaks then enter your scores below. The AI will analyze them and build your weekly routine.</div>

          {error && <div style={s.error}>{error}</div>}

          <div style={s.card}>
            <div style={{ fontSize: '12px', fontWeight: '500', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '16px' }}>
              Benchmark playlist — enter your score for each
            </div>
            {benchmarkScenarios.map((s, i) => (
              <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', borderBottom: i < benchmarkScenarios.length - 1 ? '0.5px solid rgba(255,255,255,0.05)' : 'none' }}>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', minWidth: '20px' }}>{String(i + 1).padStart(2, '0')}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: '500', marginBottom: '2px' }}>{s.scenario}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>{s.skill} · {s.duration}</div>
                </div>
                <input
                  style={{ background: '#0e0e10', border: scores[s.id] ? '0.5px solid rgba(127,119,221,0.4)' : '0.5px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '8px 10px', color: '#f0f0f0', fontSize: '14px', outline: 'none', width: '90px', textAlign: 'center', fontFamily: 'inherit' }}
                  type="number"
                  placeholder="Score"
                  value={scores[s.id] || ''}
                  onChange={e => updateScore(s.id, e.target.value)}
                />
              </div>
            ))}
          </div>

          <div style={{ background: 'rgba(127,119,221,0.08)', borderLeft: '2px solid #7F77DD', padding: '12px 16px', marginBottom: '20px', fontSize: '12px', color: 'rgba(255,255,255,0.4)', lineHeight: '1.6' }}>
            <span style={{ color: '#AFA9EC' }}>Where to find your scores:</span> After finishing each scenario in Kovaaks, your score appears on the results screen. Write them down as you go or check your stats folder after.
          </div>

          <button
            style={{ ...s.btn, opacity: allFilled ? 1 : 0.4, cursor: allFilled ? 'pointer' : 'not-allowed' }}
            onClick={analyzeScores}
            disabled={!allFilled}>
            Analyze my scores →
          </button>
        </div>
      )}

      {/* Analyzing state */}
      {state === 'analyzing' && (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(127,119,221,0.1)', border: '1px solid rgba(127,119,221,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '28px' }}>⚙️</div>
          <div style={{ fontSize: '20px', fontWeight: '500', marginBottom: '8px' }}>Analyzing your scores</div>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', marginBottom: '32px' }}>The AI is reviewing your benchmark results and building your coaching breakdown...</div>
          <div style={{ background: '#141416', borderRadius: '10px', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '60%', background: '#7F77DD', borderRadius: '2px', animation: 'pulse 1.5s ease-in-out infinite' }}></div>
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', whiteSpace: 'nowrap' }}>Processing...</div>
          </div>
        </div>
      )}

      {/* Done state */}
      {state === 'done' && result && (
        <div>
          <div style={{ textAlign: 'center', padding: '20px 0 28px' }}>
            <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(29,158,117,0.12)', border: '1px solid rgba(29,158,117,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '28px' }}>✓</div>
            <div style={{ fontSize: '20px', fontWeight: '500', marginBottom: '6px' }}>Analysis complete</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', marginBottom: '28px' }}>Your breakdown and this week's routine are ready.</div>
          </div>

          <div style={{ background: '#141416', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '16px 18px', marginBottom: '16px' }}>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: '1.7' }}>{result.overall_summary}</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
            {[
              ['Weak skills found', result.weak_skills?.length, '#F09595'],
              ['Strong skills', result.strong_skills?.length, '#5DCAA5'],
              ['Routine length', `${result.weekly_routine?.reduce((sum, s) => sum + s.duration_mins, 0)} min`, '#AFA9EC'],
              ['Scenarios', result.weekly_routine?.length, '#AFA9EC'],
            ].map(([label, val, color]) => (
              <div key={label} style={{ background: '#141416', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '12px 14px' }}>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginBottom: '4px' }}>{label}</div>
                <div style={{ fontSize: '20px', fontWeight: '500', color }}>{val}</div>
              </div>
            ))}
          </div>

          <div style={{ background: '#141416', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '16px 18px', marginBottom: '16px' }}>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginBottom: '10px' }}>Confirmed weak skills</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {result.weak_skills?.map(w => (
                <span key={w.skill} style={{ fontSize: '12px', background: 'rgba(226,75,74,0.12)', color: '#F09595', borderRadius: '6px', padding: '4px 10px' }}>{w.skill}</span>
              ))}
            </div>
          </div>

          <div style={{ background: '#141416', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '16px 18px', marginBottom: '20px' }}>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginBottom: '10px' }}>Strong skills — not in this week's routine</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {result.strong_skills?.map(s => (
                <span key={s.skill} style={{ fontSize: '12px', background: 'rgba(29,158,117,0.12)', color: '#5DCAA5', borderRadius: '6px', padding: '4px 10px' }}>{s.skill}</span>
              ))}
            </div>
          </div>

          <button style={s.btn} onClick={() => navigate('/breakdown')}>
            View full breakdown & routine →
          </button>
        </div>
      )}
    </div>
  )
}

export default Upload