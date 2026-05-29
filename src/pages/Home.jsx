import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Home.css';

const productMeta = [
    {
        visual: 'papirus-scan',
        logo: '/papirus-wordmark.svg',
        href: 'https://papirus-ai.com'
    },
    {
        image: '/domizan-preview.webp',
        logo: '/domizan-logo.png',
        href: 'https://www.domizan.com/'
    },
    {
        image: '/content/img/WhatsApp Image 2026-02-26 at 11.31.24 (4).jpeg',
        href: 'https://fidanys.com.tr'
    },
    {
        image: '/olric-geo-ss.png',
        logo: '/olric-geo-tracker-logo.png',
        href: 'https://olric.app'
    }
];

const Home = () => {
    const { t, i18n } = useTranslation();
    const [activeIndex, setActiveIndex] = useState(0);
    const [pointer, setPointer] = useState({ x: 54, y: 42 });

    const products = useMemo(() => {
        const translatedProducts = t('home.products', { returnObjects: true });
        return translatedProducts.map((product, index) => ({
            ...product,
            ...productMeta[index]
        }));
    }, [t, i18n.language]);

    const phrases = t('home.phrases', { returnObjects: true });
    const telemetry = t('home.telemetry', { returnObjects: true });
    const titleLines = t('home.hero.title', { returnObjects: true });
    const approachSteps = t('home.approach.steps', { returnObjects: true });
    const currentLanguage = i18n.language?.startsWith('en') ? 'en' : 'tr';
    const currentPhrase = useMemo(() => phrases[activeIndex % phrases.length], [activeIndex, phrases]);

    useEffect(() => {
        const tick = window.setInterval(() => {
            setActiveIndex((index) => (index + 1) % productMeta.length);
        }, 4200);

        return () => window.clearInterval(tick);
    }, []);

    const handlePointerMove = (event) => {
        const nextX = Math.round((event.clientX / window.innerWidth) * 100);
        const nextY = Math.round((event.clientY / window.innerHeight) * 100);
        setPointer({ x: nextX, y: nextY });
    };

    const changeLanguage = (event) => {
        i18n.changeLanguage(event.target.value);
    };

    return (
        <div
            className="shock-page"
            style={{ '--pointer-x': `${pointer.x}%`, '--pointer-y': `${pointer.y}%` }}
            onPointerMove={handlePointerMove}
        >
            <div className="shock-noise" aria-hidden="true" />
            <div className="shock-scan" aria-hidden="true" />

            <nav className="shock-nav" aria-label={t('home.nav.aria')}>
                <a className="shock-mark" href="/" aria-label="ACRTECH">
                    <img src="/acrtech-mark.svg" alt="" />
                </a>
                <div className="shock-nav__actions">
                    <div className="shock-nav__links" aria-label={t('home.nav.sections')}>
                        <a href="#proof">{t('home.nav.products')}</a>
                        <a href="#ritual">{t('home.nav.approach')}</a>
                        <a href="#signal">{t('home.nav.contact')}</a>
                    </div>
                    <label className="shock-language" aria-label={t('languageSelect.label')}>
                        <img src={currentLanguage === 'en' ? '/flags/gb.svg' : '/flags/tr.svg'} alt="" aria-hidden="true" />
                        <select value={currentLanguage} onChange={changeLanguage}>
                            <option value="tr">{t('languageSelect.tr')}</option>
                            <option value="en">{t('languageSelect.en')}</option>
                        </select>
                        <span className="shock-language__chevron" aria-hidden="true">▾</span>
                    </label>
                </div>
            </nav>

            <section className="shock-hero" aria-labelledby="shock-title">
                <div className="shock-hero__left">
                    <p className="shock-kicker">{t('home.hero.kicker')}</p>
                    <h1 id="shock-title">
                        {titleLines.map((line, index) => (
                            <span
                                className={`shock-title-line ${index === 1 ? 'shock-title-line--accent' : ''}`}
                                key={`${line}-${index}`}
                            >
                                {line}
                            </span>
                        ))}
                    </h1>
                    <p className="shock-lead">
                        {t('home.hero.lead')}
                    </p>
                </div>

                <div className="shock-hero__right" aria-label={t('home.hero.panelAria')}>
                    <div className="shock-orbit">
                        <span className="shock-orbit__ring shock-orbit__ring--outer" />
                        <span className="shock-orbit__ring shock-orbit__ring--middle" />
                        <span className="shock-orbit__ring shock-orbit__ring--inner" />
                        <div className="shock-core">
                            <img src="/acrtech-mark.svg" alt="" />
                            <strong>{currentPhrase}</strong>
                        </div>
                        {products.map((product, index) => (
                            <button
                                key={product.name}
                                className={`shock-satellite shock-satellite--${index + 1} ${index === activeIndex ? 'is-active' : ''}`}
                                type="button"
                                onClick={() => setActiveIndex(index)}
                            >
                                <span>{product.pulse}</span>
                                {product.name}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="shock-band" aria-label="ACRTECH">
                <div className="shock-band__track">
                    {[...telemetry, ...telemetry].map((item, index) => (
                        <span key={`${item}-${index}`}>{item}</span>
                    ))}
                </div>
            </section>

            <section className="shock-proof" id="proof" aria-labelledby="proof-title">
                <div className="shock-section-heading">
                    <p>{t('home.productsHeading.eyebrow')}</p>
                    <h2 id="proof-title">{t('home.productsHeading.title')}</h2>
                </div>

                <div className="shock-proof__grid">
                    {products.map((product, index) => (
                        <article
                            className={`shock-product ${index === activeIndex ? 'is-active' : ''}`}
                            key={product.name}
                            onMouseEnter={() => setActiveIndex(index)}
                        >
                            <div className="shock-product__number">{product.pulse}</div>
                            <div>
                                {product.logo && <img className="shock-product__logo" src={product.logo} alt={t('home.productLogoAlt', { name: product.name })} />}
                                <p className="shock-product__signal">{product.signal}</p>
                                <h3>{product.name}</h3>
                                <p>{product.text}</p>
                            </div>
                            {product.visual === 'papirus-scan' ? (
                                <div className="papirus-visual" aria-label={t('home.papirusVisual.aria')}>
                                    <div className="papirus-visual__paper">
                                        <span className="papirus-visual__line papirus-visual__line--wide" />
                                        <span className="papirus-visual__line" />
                                        <span className="papirus-visual__line papirus-visual__line--short" />
                                        <span className="papirus-visual__bubble">A</span>
                                        <span className="papirus-visual__bubble">B</span>
                                        <span className="papirus-visual__bubble is-marked">C</span>
                                        <span className="papirus-visual__scan" />
                                    </div>
                                    <div className="papirus-visual__ai">
                                        <img src="/papirus-mark.svg" alt="" />
                                        <span>AI</span>
                                    </div>
                                    <div className="papirus-visual__result">
                                        <strong>92</strong>
                                        <span>{t('home.papirusVisual.score')}</span>
                                        <small>{t('home.papirusVisual.matched')}</small>
                                    </div>
                                </div>
                            ) : (
                                <img className="shock-product__image" src={product.image} alt={t('home.productImageAlt', { name: product.name })} />
                            )}
                            <div className="shock-product__footer">
                                <code>{product.code}</code>
                                <a href={product.href} target="_blank" rel="noreferrer">
                                    {t('home.productLink')}
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="shock-ritual" id="ritual" aria-labelledby="ritual-title">
                <div className="shock-ritual__copy">
                    <p>{t('home.approach.eyebrow')}</p>
                    <h2 id="ritual-title">{t('home.approach.title')}</h2>
                </div>
                <div className="shock-ritual__steps" aria-label={t('home.approach.aria')}>
                    {approachSteps.map((step) => (
                        <span key={step}>{step}</span>
                    ))}
                </div>
            </section>

            <section className="shock-signal" id="signal" aria-labelledby="signal-title">
                <div>
                    <p className="shock-kicker">{t('home.signal.kicker')}</p>
                    <h2 id="signal-title">{t('home.signal.title')}</h2>
                    <p>
                        {t('home.signal.text')}
                    </p>
                </div>
                <a className="shock-signal__button" href="mailto:info@acrtech.com.tr">
                    {t('home.signal.button')}
                </a>
            </section>
        </div>
    );
};

export default Home;
