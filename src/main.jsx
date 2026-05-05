import React from 'react'
import ReactDOM from 'react-dom/client'

// Make React globally available for JSX files
window.React = React
window.ReactDOM = ReactDOM

import '../shared.css'
import '../components.jsx'
import '../page-home.jsx'
import '../page-about.jsx'
import '../page-haircuts.jsx'
import '../page-tattoos.jsx'
import '../page-contact.jsx'
import '../page-auth.jsx'
import '../page-dashboard.jsx'
import '../tweaks-panel.jsx'

const TWEAK_DEFAULTS = {
  "accentColor": "#d3b050",
  "fontStyle": "classic",
  "darkMode": true,
  "showSocialFeed": true
};

const App = () => {
  const [page, setPage] = React.useState(() => {
    return localStorage.getItem('fb_page') || 'home';
  });
  const [user, setUser] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('fb_user')); } catch { return null; }
  });
  const [tweaks, setTweaksState] = React.useState(TWEAK_DEFAULTS);
  const [showTweaks, setShowTweaks] = React.useState(false);
  const [pageKey, setPageKey] = React.useState(0);

  const navigate = (p) => {
    window.scrollTo({ top: 0 });
    setPage(p);
    setPageKey(k => k + 1);
    localStorage.setItem('fb_page', p);
  };

  const handleAuthSuccess = (u) => {
    setUser(u);
    localStorage.setItem('fb_user', JSON.stringify(u));
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('fb_user');
    navigate('home');
  };

  const setTweak = (key, val) => {
    setTweaksState(t => {
      const next = typeof key === 'object' ? { ...t, ...key } : { ...t, [key]: val };
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: next }, '*');
      return next;
    });
  };

  // Tweaks panel messaging
  React.useEffect(() => {
    const handler = (e) => {
      if (e.data?.type === '__activate_edit_mode') setShowTweaks(true);
      if (e.data?.type === '__deactivate_edit_mode') setShowTweaks(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  // Apply accent color CSS var
  React.useEffect(() => {
    document.documentElement.style.setProperty('--gold', tweaks.accentColor);
  }, [tweaks.accentColor]);

  // Render page
  const renderPage = () => {
    const props = { onNavigate: navigate, user, onSignOut: handleSignOut };
    switch (page) {
      case 'home':      return <HomePage {...props} />;
      case 'about':     return <AboutPage {...props} />;
      case 'haircuts':  return <HaircutsPage {...props} />;
      case 'tattoos':   return <TattoosPage {...props} />;
      case 'contact':   return <ContactPage {...props} />;
      case 'signin':    return <AuthPage mode="signin" {...props} onAuthSuccess={handleAuthSuccess} />;
      case 'signup':    return <AuthPage mode="signup" {...props} onAuthSuccess={handleAuthSuccess} />;
      case 'dashboard': return user
        ? <DashboardPage {...props} />
        : <AuthPage mode="signin" {...props} onAuthSuccess={handleAuthSuccess} />;
      default:          return <HomePage {...props} />;
    }
  };

  return (
    <>
      {/* Nav — only show on non-auth pages */}
      {page !== 'signin' && page !== 'signup' && (
        <Nav
          currentPage={page}
          user={user}
          onNavigate={navigate}
          onSignOut={handleSignOut}
        />
      )}

      {/* Page content */}
      <main key={pageKey} className="page-enter">
        {renderPage()}
      </main>

      {/* Footer — not on auth or dashboard */}
      {!['signin', 'signup', 'dashboard'].includes(page) && (
        <Footer onNavigate={navigate} />
      )}

      {/* ─── TWEAKS PANEL ─── */}
      {showTweaks && (
        <TweaksPanel onClose={() => {
          setShowTweaks(false);
          window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*');
        }}>
          <TweakSection title="Color de Marca">
            <TweakColor
              label="Dorado Acento"
              value={tweaks.accentColor}
              onChange={v => setTweak('accentColor', v)}
            />
          </TweakSection>

          <TweakSection title="Tipografía">
            <TweakRadio
              label="Estilo de Títulos"
              value={tweaks.fontStyle}
              options={[
                { value: 'classic', label: 'Clásico' },
                { value: 'modern', label: 'Moderno' },
              ]}
              onChange={v => {
                setTweak('fontStyle', v);
                document.documentElement.style.setProperty(
                  '--font-display',
                  v === 'modern' ? "'DM Sans', sans-serif" : "'Playfair Display', Georgia, serif"
                );
              }}
            />
          </TweakSection>

          <TweakSection title="Funciones">
            <TweakToggle
              label="Mostrar Redes Sociales"
              value={tweaks.showSocialFeed}
              onChange={v => setTweak('showSocialFeed', v)}
            />
          </TweakSection>

          <TweakSection title="Navegación">
            <TweakButton label="→ Inicio" onClick={() => navigate('home')} />
            <TweakButton label="→ Sobre Mí" onClick={() => navigate('about')} />
            <TweakButton label="→ Cortes" onClick={() => navigate('haircuts')} />
            <TweakButton label="→ Tatuajes" onClick={() => navigate('tattoos')} />
            <TweakButton label="→ Iniciar Sesión" onClick={() => navigate('signin')} />
            <TweakButton label="→ Panel (demo)" onClick={() => {
              handleAuthSuccess({ name: 'Marcus Thompson', username: 'marcus_t', email: 'marcus@email.com', joinDate: 'Ene 2024', points: 340, tier: 'Plata' });
              navigate('dashboard');
            }} />
          </TweakSection>
        </TweaksPanel>
      )}
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
