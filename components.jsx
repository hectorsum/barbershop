import React from 'react'

// ============================================
// SHARED COMPONENTS — Fernando Barber & Tattoo
// ============================================

// ─── LOGO SVG ───
const LogoIcon = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="18" r="17" stroke="#C9A84C" strokeWidth="1.2" />
    {/* Scissors */}
    <line x1="10" y1="10" x2="20" y2="22" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="14" y1="10" x2="20" y2="18" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="10" cy="10" r="2.2" stroke="#C9A84C" strokeWidth="1.2" fill="none"/>
    <circle cx="14" cy="10" r="2.2" stroke="#C9A84C" strokeWidth="1.2" fill="none"/>
    {/* Tattoo needle */}
    <line x1="22" y1="14" x2="26" y2="26" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
    <polygon points="26,26 24,28 28,28" fill="#C9A84C"/>
    <line x1="22" y1="14" x2="25" y2="11" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

// ─── NAV COMPONENT ───
const Nav = ({ currentPage = 'home', user = null, onNavigate, onSignOut }) => {
  const [scrolled, setScrolled] = React.useState(false);
  const [trabajosOpen, setTrabajosOpen] = React.useState(false);
  const trabajosRef = React.useRef(null);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown on outside click
  React.useEffect(() => {
    const handler = (e) => {
      if (trabajosRef.current && !trabajosRef.current.contains(e.target)) {
        setTrabajosOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const links = [
    { id: 'home', label: 'Inicio' },
    { id: 'about', label: 'Sobre Mí' },
    { id: 'trabajos', label: 'Trabajos', dropdown: [
      { id: 'haircuts', label: 'Cortes' },
      { id: 'tattoos', label: 'Tatuajes' },
    ]},
    { id: 'contact', label: 'Contacto' },
  ];

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <a className="nav-logo" href="#" onClick={e => { e.preventDefault(); onNavigate('home'); }}>
        <LogoIcon size={36} />
        <div className="nav-logo-text">
          <span className="name">Fernando</span>
          <span className="tagline">Barber &amp; Tattoo</span>
        </div>
      </a>

      <ul className="nav-links">
        {links.map(l => l.dropdown ? (
          <li key={l.id} ref={trabajosRef} style={{ position: 'relative' }}>
            <a
              href="#"
              className={['haircuts','tattoos'].includes(currentPage) ? 'active' : ''}
              style={{ display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap' }}
              onClick={e => { e.preventDefault(); setTrabajosOpen(o => !o); }}
            >
              {l.label}
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ transition: 'transform 0.2s', transform: trabajosOpen ? 'rotate(180deg)' : 'none' }}>
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            {trabajosOpen && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 12px)',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'var(--espresso)',
                border: '1px solid var(--border-gold)',
                borderRadius: 8,
                padding: '6px',
                minWidth: 130,
                zIndex: 1000,
                boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
              }}>
                {l.dropdown.map(sub => (
                  <a
                    key={sub.id}
                    href="#"
                    onClick={e => { e.preventDefault(); setTrabajosOpen(false); onNavigate(sub.id); }}
                    style={{
                      display: 'block',
                      padding: '10px 16px',
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: currentPage === sub.id ? 'var(--gold)' : 'var(--text-muted)',
                      textDecoration: 'none',
                      transition: 'all 0.15s',
                      background: currentPage === sub.id ? 'rgba(200,160,80,0.1)' : 'transparent',
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.background = 'rgba(200,160,80,0.08)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = currentPage === sub.id ? 'var(--gold)' : 'var(--text-muted)'; e.currentTarget.style.background = currentPage === sub.id ? 'rgba(200,160,80,0.1)' : 'transparent'; }}
                  >
                    {sub.label}
                  </a>
                ))}
              </div>
            )}
          </li>
        ) : (
          <li key={l.id}>
            <a
              href="#"
              className={currentPage === l.id ? 'active' : ''}
              onClick={e => { e.preventDefault(); onNavigate(l.id); }}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="nav-actions">
        {user ? (
          <>
            <button
              className="btn btn-outline"
              style={{ fontSize: '11px', padding: '8px 16px' }}
              onClick={() => onNavigate('dashboard')}
            >
              {user.name}
            </button>
            <button className="btn btn-dark" style={{ fontSize: '11px', padding: '8px 16px' }} onClick={onSignOut}>
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <button className="btn btn-outline" style={{ fontSize: '11px', padding: '8px 16px' }} onClick={() => onNavigate('signin')}>
              Iniciar Sesión
            </button>
            <button className="btn btn-gold" style={{ fontSize: '11px', padding: '8px 16px' }} onClick={() => onNavigate('signup')}>
              Únete
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

// ─── FOOTER ───
const Footer = ({ onNavigate }) => (
  <footer className="footer">
    <div className="footer-inner">
      <div className="footer-brand">
        <div className="name">Fernando</div>
        <p>Barbería premium y tatuajes personalizados en el corazón de la ciudad. Se aceptan sin cita, con reserva preferida.</p>
        <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
          {['IG', 'FB', 'TT'].map(s => (
            <a key={s} href="#" style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid var(--border-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', textDecoration: 'none', transition: 'all 0.2s' }}
               onMouseEnter={e => { e.target.style.color = 'var(--gold)'; e.target.style.borderColor = 'var(--gold)'; }}
               onMouseLeave={e => { e.target.style.color = 'var(--text-muted)'; e.target.style.borderColor = 'var(--border-gold)'; }}>
              {s}
            </a>
          ))}
        </div>
      </div>
      <div className="footer-col">
        <h4>Navegar</h4>
        <ul>
          {[['Inicio','home'],['Sobre Mí','about'],['Cortes','haircuts'],['Tatuajes','tattoos'],['Contacto','contact']].map(([label, id]) => (
            <li key={id}><a href="#" onClick={e => { e.preventDefault(); onNavigate(id); }}>{label}</a></li>
          ))}
        </ul>
      </div>
      <div className="footer-col">
        <h4>Servicios</h4>
        <ul>
          <li><a href="#">Cortes Clásicos</a></li>
          <li><a href="#">Fades &amp; Tapers</a></li>
          <li><a href="#">Arreglo de Barba</a></li>
          <li><a href="#">Tatuajes Personalizados</a></li>
          <li><a href="#">Retoques</a></li>
        </ul>
      </div>
      <div className="footer-col">
        <h4>Horario</h4>
        <ul>
          <li><a href="#">Lun–Vie: 9am–8pm</a></li>
          <li><a href="#">Sábado: 8am–6pm</a></li>
          <li><a href="#">Domingo: 10am–4pm</a></li>
          <li><a href="#" style={{ marginTop: 8, display: 'block' }}>📍 123 Calle Principal</a></li>
        </ul>
      </div>
    </div>
    <div className="footer-bottom">
      <span>© 2026 Fernando Barber &amp; Tattoo. Todos los derechos reservados.</span>
      <span>Hecho con dedicación.</span>
    </div>
  </footer>
);

// ─── ORNAMENT ───
const Ornament = ({ children = '✦' }) => (
  <div className="ornament">{children}</div>
);

// ─── IMAGE PLACEHOLDER ───
const ImgPlaceholder = ({ label, width = '100%', height = 280, style = {} }) => (
  <div className="img-placeholder" style={{ width, height, ...style }}>
    <span style={{ position: 'relative', zIndex: 1, opacity: 0.5, fontSize: 13 }}>{label}</span>
  </div>
);

// Export to window for cross-script access
Object.assign(window, { Nav, Footer, Ornament, ImgPlaceholder, LogoIcon });
