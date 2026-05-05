import React from 'react'

// ============================================
// HOME PAGE — Fernando Barber & Tattoo
// ============================================

const HomePage = ({ onNavigate, user }) => {
  const [slide, setSlide] = React.useState(0);
  const [animating, setAnimating] = React.useState(false);
  const slides = [
    {
      label: 'El Barbero',
      eyebrow: 'Est. 2015',
      role: 'Barbero',
      word1: 'Precisión.',
      word2: 'Estilo.',
      word3: 'Oficio.',
      sub: 'Cortes clásicos y fades modernos — cada cabello tiene una historia que merece contarse bien.',
      cta: 'Ver Cortes',
      ctaPage: 'haircuts',
      bg: 'linear-gradient(135deg, #0E0E0E 0%, #1A1010 50%, #0E0E0E 100%)',
      accent: '#DDB340',
      img: 'fernando-barber.png',
      imgLabel: 'Fernando — Barbero',
    },
    {
      label: 'El Artista',
      eyebrow: 'Tatuajes Personalizados',
      role: 'Tatuador',
      word1: 'Arte',
      word2: 'que vive',
      word3: 'en tu piel.',
      sub: 'Diseños únicos desde trazo fino hasta tradicional bold — arte permanente hecho para ti.',
      cta: 'Ver Tatuajes',
      ctaPage: 'tattoos',
      bg: 'linear-gradient(135deg, #0E0E0E 0%, #101018 50%, #0E0E0E 100%)',
      accent: '#DDB340',
      img: 'fernando-barber.png',
      imgLabel: 'Fernando — Tatuador',
    },
  ];

  const goTo = (idx) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setSlide(idx);
      setAnimating(false);
    }, 400);
  };

  React.useEffect(() => {
    const t = setInterval(() => goTo((slide + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [slide]);

  const current = slides[slide];

  // Testimonials
  const testimonials = [
    { name: 'Marcus T.', rating: 5, text: 'El mejor fade de la ciudad, sin duda. Fernando sabe exactamente lo que quieres antes de que termines de explicarlo.', service: 'Taper Fade' },
    { name: 'Diego R.', rating: 5, text: 'Empecé mi manga aquí. El detalle del trabajo es increíble — cada sesión recibo cumplidos durante semanas.', service: 'Manga Completa' },
    { name: 'James K.', rating: 5, text: 'Llevo tres años viniendo cada dos semanas. El ambiente, la música, el corte — siempre perfecto.', service: 'Corte Clásico + Barba' },
    { name: 'Sofia M.', rating: 5, text: 'Vine por un tatuaje pequeño y salí planeando media manga. Los diseños de Fernando son otro nivel.', service: 'Tatuaje Personalizado' },
  ];

  // Services preview
  const services = [
    { title: 'Cortes & Fades', desc: 'Clásicos, modernos y tapers al ras — el corte que quieras.', page: 'haircuts' },
    { title: 'Arreglo de Barba', desc: 'Forma, recorte y afeitado con toalla caliente — a la antigua.', page: 'haircuts' },
    { title: 'Tatuajes Personalizados', desc: 'Diseños originales creados a tu medida — sin catálogo.', page: 'tattoos' },
    { title: 'Retoques & Cover-ups', desc: 'Dale nueva vida a tinta vieja o transforma lo que ya tienes.', page: 'tattoos' },
  ];

  return (
    <div>
      {/* ─── HERO CAROUSEL ─── */}
      <div style={{
        position: 'relative',
        height: '100vh',
        minHeight: 600,
        background: current.bg,
        transition: 'background 0.8s ease',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        width: '100%',
      }}>


        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 40px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 60,
          alignItems: 'center',
          width: '100%',
          minWidth: 0,
          flex: 1,
          opacity: animating ? 0 : 1,
          transform: animating ? 'translateY(16px)' : 'translateY(0)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}>
          {/* Text side — redesigned */}
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
            {/* Vertical role tag */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
              paddingTop: 8,
              flexShrink: 0,
            }}>
              <div style={{
                width: 1,
                height: 60,
                background: `linear-gradient(to bottom, transparent, ${current.accent})`,
              }} />
              <span style={{
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                transform: 'rotate(180deg)',
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: current.accent,
                opacity: 0.8,
              }}>
                Fernando · {current.role}
              </span>
              <div style={{
                width: 1,
                height: 60,
                background: `linear-gradient(to top, transparent, ${current.accent})`,
              }} />
            </div>

            {/* Main content */}
            <div style={{ flex: 1 }}>
              {/* Eyebrow */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: `${current.accent}14`,
                border: `1px solid ${current.accent}30`,
                borderRadius: 40,
                padding: '5px 14px',
                marginBottom: 32,
              }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: current.accent, flexShrink: 0 }} />
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: current.accent }}>
                  {current.eyebrow}
                </span>
              </div>

              {/* Big stacked type */}
              <div style={{ marginBottom: 32 }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(52px, 7vw, 96px)',
                  fontWeight: 400,
                  lineHeight: 0.88,
                  color: 'var(--parchment)',
                  letterSpacing: '0.04em',
                }}>
                  {current.word1}
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(52px, 7vw, 96px)',
                  fontWeight: 400,
                  lineHeight: 0.88,
                  color: current.accent,
                  letterSpacing: '0.04em',
                  marginLeft: 28,
                  WebkitTextStroke: `1px ${current.accent}`,
                }}>
                  {current.word2}
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(52px, 7vw, 96px)',
                  fontWeight: 400,
                  lineHeight: 0.88,
                  color: 'transparent',
                  letterSpacing: '0.04em',
                  WebkitTextStroke: `1px ${current.accent}60`,
                }}>
                  {current.word3}
                </div>
              </div>

              {/* Thin divider */}
              <div style={{ width: 48, height: 1, background: `${current.accent}60`, marginBottom: 24 }} />

              {/* Sub text */}
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 16,
                fontWeight: 300,
                color: 'var(--text-muted)',
                lineHeight: 1.7,
                maxWidth: 340,
                marginBottom: 40,
              }}>
                {current.sub}
              </p>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                <button className="btn btn-gold" style={{ padding: '13px 30px', fontSize: '11px' }} onClick={() => onNavigate(current.ctaPage)}>
                  {current.cta}
                </button>
                {user ? (
                  <button className="btn btn-outline" style={{ padding: '13px 30px', fontSize: '11px' }} onClick={() => onNavigate('dashboard')}>
                    Mis Citas
                  </button>
                ) : (
                  <button className="btn btn-outline" style={{ padding: '13px 30px', fontSize: '11px' }} onClick={() => onNavigate('signup')}>
                    Reservar Cita
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Decorative side — abstract barbershop visual */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh', maxHeight: 640 }}>
            {/* Warm glow */}
            <div style={{
              position: 'absolute', inset: 0,
              background: `radial-gradient(ellipse at 50% 60%, ${current.accent}18 0%, transparent 65%)`,
              pointerEvents: 'none',
            }} />
            {/* Large decorative typographic word */}
            <div style={{
              position: 'relative',
              zIndex: 1,
              textAlign: 'center',
              userSelect: 'none',
            }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(80px, 14vw, 220px)',
                fontWeight: 900,
                lineHeight: 0.85,
                color: 'transparent',
                WebkitTextStroke: `1px ${current.accent}30`,
                letterSpacing: '-0.02em',
                pointerEvents: 'none',
              }}>
                FER<br/>NAN<br/>DO
              </div>
              {/* Accent lines */}
              <div style={{ width: 60, height: 1, background: current.accent, margin: '24px auto 0', opacity: 0.5 }} />
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.4em', textTransform: 'uppercase', color: current.accent, opacity: 0.6, marginTop: 14 }}>
                Est. 2015
              </div>
            </div>
          </div>
        </div>

        {/* Slide dots */}
        <div style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 10 }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} style={{
              width: i === slide ? 28 : 8,
              height: 8,
              borderRadius: 4,
              background: i === slide ? current.accent : 'rgba(255,255,255,0.2)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s',
              padding: 0,
            }} />
          ))}
        </div>


      </div>

      {/* ─── SERVICES STRIP ─── */}
      <div style={{ background: 'var(--surface)', borderTop: '1px solid var(--border-gold)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
          {services.map((s, i) => (
            <button key={i} onClick={() => onNavigate(s.page)} style={{
              background: 'none',
              border: 'none',
              borderRight: i < 3 ? '1px solid var(--border)' : 'none',
              padding: '28px 24px',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
            >
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>{s.title}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>{s.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* ─── ABOUT TEASER ─── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          {/* Glow behind photo */}
          <div style={{
            position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
            width: '80%', height: '60%',
            background: 'radial-gradient(ellipse, rgba(200,160,80,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <img
            src="fernando-barber.png"
            alt="Fernando"
            style={{
              width: '100%',
              maxWidth: 420,
              height: 'auto',
              objectFit: 'contain',
              objectPosition: 'bottom center',
              filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.6))',
              position: 'relative',
              zIndex: 1,
            }}
          />
          <div style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            background: 'var(--surface)',
            border: '1px solid var(--border-gold)',
            borderRadius: 8,
            padding: '16px 20px',
            minWidth: 140,
            zIndex: 2,
          }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 900, color: 'var(--gold)', lineHeight: 1 }}>10+</div>
            <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: 4 }}>Años de Oficio</div>
          </div>
        </div>
        <div>
          <span className="section-label">El Hombre Detrás de la Silla</span>
          <h2 className="section-title">Donde la <em>Tradición</em> Se Encuentra con el Estilo Moderno</h2>
          <div className="ornament" style={{ justifyContent: 'flex-start', margin: '24px 0' }}>
            <span style={{ fontSize: 14 }}>✦</span>
          </div>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: 20 }}>
            Fernando creció viendo a su abuelo trabajar en la barbería del barrio — tres sillas, un poste de colores y más historias que cortes. Hoy, esa misma esencia vive con un giro moderno.
          </p>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: 36 }}>
            Desde fades de precisión hasta tatuajes, cada servicio es una expresión de oficio — sin prisa, personal y hecho para durar.
          </p>
          <button className="btn btn-gold" onClick={() => onNavigate('about')}>Ver Historia →</button>
        </div>
      </div>

      {/* ─── TESTIMONIALS ─── */}
      <div style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '72px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="section-header" style={{ marginBottom: 40 }}>
            <span className="section-label">Palabras de Clientes</span>
            <h2 className="section-title">Lo que <em>Dicen</em></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ padding: '24px 20px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: 8 }}>
                <div style={{ display: 'flex', gap: 2, marginBottom: 14 }}>
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j} style={{ color: 'var(--gold)', fontSize: 12 }}>★</span>
                  ))}
                </div>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 16, fontStyle: 'italic' }}>
                  "{t.text}"
                </p>
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: 14 }}>
                  <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text)' }}>{t.name}</div>
                  <div style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginTop: 2 }}>{t.service}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── CTA BANNER ─── */}
      <div style={{
        background: 'linear-gradient(135deg, var(--dark-brown), var(--mid-brown))',
        borderTop: '1px solid var(--border-gold)',
        padding: '80px 40px',
        textAlign: 'center',
      }}>
        <span className="section-label">¿Listo?</span>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 700, color: 'var(--text)', marginBottom: 20 }}>
          Reserva tu Próxima <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Sesión</em>
        </h2>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: 17, color: 'var(--text-muted)', marginBottom: 36 }}>
          Crea tu cuenta para agendar citas, seguir tu historial de cortes y ganar puntos de fidelidad.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          {user ? (
            <button className="btn btn-gold" style={{ padding: '14px 40px' }} onClick={() => onNavigate('dashboard')}>
              Ir a Mi Panel
            </button>
          ) : (
            <>
              <button className="btn btn-gold" style={{ padding: '14px 40px' }} onClick={() => onNavigate('signup')}>
                Crear Cuenta
              </button>
              <button className="btn btn-outline" style={{ padding: '14px 40px' }} onClick={() => onNavigate('contact')}>
                Contáctanos
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { HomePage });
