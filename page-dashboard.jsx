// ============================================
// CLIENT DASHBOARD — Fernando Barber & Tattoo
// ============================================

const DashboardPage = ({ user, onNavigate, onSignOut }) => {
  const [activeTab, setActiveTab] = React.useState('overview');

  // Mock data
  const upcomingAppts = [
    { id: 1, service: 'Corte Signature + Barba', date: '10 de mayo, 2026', time: '2:00 PM', status: 'confirmado', price: 55 },
    { id: 2, service: 'Consulta de Tatuaje', date: '18 de mayo, 2026', time: '11:00 AM', status: 'pendiente', price: 0 },
  ];

  const pastCuts = [
    { id: 1, service: 'Skin Fade', date: '19 abr, 2026', points: 55, placeholder: 'Perfil lateral — skin fade limpio, abr 2026' },
    { id: 2, service: 'Corte Clásico + Barba', date: '28 mar, 2026', points: 55, placeholder: 'Vista frontal — crop texturizado con barba perfilada' },
    { id: 3, service: 'Mid Fade', date: '1 mar, 2026', points: 35, placeholder: 'Vista superior — mid fade fresco, líneas limpias' },
    { id: 4, service: 'Taper + Afeitado', date: '8 feb, 2026', points: 55, placeholder: 'Perfil — taper fade con borde a navaja' },
  ];

  const loyaltyTiers = [
    { name: 'Nuevo', min: 0, max: 99, color: '#888' },
    { name: 'Bronce', min: 100, max: 299, color: '#CD7F32' },
    { name: 'Plata', min: 300, max: 599, color: '#C0C0C0' },
    { name: 'Oro', min: 600, max: 999, color: '#C9A84C' },
    { name: 'Platino', min: 1000, max: Infinity, color: '#E5E4E2' },
  ];

  const points = user?.points ?? 340;
  const currentTier = loyaltyTiers.find(t => points >= t.min && points <= t.max) || loyaltyTiers[0];
  const nextTier = loyaltyTiers[loyaltyTiers.indexOf(currentTier) + 1];
  const pctToNext = nextTier ? Math.min(100, Math.round(((points - currentTier.min) / (nextTier.min - currentTier.min)) * 100)) : 100;

  const rewards = [
    { name: 'Perfilado Gratis', cost: 200, available: points >= 200 },
    { name: '20% Descuento Próximo Corte', cost: 350, available: points >= 350 },
    { name: 'Arreglo de Barba Gratis', cost: 500, available: points >= 500 },
    { name: 'Corte Clásico Gratis', cost: 700, available: points >= 700 },
  ];

  const tabs = [
    { id: 'overview', label: 'Resumen' },
    { id: 'appointments', label: 'Citas' },
    { id: 'history', label: 'Historial' },
    { id: 'loyalty', label: 'Fidelidad' },
  ];

  const [cancelId, setCancelId] = React.useState(null);
  const [appts, setAppts] = React.useState(upcomingAppts);

  const cancelAppt = (id) => {
    setAppts(a => a.filter(x => x.id !== id));
    setCancelId(null);
  };

  return (
    <div className="pt-nav" style={{ minHeight: '100vh' }}>
      {/* ─── HEADER ─── */}
      <div style={{ background: 'linear-gradient(180deg, var(--dark-brown), var(--espresso))', borderBottom: '1px solid var(--border-gold)', padding: '40px 40px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {/* User info row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32 }}>
            <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'var(--surface2)', border: '2px solid var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--gold)', flexShrink: 0 }}>
              {(user?.name || 'U')[0].toUpperCase()}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--text)' }}>
                Hey, {user?.name?.split(' ')[0] || 'there'} 👋
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                @{user?.username || 'user'} · Member since {user?.joinDate || '2026'}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span className="badge" style={{ background: `${currentTier.color}22`, color: currentTier.color, border: `1px solid ${currentTier.color}44`, fontSize: 10 }}>
                {currentTier.name}
              </span>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 900, color: 'var(--gold)', marginTop: 4 }}>{points} <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--text-muted)' }}>pts</span></div>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 0, borderTop: '1px solid var(--border)' }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
                padding: '14px 24px',
                background: 'none',
                border: 'none',
                borderBottom: `2px solid ${activeTab === t.id ? 'var(--gold)' : 'transparent'}`,
                color: activeTab === t.id ? 'var(--gold)' : 'var(--text-muted)',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.2s',
                marginBottom: -1,
              }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── CONTENT ─── */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 40px' }}>

        {/* ═══ OVERVIEW TAB ═══ */}
        {activeTab === 'overview' && (
          <div>
            {/* Stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 48 }}>
              {[
                { label: 'Visitas Totales', value: pastCuts.length + appts.filter(a => a.status === 'confirmado').length, icon: '✂' },
                { label: 'Puntos de Fidelidad', value: points, icon: '🏆' },
                { label: 'Próximas Citas', value: appts.length, icon: '📅' },
                { label: 'Nivel', value: currentTier.name, icon: '✦' },
              ].map((s, i) => (
                <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px 20px' }}>
                  <div style={{ fontSize: 22, marginBottom: 12 }}>{s.icon}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 900, color: i === 3 ? currentTier.color : 'var(--gold)' }}>{s.value}</div>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Next appointment + loyalty side by side */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 40 }}>
              {/* Next appt */}
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '28px' }}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>Próxima Cita</div>
                {appts.length > 0 ? (
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{appts[0].service}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>{appts[0].date} a las {appts[0].time}</div>
                    <span className={`badge ${appts[0].status === 'confirmado' ? 'badge-green' : 'badge-gold'}`}>{appts[0].status}</span>
                  </div>
                ) : (
                  <div>
                    <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 16 }}>Sin citas próximas.</p>
                    <button className="btn btn-gold" style={{ padding: '10px 20px', fontSize: '11px' }} onClick={() => setActiveTab('appointments')}>Reservar</button>
                  </div>
                )}
              </div>

              {/* Loyalty progress */}
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '28px' }}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>Progreso de Fidelidad</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{currentTier.name}</span>
                  {nextTier && <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{nextTier.name}</span>}
                </div>
                <div style={{ height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden', marginBottom: 10 }}>
                  <div style={{ height: '100%', width: `${pctToNext}%`, background: `linear-gradient(90deg, ${currentTier.color}, ${nextTier?.color || currentTier.color})`, borderRadius: 3, transition: 'width 1s ease' }} />
                </div>
                {nextTier && (
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                    <span style={{ color: 'var(--gold)', fontWeight: 600 }}>{nextTier.min - points} pts</span> para alcanzar {nextTier.name}
                  </div>
                )}
              </div>
            </div>

            {/* Recent cuts preview */}
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20 }}>Cortes Recientes</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
              {pastCuts.slice(0, 4).map((c, i) => (
                <div key={i} className="card">
                  <ImgPlaceholder label={c.placeholder} height={140} style={{ borderRadius: 0 }} />
                  <div style={{ padding: '12px 14px' }}>
                    <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text)' }}>{c.service}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{c.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ APPOINTMENTS TAB ═══ */}
        {activeTab === 'appointments' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 36 }}>
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: 'var(--text)' }}>Tus Citas</h2>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>Gestiona tus reservas próximas y pasadas.</p>
              </div>
              <button className="btn btn-gold" style={{ padding: '12px 24px' }} onClick={() => alert('¡Próximamente!')}>
                + Nueva Cita
              </button>
            </div>

            {appts.length === 0 && (
              <div style={{ textAlign: 'center', padding: '60px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12 }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>📅</div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--text)', marginBottom: 8 }}>Sin citas próximas</p>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24 }}>Reserva tu próxima sesión con Fernando.</p>
                <button className="btn btn-gold" onClick={() => alert('¡Próximamente!')}>Reservar</button>
              </div>
            )}

            {appts.map(a => (
              <div key={a.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px 28px', marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
                <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                  <div style={{ width: 52, height: 52, borderRadius: 8, background: 'rgba(200,160,80,0.1)', border: '1px solid var(--border-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                    ✂
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{a.service}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{a.date} · {a.time}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  {a.price > 0 && <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--gold)' }}>${a.price}</span>}
                  <span className={`badge ${a.status === 'confirmado' ? 'badge-green' : 'badge-gold'}`}>{a.status}</span>
                  {cancelId === a.id ? (
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="btn btn-dark" style={{ padding: '8px 14px', fontSize: '10px' }} onClick={() => setCancelId(null)}>Mantener</button>
                      <button className="btn" style={{ padding: '8px 14px', fontSize: '10px', background: 'rgba(242,128,128,0.15)', border: '1px solid rgba(242,128,128,0.3)', color: '#f28080' }} onClick={() => cancelAppt(a.id)}>Confirmar Cancelación</button>
                    </div>
                  ) : (
                    <button className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '10px' }} onClick={() => setCancelId(a.id)}>Cancelar</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ═══ HISTORY TAB ═══ */}
        {activeTab === 'history' && (
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>Historial de Cortes</h2>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 36 }}>Cada sesión, fotografiada y guardada.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
              {pastCuts.map((c, i) => (
                <div key={i} className="card" style={{ display: 'flex', overflow: 'hidden' }}>
                  <ImgPlaceholder label={c.placeholder} width={160} height={140} style={{ borderRadius: 0, flexShrink: 0 }} />
                  <div style={{ padding: '20px 20px', flex: 1 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{c.service}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>{c.date}</div>
                    <span className="badge badge-gold">+{c.points} pts earned</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ LOYALTY TAB ═══ */}
        {activeTab === 'loyalty' && (
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>Programa de Fidelidad</h2>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 48 }}>Gana puntos en cada visita. Canjéalos por servicios gratis.</p>

            {/* Tier progress */}
            <div style={{ background: 'var(--surface)', border: `1px solid ${currentTier.color}40`, borderRadius: 12, padding: '36px', marginBottom: 40 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
                <div>
                  <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: currentTier.color }}>Nivel Actual</span>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 900, color: currentTier.color, marginTop: 4 }}>{currentTier.name}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Tus Puntos</span>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 900, color: 'var(--gold)', lineHeight: 1, marginTop: 4 }}>{points}</div>
                </div>
              </div>

              {/* Tier bar */}
              <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
                {loyaltyTiers.map((t, i) => (
                  <div key={i} style={{ flex: 1, height: 6, borderRadius: 3, background: points >= t.min ? t.color : 'var(--border)', transition: 'background 0.5s' }} />
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
                {loyaltyTiers.map(t => <span key={t.name}>{t.name}</span>)}
              </div>
            </div>

            {/* Rewards */}
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20 }}>Canjear Recompensas</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {rewards.map((r, i) => (
                <div key={i} style={{
                  background: 'var(--surface)',
                  border: `1px solid ${r.available ? 'var(--border-gold)' : 'var(--border)'}`,
                  borderRadius: 10,
                  padding: '24px',
                  opacity: r.available ? 1 : 0.5,
                  transition: 'all 0.2s',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>{r.name}</div>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--gold)' }}>{r.cost} pts</span>
                  </div>
                  <button
                    className={`btn ${r.available ? 'btn-gold' : 'btn-dark'}`}
                    style={{ width: '100%', padding: '10px', fontSize: '10px' }}
                    disabled={!r.available}
                    onClick={() => r.available && alert(`Canjeando: ${r.name}`)}
                  >
                    {r.available ? 'Canjear' : `Necesitas ${r.cost - points} pts más`}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Object.assign(window, { DashboardPage });
