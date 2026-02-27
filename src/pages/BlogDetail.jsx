import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { MD_BLOGS, parseBlogFrontmatter } from '../data/blogData';
import '../features/Products/Products.css'; // Reusing some base styles

const BlogDetail = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        const mdBlog = MD_BLOGS.find(b => b.slug === slug);

        if (!mdBlog) {
            setLoading(false);
            return;
        }

        const fetchBlog = async () => {
            try {
                const res = await fetch(mdBlog.mdFile);
                if (!res.ok) throw new Error('File not found');
                const text = await res.text();
                const { data, content: mdBody } = parseBlogFrontmatter(text);

                setBlog({
                    ...mdBlog,
                    title: data.title,
                    category: data.category,
                    date: data.date,
                    author: data.author,
                    image: data.image
                });
                setContent(mdBody);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [slug]);

    if (loading) {
        return (
            <div style={{ paddingTop: '120px', minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <p>Yükleniyor...</p>
            </div>
        );
    }

    if (!blog) {
        return (
            <div style={{ paddingTop: '120px', minHeight: '60vh', textAlign: 'center' }}>
                <div className="container">
                    <h2>Makale Bulunamadı</h2>
                    <br />
                    <Link to="/blog" className="btn btn--primary">Blog'a Dön</Link>
                </div>
            </div>
        );
    }

    return (
        <article style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '80vh' }}>
            <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--color-primary)', marginBottom: '2rem', textDecoration: 'none', fontWeight: 500 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem' }}>
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    Tüm Makaleler
                </Link>

                <header style={{ marginBottom: '3rem' }}>
                    {blog.category && (
                        <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', backgroundColor: 'var(--color-primary-alpha)', color: 'var(--color-primary)', borderRadius: '100px', fontSize: '0.875rem', fontWeight: 600, marginBottom: '1rem' }}>
                            {blog.category}
                        </span>
                    )}
                    <h1 style={{ fontSize: '2.5rem', lineHeight: 1.2, marginBottom: '1rem', color: 'var(--color-text)' }}>
                        {blog.title}
                    </h1>

                    <div style={{ display: 'flex', gap: '1rem', color: 'var(--color-text-light)', fontSize: '0.9rem' }}>
                        {blog.date && <span>Tarih: {blog.date}</span>}
                        {blog.author && <span>Yazar: {blog.author}</span>}
                    </div>
                </header>

                {blog.image && blog.image !== '/og-image.png' ? (
                    <div style={{ marginBottom: '3rem', borderRadius: '16px', overflow: 'hidden' }}>
                        <img src={blog.image} alt={blog.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
                    </div>
                ) : (
                    <div style={{ marginBottom: '3rem', borderRadius: '16px', padding: '4rem 0', background: 'var(--color-primary-alpha)', color: 'var(--color-primary)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                    </div>
                )}

                <div className="markdown-body" style={{ color: 'var(--color-text-muted)', lineHeight: 1.8, fontSize: '1.1rem' }}>
                    <ReactMarkdown>{content}</ReactMarkdown>
                </div>

                {/* CTA Section for Blog */}
                <div style={{ marginTop: '4rem', padding: '3rem', background: 'var(--color-surface)', borderRadius: '16px', textAlign: 'center', border: '1px solid var(--color-border)' }}>
                    <h3 style={{ fontSize: '1.75rem', color: 'var(--color-text)', marginBottom: '1rem' }}>Dijital Dönüşüm Yolculuğunuzda ACRTECH Yanınızda</h3>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem auto', lineHeight: 1.6 }}>
                        İş süreçlerinizi yapay zeka ve otomasyonla hızlandırmak, pazar payınızı artırmak ve güçlü bir altyapı kurmak için bizimle iletişime geçin.
                    </p>
                    <a href="/#contact" className="btn btn--primary" style={{ padding: '0.75rem 2rem', fontSize: '1.1rem', borderRadius: '100px', textDecoration: 'none', display: 'inline-block' }}>
                        Hemen Çalışmaya Başlayın
                    </a>
                </div>
            </div>
        </article>
    );
};

export default BlogDetail;
