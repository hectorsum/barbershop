import React from 'react'

// ============================================
// ABOUT PAGE — Fernando Barber & Tattoo
// ============================================

const AboutPage = ({ onNavigate }) => {
  const milestones = [
    { year: '2015', title: 'Primera Silla', desc: 'Abrió su primer puesto en una barbería del barrio donde creció. La fama se corrió rápido.' },
    { year: '2018', title: 'Comienza la Tinta', desc: 'Después de años dibujando por su cuenta, Fernando tomó un aprendizaje formal en tatuaje — dos oficios, una visión.' },
    { year: '2020', title: 'Abre Fernando\'s', desc: 'Lanzó su propio espacio — una barbería que mezcla el calor clásico con el filo de un estudio de tatuajes.' },
    { year: '2024', title: 'Reconocido', desc: 'Destacado en la prensa local como uno de los mejores barberos de la ciudad. Agenda llena, dedicación total.' },
  ];

  const skills = [
    { label: 'Fades & Tapers al Ras', pct: 98 },
    { label: 'Cortes Clásicos con Tijera', pct: 94 },
    { label: 'Escultura de Barba', pct: 90 },
    { label: 'Tatuajes de Trazo Fino', pct: 88 },
    { label: 'Tinta Tradicional Bold', pct: 85 },
    { label: 'Cover-ups', pct: 80 },
  ];

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
        {/* Background pattern — barbershop tools */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.06, pointerEvents: 'none' }} viewBox="0 0 1200 300" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          {/* Repeating scissors motif */}
          {[0,200,400,600,800,1000].map((x,i) => (
            <g key={i} transform={`translate(${x},${i%2===0?20:80})`}>
              <line x1="10" y1="10" x2="60" y2="80" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round"/>
              <line x1="30" y1="10" x2="60" y2="55" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="10" cy="10" r="8" stroke="#c9a84c" strokeWidth="2" fill="none"/>
              <circle cx="30" cy="10" r="8" stroke="#c9a84c" strokeWidth="2" fill="none"/>
            </g>
          ))}
          {/* Horizontal rule lines */}
          <line x1="0" y1="150" x2="1200" y2="150" stroke="#c9a84c" strokeWidth="0.5" opacity="0.4"/>
          <line x1="0" y1="200" x2="1200" y2="200" stroke="#c9a84c" strokeWidth="0.5" opacity="0.2"/>
          {/* Barber poles */}
          {[100,350,650,900,1150].map((x,i) => (
            <g key={i} transform={`translate(${x},100)`}>
              <rect x="0" y="0" width="8" height="100" rx="4" fill="#c9a84c" opacity="0.3"/>
              <rect x="2" y="0" width="2" height="100" fill="#fff" opacity="0.15"/>
            </g>
          ))}
        </svg>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <span className="section-label">La Historia</span>
          <h1 className="section-title" style={{ marginBottom: 16 }}>Sobre <em>Fernando</em></h1>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 18, color: 'var(--text-muted)', maxWidth: 520, margin: '0 auto' }}>
            Más de diez años de oficio. Un estándar inquebrantable: cada cliente sale viéndose mejor.
          </p>
        </div>
      </div>

      {/* ─── MAIN BIO ─── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '100px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
        <div>
          <img
            src="fernando-barber.png"
            alt="Fernando"
            style={{
              width: '100%',
              height: 500,
              objectFit: 'cover',
              objectPosition: 'top center',
              borderRadius: 8,
              display: 'block',
              background: 'var(--surface)',
            }}
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
            <ImgPlaceholder label="Interior de la barbería" height={160} />
            <ImgPlaceholder label="Herramientas / navajas close-up" height={160} />
          </div>
        </div>

        <div style={{ paddingTop: 8 }}>
          <span className="section-label">Quién Es</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 38, fontWeight: 700, lineHeight: 1.1, marginBottom: 28, color: 'var(--text)' }}>
            Más que un Barbero. <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Un Artista.</em>
          </h2>

          {[
            "Fernando no eligió la barbería — la barbería lo eligió a él. Creció viendo a su abuelo trabajar en la silla y absorbió su ritual: la crema caliente, la mano firme, la conversación que nunca para.",
            "A los dieciocho ya hacía cortes por su cuenta. A los veintidós tenía su propia silla. Esos primeros años los pasó obsesionado con la técnica — no solo la mecánica, sino la sensación, el arte de hacer que alguien se vaya mejor de como llegó.",
            "El trabajo de tatuaje llegó después, nacido de una costumbre de toda la vida: llenar cuadernos de bocetos. Se formó con un artista reconocido durante dos años antes de tomar la máquina profesionalmente. Hoy las dos disciplinas conviven: la precisión de la navaja y la paciencia de la aguja.",
          ].map((p, i) => (
            <p key={i} style={{ fontFamily: 'var(--font-serif)', fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 20 }}>{p}</p>
          ))}

          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 40, padding: '32px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
            {[['10+', 'Años'], ['2000+', 'Clientes'], ['500+', 'Tatuajes']].map(([n, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 900, color: 'var(--gold)', lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: 6 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>



      {/* ─── TIMELINE ─── */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '100px 40px' }}>
        <div className="section-header">
          <span className="section-label">Trayectoria</span>
          <h2 className="section-title">El <em>Camino</em></h2>
        </div>
        <Ornament />
        <div style={{ position: 'relative', paddingLeft: 40 }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom, var(--gold), transparent)' }} />
          {milestones.map((m, i) => (
            <div key={i} style={{ position: 'relative', marginBottom: 48 }}>
              <div style={{
                position: 'absolute',
                left: -44,
                top: 4,
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'var(--gold)',
                boxShadow: '0 0 12px rgba(200,160,80,0.5)',
              }} />
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)' }}>{m.year}</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--text)', margin: '8px 0 10px' }}>{m.title}</h3>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.7 }}>{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── CTA ─── */}
      <div style={{
        borderTop: '1px solid var(--border-gold)',
        padding: '60px 40px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 260,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Background — barbershop interior placeholder */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'repeating-linear-gradient(135deg, #1a1208 0px, #1a1208 40px, #1e1509 40px, #1e1509 80px)',
          zIndex: 0,
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 0,
          overflow: 'hidden',
        }}>
          {/* Barbershop interior SVG placeholder */}
          <svg width="100%" height="100%" viewBox="0 0 1200 320" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.18 }}>
            {/* Floor */}
            <rect x="0" y="220" width="1200" height="100" fill="#3a2a10"/>
            {/* Walls */}
            <rect x="0" y="0" width="1200" height="220" fill="#2a1e0e"/>
            {/* Mirror left */}
            <rect x="60" y="20" width="160" height="200" rx="4" fill="none" stroke="#c9a84c" strokeWidth="3"/>
            <rect x="68" y="28" width="144" height="184" rx="2" fill="#1a1208" opacity="0.6"/>
            {/* Mirror center */}
            <rect x="420" y="10" width="200" height="210" rx="4" fill="none" stroke="#c9a84c" strokeWidth="3"/>
            <rect x="428" y="18" width="184" height="194" rx="2" fill="#1a1208" opacity="0.6"/>
            {/* Mirror right */}
            <rect x="820" y="20" width="160" height="200" rx="4" fill="none" stroke="#c9a84c" strokeWidth="3"/>
            <rect x="828" y="28" width="144" height="184" rx="2" fill="#1a1208" opacity="0.6"/>
            {/* Barber chair left */}
            <rect x="80" y="160" width="120" height="60" rx="8" fill="#4a3020"/>
            <rect x="100" y="120" width="80" height="50" rx="6" fill="#5a3a28"/>
            <rect x="110" y="100" width="60" height="28" rx="4" fill="#4a3020"/>
            {/* Barber chair center */}
            <rect x="460" y="160" width="120" height="60" rx="8" fill="#4a3020"/>
            <rect x="480" y="120" width="80" height="50" rx="6" fill="#5a3a28"/>
            <rect x="490" y="100" width="60" height="28" rx="4" fill="#4a3020"/>
            {/* Barber chair right */}
            <rect x="840" y="160" width="120" height="60" rx="8" fill="#4a3020"/>
            <rect x="860" y="120" width="80" height="50" rx="6" fill="#5a3a28"/>
            <rect x="870" y="100" width="60" height="28" rx="4" fill="#4a3020"/>
            {/* Barber pole */}
            <rect x="270" y="40" width="14" height="180" rx="7" fill="#c9a84c" opacity="0.7"/>
            <rect x="680" y="40" width="14" height="180" rx="7" fill="#c9a84c" opacity="0.7"/>
            {/* Shelf */}
            <rect x="30" y="80" width="240" height="8" rx="2" fill="#7a5030"/>
            <rect x="390" y="70" width="260" height="8" rx="2" fill="#7a5030"/>
            <rect x="790" y="80" width="240" height="8" rx="2" fill="#7a5030"/>
            {/* Bottles on shelf */}
            {[50,80,110,140,170].map((x,i) => (
              <rect key={i} x={x} y={60} width={12} height={20} rx={3} fill="#c9a84c" opacity="0.5"/>
            ))}
            {[410,445,480,515,550,585].map((x,i) => (
              <rect key={i} x={x} y={50} width={12} height={20} rx={3} fill="#c9a84c" opacity="0.5"/>
            ))}
          </svg>
        </div>
        {/* Dark overlay for readability */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,7,3,0.55) 0%, rgba(10,7,3,0.7) 100%)', zIndex: 1 }} />

        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700, color: 'var(--text)', marginBottom: 16, position: 'relative', zIndex: 2 }}>
          ¿Listo para vivirlo?
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: 32, position: 'relative', zIndex: 2 }}>Reserva una sesión y descubre el oficio en persona.</p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', position: 'relative', zIndex: 2 }}>
          <button className="btn btn-gold" style={{ padding: '14px 32px' }} onClick={() => onNavigate('signup')}>Reservar Ahora</button>
          <button className="btn btn-outline" style={{ padding: '14px 32px' }} onClick={() => onNavigate('contact')}>Contáctanos</button>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { AboutPage });
