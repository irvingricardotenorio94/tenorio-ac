import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'en', 
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          nav_home: "Home",
          nav_services: "Services",
          nav_btn: "Book Appointment",
          hero_title: "Your comfort is",
          hero_span: "our priority",
          hero_sub: "Professional AC installation, maintenance, and repair services.",
          btn_now: "Book Now",
          btn_view: "View Services",
          s_title: "Our Services",
          s_maint: "Maintenance",
          s_maint_desc: "Deep cleaning and gas check to extend your equipment's life.",
          s_inst: "Installation",
          s_inst_desc: "We install your unit with high quality standards and warranty.",
          s_rep: "Repair",
          s_rep_desc: "Accurate diagnosis and fast technical repair for any fault.",
          footer_rights: "All rights reserved."
        }
      },
      es: {
        translation: {
          nav_home: "Inicio",
          nav_services: "Servicios",
          nav_btn: "Agendar Cita",
          hero_title: "Tu confort es",
          hero_span: "nuestra prioridad",
          hero_sub: "Servicio profesional de instalación, mantenimiento y reparación.",
          btn_now: "Reservar Ahora",
          btn_view: "Ver Servicios",
          s_title: "Nuestros Servicios",
          s_maint: "Mantenimiento",
          s_maint_desc: "Limpieza profunda y revisión de gas para alargar la vida de tu equipo.",
          s_inst: "Instalación",
          s_inst_desc: "Instalamos tu unidad con estándares de alta calidad y garantía.",
          s_rep: "Reparación",
          s_rep_desc: "Diagnóstico preciso y reparación rápida de cualquier falla técnica.",
          footer_rights: "Todos los derechos reservados."
        }
      }
    }
  });

export default i18n;