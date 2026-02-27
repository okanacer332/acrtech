import { useTranslation } from 'react-i18next';
import Button from '../../components/ui/Button.jsx';
import './Hero.css';

const Hero = () => {
    const { t } = useTranslation();

    return (
        <section className="hero" id="home" aria-labelledby="hero-title">
            <div className="hero__bg" aria-hidden="true">
                <div className="hero__bg-grid" />
                <div className="hero__bg-glow hero__bg-glow--1" />
                <div className="hero__bg-glow hero__bg-glow--2" />
            </div>

            <div className="container hero__container">
                <div className="hero__content">
                    {/* Label */}
                    <div className="hero__label" aria-label="Agency label">
                        <span className="hero__label-dot" aria-hidden="true" />
                        ACRTECH SOLUTIONS
                    </div>

                    {/* Headline */}
                    <h1 id="hero-title" className="hero__title">
                        <span className="hero__title-line">Future-Proof</span>
                        <span className="hero__title-line hero__title-line--accent">Software</span>
                    </h1>

                    {/* Subtext */}
                    <p className="hero__subtitle">{t('hero.subtitle')}</p>

                    {/* CTAs */}
                    <div className="hero__ctas">
                        <Button variant="primary" size="lg" href="#contact">{t('hero.ctaPrimary')}</Button>
                        <a href="#projects" className="hero__cta-explore">
                            {t('hero.ctaSecondary', 'Ürünlerimizi Keşfedin')}
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Right column — animated illustration */}
                <div className="hero__aside">
                    <div className="hero__flow">
                        {/* Step 1 — Design */}
                        <div className="hero__flow-step hero__flow-step--1">
                            <div className="hero__flow-circle">
                                <span className="hero__flow-number">1</span>
                                <svg className="hero__flow-ring" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="46" />
                                </svg>
                            </div>
                            <div className="hero__flow-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                                </svg>
                            </div>
                            <span className="hero__flow-label">Design</span>
                        </div>

                        {/* Connector 1→2 */}
                        <div className="hero__flow-connector hero__flow-connector--1">
                            <svg viewBox="0 0 80 4" preserveAspectRatio="none">
                                <line x1="0" y1="2" x2="80" y2="2" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
                            </svg>
                        </div>

                        {/* Step 2 — Code */}
                        <div className="hero__flow-step hero__flow-step--2">
                            <div className="hero__flow-circle">
                                <span className="hero__flow-number">2</span>
                                <svg className="hero__flow-ring" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="46" />
                                </svg>
                            </div>
                            <div className="hero__flow-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                                </svg>
                            </div>
                            <span className="hero__flow-label">Code</span>
                        </div>

                        {/* Connector 2→3 */}
                        <div className="hero__flow-connector hero__flow-connector--2">
                            <svg viewBox="0 0 80 4" preserveAspectRatio="none">
                                <line x1="0" y1="2" x2="80" y2="2" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
                            </svg>
                        </div>

                        {/* Step 3 — Growth */}
                        <div className="hero__flow-step hero__flow-step--3">
                            <div className="hero__flow-circle">
                                <span className="hero__flow-number">3</span>
                                <svg className="hero__flow-ring" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="46" />
                                </svg>
                            </div>
                            <div className="hero__flow-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                                </svg>
                            </div>
                            <span className="hero__flow-label">Growth</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom marquee */}
            <div className="hero__marquee" aria-hidden="true">
                <div className="hero__marquee-track">
                    {['Web Applications', 'Mobile Apps', 'Desktop Software', 'AI & Automation', 'UI/UX Design', 'Cloud & DevOps',
                        'Web Applications', 'Mobile Apps', 'Desktop Software', 'AI & Automation', 'UI/UX Design', 'Cloud & DevOps'].map((item, i) => (
                            <span key={i} className="hero__marquee-item">
                                <span className="hero__marquee-dot" aria-hidden="true" />
                                {item}
                            </span>
                        ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;
