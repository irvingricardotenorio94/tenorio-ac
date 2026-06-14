import React, { useState, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next';
import { Phone, Clock, Wrench, Hammer, ArrowUpCircle, AlertCircle, Wind, Tag, HardHat, ClipboardCheck, ChevronLeft, ChevronRight, Facebook, Instagram, Mail, MapPin, X, Menu } from 'lucide-react';
import emailjs from '@emailjs/browser';

const heroImages = [`${import.meta.env.BASE_URL}img/1.jpeg`, `${import.meta.env.BASE_URL}img/2.jpeg`, `${import.meta.env.BASE_URL}img/4.jpeg`];
const carouselImages = [`${import.meta.env.BASE_URL}img/1.jpeg`, `${import.meta.env.BASE_URL}img/2.jpeg`, `${import.meta.env.BASE_URL}img/3.jpeg`, `${import.meta.env.BASE_URL}img/4.jpeg`, `${import.meta.env.BASE_URL}img/5.jpeg`, `${import.meta.env.BASE_URL}img/6.jpeg`, `${import.meta.env.BASE_URL}img/7.jpeg`, `${import.meta.env.BASE_URL}img/8.jpeg`];

const brandLogos = [
  { src: 'Goodman_Global_logo_svg.avif', alt: 'Goodman HVAC Brand - AC Repair Mesa Phoenix' },
  { src: 'york.avif',                    alt: 'York HVAC Brand - Air Conditioning Services Mesa Phoenix' },
  { src: 'carrier.avif',                 alt: 'Carrier HVAC Brand - AC Installation Mesa Phoenix AZ' },
  { src: 'trane.avif',                   alt: 'Trane HVAC Brand - Professional AC Repair Mesa Phoenix' },
  { src: 'bosch.avif',                   alt: 'Bosch HVAC Brand - Air Conditioning Maintenance Mesa Phoenix' },
  { src: 'daikin-logo.avif',             alt: 'Daikin HVAC Brand - HVAC Services Mesa Phoenix AZ' },
];

function App() {
  const { t, i18n } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const snowflakes = useMemo(() => {
    const seed = (i) => {
      const x = Math.sin(i) * 10000;
      return x - Math.floor(x);
    };
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: seed(i) * 100,
      animationDuration: 8 + seed(i + 10) * 7,
      delay: seed(i + 20) * 5,
      size: 1.5 + seed(i + 30) * 1.5,
    }));
  }, []);

  const topBarSnowflakes = useMemo(() => {
    const seed = (i) => {
      const x = Math.sin(i + 100) * 10000;
      return x - Math.floor(x);
    };
    return Array.from({ length: 15 }).map((_, i) => ({
      id: `topbar-${i}`,
      left: seed(i) * 100,
      animationDuration: 5 + seed(i + 50) * 4,
      delay: seed(i + 60) * 3,
      size: 1 + seed(i + 70) * 1,
    }));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('animate-in');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.fade-in-up').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const nextCarouselImage = () => {
    setCarouselIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const prevCarouselImage = () => {
    setCarouselIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const openModal = (index) => {
    setModalImageIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  const nextModalImage = () => {
    setModalImageIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const prevModalImage = () => {
    setModalImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isModalOpen) closeModal();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const copyPhoneNumber = async () => {
    const phoneNumber = '(480) 612-7134';
    try {
      await navigator.clipboard.writeText(phoneNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy phone number:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.message) {
      setFormStatus({ type: 'error', message: t('form_error_complete_fields') });
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({ type: 'error', message: t('form_error_valid_email') });
      setIsSubmitting(false);
      return;
    }

    try {
      const serviceId = 'service_qoyddts';
      const templateId = 'template_lhg2wkh';
      const autoReplyTemplateId = 'template_7bnxxyb';
      const publicKey = '1tVQiok8wtWU2bQFh';

      const templateParams = {
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        phone: formData.phone,
        message: formData.message,
        to_email: 'Tenorioairconditioning24@gmail.com'
      };

      console.log('Enviando email al negocio con parámetros:', templateParams);
      const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log('Email al negocio enviado exitosamente:', response);

      const autoReplyParams = {
        to_name: formData.firstName,
        to_email: formData.email,
        customer_name: `${formData.firstName} ${formData.lastName}`
      };

      console.log('Enviando email de confirmación al cliente:', autoReplyParams);

      try {
        await emailjs.send(serviceId, autoReplyTemplateId, autoReplyParams, publicKey);
        console.log('Email de confirmación al cliente enviado exitosamente');
      } catch (autoReplyError) {
        console.warn('Error al enviar auto-reply (no crítico):', autoReplyError);
      }

      setFormStatus({ type: 'success', message: t('form_success_message') });
      setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Error completo:', error);
      console.error('Código de error:', error?.status);
      console.error('Texto del error:', error?.text);

      let errorMessage = t('form_error_general');
      if (error?.status === 422)                           errorMessage = t('form_error_config');
      else if (error?.status === 400)                      errorMessage = t('form_error_data');
      else if (error?.status === 401 || error?.status === 403) errorMessage = t('form_error_auth');

      setFormStatus({ type: 'error', message: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>

      {/* ── TOP BAR ────────────────────────────────────────────── */}
      <div
        className="fixed top-0 w-full min-h-[90px] md:h-[10vh] text-white z-50 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--color-navy) 0%, var(--color-navy-mid) 100%)', boxShadow: '0 2px 20px rgba(11,29,58,0.35)' }}
      >
        <div className="absolute inset-0 pointer-events-none z-0">
          {topBarSnowflakes.map((flake) => (
            <div
              key={flake.id}
              className="snowflake"
              style={{
                left: `${flake.left}%`,
                animationDuration: `${flake.animationDuration}s`,
                animationDelay: `${flake.delay}s`,
                fontSize: `${flake.size}rem`,
              }}
            >
              ❄
            </div>
          ))}
        </div>

        <div className="relative z-10 px-3 sm:px-5 md:px-8 h-full flex flex-row items-center justify-between gap-2">
          {/* Left: We're Open + Location */}
          <div
            className="flex items-center gap-1.5 sm:gap-2 md:gap-3 font-bold italic flex-shrink-0"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 lg:w-9 lg:h-9 flex-shrink-0" style={{ color: 'var(--color-blue-light)' }} />
            <span className="text-sm sm:text-base md:text-lg lg:text-3xl transform skew-x-[-12deg] whitespace-nowrap">{t('topbar_open')}</span>
            <div className="hidden sm:flex items-center gap-1 font-semibold text-xs whitespace-nowrap" style={{ color: 'rgba(255,255,255,0.72)' }}>
              <MapPin className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
              <span className="hidden lg:inline">{t('topbar_location_full')}</span>
              <span className="hidden md:inline lg:hidden">{t('topbar_location_medium')}</span>
              <span className="sm:inline md:hidden">{t('topbar_location_small')}</span>
            </div>
          </div>

          {/* Center: Social Icons */}
          <div className="flex flex-1 items-center justify-center gap-2 md:gap-3">
            <a href="https://www.facebook.com/profile.php?id=61574410793520" target="_blank" rel="noopener noreferrer" className="social-icon">
              <Facebook className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
            </a>
            <a href="https://www.tiktok.com/@tenorioac?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="social-icon">
              <svg className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=Tenorioairconditioning24@gmail.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <Mail className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
            </a>
          </div>

          {/* Right: Phone Button */}
          <button
            onClick={copyPhoneNumber}
            className="phone-btn flex items-center gap-1.5 sm:gap-2 font-bold italic px-2.5 sm:px-3 md:px-5 lg:px-6 py-1.5 md:py-2 lg:py-3 text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl whitespace-nowrap flex-shrink-0"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-7 lg:h-7 flex-shrink-0" />
            <span className="hidden md:inline">{t('call_us')}</span>
            <span>(480) 612-7134</span>
            {copied && (
              <span className="text-xs font-normal ml-1 animate-pulse">{t('copied')}</span>
            )}
          </button>
        </div>
      </div>

      {/* ── NAVBAR ─────────────────────────────────────────────── */}
      <nav className={`fixed top-[90px] md:top-[10vh] w-full z-40 py-2 md:py-4 px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0 relative transition-all duration-300 ${isScrolled ? 'navbar-scrolled' : 'navbar-default'}`}>
        {/* Logo + Hamburger */}
        <div className="flex items-center justify-between md:justify-start w-full md:w-auto md:transform md:translate-x-[10%]">
          <img
            src={`${import.meta.env.BASE_URL}img/TENORIO-01.png`}
            alt="Tenorio Air Conditioning Logo - Professional HVAC Services Mesa Phoenix AZ"
            className="h-30 md:h-32 lg:h-50 object-contain"
            loading="eager"
          />
          <button
            className="md:hidden p-2 rounded-xl transition-all duration-200 hover:bg-slate-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen
              ? <X className="w-6 h-6" style={{ color: 'var(--color-navy)' }} />
              : <Menu className="w-6 h-6" style={{ color: 'var(--color-navy)' }} />}
          </button>
        </div>

        {/* Right side */}
        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 w-full md:w-auto md:justify-end">
          {/* Desktop nav links */}
          <div className="hidden md:flex gap-1">
            <a href="#inicio" className="nav-link">{t('nav_home')}</a>
            <a
              href="#servicios"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('servicios');
                if (element) {
                  const offset = window.innerHeight * 0.1 + 160;
                  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                  window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
                }
              }}
            >
              {t('nav_services')}
            </a>
          </div>

          {/* Language + Book */}
          <div className="flex items-center justify-center gap-3 w-full md:w-auto">
            <div className="lang-switcher">
              <button
                onClick={() => changeLanguage('es')}
                className={`lang-btn ${i18n.language.includes('es') ? 'lang-btn-active' : ''}`}
              >
                Español
              </button>
              <button
                onClick={() => changeLanguage('en')}
                className={`lang-btn ${i18n.language.includes('en') ? 'lang-btn-active' : ''}`}
              >
                English
              </button>
            </div>

            <a href="#citas" className="btn-book whitespace-nowrap">
              {t('nav_btn')}
            </a>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="mobile-menu absolute top-full left-0 w-full md:hidden z-50">
            <div className="flex flex-col py-4 px-4 gap-1">
              <a
                href="#inicio"
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav_home')}
              </a>
              <a
                href="#servicios"
                className="mobile-nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  const element = document.getElementById('servicios');
                  if (element) {
                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({ top: elementPosition - 280, behavior: 'smooth' });
                  }
                }}
              >
                {t('nav_services')}
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ───────────────────────────────────────────────── */}
      <header
        id="inicio"
        className="h-screen flex flex-col justify-center items-center text-center px-4 pt-[280px] md:pt-[calc(10vh+160px)] lg:pt-[calc(10vh+240px)] relative overflow-hidden"
      >
        {/* Background images */}
        <div className="absolute inset-0 z-0">
          {heroImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(1px) brightness(0.88)',
                transform: 'scale(1.05)',
              }}
            />
          ))}
        </div>
        <div
          className="absolute inset-0 z-10"
          style={{ background: 'linear-gradient(180deg, rgba(11,29,58,0.72) 0%, rgba(11,29,58,0.32) 50%, rgba(11,29,58,0.58) 100%)' }}
        />

        {/* Content */}
        <div className="relative z-20 max-w-4xl mx-auto w-full px-4">
          <div className="hero-badge fade-in-up">
            <span>{t('topbar_open')}</span>
          </div>
          <h1 className="hero-title fade-in-up" style={{ transitionDelay: '0.1s' }}>
            {t('hero_h1')}
          </h1>
          <p className="hero-sub fade-in-up" style={{ transitionDelay: '0.2s' }}>
            {t('hero_sub')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center fade-in-up" style={{ transitionDelay: '0.3s' }}>
            <a href="#citas" className="btn-hero-primary w-full sm:w-auto">
              {t('btn_now')}
            </a>
            <a href="#servicios" className="btn-hero-ghost w-full sm:w-auto">
              {t('btn_view')}
            </a>
          </div>
        </div>
      </header>

      {/* ── SERVICES ───────────────────────────────────────────── */}
      <section
        id="servicios"
        className="section-bg-blueprint py-24 px-4 md:px-8 relative overflow-hidden scroll-mt-[280px] md:scroll-mt-[calc(10vh+80px)]"
      >
        {/* Snowflakes */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {snowflakes.map((flake) => (
            <div
              key={flake.id}
              className="snowflake"
              style={{
                left: `${flake.left}%`,
                animationDuration: `${flake.animationDuration}s`,
                animationDelay: `${flake.delay}s`,
                fontSize: `${flake.size}rem`,
                color: 'rgba(27,110,243,0.18)',
              }}
            >
              ❄
            </div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in-up">
            <p className="section-eyebrow">{t('nav_services')}</p>
            <h2 className="section-title">{t('s_title')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="service-card p-7 fade-in-up" style={{ transitionDelay: '0s' }}>
              <div className="icon-circle mb-5"><Hammer className="w-5 h-5" /></div>
              <h3 className="service-card-title">{t('s_inst')}</h3>
              <p className="service-card-desc">{t('s_inst_desc')}</p>
            </div>
            {/* Card 2 */}
            <div className="service-card p-7 fade-in-up" style={{ transitionDelay: '0.06s' }}>
              <div className="icon-circle mb-5"><ClipboardCheck className="w-5 h-5" /></div>
              <h3 className="service-card-title">{t('s_rep')}</h3>
              <p className="service-card-desc">{t('s_rep_desc')}</p>
            </div>
            {/* Card 3 */}
            <div className="service-card p-7 fade-in-up" style={{ transitionDelay: '0.12s' }}>
              <div className="icon-circle mb-5"><ArrowUpCircle className="w-5 h-5" /></div>
              <h3 className="service-card-title">{t('s_upgrade')}</h3>
              <p className="service-card-desc">{t('s_upgrade_desc')}</p>
            </div>
            {/* Card 4 */}
            <div className="service-card p-7 fade-in-up" style={{ transitionDelay: '0.18s' }}>
              <div className="icon-circle mb-5"><Wrench className="w-5 h-5" /></div>
              <h3 className="service-card-title">{t('s_maint')}</h3>
              <p className="service-card-desc">{t('s_maint_desc')}</p>
            </div>
            {/* Card 5 - Emergency */}
            <div className="service-card p-7 fade-in-up" style={{ transitionDelay: '0.24s' }}>
              <div className="icon-circle mb-5 relative">
                <Phone className="w-5 h-5" />
                <AlertCircle className="w-3 h-3 absolute -top-1 -right-1 text-red-400" />
              </div>
              <h3 className="service-card-title">{t('s_emergency')}</h3>
              <p className="service-card-desc">{t('s_emergency_desc')}</p>
            </div>
            {/* Card 6 */}
            <div className="service-card p-7 fade-in-up" style={{ transitionDelay: '0.30s' }}>
              <div className="icon-circle mb-5"><Wind className="w-5 h-5" /></div>
              <h3 className="service-card-title">{t('s_ducting')}</h3>
              <p className="service-card-desc">{t('s_ducting_desc')}</p>
            </div>
            {/* Card 7 */}
            <div className="service-card p-7 fade-in-up" style={{ transitionDelay: '0.36s' }}>
              <div className="icon-circle mb-5"><Tag className="w-5 h-5" /></div>
              <h3 className="service-card-title">{t('s_sales')}</h3>
              <p className="service-card-desc">{t('s_sales_desc')}</p>
            </div>
            {/* Card 8 */}
            <div className="service-card p-7 fade-in-up" style={{ transitionDelay: '0.42s' }}>
              <div className="icon-circle mb-5"><HardHat className="w-5 h-5" /></div>
              <h3 className="service-card-title">{t('s_construction')}</h3>
              <p className="service-card-desc">{t('s_construction_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── BRANDS ─────────────────────────────────────────────── */}
      <section className="py-16 px-4 md:px-8" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="brands-title fade-in-up">Free Quotes Any Brand</h2>
          <div className="brands-track overflow-hidden relative w-full">
            <div className="flex items-center gap-8 md:gap-12 lg:gap-16 brands-carousel whitespace-nowrap">
              {[...brandLogos, ...brandLogos].map((brand, i) => (
                <img
                  key={i}
                  src={`${import.meta.env.BASE_URL}img/logobrands/${brand.src}`}
                  alt={brand.alt}
                  className="h-[43px] md:h-[58px] lg:h-[72px] shrink-0 object-contain brand-logo"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── APPOINTMENT ────────────────────────────────────────── */}
      <section id="citas" className="py-24 px-4 md:px-8" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-42 items-center">

            {/* Form side */}
            <div>
              <div className="mb-8 fade-in-up text-center lg:text-left">
                <p className="section-eyebrow">{t('topbar_open')}</p>
                <h2 className="section-title">{t('nav_btn')}</h2>
              </div>
              <div className="form-card fade-in-up" style={{ transitionDelay: '0.1s' }}>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="form-label">{t('form_first_name')}</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder={t('form_first_name')}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="form-label">{t('form_last_name')}</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder={t('form_last_name')}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="form-label">{t('form_email')}</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder={t('form_email')}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="form-label">{t('form_phone')}</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder={t('form_phone')}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="form-label">{t('form_message_label')}</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="5"
                      className="form-input resize-none"
                      placeholder={t('form_message_placeholder')}
                      required
                    />
                  </div>

                  {formStatus.message && (
                    <div className={`form-status ${formStatus.type === 'success' ? 'form-status-success' : 'form-status-error'}`}>
                      <p className="text-sm font-medium">{formStatus.message}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-submit"
                  >
                    {isSubmitting ? t('form_submitting') : t('form_submit')}
                  </button>
                </form>
              </div>
            </div>

            {/* Carousel side */}
            <div className="relative aspect-[1.6] w-full fade-in-up" style={{ transitionDelay: '0.15s' }}>
              <button
                onClick={prevCarouselImage}
                className="carousel-btn absolute top-1/2 left-4 z-10 -translate-y-1/2"
                aria-label="Previous image"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                onClick={nextCarouselImage}
                className="carousel-btn absolute top-1/2 right-4 z-10 -translate-y-1/2"
                aria-label="Next image"
              >
                <ChevronRight className="size-5" />
              </button>

              <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 flex gap-2">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCarouselIndex(index)}
                    className={`h-2 rounded-full transition-all ${index === carouselIndex ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/75'}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <div
                className="relative w-full h-full overflow-hidden rounded-2xl cursor-pointer"
                style={{ boxShadow: 'var(--shadow-lg)' }}
                onClick={() => openModal(carouselIndex)}
              >
                {carouselImages.map((img, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-500 ${index === carouselIndex ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <img
                      src={img}
                      alt={`Professional AC Repair and HVAC Service in Mesa Phoenix AZ - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer className="site-footer py-12 text-center">
        <p className="footer-text">© {new Date().getFullYear()} Tenorio AC. {t('footer_rights')}</p>
      </footer>

      {/* ── MODAL ──────────────────────────────────────────────── */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center modal-backdrop"
          onClick={closeModal}
        >
          <button
            onClick={closeModal}
            className="modal-close-btn absolute top-4 right-4 z-[101]"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={prevModalImage}
              className="modal-nav-btn absolute left-4 z-[101]"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <img
              src={carouselImages[modalImageIndex]}
              alt={`Professional AC Repair and HVAC Service in Mesa Phoenix AZ - Image ${modalImageIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
              loading="eager"
            />

            <button
              onClick={nextModalImage}
              className="modal-nav-btn absolute right-4 z-[101]"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-[101]">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setModalImageIndex(index)}
                  className={`h-2 rounded-full transition-all ${index === modalImageIndex ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/75'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
