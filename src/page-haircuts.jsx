import React from 'react'

// ============================================
// HAIRCUTS PAGE — Fernando Barber & Tattoo
// ============================================

const HaircutsPage = ({ onNavigate, user }) => {
  const [activeFilter, setActiveFilter] = React.useState('all');

  const filters = ['all', 'fades', 'classic', 'barba', 'niños'];

  const cuts = [
    { tag: 'fades', name: 'Skin Fade', desc: 'Taper al ras — el corte emblema.', placeholder: 'Skin fade — líneas definidas, corte al ras' },
    { tag: 'fades', name: 'Mid Fade', desc: 'Taper versátil de mediana longitud para cualquier estilo.', placeholder: 'Mid fade — parte superior texturizada' },
    { tag: 'fades', name: 'High Fade', desc: 'Taper alto y dramático en la sien.', placeholder: 'High fade — parte superior estructurada' },
    { tag: 'classic', name: 'Corte con Tijera', desc: 'Técnica clásica a mano para un acabado natural.', placeholder: 'Corte clásico con tijera — raya lateral limpia' },
    { tag: 'classic', name: 'Taper Cut', desc: 'Reducción gradual de longitud, prolijo y limpio.', placeholder: 'Taper cut — look profesional' },
    { tag: 'classic', name: 'Crop Texturizado', desc: 'Longitud moderna en la parte superior con acabado texturizado.', placeholder: 'Crop texturizado — acabado mate' },
    { tag: 'barba', name: 'Perfilado de Barba', desc: 'Líneas definidas y bordes limpios.', placeholder: 'Perfilado de barba — mandíbula definida' },
    { tag: 'barba', name: 'Recorte Completo', desc: 'Longitud esculpida con acabado de toalla caliente.', placeholder: 'Recorte completo de barba — estilo redondeado' },
    { tag: 'niños', name: 'Corte Infantil', desc: 'Cortes suaves y con paciencia para los más pequeños.', placeholder: 'Corte infantil — sonrisa amplia' },
  ];

  const pricing = [
    {
      tier: 'Corte',
      price: 40,
      borderColor: 'var(--border)',
      services: ['Cualquier estilo — fades, tapers, tijera', 'Perfilado y detalle de líneas', 'Limpieza de nuca con toalla caliente', 'Acabado con producto'],
      highlight: false,
    },
    {
      tier: 'Corte + Barba',
      price: 70,
      borderColor: 'var(--gold)',
      services: ['Corte completo (cualquier estilo)', 'Recorte y escultura de barba', 'Borde con navaja y espuma caliente', 'Estilizado con producto premium'],
      highlight: true,
    },
    {
      tier: 'Solo Barba',
      price: 30,
      borderColor: 'var(--border)',
      services: ['Perfilado y definición de líneas', 'Recorte a la longitud deseada', 'Acabado con toalla caliente'],
      highlight: false,
    },
  ];

  const visible = cuts.filter(c => activeFilter === 'all' || c.tag === activeFilter);

  return (
    <div>
      {/* ─── HERO ─── */}
      <div style={{
        background: 'linear-gradient(180deg, var(--dark-brown) 0%, var(--espresso) 100%)',
        borderBottom: '1px solid var(--border-gold)',
        padding: 'calc(var(--nav-h) + 80px) 40px 60px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background — hair / comb pattern */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.07, pointerEvents: 'none' }} viewBox="0 0 1200 300" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          {/* Comb teeth */}
          {Array.from({length: 30}).map((_,i) => (
            <g key={i} transform={`translate(${i*42},0)`}>
              <rect x="0" y="20" width="4" height="60" rx="2" fill="#c9a84c"/>
              <rect x="10" y="20" width="4" height="40" rx="2" fill="#c9a84c"/>
              <rect x="20" y="20" width="4" height="50" rx="2" fill="#c9a84c"/>
              <rect x="30" y="20" width="4" height="35" rx="2" fill="#c9a84c"/>
            </g>
          ))}
          {/* Scissors large center */}
          <g transform="translate(520,80) scale(2.5)">
            <line x1="10" y1="10" x2="60" y2="80" stroke="#c9a84c" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="30" y1="10" x2="60" y2="55" stroke="#c9a84c" strokeWidth="2.5" strokeLinecap="round"/>
            <circle cx="10" cy="10" r="9" stroke="#c9a84c" strokeWidth="2.5" fill="none"/>
            <circle cx="30" cy="10" r="9" stroke="#c9a84c" strokeWidth="2.5" fill="none"/>
          </g>
          {/* Horizontal lines */}
          <line x1="0" y1="240" x2="1200" y2="240" stroke="#c9a84c" strokeWidth="0.5" opacity="0.3"/>
          <line x1="0" y1="270" x2="1200" y2="270" stroke="#c9a84c" strokeWidth="0.5" opacity="0.15"/>
        </svg>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <span className="section-label">La Silla</span>
          <h1 className="section-title" style={{ marginBottom: 16 }}>Cortes &amp; <em>Grooming</em></h1>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 18, color: 'var(--text-muted)', maxWidth: 480, margin: '0 auto' }}>
            Cada corte es una conversación. Cada estilo, una declaración.
          </p>
        </div>
      </div>

      {/* ─── GALLERY FILTERS ─── */}
      <div className="section" style={{ paddingBottom: 20 }}>
        <div className="section-header" style={{ marginBottom: 36 }}>
          <span className="section-label">Portafolio</span>
          <h2 className="section-title">El <em>Trabajo</em></h2>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 48, flexWrap: 'wrap' }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} style={{
              padding: '8px 24px',
              borderRadius: 40,
              border: '1px solid',
              borderColor: activeFilter === f ? 'var(--gold)' : 'var(--border)',
              background: activeFilter === f ? 'rgba(200,160,80,0.12)' : 'transparent',
              color: activeFilter === f ? 'var(--gold)' : 'var(--text-muted)',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}>
              {f === 'all' ? 'Todos los Estilos' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {visible.map((c, i) => (
            <div key={i} className="card" style={{ cursor: 'default' }}>
              <ImgPlaceholder label={c.placeholder} height={220} style={{ borderRadius: 0 }} />
              <div style={{ padding: '16px 20px' }}>
                <span className="badge badge-gold" style={{ marginBottom: 8 }}>{c.tag}</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{c.name}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── PRICING ─── */}
      <div style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '100px 40px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div className="section-header">
            <span className="section-label">Precios</span>
            <h2 className="section-title">Tarifas <em>Claras</em></h2>
          </div>
          <Ornament />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {pricing.map((p, i) => (
              <div key={i} style={{
                background: p.highlight ? 'linear-gradient(145deg, #2C1A0E, #4A2C1A)' : 'var(--surface)',
                border: `1px solid ${p.borderColor}`,
                borderRadius: 12,
                padding: '40px 32px',
                position: 'relative',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                {p.highlight && (
                  <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'var(--gold)', color: 'var(--espresso)', fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', padding: '4px 14px', borderRadius: 20 }}>
                    Más Popular
                  </div>
                )}
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12 }}>{p.tier}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 52, fontWeight: 900, color: 'var(--text)', lineHeight: 1 }}>
                  ${p.price}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 32, marginTop: 4 }}>per session</div>
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24 }}>
                  {p.services.map((s, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
                      <span style={{ color: 'var(--gold)', fontSize: 13, flexShrink: 0, marginTop: 1 }}>✓</span>
                      <span style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.4 }}>{s}</span>
                    </div>
                  ))}
                </div>
                <button
                  className={`btn ${p.highlight ? 'btn-gold' : 'btn-outline'}`}
                  style={{ width: '100%', marginTop: 28, padding: '12px' }}
                  onClick={() => onNavigate(user ? 'dashboard' : 'signup')}
                >
                  {user ? 'Reservar' : 'Regístrate para Reservar'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── BOOKING NUDGE ─── */}
      {!user && (
        <div style={{ padding: '60px 40px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 18, color: 'var(--text-muted)', marginBottom: 24 }}>
            ¿Listo para reservar? Crea tu cuenta y agenda tu primera cita en minutos.
          </p>
          <button className="btn btn-gold" style={{ padding: '14px 40px' }} onClick={() => onNavigate('signup')}>
            Crear Cuenta Gratis
          </button>
        </div>
      )}
    </div>
  );
};

Object.assign(window, { HaircutsPage });
