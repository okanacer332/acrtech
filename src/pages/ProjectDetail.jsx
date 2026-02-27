import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { MD_PROJECTS, parseFrontmatter } from '../data/projectsData';
import '../features/Products/Products.css'; // Reusing some base styles

const ProjectDetail = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const [project, setProject] = useState(null);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        const mdProject = MD_PROJECTS.find(p => p.slug === id);

        if (!mdProject) {
            setLoading(false);
            return;
        }

        const fetchProject = async () => {
            try {
                const res = await fetch(mdProject.mdFile);
                if (!res.ok) throw new Error('File not found');
                const text = await res.text();
                const { data, content: mdBody } = parseFrontmatter(text);

                setProject({
                    ...mdProject,
                    title: data.title,
                    category: data.category,
                    date: data.date,
                    author: data.author
                });
                setContent(mdBody);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [id]);

    if (loading) {
        return (
            <div style={{ paddingTop: '120px', minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <p>Yükleniyor...</p>
            </div>
        );
    }

    if (!project) {
        return (
            <div style={{ paddingTop: '120px', minHeight: '60vh', textAlign: 'center' }}>
                <div className="container">
                    <h2>Proje Bulunamadı</h2>
                    <br />
                    <Link to="/projects" className="btn btn--primary">Projelere Dön</Link>
                </div>
            </div>
        );
    }

    return (
        <article style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '80vh' }}>
            <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <Link to="/projects" style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--color-primary)', marginBottom: '2rem', textDecoration: 'none', fontWeight: 500 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem' }}>
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    Tüm Projeler
                </Link>

                <header style={{ marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '2.5rem', lineHeight: 1.2, marginBottom: '1rem', color: 'var(--color-text)' }}>
                        {project.title}
                    </h1>
                </header>

                <div style={{ marginBottom: '3rem', borderRadius: '16px', overflow: 'hidden' }}>
                    <img src={project.image} alt={project.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>

                <div className="markdown-body" style={{ color: 'var(--color-text-muted)', lineHeight: 1.8, fontSize: '1.1rem' }}>
                    <ReactMarkdown>{content}</ReactMarkdown>
                </div>
            </div>
        </article>
    );
};

export default ProjectDetail;
