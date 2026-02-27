import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../components/ui/Button.jsx';
import { IconCheck, IconMail, IconPhone, IconPin } from '../../components/ui/Icons.jsx';
import './Contact.css';


const Contact = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [status, setStatus] = useState('idle'); // idle, submitting, error
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Bir hata oluştu');
            }

            setStatus('idle');
            setSubmitted(true);
        } catch (error) {
            console.error('Gönderim hatası:', error);
            setStatus('error');
            setErrorMessage(error.message || 'Mesajınız gönderilirken bir iletişim hatası oluştu. Lütfen daha sonra tekrar deneyin.');
        }
    };

    return (
        <section className="contact-section section" id="contact" aria-labelledby="contact-title">
            <div className="container">
                <div className="contact__layout">
                    {/* Left — Company Info */}
                    <div className="contact__left">
                        <h2 id="contact-title" className="contact__title">
                            {t('cta.title', 'İşletmenizi Dijitalde')}{' '}
                            <span className="text-primary">{t('cta.titleAccent', 'Büyütelim.')}</span>
                        </h2>
                        <p className="contact__subtitle">{t('cta.subtitle')}</p>

                        <div className="contact__info">
                            <div className="contact__info-item">
                                <div className="contact__info-icon"><IconMail size={20} /></div>
                                <div>
                                    <div className="contact__info-label">Email</div>
                                    <a href="mailto:info@acrtech.com.tr" className="contact__info-value">info@acrtech.com.tr</a>
                                </div>
                            </div>
                            <div className="contact__info-item">
                                <div className="contact__info-icon"><IconPhone size={20} /></div>
                                <div>
                                    <div className="contact__info-label">{t('contact.phone', 'Telefon')}</div>
                                    <a href="tel:+905345829920" className="contact__info-value" style={{ display: 'block' }}>+90 534 582 99 20</a>
                                    <a href="tel:+905362487703" className="contact__info-value" style={{ display: 'block' }}>+90 536 248 77 03</a>
                                </div>
                            </div>
                            <div className="contact__info-item">
                                <div className="contact__info-icon"><IconPin size={20} /></div>
                                <div>
                                    <div className="contact__info-label">{t('contact.location', 'Konum')}</div>
                                    <span className="contact__info-value">Mersin Teknopark</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right — Unified Embedded Form + Trust */}
                    <div className="contact__right">
                        <div className="contact__form-wrapper" style={{ background: 'var(--bg-card)', padding: '2.5rem 2rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border)', marginBottom: '1.5rem', boxShadow: 'var(--shadow-md)' }}>
                            {!submitted ? (
                                <form className="plan-popover__form" onSubmit={handleSubmit}>
                                    <h3 className="plan-popover__form-title" style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text)', textAlign: 'left' }}>
                                        {t('contact.formTitle', 'Bize Ulaşın')}
                                    </h3>
                                    <input
                                        type="text"
                                        placeholder={t('contact.name', 'Adınız')}
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        style={{ fontSize: '1rem', padding: '1rem' }}
                                    />
                                    <input
                                        type="email"
                                        placeholder={t('contact.email', 'E-posta adresiniz')}
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        style={{ fontSize: '1rem', padding: '1rem' }}
                                    />
                                    <textarea
                                        placeholder={t('contact.message', 'Proje detaylarınız...')}
                                        rows="4"
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        style={{ fontSize: '1rem', padding: '1rem' }}
                                    />
                                    {status === 'error' && (
                                        <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.5rem' }}>{errorMessage}</p>
                                    )}
                                    <Button type="submit" variant="primary" size="lg" style={{ width: '100%', marginTop: '0.5rem', justifyContent: 'center' }} disabled={status === 'submitting'}>
                                        {status === 'submitting' ? 'Gönderiliyor...' : t('contact.submit', 'Gönder')}
                                    </Button>
                                </form>
                            ) : (
                                <div className="plan-popover__success" style={{ padding: '3rem 1rem', textAlign: 'center' }}>
                                    <IconCheck size={48} />
                                    <h4 style={{ marginTop: '1.5rem', color: 'var(--text)', fontSize: '1.25rem' }}>{t('contact.successTitle', 'Harika!')}</h4>
                                    <p style={{ marginTop: '0.5rem', color: 'var(--text-muted)' }}>{t('contact.success', 'Mesajınız başarıyla alındı. En kısa sürede sizinle iletişime geçeceğiz.')}</p>
                                </div>
                            )}
                        </div>

                        {/* Trust indicators below form */}
                        <div className="contact__trust" style={{ justifyContent: 'center' }}>
                            <span className="contact__trust-item">
                                <span className="contact__trust-icon"><IconCheck size={14} /></span>
                                {t('cta.trust.discovery', 'Ücretsiz keşif görüşmesi')}
                            </span>
                            <span className="contact__trust-item">
                                <span className="contact__trust-icon"><IconCheck size={14} /></span>
                                {t('cta.trust.response', '24 saat içinde yanıt')}
                            </span>
                            <span className="contact__trust-item">
                                <span className="contact__trust-icon"><IconCheck size={14} /></span>
                                {t('cta.trust.nda', 'NDA mevcut')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
