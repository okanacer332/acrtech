import { useTranslation } from 'react-i18next';
import Button from '../../components/ui/Button.jsx';
import { IconCheck } from '../../components/ui/Icons.jsx';
import './Process.css';

const PLANS = [
    {
        key: 'starter',
        nameKey: 'pricing.starter.name',
        name: 'Starter',
        price: '$999',
        period: '/project',
        descKey: 'pricing.starter.desc',
        desc: 'Perfect for small businesses and startups getting digital.',
        features: ['pricing.starter.f1', 'pricing.starter.f2', 'pricing.starter.f3', 'pricing.starter.f4', 'pricing.starter.f5'],
        defaultFeatures: ['Up to 5 pages / screens', 'Responsive design', 'Basic SEO setup', '1 month support', 'Source code delivery'],
        cta: 'pricing.starter.cta',
        defaultCta: 'Get Started',
        highlight: false,
    },
    {
        key: 'growth',
        nameKey: 'pricing.growth.name',
        name: 'Growth',
        price: '$1,799',
        period: '/month',
        descKey: 'pricing.growth.desc',
        desc: 'For teams that need custom software and integrations.',
        features: ['pricing.growth.f1', 'pricing.growth.f2', 'pricing.growth.f3', 'pricing.growth.f4', 'pricing.growth.f5', 'pricing.growth.f6'],
        defaultFeatures: ['Unlimited pages / screens', 'Full-stack development', 'API integrations', '3 months support', 'CI/CD pipeline setup', 'Performance optimization'],
        cta: 'pricing.growth.cta',
        defaultCta: 'Get Started',
        highlight: true,
    },
    {
        key: 'enterprise',
        nameKey: 'pricing.enterprise.name',
        name: 'Enterprise',
        price: 'Custom',
        period: '/project',
        descKey: 'pricing.enterprise.desc',
        desc: 'Dedicated team, complex architectures, long-term partnership.',
        features: ['pricing.enterprise.f1', 'pricing.enterprise.f2', 'pricing.enterprise.f3', 'pricing.enterprise.f4', 'pricing.enterprise.f5', 'pricing.enterprise.f6'],
        defaultFeatures: ['Everything in Growth', 'Dedicated dev team', 'SLA guarantee', '12 months support', 'AI/ML features', 'Custom infrastructure'],
        cta: 'pricing.enterprise.cta',
        defaultCta: 'Contact Us',
        highlight: false,
    },
];

const Process = () => {
    const { t } = useTranslation();

    return (
        <section className="pricing section" id="pricing" aria-labelledby="pricing-title">
            <div className="container">
                <div className="section-header">
                    <span className="section-badge">{t('process.badge')}</span>
                    <h2 id="pricing-title" className="section-title">
                        {t('process.title')}{' '}
                        <span className="text-primary">{t('process.titleAccent')}</span>
                    </h2>
                    <p className="section-subtitle">
                        {t('pricing.subtitle', 'Transparent pricing. No hidden fees. Scale as you grow.')}
                    </p>
                </div>

                <div className="pricing__grid">
                    {PLANS.map((plan, planIdx) => (
                        <article
                            key={plan.key}
                            className={`pricing-card${plan.highlight ? ' pricing-card--highlight' : ''}`}
                        >
                            {plan.highlight && (
                                <div className="pricing-card__badge" aria-label="Most popular plan">
                                    {t('pricing.mostPopular', 'Most Popular')}
                                </div>
                            )}

                            <div className="pricing-card__header">
                                <div className="pricing-card__name">{t(plan.nameKey, plan.name)}</div>
                                <div className="pricing-card__price">
                                    <span className="pricing-card__amount">{plan.price}</span>
                                    <span className="pricing-card__period">{plan.period}</span>
                                </div>
                                <p className="pricing-card__desc">{t(plan.descKey, plan.desc)}</p>
                            </div>

                            <ul className="pricing-card__features" role="list">
                                {plan.features.map((fKey, i) => (
                                    <li key={fKey} className="pricing-card__feature">
                                        <span className="pricing-card__check" aria-hidden="true">
                                            <IconCheck size={10} />
                                        </span>
                                        {t(fKey, plan.defaultFeatures[i])}
                                    </li>
                                ))}
                            </ul>

                            <Button
                                variant="secondary"
                                size="md"
                                href="#contact"
                                fullWidth
                                style={plan.highlight ? { background: '#fff', color: 'var(--color-primary)', borderColor: '#fff' } : undefined}
                            >
                                {t(plan.cta, plan.defaultCta)}
                            </Button>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Process;
