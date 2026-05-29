import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MD_BLOGS, parseBlogFrontmatter } from '../data/blogData';
import '../features/Products/Products.css';

const BlogList = () => {
    const { t, i18n } = useTranslation();
    const [blogData, setBlogData] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        const language = i18n.language?.startsWith('en') ? 'en' : 'tr';

        const loadBlogs = async () => {
            const loaded = await Promise.all(MD_BLOGS.map(async (blog) => {
                try {
                    const res = await fetch(blog.mdFile[language]);
                    const text = await res.text();
                    const { data } = parseBlogFrontmatter(text);
                    return {
                        ...blog,
                        title: data.title || t('blog.fallbackTitle'),
                        description: data.description || t('blog.fallbackDescription'),
                        category: data.category || t('blog.fallbackCategory'),
                        image: data.image || '/og-image.png'
                    };
                } catch (e) {
                    console.error('Failed to load blog', blog.mdFile[language]);
                    return { ...blog, title: t('blog.errorTitle'), description: t('blog.errorDescription') };
                }
            }));
            setBlogData(loaded);
        };

        loadBlogs();
    }, [i18n.language, t]);

    const renderCard = (props) => (
        <Link key={props.id} to={`/blog/${props.slug}`} className="product-card">
            <div className="product-card__content">
                <div className="product-card__badges">
                    <span className="product-card__badge">{props.category}</span>
                </div>

                <h3 className="product-card__title" style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--color-text)' }}>
                    {props.title}
                </h3>

                <p className="product-card__desc">{props.description}</p>

                <span className="product-card__cta" style={{ display: 'inline-flex', marginTop: 'auto', fontWeight: 600, color: 'var(--color-primary)' }}>
                    {t('blog.readMore')}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '0.5rem' }}>
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                    </svg>
                </span>
            </div>

            <div className="product-card__img-area" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'var(--color-primary-alpha)', color: 'var(--color-primary)' }}>
                {props.image !== '/og-image.png' ? (
                    <img src={props.image} alt={props.title} className="product-card__img" loading="lazy" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                ) : (
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                )}
            </div>
        </Link>
    );

    return (
        <div style={{ paddingTop: '100px', minHeight: '80vh', paddingBottom: '80px' }}>
            <section className="products section" aria-labelledby="blog-title">
                <div className="container">
                    <div className="section-header">
                        <h2 id="blog-title" className="section-title">
                            {t('blog.title')}
                        </h2>
                        <p className="section-subtitle">
                            {t('blog.subtitle')}
                        </p>
                    </div>

                    <div className="products__grid">
                        {blogData.map(renderCard)}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BlogList;
