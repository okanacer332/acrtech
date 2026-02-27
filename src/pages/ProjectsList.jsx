import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FIXED_PROJECTS, MD_PROJECTS, parseFrontmatter } from '../data/projectsData';
import '../features/Products/Products.css';

const ProjectsList = () => {
    const { t } = useTranslation();
    const [mdProjectsData, setMdProjectsData] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);

        const loadMdProjects = async () => {
            const loaded = await Promise.all(MD_PROJECTS.map(async (project) => {
                try {
                    const res = await fetch(project.mdFile);
                    const text = await res.text();
                    const { data } = parseFrontmatter(text);
                    return {
                        ...project,
                        title: data.title || 'Project Untitled',
                        description: data.description || 'No description available.',
                        badges: data.category ? [data.category] : ['Project']
                    };
                } catch (e) {
                    console.error("Failed to load project", project.mdFile);
                    return { ...project, title: 'Error loading', description: 'Could not load data' };
                }
            }));
            setMdProjectsData(loaded);
        };

        loadMdProjects();
    }, []);

    const CardContent = ({ props }) => (
        <>
            <div className="product-card__content">
                <div className="product-card__logo-area">
                    {props.logo && <img src={props.logo} alt={props.name || props.title} className="product-card__logo" />}
                    {props.nameDisplay ? (
                        <span className="product-card__logo-text">{props.nameDisplay}</span>
                    ) : (
                        (!props.logo) && <h3 className="product-card__logo-text" style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{props.title}</h3>
                    )}
                </div>

                <div className="product-card__badges">
                    {props.badges?.map((badge, i) => (
                        <span key={i} className="product-card__badge">{badge}</span>
                    ))}
                </div>

                <p className="product-card__desc">{props.desc || props.description}</p>

                <span className="product-card__cta" style={{ display: 'inline-flex', marginTop: 'auto' }}>
                    {props.isFixed ? 'Keşfet' : 'Detayı Gör'}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '0.5rem' }}>
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                    </svg>
                </span>
            </div>

            <div className="product-card__img-area">
                <img src={props.image} alt={props.name || props.title} className="product-card__img" loading="lazy" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
            </div>
        </>
    );

    const renderCard = (props) => {
        if (props.isFixed) {
            return (
                <a key={props.id} href={props.link} target="_blank" rel="noopener noreferrer" className="product-card">
                    <CardContent props={props} />
                </a>
            );
        }
        return (
            <Link key={props.id} to={`/projects/${props.slug}`} className="product-card">
                <CardContent props={props} />
            </Link>
        );
    };

    return (
        <div style={{ paddingTop: '100px', minHeight: '80vh', paddingBottom: '80px' }}>
            <section className="products section" aria-labelledby="products-title">
                <div className="container">
                    <div className="section-header">
                        <h2 id="products-title" className="section-title">
                            {t('nav.projects', 'Projelerimiz')}{' '}
                        </h2>
                        <p className="section-subtitle">
                            İşletmenizi geleceğe taşıyacak yazılım çözümleri ve vaka analizlerimiz.
                        </p>
                    </div>

                    <div className="products__grid">
                        {FIXED_PROJECTS.map(renderCard)}
                        {mdProjectsData.map(renderCard)}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProjectsList;
