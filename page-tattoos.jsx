// ============================================
// TATTOOS PAGE — Fernando Barber & Tattoo
// ============================================

const TattoosPage = ({ onNavigate, user }) => {
  const [activeStyle, setActiveStyle] = React.useState('all');
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [lightboxItem, setLightboxItem] = React.useState(null);

  const styles = ['all', 'fine-line', 'traditional', 'blackwork', 'realism', 'geometric'];

  const pieces = [
    { style: 'fine-line', name: 'Estudio Botánico', size: 'Pequeño', duration: '2h', placeholder: 'Trazo fino botánico — tallos y hojas delicadas' },
    { style: 'traditional', name: 'Águila Clásica', size: 'Mediano', duration: '4h', placeholder: 'Águila tradicional — contornos gruesos, relleno plano' },
    { style: 'blackwork', name: 'Mandala Geométrica', size: 'Grande', duration: '6h', placeholder: 'Mandala blackwork — alto contraste, patrón geométrico' },
    { style: 'realism', name: 'Estudio de Retrato', size: 'Grande', duration: '8h', placeholder: 'Retrato realismo — sombreado fotográfico' },
    { style: 'geometric', name: 'Geometría Sagrada', size: 'Mediano', duration: '3h', placeholder: 'Geometría sagrada — líneas precisas, relleno punteado' },
    { style: 'fine-line', name: 'Script Minimalista', size: 'Pequeño', duration: '1.5h', placeholder: 'Lettering trazo fino — tipografía serif' },
    { style: 'traditional', name: 'Pantera Flash', size: 'Mediano', duration: '3h', placeholder: 'Pantera tradicional — estilo americano clásico' },
    { style: 'blackwork', name: 'Panel de Manga', size: 'Extra Grande', duration: '12h', placeholder: 'Panel manga blackwork — espacio negativo intrincado' },
    { style: 'realism', name: 'Estudio Animal', size: 'Mediano', duration: '5h', placeholder: 'Animal realismo — textura detallada de pelo, lobo o oso' },
    { style: 'geometric', name: 'Brújula Punteada', size: 'Pequeño', duration: '2h', placeholder: 'Rosa de los vientos punteada — sombreado stippling' },
    { style: 'fine-line', name: 'Mapa Celestial', size: 'Mediano', duration: '3h', placeholder: 'Mapa de constelaciones trazo fino — estilo carta estelar' },
    { style: 'traditional', name: 'Rosa y Daga', size: 'Pequeño', duration: '2h', placeholder: 'Rosa con daga tradicional — rojo y negro' },
  ];

  const tattooStyles = [
    { name: 'Trazo Fino', desc: 'Líneas delicadas y precisas — perfectas para botánica, retratos y diseños minimalistas.', icon: '✦' },
    { name: 'Tradicional', desc: 'Contornos gruesos, rellenos planos, motivos atemporales. Old school bien hecho.', icon: '⚓' },
    { name: 'Blackwork', desc: 'Tinta negra pura — trabajo geométrico, tribal e ilustrativo de alto contraste.', icon: '◆' },
    { name: 'Realismo', desc: 'Detalle fotográfico y sombreado tonal — retratos, animales, paisajes.', icon: '◉' },
    { name: 'Geométrico', desc: 'Geometría sagrada, mandalas y líneas de precisión con rellenos punteados.', icon: '△' },
  ];



  const visible = pieces.filter(p => activeStyle === 'all' || p.style === activeStyle);

  const openLightbox = (item) => { setLightboxItem(item); setLightboxOpen(true); };
  const closeLightbox = () => { setLightboxOpen(false); setLightboxItem(null); };

  return (
    <div>
      {/* Lightbox */}
      {lightboxOpen && lightboxItem && (
        <div onClick={closeLightbox} style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)', zIndex: 2000,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40,
        }}>
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: 700, width: '100%', background: 'var(--surface)', border: '1px solid var(--border-gold)', borderRadius: 12, overflow: 'hidden' }}>
            <ImgPlaceholder label={lightboxItem.placeholder} height={400} style={{ borderRadius: 0 }} />
            <div style={{ padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{lightboxItem.name}</h3>
                <div style={{ display: 'flex', gap: 10 }}>
                  <span className="badge badge-gold">{lightboxItem.style}</span>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{lightboxItem.size} · {lightboxItem.duration}</span>
                </div>
              </div>
              <button className="btn btn-gold" onClick={() => { closeLightbox(); onNavigate(user ? 'dashboard' : 'signup'); }}>
                {user ? 'Reservar Sesión' : 'Regístrate para Reservar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── HERO ─── */}
      <div style={{
        background: 'linear-gradient(160deg, #0D0810 0%, #1A1008 50%, #0D0810 100%)',
        borderBottom: '1px solid rgba(155, 127, 212, 0.3)',
        padding: 'calc(var(--nav-h) + 80px) 40px 60px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Purple glow */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 300, background: 'radial-gradient(ellipse, rgba(155,127,212,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        {/* Background — tattoo needle / ink pattern */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.07, pointerEvents: 'none' }} viewBox="0 0 1200 300" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          {[0,160,320,480,640,800,960,1120].map((x,i) => (
            <g key={i} transform={`translate(${x},${i%2===0?10:60}) rotate(${i%2===0?15:-15})`}>
              <line x1="20" y1="0" x2="20" y2="120" stroke="#9B7FD4" strokeWidth="2" strokeLinecap="round"/>
              <polygon points="16,120 24,120 20,140" fill="#9B7FD4"/>
              <rect x="10" y="0" width="20" height="12" rx="3" fill="#9B7FD4" opacity="0.6"/>
            </g>
          ))}
          {[200,500,800,1100].map((x,i) => (
            <g key={i} transform={`translate(${x},120)`}>
              <polygon points="0,-24 18,0 0,24 -18,0" stroke="#9B7FD4" strokeWidth="1.5" fill="none"/>
              <polygon points="0,-12 9,0 0,12 -9,0" stroke="#9B7FD4" strokeWidth="1" fill="none" opacity="0.5"/>
            </g>
          ))}
          <line x1="0" y1="250" x2="1200" y2="250" stroke="#9B7FD4" strokeWidth="0.5" opacity="0.3"/>
        </svg>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <span style={{ display: 'block', fontSize: 10, fontWeight: 600, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#9B7FD4', marginBottom: 16 }}>La Tinta</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 900, color: 'var(--parchment)', marginBottom: 16, lineHeight: 1.05 }}>
            Galería de <em style={{ color: '#9B7FD4', fontStyle: 'italic' }}>Tatuajes</em>
          </h1>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 18, color: 'var(--text-muted)', maxWidth: 500, margin: '0 auto' }}>
            Diseños originales. Arte permanente. Cada pieza dibujada a medida para quien la lleva.
          </p>
        </div>
      </div>

      {/* ─── STYLE CARDS ─── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 40px 40px' }}>
        <div className="section-header" style={{ marginBottom: 40 }}>
          <span className="section-label">Especialidades</span>
          <h2 className="section-title">Estilos que Fernando <em>Domina</em></h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
          {tattooStyles.map((s, i) => (
            <button key={i} onClick={() => setActiveStyle(s.name.toLowerCase().replace(' ', '-'))} style={{
              background: activeStyle === s.name.toLowerCase().replace(' ', '-') ? 'rgba(155,127,212,0.12)' : 'var(--surface)',
              border: `1px solid ${activeStyle === s.name.toLowerCase().replace(' ', '-') ? '#9B7FD480' : 'var(--border)'}`,
              borderRadius: 10,
              padding: '24px 16px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{s.icon}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{s.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.5 }}>{s.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* ─── GALLERY ─── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 40px 100px' }}>
        {/* Filter bar */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 40, flexWrap: 'wrap' }}>
          {styles.map(s => (
            <button key={s} onClick={() => setActiveStyle(s)} style={{
              padding: '7px 20px',
              borderRadius: 40,
              border: '1px solid',
              borderColor: activeStyle === s ? '#9B7FD4' : 'var(--border)',
              background: activeStyle === s ? 'rgba(155,127,212,0.12)' : 'transparent',
              color: activeStyle === s ? '#9B7FD4' : 'var(--text-muted)',
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}>
              {s === 'all' ? 'Todas las Piezas' : s}
            </button>
          ))}
        </div>

        {/* Masonry-style grid */}
        <div style={{ columns: 3, columnGap: 16 }}>
          {visible.map((p, i) => (
            <div key={i} onClick={() => openLightbox(p)} className="card" style={{
              marginBottom: 16,
              breakInside: 'avoid',
              cursor: 'pointer',
              display: 'block',
            }}>
              <ImgPlaceholder
                label={p.placeholder}
                height={i % 3 === 0 ? 320 : i % 3 === 1 ? 240 : 280}
                style={{ borderRadius: 0 }}
              />
              <div style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{p.name}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>{p.duration} · {p.size}</div>
                </div>
                <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9B7FD4' }}>{p.style}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── PRICING / CONTACT ─── */}
      <div style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '80px 40px' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <span className="section-label">Precios</span>
          <h2 className="section-title" style={{ marginBottom: 16 }}>Cada Pieza es <em>Única</em></h2>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: 12 }}>
            El precio de un tatuaje depende del tamaño, la complejidad y la zona. Cada diseño tiene su propio presupuesto tras una consulta gratuita.
          </p>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: 40 }}>
            Escríbenos para empezar la conversación — sin ningún compromiso.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-gold" style={{ padding: '14px 36px' }} onClick={() => onNavigate('contact')}>
              Consultar Precio
            </button>
            <button className="btn btn-outline" style={{ padding: '14px 36px' }} onClick={() => onNavigate(user ? 'dashboard' : 'signup')}>
              {user ? 'Reservar Sesión' : 'Regístrate para Reservar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { TattoosPage });
