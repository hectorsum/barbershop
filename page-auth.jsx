// ============================================
// AUTH PAGES — Sign In / Sign Up
// Fernando Barber & Tattoo
// ============================================

const AuthPage = ({ mode = 'signin', onNavigate, onAuthSuccess }) => {
  const [view, setView] = React.useState(mode); // 'signin' | 'signup'
  const [form, setForm] = React.useState({ name: '', username: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }));
    setErrors(e => ({ ...e, [k]: '' }));
  };

  const validate = () => {
    const e = {};
    if (view === 'signup') {
      if (!form.name.trim()) e.name = 'Name is required';
      if (!form.username.trim()) e.username = 'Username is required';
      else if (form.username.length < 3) e.username = 'At least 3 characters';
      if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    }
    if (!form.email.includes('@')) e.email = 'Enter a valid email';
    if (form.password.length < 6) e.password = 'At least 6 characters';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const user = view === 'signup'
        ? { name: form.name, username: form.username, email: form.email, joinDate: 'May 2026', points: 0, tier: 'New Member' }
        : { name: 'Marcus', username: 'marcus_t', email: form.email, joinDate: 'Jan 2024', points: 340, tier: 'Gold Member' };
      onAuthSuccess(user);
      onNavigate('dashboard');
    }, 1200);
  };

  const FieldError = ({ field }) => errors[field]
    ? <span style={{ fontSize: 11, color: '#f28080', marginTop: 4, display: 'block' }}>{errors[field]}</span>
    : null;

  return (
    <div className="pt-nav" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px' }}>
      {/* Background decorative */}
      <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse at 30% 50%, rgba(44,26,14,0.6) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(26,16,8,0.8) 0%, transparent 60%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 960, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border-gold)', position: 'relative', zIndex: 1 }}>

        {/* ─── LEFT: Brand panel ─── */}
        <div style={{
          background: 'linear-gradient(160deg, var(--dark-brown) 0%, var(--espresso) 100%)',
          padding: '60px 48px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRight: '1px solid var(--border-gold)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', bottom: -60, right: -60, width: 300, height: 300, borderRadius: '50%', border: '1px solid rgba(200,160,80,0.1)' }} />
          <div style={{ position: 'absolute', bottom: -20, right: -20, width: 200, height: 200, borderRadius: '50%', border: '1px solid rgba(200,160,80,0.06)' }} />

          <div>
            <a href="#" onClick={e => { e.preventDefault(); onNavigate('home'); }} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 48, textDecoration: 'none', cursor: 'pointer' }}>
              <LogoIcon size={40} />
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--gold)' }}>Fernando</div>
                <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Barber &amp; Tattoo</div>
              </div>
            </a>

            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 900, color: 'var(--text)', lineHeight: 1.1, marginBottom: 20 }}>
              {view === 'signin' ? 'Bienvenido\nde vuelta.' : 'Únete a\nla familia.'}
            </h2>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.7 }}>
              {view === 'signin'
                ? 'Tus citas, recompensas de fidelidad e historial de cortes — todo en un lugar.'
                : 'Crea una cuenta para reservar sesiones, seguir tus puntos de fidelidad y ver tu historial de cortes.'}
            </p>
          </div>

          {/* Member perks */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { icon: '📅', text: 'Reserva y gestiona citas' },
              { icon: '🏆', text: 'Gana puntos de fidelidad en cada visita' },
              { icon: '📸', text: 'Tu historial de cortes, guardado' },
            ].map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 16 }}>{p.icon}</span>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{p.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── RIGHT: Form ─── */}
        <div style={{ background: 'var(--surface)', padding: '60px 48px' }}>
          {/* Toggle */}
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: 4, marginBottom: 40 }}>
            {['signin', 'signup'].map(v => (
              <button key={v} onClick={() => { setView(v); setErrors({}); }} style={{
                flex: 1,
                padding: '10px',
                borderRadius: 6,
                border: 'none',
                background: view === v ? 'var(--gold)' : 'transparent',
                color: view === v ? 'var(--espresso)' : 'var(--text-muted)',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}>
                {v === 'signin' ? 'Iniciar Sesión' : 'Registrarse'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {view === 'signup' && (
              <>
                <div>
                  <label style={{ display: 'block', fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>Nombre Completo</label>
                  <input className="input" placeholder="Fernando Gómez" value={form.name} onChange={e => set('name', e.target.value)} />
                  <FieldError field="name" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>Usuario</label>
                  <input className="input" placeholder="@tu_usuario" value={form.username} onChange={e => set('username', e.target.value)} />
                  <FieldError field="username" />
                </div>
              </>
            )}

            <div>
              <label style={{ display: 'block', fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>Email</label>
              <input className="input" type="email" placeholder="tu@email.com" value={form.email} onChange={e => set('email', e.target.value)} />
              <FieldError field="email" />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>Contraseña</label>
              <input className="input" type="password" placeholder="••••••••" value={form.password} onChange={e => set('password', e.target.value)} />
              <FieldError field="password" />
            </div>

            {view === 'signup' && (
              <div>
                <label style={{ display: 'block', fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>Confirmar Contraseña</label>
                <input className="input" type="password" placeholder="••••••••" value={form.confirm} onChange={e => set('confirm', e.target.value)} />
                <FieldError field="confirm" />
              </div>
            )}

            <button type="submit" className="btn btn-gold" style={{ padding: '14px', fontSize: '12px', marginTop: 4, position: 'relative' }} disabled={loading}>
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 14, height: 14, border: '2px solid var(--espresso)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
                  {view === 'signin' ? 'Iniciando Sesión…' : 'Creando Cuenta…'}
                </span>
              ) : (
                view === 'signin' ? 'Iniciar Sesión' : 'Crear Cuenta'
              )}
            </button>
          </form>

          {view === 'signin' && (
            <p style={{ textAlign: 'center', marginTop: 24, fontSize: 12, color: 'var(--text-muted)' }}>
              ¿No tienes cuenta?{' '}
              <button onClick={() => setView('signup')} style={{ background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>
                Regístrate gratis
              </button>
            </p>
          )}
          {view === 'signup' && (
            <p style={{ textAlign: 'center', marginTop: 24, fontSize: 12, color: 'var(--text-muted)' }}>
              ¿Ya tienes cuenta?{' '}
              <button onClick={() => setView('signin')} style={{ background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>
                Inicia sesión
              </button>
            </p>
          )}
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

Object.assign(window, { AuthPage });
