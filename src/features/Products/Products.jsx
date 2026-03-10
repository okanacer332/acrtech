import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './Products.css';

const PRODUCTS = [
    {
        id: 'olric',
        name: 'Olric',
        nameDisplay: 'Olric',
        badges: ['GEO', 'AEO', 'Performans Ölçümü'],
        desc: 'Web sitelerinin yapay zeka arama motorlarındaki görünürlüğünü ve performansını ölçümleyen bir web uygulaması.',
        link: 'https://olric.app',
        logo: '/olric-geo-tracker-logo.png',
        image: '/olric-geo-ss.png',
    },
    {
        id: 'domizan',
        name: 'Domizan',
        nameDisplay: 'Domizan',
        badges: ['AI', 'Muhasebe Operasyonları'],
        desc: 'Küçük ve orta ölçekli işletmeler için yapay zeka destekli muhasebe ve iş yönetim yazılımı. Operasyonlarınızı dakikalar içinde dijitalleştirin.',
        link: 'https://www.domizan.com/',
        logo: '/domizan-logo.png',
        image: '/domizan-preview.webp',
    },
    {
        id: 'brainmap',
        name: 'Brainmap',
        nameDisplay: 'brainmap.',
        badges: ['AI', 'e-Learning'],
        desc: 'Yapay zeka destekli e-öğrenme platformu. Eğitim içeriklerinizi kişiselleştirin, öğrenme deneyimini dönüştürün.',
        link: 'https://olric.app',
        logo: '/brainmap-logo.png',
        image: '/brainmap-preview.webp',
    },
];

const Products = () => {
    const { t } = useTranslation();

    return (
        <section className="products section" id="projects" aria-labelledby="products-title">
            <div className="container">
                <div className="section-header">
                    <h2 id="products-title" className="section-title">
                        {t('products.title', 'Ürünlerimizi')}{' '}
                        <span className="text-primary">{t('products.titleAccent', 'Keşfedin')}</span>
                    </h2>
                    <p className="section-subtitle">
                        {t('products.subtitle', 'İşletmenizi geleceğe taşıyacak yazılım ürünlerimiz.')}
                    </p>
                </div>

                <div className="products__grid">
                    {PRODUCTS.map(({ id, name, nameDisplay, badges, desc, link, logo, image }) => (
                        <a
                            key={id}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="product-card"
                        >
                            {/* Left — text content */}
                            <div className="product-card__content">
                                <div className="product-card__logo-area">
                                    <img src={logo} alt={name} className="product-card__logo" />
                                    {nameDisplay && <span className="product-card__logo-text">{nameDisplay}</span>}
                                </div>

                                <div className="product-card__badges">
                                    {badges.map((badge, i) => (
                                        <span key={i} className="product-card__badge">{badge}</span>
                                    ))}
                                </div>

                                <p className="product-card__desc">{desc}</p>

                                <span className="product-card__cta">
                                    Keşfet
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                        <polyline points="12 5 19 12 12 19" />
                                    </svg>
                                </span>
                            </div>

                            {/* Right — product image */}
                            <div className="product-card__img-area">
                                <img src={image} alt={`${name} preview`} className="product-card__img" loading="lazy" />
                            </div>
                        </a>
                    ))}
                </div>

                {/* All Products CTA */}
                <div className="products__all-cta">
                    <Link to="/projects" className="products__all-link">
                        Tüm Ürünlerimiz
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Products;
