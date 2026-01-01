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
          s_title: "OUR AIR CONDITIONING SERVICES",
          s_subtitle: "At Tenorio AirConditioning, we specialize in a range of air conditioning services to ensure your comfort all year round. Whether you need installation of a new system, regular maintenance to keep it running efficiently, or repairs to fix any issues WE ARE HERE TO SERVE.",
          s_maint: "Maintenance",
          s_maint_desc: "Deep cleaning and gas check to extend your equipment's life.",
          s_inst: "Installation",
          s_inst_desc: "We install your unit with high quality standards and warranty.",
          s_rep: "Repair",
          s_rep_desc: "Accurate diagnosis and fast technical repair for any fault.",
          s_upgrade: "Upgrade Consultation",
          s_upgrade_desc: "Expert advice on upgrading your AC system for better efficiency.",
          s_emergency: "Emergency Service",
          s_emergency_desc: "24/7 emergency AC repair service when you need it most.",
          s_ducting: "Ducting",
          s_ducting_desc: "Professional ductwork installation and repair services.",
          s_sales: "Sales",
          s_sales_desc: "Quality AC units and equipment at competitive prices.",
          s_construction: "New Construction & Renovations",
          s_construction_desc: "Complete AC solutions for new builds and renovations.",
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
          s_title: "NUESTROS SERVICIOS DE AIRE ACONDICIONADO",
          s_subtitle: "En Tenorio AirConditioning, nos especializamos en una gama de servicios de aire acondicionado para garantizar su comodidad durante todo el año. Ya sea que necesite instalación de un nuevo sistema, mantenimiento regular para mantenerlo funcionando eficientemente, o reparaciones para solucionar cualquier problema ESTAMOS AQUÍ PARA SERVIRLE.",
          s_maint: "Mantenimiento",
          s_maint_desc: "Limpieza profunda y revisión de gas para alargar la vida de tu equipo.",
          s_inst: "Instalación",
          s_inst_desc: "Instalamos tu unidad con estándares de alta calidad y garantía.",
          s_rep: "Reparación",
          s_rep_desc: "Diagnóstico preciso y reparación rápida de cualquier falla técnica.",
          s_upgrade: "Consulta de Mejoras",
          s_upgrade_desc: "Asesoría experta para mejorar tu sistema de aire acondicionado.",
          s_emergency: "Servicio de Emergencia",
          s_emergency_desc: "Servicio de reparación de emergencia 24/7 cuando más lo necesites.",
          s_ducting: "Ductería",
          s_ducting_desc: "Servicios profesionales de instalación y reparación de ductos.",
          s_sales: "Ventas",
          s_sales_desc: "Unidades de aire acondicionado y equipos de calidad a precios competitivos.",
          s_construction: "Construcción Nueva y Renovaciones",
          s_construction_desc: "Soluciones completas de AC para construcciones nuevas y renovaciones.",
          footer_rights: "Todos los derechos reservados."
        }
      }
    }
  });

export default i18n;