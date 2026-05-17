import { useEffect, useMemo, useState } from 'react';
import './Home.css';

const products = [
    {
        name: 'papirus-ai',
        signal: 'yapay zeka ile sınav değerlendirme',
        text: 'Akademisyenler için sınav kağıdı okuma ve değerlendirme asistanı. Yapay zeka; cevapları, rubrikleri, güven skorlarını ve inceleme akışını aynı masada buluşturur.',
        code: 'AI / OCR / RUBRIC / REVIEW',
        pulse: '01',
        visual: 'papirus-scan',
        logo: '/papirus-wordmark.svg',
        href: 'https://papirus-ai.com'
    },
    {
        name: 'domizan',
        signal: 'SMMM ofisleri için ofis boy',
        text: 'SMMM ofislerinin yanında 7/24 kesintisiz çalışan yapay zeka destekli bir ofis boy. Evrak, işlem ve takip yükünü daha düzenli, daha görünür bir ofis ritmine taşır.',
        code: 'AI OFFICE / ACCOUNTING / OPS / DESKTOP',
        pulse: '02',
        image: '/domizan-preview.webp',
        logo: '/domizan-logo.png',
        href: 'https://www.domizan.com/'
    },
    {
        name: 'fidanys',
        signal: 'saha ve reel karlılık hafızası',
        text: 'Fidan üretiminde stok, palet, renk, QR ve saha hareketi tek kayıtta birleşir. Enflasyon oranıyla reel kar analizi, görünen ciro ile gerçek kazanç arasındaki farkı açık eder.',
        code: 'FIELD / QR / STOCK / REAL PROFIT',
        pulse: '03',
        image: '/content/img/WhatsApp Image 2026-02-26 at 11.31.24 (4).jpeg',
        href: 'https://fidanys.com.tr'
    },
    {
        name: 'olric',
        signal: 'yapay zeka görünürlüğü',
        text: 'Markaların yapay zeka arama çağındaki izini takip eden görünürlük radarı. Algı, kaynak, cevap ve sıralama sinyalleri ölçülebilir bir stratejiye dönüşür.',
        code: 'AEO / GEO / SERP / SIGNAL',
        pulse: '04',
        image: '/olric-geo-ss.png',
        logo: '/olric-geo-tracker-logo.png',
        href: 'https://olric.app'
    }
];

const phrases = [
    'ArT of technology',
    'akıl ve ritim',
    'ürün estetiği',
    'saha sezgisi',
    'ACRTECH'
];

const telemetry = [
    'düşünce netleşir',
    'saha konuşur',
    'yapay zeka iş görür',
    'arayüz sadeleşir',
    'veri anlam kazanır',
    'ürün ritim bulur',
    'karar hafifler',
    'operasyon görünür olur'
];

