import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import i18n from '../../i18n/index.js';
import Button from '../ui/Button.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';
import { IconSun, IconMoon, IconGlobe } from '../ui/Icons.jsx';
import './Header.css';

const LANGUAGES = [
    { code: 'tr', label: 'TR', name: 'Türkçe' },
    { code: 'en', label: 'EN', name: 'English' },
    { code: 'ar', label: 'AR', name: 'العربية' },
    { code: 'ru', label: 'RU', name: 'Русский' },
    { code: 'de', label: 'DE', name: 'Deutsch' },
];

const NAV_LINKS = [
    { key: 'services', id: 'services' },
    { key: 'projects', path: '/projects' },
    { key: 'blog', path: '/blog' },
    { key: 'contact', id: 'contact' },
];

const Header = () => {
    const { t } = useTranslation();
    const { theme, toggleTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const langRef = useRef(null);
    const currentLang = i18n.language?.split('-')[0] || 'tr';
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
    }, [mobileOpen]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (langRef.current && !langRef.current.contains(e.target)) {
                setLangOpen(false);
            }
        };
        if (langOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [langOpen]);

    const changeLanguage = (code) => {
        i18n.changeLanguage(code);
        setLangOpen(false);
        setMobileOpen(false);
    };

    const scrollTo = (id) => {
        setMobileOpen(false);
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
            return;
        }
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <header className={`header ${scrolled ? 'header--scrolled' : ''}`} role="banner">
            <div className="container header__inner">
                {/* Logo */}
                <Link to="/" className="header__logo" aria-label="ACRTECH Ana Sayfa">
                    <img src={theme === 'dark' ? "/acrtech-logo-dark.png" : "/acrtech-logo.png"} alt="ACRTECH" className="header__logo-img" />
                </Link>

                {/* Desktop Nav */}
                <nav className="header__nav" aria-label="Ana navigasyon">
                    {NAV_LINKS.map(({ key, id, href, path }) =>
                        href ? (
                            <a key={key} className="header__nav-link" href={href} target="_blank" rel="noopener noreferrer">
                                {t(`nav.${key}`)}
                            </a>
                        ) : path ? (
                            <Link key={key} to={path} className="header__nav-link">
                                {t(`nav.${key}`)}
                            </Link>
                        ) : (
                            <button key={key} className="header__nav-link" onClick={() => scrollTo(id)}>
                                {t(`nav.${key}`)}
                            </button>
                        )
                    )}
                </nav>

                {/* Right Actions */}
                <div className="header__actions">
                    {/* Theme Toggle */}
                    <button
                        className="theme-toggle"
                        onClick={toggleTheme}
                        aria-label={theme === 'light' ? 'Karanlık temaya geç' : 'Aydınlık temaya geç'}
                        title={theme === 'light' ? 'Dark mode' : 'Light mode'}
                    >
                        {theme === 'light' ? <IconMoon size={18} /> : <IconSun size={18} />}
                    </button>

                    {/* Language Switcher — click based, closes on outside click */}
                    <div className="lang-switcher" ref={langRef}>
                        <button
                            className="lang-switcher__trigger"
                            onClick={() => setLangOpen((prev) => !prev)}
                            aria-expanded={langOpen}
                            aria-haspopup="listbox"
                            aria-label="Dil değiştir"
                            id="lang-trigger"
                        >
                            <IconGlobe size={14} />
                            <span className="lang-switcher__code">{currentLang.toUpperCase()}</span>
                            <span className={`lang-switcher__chevron ${langOpen ? 'open' : ''}`} aria-hidden="true">▾</span>
                        </button>
                        {langOpen && (
                            <div
                                className="lang-switcher__dropdown"
                                role="listbox"
                                aria-labelledby="lang-trigger"
                            >
                                {LANGUAGES.map((lang) => (
                                    <button
                                        key={lang.code}
                                        className={`lang-switcher__option ${lang.code === currentLang ? 'active' : ''}`}
                                        onClick={() => changeLanguage(lang.code)}
                                        role="option"
                                        aria-selected={lang.code === currentLang}
                                    >
                                        <span className="lang-switcher__option-code">{lang.label}</span>
                                        <span className="lang-switcher__option-name">{lang.name}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <Button variant="primary" size="sm" onClick={() => scrollTo('contact')}>
                        {t('nav.getQuote')}
                    </Button>

                    {/* Mobile Hamburger */}
                    <button
                        className={`hamburger ${mobileOpen ? 'hamburger--open' : ''}`}
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Menüyü aç/kapat"
                        aria-expanded={mobileOpen}
                    >
                        <span /><span /><span />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Mobil menü">
                    <div className="mobile-menu__overlay" onClick={() => setMobileOpen(false)} />
                    <nav className="mobile-menu__content">
                        {NAV_LINKS.map(({ key, id, href, path }) =>
                            href ? (
                                <a key={key} className="mobile-menu__link" href={href} target="_blank" rel="noopener noreferrer">
                                    {t(`nav.${key}`)}
                                </a>
                            ) : path ? (
                                <Link key={key} to={path} className="mobile-menu__link" onClick={() => setMobileOpen(false)}>
                                    {t(`nav.${key}`)}
                                </Link>
                            ) : (
                                <button key={key} className="mobile-menu__link" onClick={() => scrollTo(id)}>
                                    {t(`nav.${key}`)}
                                </button>
                            )
                        )}
                        <div className="mobile-menu__languages">
                            {LANGUAGES.map((lang) => (
                                <button
                                    key={lang.code}
                                    className={`mobile-menu__lang ${lang.code === currentLang ? 'active' : ''}`}
                                    onClick={() => changeLanguage(lang.code)}
                                >
                                    {lang.label}
                                </button>
                            ))}
                        </div>
                        <Button variant="primary" size="md" fullWidth onClick={() => scrollTo('contact')}>
                            {t('nav.getQuote')}
                        </Button>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
