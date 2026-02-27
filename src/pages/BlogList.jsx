import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MD_BLOGS, parseBlogFrontmatter } from '../data/blogData';
import '../features/Products/Products.css';

const BlogList = () => {
    const { t } = useTranslation();
    const [blogData, setBlogData] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);

        const loadBlogs = async () => {
            const loaded = await Promise.all(MD_BLOGS.map(async (blog) => {
                try {
                    const res = await fetch(blog.mdFile);
                    const text = await res.text();
                    const { data } = parseBlogFrontmatter(text);
                    return {
                        ...blog,
                        title: data.title || 'Untitled Article',
                        description: data.description || '',
                        category: data.category || 'Insights',
                        image: data.image || '/og-image.png'
                    };
                } catch (e) {
                    console.error("Failed to load blog", blog.mdFile);
                    return { ...blog, title: 'Error loading', description: 'Could not load data' };
                }
            }));
            setBlogData(loaded);
        };

        loadBlogs();
    }, []);

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
                    Devamını Oku
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
                            ACRTECH Insights
                        </h2>
                        <p className="section-subtitle">
                            Yazılım, yapay zeka ve dijital dönüşüm dünyasının en son trendleri.
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
