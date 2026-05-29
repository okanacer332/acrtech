import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import i18n from '../../i18n/index.js';
import Button from '../ui/Button.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';
import { IconSun, IconMoon, IconGlobe } from '../ui/Icons.jsx';
import './Header.css';

const LANGUAGES = [
    { code: 'tr', flag: '🇹🇷', flagSrc: '/flags/tr.svg', name: 'Türkçe' },
    { code: 'en', flag: '🇬🇧', flagSrc: '/flags/gb.svg', name: 'English' },
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
    const currentLang = i18n.language?.startsWith('en') ? 'en' : 'tr';
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

    const changeLanguage = (code) => {
        i18n.changeLanguage(code);
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
                <Link to="/" className="header__logo" aria-label={t('accessibility.home')}>
                    <img src="/acrtech-mark.svg" alt="ACRTECH" className="header__logo-img" />
                </Link>

                {/* Desktop Nav */}
                <nav className="header__nav" aria-label={t('accessibility.mainNav')}>
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
                        aria-label={theme === 'light' ? t('theme.dark') : t('theme.light')}
                        title={theme === 'light' ? t('theme.dark') : t('theme.light')}
                    >
                        {theme === 'light' ? <IconMoon size={18} /> : <IconSun size={18} />}
                    </button>

                    <div className="lang-switcher">
                        <IconGlobe size={14} />
                        <img
                            className="lang-switcher__flag"
                            src={LANGUAGES.find((lang) => lang.code === currentLang)?.flagSrc}
                            alt=""
                            aria-hidden="true"
                        />
                        <select
                            className="lang-switcher__select"
                            value={currentLang}
                            onChange={(event) => changeLanguage(event.target.value)}
                            aria-label={t('languageSelect.label')}
                        >
                            {LANGUAGES.map((lang) => (
                                <option key={lang.code} value={lang.code}>
                                    {lang.flag} {lang.name}
                                </option>
                            ))}
                        </select>
                        <span className="lang-switcher__chevron" aria-hidden="true">▾</span>
                    </div>

                    <Button variant="primary" size="sm" onClick={() => scrollTo('contact')}>
                        {t('nav.getQuote')}
                    </Button>

                    {/* Mobile Hamburger */}
                    <button
                        className={`hamburger ${mobileOpen ? 'hamburger--open' : ''}`}
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label={t('accessibility.menuToggle')}
                        aria-expanded={mobileOpen}
                    >
                        <span /><span /><span />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="mobile-menu" role="dialog" aria-modal="true" aria-label={t('accessibility.mobileMenu')}>
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
                                    {lang.flag} {lang.name}
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
