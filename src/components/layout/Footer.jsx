import { useTranslation } from 'react-i18next';
import './Footer.css';

const Footer = () => {
    const { t } = useTranslation();
    const year = 2025;

    return (
        <footer className="footer" role="contentinfo">
            <div className="container footer__inner">
                <p className="footer__made">
                    Made with{' '}
                    <span className="footer__heart" aria-label="sevgi">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                    </span>{' '}
                    by <a href="/" className="footer__brand-link">ACRTECH</a>
                </p>
                <p className="footer__copyright">© {year} ACRTECH. {t('footer.rights', 'Tüm hakları saklıdır.')}</p>
            </div>
        </footer>
    );
};

export default Footer;
