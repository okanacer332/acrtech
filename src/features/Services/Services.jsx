import { useTranslation } from 'react-i18next';
import Button from '../../components/ui/Button.jsx';
import './Services.css';

const SERVICE_CARDS = [
    {
        key: 'web',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
            </svg>
        ),
    },
    {
        key: 'mobile',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
        ),
    },
    {
        key: 'desktop',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="13" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
            </svg>
        ),
    },
    {
        key: 'ai',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
        ),
    },
];

const Services = () => {
    const { t } = useTranslation();

    return (
        <section className="services section" id="services" aria-labelledby="services-title">
            <div className="container services__container">
                {/* Left: text */}
                <div className="services__left">
                    <h2 id="services-title" className="services__title">
                        Yazılım<br />
                        <span className="text-gradient">Çözümlerimiz</span>
                    </h2>
                    <p className="services__desc">{t('services.subtitle')}</p>
                    <Button variant="primary" size="md" href="#contact">{t('hero.ctaPrimary')}</Button>
                </div>

                {/* Right: 2×2 dark cards */}
                <div className="services__grid">
                    {SERVICE_CARDS.map(({ key, icon }) => (
                        <article key={key} className="service-card">
                            <div className="service-card__icon" aria-hidden="true">{icon}</div>
                            <h3 className="service-card__title">{t(`services.items.${key}.title`)}</h3>
                            <p className="service-card__desc">{t(`services.items.${key}.description`)}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
