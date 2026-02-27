import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    IconReact, IconServer, IconDesktop, IconMobile,
    IconDatabase, IconCloud, IconBox, IconBrain, IconChevronLeft, IconChevronRight
} from '../../components/ui/Icons.jsx';
import './WhyUs.css';

const TECH_STACK = [
    { name: 'React', Icon: IconReact, desc: 'Frontend' },
    { name: 'Node.js', Icon: IconServer, desc: 'Backend' },
    { name: 'Electron', Icon: IconDesktop, desc: 'Desktop' },
    { name: 'React Native', Icon: IconMobile, desc: 'Mobile' },
    { name: 'PostgreSQL', Icon: IconDatabase, desc: 'Database' },
    { name: 'AWS', Icon: IconCloud, desc: 'Cloud' },
    { name: 'Docker', Icon: IconBox, desc: 'DevOps' },
    { name: 'OpenAI', Icon: IconBrain, desc: 'AI/ML' },
];

const WhyUs = () => {
    const { t } = useTranslation();
    const [page, setPage] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const PAGES = [TECH_STACK.slice(0, 4), TECH_STACK.slice(4, 8)];
    const totalPages = PAGES.length;

    const handleNext = () => setPage((p) => Math.min(p + 1, totalPages - 1));
    const handlePrev = () => setPage((p) => Math.max(p - 1, 0));

    const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
    const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const diff = touchStart - touchEnd;
        if (diff > 50) handleNext();
        if (diff < -50) handlePrev();
        setTouchStart(0);
        setTouchEnd(0);
    };

    return (
        <section className="tech-stack section" id="about" aria-labelledby="tech-stack-title">
            <div className="container">
                <div className="tech-stack__header">
                    <h2 id="tech-stack-title" className="tech-stack__title">
                        {t('whyUs.title')}{' '}
                        <span className="text-primary">{t('whyUs.titleAccent')}</span>
                    </h2>
                    <p className="tech-stack__subtitle">{t('whyUs.subtitle')}</p>
                </div>

                <div className="tech-stack__carousel-container">
                    <button
                        className={`tech-stack__nav tech-stack__nav--prev ${page === 0 ? 'disabled' : ''}`}
                        onClick={handlePrev}
                        disabled={page === 0}
                        aria-label="Previous technologies"
                    >
                        <IconChevronLeft size={20} />
                    </button>

                    <div className="tech-stack__viewport"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}>
                        <div
                            className="tech-stack__track"
                            style={{ transform: `translateX(calc(-${page * 100}%))` }}
                        >
                            {PAGES.map((pageItems, i) => (
                                <div key={i} className="tech-stack__page">
                                    {pageItems.map(({ name, Icon, desc }) => (
                                        <div key={name} className="tech-item">
                                            <div className="tech-item__icon">
                                                <Icon size={28} />
                                            </div>
                                            <span className="tech-item__name">{name}</span>
                                            <span className="tech-item__desc">{desc}</span>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        className={`tech-stack__nav tech-stack__nav--next ${page === totalPages - 1 ? 'disabled' : ''}`}
                        onClick={handleNext}
                        disabled={page === totalPages - 1}
                        aria-label="Next technologies"
                    >
                        <IconChevronRight size={20} />
                    </button>

                    <div className="tech-stack__dots">
                        {PAGES.map((_, i) => (
                            <button
                                key={i}
                                className={`tech-stack__dot ${page === i ? 'active' : ''}`}
                                onClick={() => setPage(i)}
                                aria-label={`Go to page ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyUs;
