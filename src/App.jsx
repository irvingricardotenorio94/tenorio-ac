import React, { useState, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next';
import { Phone, Clock, Wrench, Hammer, ArrowUpCircle, AlertCircle, Wind, Tag, HardHat, ClipboardCheck, ChevronLeft, ChevronRight, Facebook, Instagram, Mail, MapPin, X } from 'lucide-react';
import emailjs from '@emailjs/browser';

const heroImages = ['/img/1.jpeg', '/img/2.jpeg', '/img/4.jpeg'];
const carouselImages = ['/img/1.jpeg', '/img/2.jpeg', '/img/3.jpeg', '/img/4.jpeg', '/img/5.jpeg', '/img/6.jpeg', '/img/7.jpeg', '/img/8.jpeg'];

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

  const snowflakes = useMemo(() => {
    // Use deterministic pseudo-random values based on index
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
    // Use deterministic pseudo-random values based on index for top bar
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

  const nextCarouselImage = () => {
    setCarouselIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const prevCarouselImage = () => {
    setCarouselIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const openModal = (index) => {
    setModalImageIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevenir scroll del body cuando el modal está abierto
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset'; // Restaurar scroll del body
  };

  const nextModalImage = () => {
    setModalImageIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const prevModalImage = () => {
    setModalImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  // Cerrar modal con tecla ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    // Validación básica
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.message) {
      setFormStatus({ type: 'error', message: 'Por favor completa todos los campos' });
      setIsSubmitting(false);
      return;
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({ type: 'error', message: 'Por favor ingresa un email válido' });
      setIsSubmitting(false);
      return;
    }

    try {
      const serviceId = 'service_qoyddts'; 
      const templateId = 'template_lhg2wkh'; // Plantilla para el negocio (recibe datos del formulario)
      const autoReplyTemplateId = 'template_7bnxxyb'; // Plantilla de auto-reply al cliente (confirmación)
      const publicKey = '1tVQiok8wtWU2bQFh';

      // 1. Email al negocio con los datos del formulario
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

      setFormStatus({ type: 'success', message: 'Message sent successfully! We will contact you soon.' });
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error('Error completo:', error);
      console.error('Código de error:', error?.status);
      console.error('Texto del error:', error?.text);
      
      
      let errorMessage = 'Hubo un error al enviar el mensaje. Por favor intenta de nuevo o llámanos al (480) 612-7134';
      
      if (error?.status === 422) {
        errorMessage = 'Error de configuración: Verifica que los nombres de las variables en tu plantilla de EmailJS coincidan con: from_name, from_email, phone, message, to_email';
      } else if (error?.status === 400) {
        errorMessage = 'Error en los datos: Verifica que todos los campos estén completos correctamente';
      } else if (error?.status === 401 || error?.status === 403) {
        errorMessage = 'Error de autenticación: Verifica tus credenciales de EmailJS (Service ID, Template ID, Public Key)';
      }
      
      setFormStatus({ type: 'error', message: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F9FA' }}>
      {/* TOP BAR - We're Open 24/7 & Phone */}
      <div className="fixed top-0 w-full h-[10vh] text-white z-50 shadow-md overflow-hidden" style={{ background: 'linear-gradient(to right, #0056b3, #0056b3)' }}>
        {/* Snowflakes Animation - White */}
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
                color: 'white',
                textShadow: '0 0 3px rgba(255, 255, 255, 0.8)',
              }}
            >
              ❄
            </div>
          ))}
        </div>
        
        <div className="relative z-10 px-8 h-full flex justify-between items-center">
          <div className="flex items-center gap-6 font-bold text-2xl md:text-4xl italic transform translate-x-[5%]">
            <Clock className="w-8 h-8 md:w-10 md:h-10" />
            <span className="transform skew-x-[-12deg]">We're Open 24/7!</span>
            {/* Location - Next to We're Open */}
            <div className="flex items-center gap-2 font-semibold text-xs md:text-sm whitespace-nowrap ml-4">
              <MapPin className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
              <span className="hidden lg:inline">SERVING MESA, AZ & SURROUNDING AREAS</span>
              <span className="hidden md:inline lg:hidden">MESA, AZ & AREAS</span>
              <span className="md:hidden">MESA, AZ</span>
            </div>
          </div>
          
          {/* Social Media Icons - Right of center */}
          <div className="absolute left-1/2 flex items-center gap-3" style={{ transform: 'translateX(calc(-50% + 35%))' }}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
              <Facebook className="w-5 h-5 md:w-6 md:h-6" />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
              <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
            <a href="mailto:info@tenorioac.com" className="hover:scale-110 transition">
              <Mail className="w-5 h-5 md:w-6 md:h-6" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
              <Instagram className="w-5 h-5 md:w-6 md:h-6" />
            </a>
          </div>
          
          <button
            onClick={copyPhoneNumber}
            className="flex items-center gap-3 font-bold text-2xl md:text-4xl italic px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 transition transform hover:scale-105 shadow-lg"
          >
            <Phone className="w-6 h-6 md:w-8 md:h-8" />
            <span>Call Us: (480) 612-7134</span>
            {copied && (
              <span className="text-sm font-normal ml-2 animate-pulse">✓ Copied!</span>
            )}
          </button>
        </div>
      </div>

      {/* 1. NAVBAR */}
      <nav className="fixed top-[10vh] w-full shadow-sm z-40 py-4 px-8 flex justify-between items-center bg-white">
        <div className="flex items-center transform translate-x-[10%]">
          <img src="/img/Logo.png" alt="Tenorio AC Logo" className="h-32 md:h-40 object-contain" />
        </div>
        
        <div className="flex items-center gap-[10%] w-[30%] justify-end">
          <div className="hidden md:flex gap-12 font-black text-lg tracking-wide uppercase">
            <a 
              href="#inicio" 
              className="px-6 py-3 rounded-lg border-2 transition hover:scale-105 font-bold text-white"
              style={{ 
                backgroundColor: '#0056b3',
                borderColor: '#0056b3',
                fontFamily: 'Arial, sans-serif',
                letterSpacing: '0.05em'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#004a99';
                e.target.style.borderColor = '#004a99';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#0056b3';
                e.target.style.borderColor = '#0056b3';
              }}
            >
              {t('nav_home')}
            </a>
            <a 
              href="#servicios" 
              className="px-6 py-3 rounded-lg border-2 transition hover:scale-105 font-bold text-white"
              style={{ 
                backgroundColor: '#0056b3',
                borderColor: '#0056b3',
                fontFamily: 'Arial, sans-serif',
                letterSpacing: '0.05em'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#004a99';
                e.target.style.borderColor = '#004a99';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#0056b3';
                e.target.style.borderColor = '#0056b3';
              }}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('servicios');
                if (element) {
                  const offset = window.innerHeight * 0.1 + 80; // 10vh + navbar height
                  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                  const offsetPosition = elementPosition - offset;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              {t('nav_services')}
            </a>
          </div>

          {/* BOTONES DE IDIOMA */}
          <div className="flex rounded-lg p-1.5" style={{ backgroundColor: 'rgba(248, 249, 250, 0.6)' }}>
            <button 
              onClick={() => changeLanguage('es')}
              className={`px-4 py-2 rounded-md text-sm font-black tracking-wider transition ${i18n.language.includes('es') ? 'shadow-md scale-105' : ''}`}
              style={i18n.language.includes('es') ? { backgroundColor: 'white', color: '#0056b3' } : { color: '#343A40' }}
              onMouseEnter={(e) => { if (!i18n.language.includes('es')) e.target.style.color = '#0056b3' }}
              onMouseLeave={(e) => { if (!i18n.language.includes('es')) e.target.style.color = '#343A40' }}
            >
              Español
            </button>
            <button 
              onClick={() => changeLanguage('en')}
              className={`px-4 py-2 rounded-md text-sm font-black tracking-wider transition ${i18n.language.includes('en') ? 'shadow-md scale-105' : ''}`}
              style={i18n.language.includes('en') ? { backgroundColor: 'white', color: '#0056b3' } : { color: '#343A40' }}
              onMouseEnter={(e) => { if (!i18n.language.includes('en')) e.target.style.color = '#0056b3' }}
              onMouseLeave={(e) => { if (!i18n.language.includes('en')) e.target.style.color = '#343A40' }}
            >
              English
            </button>
          </div>

          <a href="#citas" className="px-8 py-3 rounded-full transition text-base font-black tracking-wide uppercase shadow-lg hover:shadow-xl hover:scale-105" style={{ backgroundColor: '#FFB800', color: '#343A40' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#ffc933'} onMouseLeave={(e) => e.target.style.backgroundColor = '#FFB800'}>
            {t('nav_btn')}
          </a>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <header id="inicio" className="h-screen flex flex-col justify-center items-center text-center px-4 pt-[calc(10vh+80px)] relative overflow-hidden">
        {/* Background Images with Blur */}
        <div className="absolute inset-0 z-0">
          {heroImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(1px) brightness(0.95)',
                transform: 'scale(1.1)',
              }}
            />
          ))}
        </div>
        {/* Overlay for text readability */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-black/30 to-black/40"></div>
        
        {/* Content */}
        <div className="relative z-20">
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 uppercase tracking-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
            {t('hero_title')} <span className="text-blue-300">{t('hero_span')}</span>
          </h1>
          <p className="text-2xl md:text-3xl text-white max-w-3xl mb-12 font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] mx-auto text-center">
            {t('hero_sub')}
          </p>
          <div className="flex gap-6 justify-center">
            <a href="#citas" className="px-10 py-5 rounded-lg text-xl font-bold shadow-2xl transition transform hover:scale-105 hover:shadow-xl" style={{ backgroundColor: '#FFB800', color: '#343A40' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#ffc933'} onMouseLeave={(e) => e.target.style.backgroundColor = '#FFB800'}>
              {t('btn_now')}
            </a>
            <a href="#servicios" className="border-3 border-white text-white px-10 py-5 rounded-lg text-xl font-bold hover:bg-white/20 transition bg-white/10 backdrop-blur-sm shadow-2xl">
              {t('btn_view')}
            </a>
          </div>
        </div>
      </header>

      {/* 3. SERVICIOS */}
      <section id="servicios" className="py-24 px-8 relative overflow-hidden scroll-mt-[calc(10vh+80px)]" style={{ backgroundColor: '#F8F9FA' }}>
        {/* Snowflakes Animation */}
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
              }}
            >
              ❄
            </div>
          ))}
        </div>
        
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-center mb-4" style={{ color: '#343A40' }}>{t('s_title')}</h2>
          <p className="text-center mb-16 max-w-3xl mx-auto" style={{ color: '#343A40' }}>
            {t('s_subtitle')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* Card 1 - System Installation */}
          <div className="p-8 border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl transition group">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition" style={{ backgroundColor: 'rgba(0, 86, 179, 0.1)', color: '#0056b3' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0056b3'; e.currentTarget.style.color = 'white' }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0, 86, 179, 0.1)'; e.currentTarget.style.color = '#0056b3' }}>
              <Hammer className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#343A40' }}>{t('s_inst')}</h3>
            <p style={{ color: '#343A40' }}>{t('s_inst_desc')}</p>
          </div>
          {/* Card 2 - Reliable Repairs */}
          <div className="p-8 border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl transition group">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition" style={{ backgroundColor: 'rgba(0, 86, 179, 0.1)', color: '#0056b3' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0056b3'; e.currentTarget.style.color = 'white' }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0, 86, 179, 0.1)'; e.currentTarget.style.color = '#0056b3' }}>
              <ClipboardCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#343A40' }}>{t('s_rep')}</h3>
            <p style={{ color: '#343A40' }}>{t('s_rep_desc')}</p>
          </div>
          {/* Card 3 - Upgrade Consultation */}
          <div className="p-8 border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl transition group">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition" style={{ backgroundColor: 'rgba(0, 86, 179, 0.1)', color: '#0056b3' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0056b3'; e.currentTarget.style.color = 'white' }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0, 86, 179, 0.1)'; e.currentTarget.style.color = '#0056b3' }}>
              <ArrowUpCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#343A40' }}>{t('s_upgrade')}</h3>
            <p style={{ color: '#343A40' }}>{t('s_upgrade_desc')}</p>
          </div>
          {/* Card 4 - Routine Maintenance */}
          <div className="p-8 border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl transition group">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition" style={{ backgroundColor: 'rgba(0, 86, 179, 0.1)', color: '#0056b3' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0056b3'; e.currentTarget.style.color = 'white' }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0, 86, 179, 0.1)'; e.currentTarget.style.color = '#0056b3' }}>
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#343A40' }}>{t('s_maint')}</h3>
            <p style={{ color: '#343A40' }}>{t('s_maint_desc')}</p>
          </div>
          {/* Card 5 - Emergency Service */}
          <div className="p-8 border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl transition group">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition relative" style={{ backgroundColor: 'rgba(0, 86, 179, 0.1)', color: '#0056b3' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0056b3'; e.currentTarget.style.color = 'white' }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0, 86, 179, 0.1)'; e.currentTarget.style.color = '#0056b3' }}>
              <Phone className="w-6 h-6" />
              <AlertCircle className="w-3 h-3 absolute top-0 right-0 text-red-500" />
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#343A40' }}>{t('s_emergency')}</h3>
            <p style={{ color: '#343A40' }}>{t('s_emergency_desc')}</p>
          </div>
          {/* Card 6 - Ducting */}
          <div className="p-8 border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl transition group">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition" style={{ backgroundColor: 'rgba(0, 86, 179, 0.1)', color: '#0056b3' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0056b3'; e.currentTarget.style.color = 'white' }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0, 86, 179, 0.1)'; e.currentTarget.style.color = '#0056b3' }}>
              <Wind className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#343A40' }}>{t('s_ducting')}</h3>
            <p style={{ color: '#343A40' }}>{t('s_ducting_desc')}</p>
          </div>
          {/* Card 7 - Sales */}
          <div className="p-8 border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl transition group">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition" style={{ backgroundColor: 'rgba(0, 86, 179, 0.1)', color: '#0056b3' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0056b3'; e.currentTarget.style.color = 'white' }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0, 86, 179, 0.1)'; e.currentTarget.style.color = '#0056b3' }}>
              <Tag className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#343A40' }}>{t('s_sales')}</h3>
            <p style={{ color: '#343A40' }}>{t('s_sales_desc')}</p>
          </div>
          {/* Card 8 - New Construction & Renovations */}
          <div className="p-8 border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl transition group">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition" style={{ backgroundColor: 'rgba(0, 86, 179, 0.1)', color: '#0056b3' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0056b3'; e.currentTarget.style.color = 'white' }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0, 86, 179, 0.1)'; e.currentTarget.style.color = '#0056b3' }}>
              <HardHat className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#343A40' }}>{t('s_construction')}</h3>
            <p style={{ color: '#343A40' }}>{t('s_construction_desc')}</p>
          </div>
          </div>
        </div>
      </section>

      {/* BRANDS SECTION */}
      <section className="py-16 px-8" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black text-center mb-12 italic transform skew-x-[-12deg]" style={{ color: '#343A40' }}>
            Free Quotes Any Brand
          </h1>
          <div className="overflow-hidden relative w-full">
            <div className="flex items-center gap-8 md:gap-12 lg:gap-16 brands-carousel whitespace-nowrap">
              {/* Primera serie de logos */}
              <img 
                src="/img/logobrands/Goodman_Global_logo_svg.avif" 
                alt="Goodman" 
                className="h-[43px] md:h-[58px] lg:h-[72px] shrink-0 object-contain transition-all duration-300 hover:scale-110"
              />
              <img 
                src="/img/logobrands/york.avif" 
                alt="York" 
                className="h-[43px] md:h-[58px] lg:h-[72px] shrink-0 object-contain transition-all duration-300 hover:scale-110"
              />
              <img 
                src="/img/logobrands/carrier.avif" 
                alt="Carrier" 
                className="h-[43px] md:h-[58px] lg:h-[72px] shrink-0 object-contain transition-all duration-300 hover:scale-110"
              />
              <img 
                src="/img/logobrands/trane.avif" 
                alt="Trane" 
                className="h-[43px] md:h-[58px] lg:h-[72px] shrink-0 object-contain transition-all duration-300 hover:scale-110"
              />
              <img 
                src="/img/logobrands/bosch.avif" 
                alt="Bosch" 
                className="h-[43px] md:h-[58px] lg:h-[72px] shrink-0 object-contain transition-all duration-300 hover:scale-110"
              />
              <img 
                src="/img/logobrands/daikin-logo.avif" 
                alt="Daikin" 
                className="h-[43px] md:h-[58px] lg:h-[72px] shrink-0 object-contain transition-all duration-300 hover:scale-110"
              />
              {/* Segunda serie de logos */}
              <img 
                src="/img/logobrands/Goodman_Global_logo_svg.avif" 
                alt="Goodman" 
                className="h-[43px] md:h-[58px] lg:h-[72px] shrink-0 object-contain transition-all duration-300 hover:scale-110"
              />
              <img 
                src="/img/logobrands/york.avif" 
                alt="York" 
                className="h-[43px] md:h-[58px] lg:h-[72px] shrink-0 object-contain transition-all duration-300 hover:scale-110"
              />
              <img 
                src="/img/logobrands/carrier.avif" 
                alt="Carrier" 
                className="h-[43px] md:h-[58px] lg:h-[72px] shrink-0 object-contain transition-all duration-300 hover:scale-110"
              />
              <img 
                src="/img/logobrands/trane.avif" 
                alt="Trane" 
                className="h-[43px] md:h-[58px] lg:h-[72px] shrink-0 object-contain transition-all duration-300 hover:scale-110"
              />
              <img 
                src="/img/logobrands/bosch.avif" 
                alt="Bosch" 
                className="h-[43px] md:h-[58px] lg:h-[72px] shrink-0 object-contain transition-all duration-300 hover:scale-110"
              />
              <img 
                src="/img/logobrands/daikin-logo.avif" 
                alt="Daikin" 
                className="h-[43px] md:h-[58px] lg:h-[72px] shrink-0 object-contain transition-all duration-300 hover:scale-110"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECCIÓN DE CITAS */}
      <section id="citas" className="py-24 px-8" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-30 lg:gap-42 items-center">
            {/* Sección de Citas - Izquierda */}
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#343A40' }}>{t('nav_btn')}</h2>
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* First Name y Last Name */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-semibold mb-2" style={{ color: '#343A40' }}>
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        placeholder="First Name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-semibold mb-2" style={{ color: '#343A40' }}>
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        placeholder="Last Name"
                        required
                      />
                    </div>
                  </div>

                  {/* Email y Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: '#343A40' }}>
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        placeholder="Email"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold mb-2" style={{ color: '#343A40' }}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        placeholder="Phone Number"
                        required
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold mb-2" style={{ color: '#343A40' }}>
                      How can we help you?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="5"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                      placeholder="Describe how we can help you..."
                      required
                    />
                  </div>

                  {/* Status Message */}
                  {formStatus.message && (
                    <div className={`p-4 rounded-lg ${
                      formStatus.type === 'success' 
                        ? 'bg-green-50 text-green-800 border border-green-200' 
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}>
                      <p className="text-sm font-medium">{formStatus.message}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-lg font-bold text-lg uppercase tracking-wide transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                    style={{ backgroundColor: '#FFB800', color: '#343A40' }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) e.target.style.backgroundColor = '#ffc933';
                    }}
                    onMouseLeave={(e) => {
                      if (!isSubmitting) e.target.style.backgroundColor = '#FFB800';
                    }}
                  >
                    {isSubmitting ? 'Enviando...' : 'SUBMIT INFORMATION'}
                  </button>
                </form>
              </div>
            </div>

            {/* Carrusel de Imágenes - Derecha */}
            <div className="relative aspect-[1.6] w-full">
              {/* Botón Anterior */}
              <button
                onClick={prevCarouselImage}
                className="absolute top-1/2 left-4 z-10 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 p-2 text-slate-700 shadow-lg backdrop-blur-sm hover:bg-white transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Previous image"
              >
                <ChevronLeft className="size-5" />
              </button>

              {/* Botón Siguiente */}
              <button
                onClick={nextCarouselImage}
                className="absolute top-1/2 right-4 z-10 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 p-2 text-slate-700 shadow-lg backdrop-blur-sm hover:bg-white transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Next image"
              >
                <ChevronRight className="size-5" />
              </button>

              {/* Indicadores */}
              <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 flex gap-2">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCarouselIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === carouselIndex
                        ? 'w-8 bg-white'
                        : 'w-2 bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Contenido del Carrusel */}
              <div className="relative w-full h-full overflow-hidden rounded-xl cursor-pointer" onClick={() => openModal(carouselIndex)}>
                {carouselImages.map((img, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      index === carouselIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`AC service image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-slate-100 text-center text-slate-500 text-sm">
        <p>© 2024 Tenorio AC. {t('footer_rights')}</p>
      </footer>

      {/* Modal de Imagen */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeModal}
        >
          {/* Botón Cerrar */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-[101] flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 backdrop-blur-sm"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Contenedor de la Imagen */}
          <div 
            className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón Anterior */}
            <button
              onClick={prevModalImage}
              className="absolute left-4 z-[101] flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 backdrop-blur-sm"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            {/* Imagen */}
            <img
              src={carouselImages[modalImageIndex]}
              alt={`AC service image ${modalImageIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />

            {/* Botón Siguiente */}
            <button
              onClick={nextModalImage}
              className="absolute right-4 z-[101] flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 backdrop-blur-sm"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Indicadores */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-[101]">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setModalImageIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === modalImageIndex
                      ? 'w-8 bg-white'
                      : 'w-2 bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App