const Home = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [pointer, setPointer] = useState({ x: 54, y: 42 });

    const currentPhrase = useMemo(() => phrases[activeIndex % phrases.length], [activeIndex]);

    useEffect(() => {
        const tick = window.setInterval(() => {
            setActiveIndex((index) => (index + 1) % products.length);
        }, 4200);

        return () => window.clearInterval(tick);
    }, []);

    const handlePointerMove = (event) => {
        const nextX = Math.round((event.clientX / window.innerWidth) * 100);
        const nextY = Math.round((event.clientY / window.innerHeight) * 100);
        setPointer({ x: nextX, y: nextY });
    };

    return (
        <div
            className="shock-page"
            style={{ '--pointer-x': `${pointer.x}%`, '--pointer-y': `${pointer.y}%` }}
            onPointerMove={handlePointerMove}
        >
            <div className="shock-noise" aria-hidden="true" />
            <div className="shock-scan" aria-hidden="true" />

            <nav className="shock-nav" aria-label="Ana navigasyon">
                <a className="shock-mark" href="/" aria-label="ACRTECH">
                    <img src="/acrtech-mark.svg" alt="" />
                </a>
                <div className="shock-nav__links" aria-label="Sayfa bölümleri">
                    <a href="#proof">ürünler</a>
                    <a href="#ritual">yaklaşım</a>
                    <a href="#signal">iletişim</a>
                </div>
            </nav>

            <section className="shock-hero" aria-labelledby="shock-title">
                <div className="shock-hero__left">
                    <p className="shock-kicker">ACRTECH / Art, Reason, Technology</p>
                    <h1 id="shock-title">
                        <span className="shock-title-line">Aklın</span>
                        <span className="shock-title-line shock-title-line--accent">sanata</span>
                        <span className="shock-title-line">yaklaştığı</span>
                        <span className="shock-title-line">yazılım.</span>
                    </h1>
                    <p className="shock-lead">
                        ACRTECH, ürün fikrini teknik bir dosyadan çıkarıp yaşayan bir çalışma
                        düzenine dönüştüren stüdyo. Merkezinde netlik, ölçü, estetik ve
                        operasyon gerçeği var.
                    </p>
                </div>

                <div className="shock-hero__right" aria-label="ACRTECH canlı sinyal paneli">
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

            <section className="shock-band" aria-label="ACRTECH mesaj akışı">
                <div className="shock-band__track">
                    {[...telemetry, ...telemetry].map((item, index) => (
                        <span key={`${item}-${index}`}>{item}</span>
                    ))}
                </div>
            </section>

            <section className="shock-proof" id="proof" aria-labelledby="proof-title">
                <div className="shock-section-heading">
                    <p>dört ürün, tek tasarım bilinci</p>
                    <h2 id="proof-title">Her ürün kendi sektörünün sessiz problemini görünür kılar.</h2>
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
                                {product.logo && <img className="shock-product__logo" src={product.logo} alt={`${product.name} logo`} />}
                                <p className="shock-product__signal">{product.signal}</p>
                                <h3>{product.name}</h3>
                                <p>{product.text}</p>
                            </div>
                            {product.visual === 'papirus-scan' ? (
                                <div className="papirus-visual" aria-label="Papirus AI kağıt tarama ve değerlendirme animasyonu">
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
                                        <span>güven skoru</span>
                                        <small>rubrik eşleşti</small>
                                    </div>
                                </div>
                            ) : (
                                <img className="shock-product__image" src={product.image} alt={`${product.name} ekran izi`} />
                            )}
                            <div className="shock-product__footer">
                                <code>{product.code}</code>
                                <a href={product.href} target="_blank" rel="noreferrer">
                                    ürünü incele
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="shock-ritual" id="ritual" aria-labelledby="ritual-title">
                <div className="shock-ritual__copy">
                    <p>yaklaşım</p>
                    <h2 id="ritual-title">Önce işin ritmi, sonra ekranın biçimi.</h2>
                </div>
                <div className="shock-ritual__steps" aria-label="ACRTECH çalışma ritmi">
                    <span>bağlam okunur</span>
                    <span>fazlalık ayıklanır</span>
                    <span>karar anı sadeleşir</span>
                    <span>ürün yaşayan bir düzene kavuşur</span>
                </div>
            </section>

            <section className="shock-signal" id="signal" aria-labelledby="signal-title">
                <div>
                    <p className="shock-kicker">ACRTECH: Art, Reason, Technology</p>
                    <h2 id="signal-title">Teknoloji yalnızca araç değil; doğru kurulduğunda düşüncenin formudur.</h2>
                    <p>
                        Ürün, veri ve yapay zeka aynı çizgide buluştuğunda daha sakin kararlar,
                        daha görünür operasyonlar ve daha güçlü iş refleksleri ortaya çıkar.
                    </p>
                </div>
                <a className="shock-signal__button" href="mailto:info@acrtech.com.tr">
                    iletişim kur
                </a>
            </section>
        </div>
    );
};

export default Home;
