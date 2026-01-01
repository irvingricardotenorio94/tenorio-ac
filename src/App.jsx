import React from 'react'
import { useTranslation } from 'react-i18next';

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* 1. NAVBAR */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50 py-4 px-8 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">TENORIO AC</div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-8 font-medium">
            <a href="#inicio" className="hover:text-blue-500 transition">{t('nav_home')}</a>
            <a href="#servicios" className="hover:text-blue-500 transition">{t('nav_services')}</a>
          </div>

          {/* BOTONES DE IDIOMA */}
          <div className="flex bg-slate-100 rounded-lg p-1">
            <button 
              onClick={() => changeLanguage('es')}
              className={`px-3 py-1 rounded-md text-xs font-bold transition ${i18n.language.includes('es') ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}
            >
              ES
            </button>
            <button 
              onClick={() => changeLanguage('en')}
              className={`px-3 py-1 rounded-md text-xs font-bold transition ${i18n.language.includes('en') ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}
            >
              EN
            </button>
          </div>

          <a href="#citas" className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition text-sm font-bold">
            {t('nav_btn')}
          </a>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <header id="inicio" className="h-screen flex flex-col justify-center items-center text-center px-4 bg-gradient-to-b from-blue-50 to-white">
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6">
          {t('hero_title')} <span className="text-blue-600">{t('hero_span')}</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mb-10">
          {t('hero_sub')}
        </p>
        <div className="flex gap-4">
          <a href="#citas" className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-bold shadow-lg hover:shadow-blue-200 transition">
            {t('btn_now')}
          </a>
          <a href="#servicios" className="border-2 border-slate-200 px-8 py-4 rounded-lg text-lg font-bold hover:bg-slate-50 transition">
            {t('btn_view')}
          </a>
        </div>
      </header>

      {/* 3. SERVICIOS */}
      <section id="servicios" className="py-24 px-8 bg-white">
        <h2 className="text-3xl font-bold text-center mb-16">{t('s_title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="p-8 border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl transition group">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition text-2xl">
              ❄️
            </div>
            <h3 className="text-xl font-bold mb-3">{t('s_maint')}</h3>
            <p className="text-slate-600">{t('s_maint_desc')}</p>
          </div>
          {/* Card 2 */}
          <div className="p-8 border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl transition group">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition text-2xl">
              🔧
            </div>
            <h3 className="text-xl font-bold mb-3">{t('s_inst')}</h3>
            <p className="text-slate-600">{t('s_inst_desc')}</p>
          </div>
          {/* Card 3 */}
          <div className="p-8 border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl transition group">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition text-2xl">
              ⚡
            </div>
            <h3 className="text-xl font-bold mb-3">{t('s_rep')}</h3>
            <p className="text-slate-600">{t('s_rep_desc')}</p>
          </div>
        </div>
      </section>

      {/* 4. SECCIÓN DE CITAS */}
      <section id="citas" className="py-24 px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">{t('nav_btn')}</h2>
          <div className="bg-white p-8 rounded-3xl shadow-inner min-h-[400px] flex items-center justify-center border-2 border-dashed border-slate-200">
             <p className="text-slate-400 font-medium">Calendario próximamente...</p>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-slate-100 text-center text-slate-500 text-sm">
        <p>© 2024 Tenorio AC. {t('footer_rights')}</p>
      </footer>
    </div>
  )
}

export default App