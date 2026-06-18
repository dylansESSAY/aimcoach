import { useNavigate } from 'react-router-dom'

function Landing() {
  const navigate = useNavigate()

  return (
    <div style={{ background: '#0e0e10', minHeight: '100vh', color: '#f0f0f0', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Nav */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '18px 28px', borderBottom: '0.5px solid rgba(255,255,255,0.08)' }}>
        <span style={{ fontSize: '15px', fontWeight: '500', flex: 1 }}>⊕ AimCoach</span>
        <div style={{ display: 'flex', gap: '20px' }}>
          {['How it works', 'Features', 'Rankings', 'Pricing'].map(link => (
            <span key={link} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>{link}</span>
          ))}
        </div>
        <button
          onClick={() => navigate('/signup')}
          style={{ fontSize: '13px', background: '#7F77DD', color: '#EEEDFE', padding: '7px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '500' }}>
          Get early access
        </button>
      </nav>

      {/* Hero */}
      <section style={{ padding: '72px 28px 60px', textAlign: 'center', borderBottom: '0.5px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(127,119,221,0.15)', border: '0.5px solid rgba(127,119,221,0.3)', color: '#AFA9EC', fontSize: '12px', padding: '4px 12px', borderRadius: '20px', marginBottom: '24px' }}>
          ✦ AI aim coaching — built for Kovaaks
        </div>
        <h1 style={{ fontSize: '38px', fontWeight: '500', lineHeight: '1.2', maxWidth: '560px', margin: '0 auto 16px' }}>
          Stop guessing what to practice.<br />Start actually improving.
        </h1>
        <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.7', maxWidth: '440px', margin: '0 auto 32px' }}>
          Upload your benchmark recording every Sunday. AimCoach watches your footage, identifies exactly what's wrong, and builds your personalized weekly routine — 30 minutes a day, no longer.
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '40px', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/signup')}
            style={{ background: '#7F77DD', color: '#EEEDFE', fontSize: '14px', fontWeight: '500', padding: '11px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
            Get early access
          </button>
          <button
            style={{ background: 'transparent', color: '#f0f0f0', fontSize: '14px', padding: '11px 24px', borderRadius: '8px', border: '0.5px solid rgba(255,255,255,0.2)', cursor: 'pointer' }}>
            See how it works
          </button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
          {[['10', 'skill categories ranked'], ['30 min', 'max daily routine'], ['85+', 'aim factors understood']].map(([val, label]) => (
            <div key={label}>
              <div style={{ fontSize: '22px', fontWeight: '500' }}>{val}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '56px 28px', borderBottom: '0.5px solid rgba(255,255,255,0.08)' }}>
        <div style={{ fontSize: '11px', fontWeight: '500', color: '#7F77DD', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>How it works</div>
        <h2 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '8px' }}>One upload. One week of focus.</h2>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: '1.6', maxWidth: '480px', marginBottom: '36px' }}>
          The whole system runs on a weekly loop — benchmark on Sunday, grind Monday through Saturday, repeat.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.08)', borderRadius: '12px', overflow: 'hidden' }}>
          {[
            ['01', 'Run your benchmark', 'Play the AimCoach standard benchmark playlist every Sunday and record your full session as one clip.'],
            ['02', 'Upload the video', 'Drop your recording into AimCoach. The AI watches the entire footage — not just scores.'],
            ['03', 'Get your breakdown', 'Receive a coaching report covering what\'s wrong, what\'s strong, and the root cause behind each issue.'],
            ['04', 'Grind your routine', 'Same 4–5 scenarios every day that week. 30 minutes max. Repeat until Sunday — then benchmark again.'],
          ].map(([num, title, text]) => (
            <div key={num} style={{ background: '#141416', padding: '24px 20px' }}>
              <div style={{ fontSize: '11px', color: '#7F77DD', fontWeight: '500', marginBottom: '10px' }}>{num}</div>
              <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '6px' }}>{title}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', lineHeight: '1.6' }}>{text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '56px 28px', borderBottom: '0.5px solid rgba(255,255,255,0.08)' }}>
        <div style={{ fontSize: '11px', fontWeight: '500', color: '#7F77DD', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>Features</div>
        <h2 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '8px' }}>Coaching that goes deeper than scores</h2>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: '1.6', maxWidth: '480px', marginBottom: '36px' }}>
          AimCoach understands aim at a professional level — from grip pressure and sensitivity mismatches to sleep and posture.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
          {[
            ['📹', 'Video analysis', 'The AI watches your footage frame by frame — catching overshoot, jitter, early clicks, and deceleration patterns invisible in raw scores.'],
            ['⏱', 'Timestamp breakdowns', 'Every pattern is pinned to moments in your video so you can see exactly what the AI is talking about.'],
            ['💡', 'Root cause coaching', 'Flagged issues come with an explanation and a specific action — not just "practice more tracking."'],
            ['📋', 'Weekly routines', 'Personalized Kovaaks playlists targeting only your weak skills. Strong skills are deliberately skipped.'],
            ['🏆', 'Skill rankings', '10 individual skill ranks plus an overall rank. Your weakest skills can\'t hide behind your strongest ones.'],
            ['📈', 'Week over week tracking', 'Every benchmark compared to the last. Watch your skill scores climb and your overall rank follow.'],
          ].map(([icon, title, text]) => (
            <div key={title} style={{ background: '#141416', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '20px' }}>
              <div style={{ fontSize: '20px', marginBottom: '12px' }}>{icon}</div>
              <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '6px' }}>{title}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', lineHeight: '1.6' }}>{text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Skill ranks */}
      <section style={{ padding: '56px 28px', borderBottom: '0.5px solid rgba(255,255,255,0.08)' }}>
        <div style={{ fontSize: '11px', fontWeight: '500', color: '#7F77DD', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>Skill ranks</div>
        <h2 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '8px' }}>Every skill ranked independently</h2>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: '1.6', maxWidth: '480px', marginBottom: '28px' }}>
          10 aim skills tracked and ranked separately. Your overall rank is the honest average of all of them.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px', marginBottom: '28px' }}>
          {[
            ['⚡', 'Flicking'],
            ['🎯', 'Flick overshoot'],
            ['〰️', 'Smooth tracking'],
            ['⚡', 'Reactive tracking'],
            ['↔️', 'Strafe tracking'],
            ['🔄', 'Target switching'],
            ['✛', 'Micro-adjustment'],
            ['🖱️', 'Click timing'],
            ['⏹️', 'Stopping accuracy'],
            ['👁️', 'Crosshair placement'],
          ].map(([icon, name]) => (
            <div key={name} style={{ background: '#141416', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '15px' }}>{icon}</span>
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>{name}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, minmax(0,1fr))', gap: '8px' }}>
          {[
            ['#D85A30', '#F0997B', 'Bronze'],
            ['#888780', '#D3D1C7', 'Silver'],
            ['#EF9F27', '#FAC775', 'Gold'],
            ['#378ADD', '#85B7EB', 'Platinum'],
            ['#1D9E75', '#5DCAA5', 'Diamond'],
            ['#7F77DD', '#AFA9EC', 'Elite'],
          ].map(([bg, color, name]) => (
            <div key={name} style={{ background: '#141416', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '14px 8px', textAlign: 'center' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: bg, margin: '0 auto 6px' }}></div>
              <div style={{ fontSize: '12px', fontWeight: '500', color }}>{name}</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', marginTop: '3px' }}>I · II · III</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section style={{ padding: '56px 28px', borderBottom: '0.5px solid rgba(255,255,255,0.08)' }}>
        <div style={{ fontSize: '11px', fontWeight: '500', color: '#7F77DD', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>Pricing</div>
        <h2 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '8px' }}>Simple, honest pricing</h2>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', marginBottom: '36px' }}>One plan, everything included. Cancel anytime.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', maxWidth: '600px' }}>
          {[
            {
              name: 'Free', price: '$0', period: 'forever', featured: false,
              features: ['1 benchmark upload per month', 'Basic skill breakdown', 'Weekly routine (3 scenarios)', 'Overall rank only']
            },
            {
              name: 'Pro', price: '$12', period: '/mo', featured: true,
              features: ['Unlimited benchmark uploads', 'Full timestamp coaching', 'Root cause analysis + actions', 'Full weekly routine (4–5 scenarios)', 'All 10 individual skill ranks', 'Week over week tracking', 'Stall detection + fix suggestions']
            }
          ].map(({ name, price, period, featured, features }) => (
            <div key={name} style={{ background: '#141416', border: featured ? '2px solid #7F77DD' : '0.5px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '24px 20px' }}>
              {featured && <div style={{ fontSize: '11px', background: 'rgba(127,119,221,0.2)', color: '#AFA9EC', padding: '3px 10px', borderRadius: '20px', display: 'inline-block', marginBottom: '12px' }}>Most popular</div>}
              <div style={{ fontSize: '15px', fontWeight: '500', marginBottom: '4px' }}>{name}</div>
              <div style={{ fontSize: '28px', fontWeight: '500', margin: '12px 0 4px' }}>{price}<span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', fontWeight: '400' }}>{period}</span></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '16px 0 20px' }}>
                {features.map(f => (
                  <div key={f} style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', display: 'flex', gap: '7px' }}>
                    <span style={{ color: '#5DCAA5' }}>✓</span>{f}
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate('/onboarding')}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', fontSize: '13px', fontWeight: '500', cursor: 'pointer', border: featured ? 'none' : '0.5px solid rgba(255,255,255,0.15)', background: featured ? '#7F77DD' : 'transparent', color: featured ? '#EEEDFE' : 'rgba(255,255,255,0.6)' }}>
                {featured ? 'Start free trial' : 'Get started free'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Signup */}
      <section style={{ padding: '64px 28px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '26px', fontWeight: '500', marginBottom: '10px' }}>Get early access</h2>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', marginBottom: '28px' }}>Be first to know when AimCoach launches.</p>
        <div style={{ display: 'flex', gap: '8px', maxWidth: '400px', margin: '0 auto' }}>
          <input
            type="email"
            placeholder="your@email.com"
            style={{ flex: 1, background: '#1a1a1e', border: '0.5px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '10px 14px', color: '#f0f0f0', fontSize: '14px', outline: 'none' }}
          />
          <button style={{ background: '#7F77DD', color: '#EEEDFE', border: 'none', borderRadius: '8px', padding: '10px 18px', fontSize: '13px', fontWeight: '500', cursor: 'pointer', whiteSpace: 'nowrap' }}>
            Notify me
          </button>
        </div>
        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', marginTop: '12px' }}>No credit card required. Unsubscribe anytime.</div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '24px 28px', borderTop: '0.5px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '14px', fontWeight: '500', color: 'rgba(255,255,255,0.4)' }}>⊕ AimCoach</div>
        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>Built for Kovaaks players who want to actually improve.</div>
      </footer>

    </div>
  )
}

export default Landing