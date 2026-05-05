import React from 'react'

// ============================================
// CONTACT PAGE — Fernando Barber & Tattoo
// ============================================

const ContactPage = ({ onNavigate, user }) => {
  const [step, setStep] = React.useState(1); // 1: tipo, 2: detalles, 3: confirmado
  const [serviceType, setServiceType] = React.useState(''); // 'haircut' | 'tattoo'
  const [form, setForm] = React.useState({
    service: '',
    date: '',
    time: '',
    notes: '',
    // tattoo extra
    style: '',
    size: '',
    placement: '',
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const haircutServices = [
    'Skin Fade', 'Mid Fade', 'High Fade', 'Corte con Tijera', 'Taper Cut',
    'Crop Texturizado', 'Corte + Barba', 'Solo Barba', 'Corte Infantil',
  ];

  const tattooStyles = ['Trazo Fino', 'Tradicional', 'Blackwork', 'Realismo', 'Geométrico'];
  const tattooSizes = ['Pequeño (< 5cm)', 'Mediano (5–10cm)', 'Grande (10–20cm)', 'Extra Grande (> 20cm)'];

  const timeSlots = ['9:00 AM','10:00 AM','11:00 AM','12:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      // Save intent and redirect to signup
      localStorage.setItem('fb_booking_intent', JSON.stringify({ serviceType, form }));
      onNavigate('signup');
      return;
    }
    setStep(3);
  };

  const socialLinks = [
    { label: 'Instagram', handle: '@fernando.cuts', url: '#', color: '#E1306C',
      logo: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="20" height="20" rx="5" stroke="#E1306C" strokeWidth="2"/><circle cx="12" cy="12" r="4" stroke="#E1306C" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.2" fill="#E1306C"/></svg> },
    { label: 'TikTok', handle: '@fernandoink', url: '#', color: '#69C9D0',
      logo: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" stroke="#69C9D0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { label: 'Facebook', handle: 'Fernando Barber & Tattoo', url: '#', color: '#1877F2',
      logo: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="#1877F2" strokeWidth="2"/><path d="M15 8h-2a1 1 0 0 0-1 1v2h3l-.5 3H12v7" stroke="#1877F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
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
        {/* Background — calendar / appointment pattern */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.06, pointerEvents: 'none' }} viewBox="0 0 1200 300" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          {/* Calendar icons */}
          {[80,280,480,680,880,1080].map((x,i) => (
            <g key={i} transform={`translate(${x},${i%2===0?40:90})`}>
              <rect x="0" y="10" width="70" height="65" rx="6" stroke="#c9a84c" strokeWidth="2" fill="none"/>
              <line x1="0" y1="28" x2="70" y2="28" stroke="#c9a84c" strokeWidth="2"/>
              <rect x="15" y="0" width="8" height="20" rx="4" fill="#c9a84c"/>
              <rect x="47" y="0" width="8" height="20" rx="4" fill="#c9a84c"/>
              {/* Grid dots */}
              {[16,30,44,58].map((dx,j) => [42,55,68].map((dy,k) => (
                <circle key={`${j}-${k}`} cx={dx} cy={dy} r="3" fill="#c9a84c" opacity="0.6"/>
              )))}
            </g>
          ))}
          {/* Scissors accent */}
          <g transform="translate(580,130) scale(1.5)">
            <line x1="10" y1="10" x2="50" y2="70" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round"/>
            <line x1="28" y1="10" x2="50" y2="48" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="10" cy="10" r="8" stroke="#c9a84c" strokeWidth="2" fill="none"/>
            <circle cx="28" cy="10" r="8" stroke="#c9a84c" strokeWidth="2" fill="none"/>
          </g>
          <line x1="0" y1="240" x2="1200" y2="240" stroke="#c9a84c" strokeWidth="0.5" opacity="0.3"/>
        </svg>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <span className="section-label">Reservas</span>
          <h1 className="section-title" style={{ marginBottom: 16 }}>Agenda tu <em>Sesión</em></h1>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 18, color: 'var(--text-muted)', maxWidth: 480, margin: '0 auto' }}>
            Elige tu servicio, fecha y hora — Fernando te espera.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 40px', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80 }}>

        {/* ─── LEFT: Info ─── */}
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--text)', marginBottom: 32 }}>
            Visita la Barbería
          </h2>

          {[
            { icon: '📍', label: 'Dirección', value: 'Calle Principal 123, Local 4\nTu Ciudad, CP 00000' },
            { icon: '📞', label: 'Teléfono', value: '(555) 123-4567' },
            { icon: '✉️', label: 'Email', value: 'hola@fernandobarber.com' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 28 }}>
              <div style={{ width: 44, height: 44, borderRadius: 8, background: 'var(--surface)', border: '1px solid var(--border-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
                {item.icon}
              </div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{item.value}</div>
              </div>
            </div>
          ))}

          {/* Hours */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 8, marginBottom: 36 }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>Horario</div>
            {[
              ['Lun – Vie', '9:00 am – 8:00 pm'],
              ['Sábado', '8:00 am – 6:00 pm'],
              ['Domingo', '10:00 am – 4:00 pm'],
            ].map(([day, hours]) => (
              <div key={day} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 13 }}>
                <span style={{ color: 'var(--text-muted)' }}>{day}</span>
                <span style={{ color: 'var(--text)', fontWeight: 500 }}>{hours}</span>
              </div>
            ))}
          </div>

          {/* Social */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>Síguenos</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {socialLinks.map((s, i) => (
                <a key={i} href={s.url} style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
                  background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8,
                  textDecoration: 'none', transition: 'border-color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = s.color + '60'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  <div style={{ width: 28, height: 28, borderRadius: 6, background: s.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {s.logo}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)' }}>{s.label}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.handle}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ─── RIGHT: Booking Form ─── */}
        <div>

          {/* Step 3 — Confirmed */}
          {step === 3 && (
            <div style={{ textAlign: 'center', padding: '80px 40px', background: 'var(--surface)', border: '1px solid var(--border-gold)', borderRadius: 12 }}>
              <div style={{ fontSize: 48, marginBottom: 20, color: 'var(--gold)' }}>✦</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--gold)', marginBottom: 16 }}>¡Sesión Agendada!</h2>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 8 }}>
                <strong style={{ color: 'var(--text)' }}>{form.service || serviceType}</strong>
              </p>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 32 }}>
                {form.date && form.time ? `${form.date} · ${form.time}` : 'Te contactaremos para confirmar fecha y hora.'}
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn btn-gold" onClick={() => { setStep(1); setServiceType(''); setForm({ service:'',date:'',time:'',notes:'',style:'',size:'',placement:'' }); }}>
                  Nueva Reserva
                </button>
                <button className="btn btn-outline" onClick={() => onNavigate('dashboard')}>
                  Ver Mis Citas
                </button>
              </div>
            </div>
          )}

          {/* Step 1 — Choose service type */}
          {step === 1 && (
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '48px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>
                Agenda una Sesión
              </h2>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 36, lineHeight: 1.6 }}>
                ¿Qué tipo de servicio te interesa hoy?
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[
                  { id: 'haircut', icon: '✂', label: 'Corte & Grooming', desc: 'Fades, tapers, barba y más' },
                  { id: 'tattoo', icon: '◆', label: 'Tatuaje', desc: 'Consulta y sesión de tinta' },
                ].map(opt => (
                  <button key={opt.id} onClick={() => { setServiceType(opt.id); setStep(2); }} style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid var(--border-gold)',
                    borderRadius: 10,
                    padding: '32px 24px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(200,160,80,0.08)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.transform = 'none'; }}
                  >
                    <div style={{ fontSize: 32, color: 'var(--gold)', marginBottom: 12 }}>{opt.icon}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{opt.label}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 — Form details */}
          {step === 2 && (
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '48px' }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
                <button onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 18, padding: 0, lineHeight: 1 }}>←</button>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>
                    {serviceType === 'haircut' ? 'Reserva de Corte' : 'Reserva de Tatuaje'}
                  </h2>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                    {serviceType === 'haircut' ? 'Elige tu servicio, fecha y hora' : 'Cuéntanos sobre tu idea'}
                  </p>
                </div>
              </div>



              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                {serviceType === 'haircut' && (
                  <div>
                    <label style={{ display: 'block', fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>Servicio *</label>
                    <select className="input" value={form.service} onChange={e => set('service', e.target.value)} required>
                      <option value="">Selecciona un servicio…</option>
                      <option>Servicio completo (Corte + Barba)</option>
                      <option>Solo Barba</option>
                      <option>Solo Corte</option>
                    </select>
                  </div>
                )}

                {serviceType === 'tattoo' && (
                  <>
                    <div>
                      <label style={{ display: 'block', fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>Estilo *</label>
                      <select className="input" value={form.style} onChange={e => set('style', e.target.value)} required>
                        <option value="">Selecciona un estilo…</option>
                        {tattooStyles.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <div>
                        <label style={{ display: 'block', fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>Tamaño *</label>
                        <select className="input" value={form.size} onChange={e => set('size', e.target.value)} required>
                          <option value="">Tamaño…</option>
                          {tattooSizes.map(s => <option key={s}>{s}</option>)}
                        </select>
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>Zona del cuerpo</label>
                        <input className="input" placeholder="Ej: antebrazo, cuello…" value={form.placement} onChange={e => set('placement', e.target.value)} />
                      </div>
                    </div>
                  </>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>Fecha *</label>
                    <input className="input" type="date" value={form.date} onChange={e => set('date', e.target.value)} min={new Date().toISOString().split('T')[0]} required />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>Hora *</label>
                    <select className="input" value={form.time} onChange={e => set('time', e.target.value)} required>
                      <option value="">Selecciona hora…</option>
                      {timeSlots.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>
                    {serviceType === 'tattoo' ? 'Descripción de tu idea' : 'Notas adicionales'}
                  </label>
                  <textarea
                    className="input"
                    rows={4}
                    placeholder={serviceType === 'tattoo'
                      ? 'Describe tu idea, referencias, colores, estilo…'
                      : 'Alguna referencia o detalle adicional para Fernando…'}
                    value={form.notes}
                    onChange={e => set('notes', e.target.value)}
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <button type="submit" className="btn btn-gold" style={{ padding: '14px', fontSize: '12px' }}>
                  {user ? 'Confirmar Reserva' : 'Continuar para Reservar'}
                </button>
              </form>
            </div>
          )}

          {/* Map placeholder */}
          {step !== 3 && (
            <div style={{ marginTop: 20, borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border)' }}>
              <ImgPlaceholder label="Mapa — ubicación de la barbería" height={180} style={{ borderRadius: 0 }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { ContactPage });
