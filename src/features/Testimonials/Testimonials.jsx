import { useTranslation } from 'react-i18next';
import { IconStar } from '../../components/ui/Icons.jsx';
import './Testimonials.css';

const TESTIMONIALS = [
    {
        name: 'Ahmet Yılmaz',
        role: 'CEO, TechVentures TR',
        avatar: 'AY',
        quoteKey: 'testimonials.quote1',
        color: '#0B00CF',
    },
    {
        name: 'Sarah Mitchell',
        role: 'CTO, FinScope Ltd',
        avatar: 'SM',
        quoteKey: 'testimonials.quote2',
        color: '#300A6E',
    },
    {
        name: 'Elif Kaya',
        role: 'Founder, MediSoft',
        avatar: 'EK',
        quoteKey: 'testimonials.quote3',
        color: '#0B00CF',
    },
];

const Stars = () => (
    <div className="testi__stars" aria-label="5 star rating">
        {[...Array(5)].map((_, i) => (
            <span key={i} aria-hidden="true"><IconStar size={14} /></span>
        ))}
    </div>
);

const Testimonials = () => {
    const { t } = useTranslation();

    return (
        <section className="testimonials section" id="testimonials" aria-labelledby="testimonials-title">
            <div className="container">
                <div className="section-header">
                    <span className="section-badge">{t('testimonials.badge')}</span>
                    <h2 id="testimonials-title" className="section-title">
                        {t('testimonials.title')}{' '}
                        <span className="text-primary">{t('testimonials.titleAccent')}</span>
                    </h2>
                </div>

                <div className="testimonials__grid">
                    {TESTIMONIALS.map((item) => (
                        <article key={item.name} className="testi-card">
                            <div className="testi-card__top">
                                <Stars />
                                <div
                                    className="testi__avatar"
                                    style={{ background: item.color }}
                                    aria-hidden="true"
                                >
                                    {item.avatar}
                                </div>
                            </div>
                            <blockquote className="testi-card__quote">"{t(item.quoteKey, item.quoteKey)}"</blockquote>
                            <footer className="testi-card__footer">
                                <div className="testi__name">{item.name}</div>
                                <div className="testi__role">{item.role}</div>
                            </footer>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
