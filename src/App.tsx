/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight, Award, History, Mail, MapPin, Phone, Instagram, Facebook, MessageCircle, X, ChevronRight, ChevronLeft, Gem, Users, Truck } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Images uploaded to public/
const galleryImages = Array.from({ length: 17 }, (_, i) => `img (${i + 1}).jpg`);

const RibbonDivider = () => (
  <div className="w-full flex-col flex relative z-20 shadow-lg">
    <div className="w-full h-1 bg-gradient-to-r from-gold-light via-gold to-gold-light opacity-90 shadow-sm relative z-10"></div>
    <div className="w-full h-6 sm:h-8 overflow-hidden relative border-y border-gold/30" style={{ background: 'linear-gradient(90deg, #1E293B, #0F172A)' }}>
      {/* Cintas moviéndose de izquierda a derecha simulando pliegues de cucarda */}
      <motion.div
        animate={{ x: [-40, 0] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 1.5 }}
        className="absolute inset-0 w-[calc(100%+80px)] flex"
        style={{
          backgroundImage: `
            linear-gradient(90deg, 
              rgba(255,255,255,0) 0px, 
              rgba(255,255,255,0.08) 10px, 
              rgba(0,0,0,0.15) 20px, 
              rgba(255,255,255,0) 40px
            ),
            url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20 L20 0 L40 20 L20 40 Z' fill='none' stroke='%23D4AF37' stroke-width='1.5' opacity='0.4'/%3E%3C/svg%3E")
          `,
          backgroundSize: '40px 100%, 40px 40px',
        }}
      />
      {/* Línea dorada central horizontal */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent -translate-y-1/2 opacity-70"></div>
    </div>
    <div className="w-full h-1 bg-gradient-to-r from-gold-light via-gold to-gold-light opacity-90 shadow-sm relative z-10"></div>
  </div>
);

const ContactModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({ nombre: '', email: '', telefono: '', mensaje: '' });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Consulta Web de ${formData.nombre}`);
    const body = encodeURIComponent(`Nombre: ${formData.nombre}\nE-mail: ${formData.email}\nTeléfono: ${formData.telefono}\n\nMensaje:\n${formData.mensaje}`);
    window.location.href = `mailto:info@cucardasgoyetche.com.ar?subject=${subject}&body=${body}`;
    onClose();
    setFormData({ nombre: '', email: '', telefono: '', mensaje: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative flex flex-col max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-gray-900 to-black p-6 sm:p-8 relative shrink-0">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-white/70 hover:text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight">Envíanos tu consulta</h3>
              <p className="text-gold-light text-sm sm:text-base opacity-90">Completa tus datos y nos pondremos en contacto.</p>
            </div>
            
            <div className="p-6 sm:p-8 overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-semibold text-gray-700 mb-1">Nombre y Apellido</label>
                  <input 
                    type="text" 
                    id="nombre" 
                    name="nombre" 
                    required 
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none transition-all text-gray-800"
                    placeholder="Tu nombre completo"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">E-mail</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required 
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none transition-all text-gray-800"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="telefono" className="block text-sm font-semibold text-gray-700 mb-1">Teléfono</label>
                    <input 
                      type="tel" 
                      id="telefono" 
                      name="telefono" 
                      required 
                      value={formData.telefono}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none transition-all text-gray-800"
                      placeholder="Tu teléfono"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="mensaje" className="block text-sm font-semibold text-gray-700 mb-1">Mensaje</label>
                  <textarea 
                    id="mensaje" 
                    name="mensaje" 
                    required 
                    rows={4}
                    value={formData.mensaje}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none transition-all resize-none text-gray-800"
                    placeholder="Escribe tu consulta aquí..."
                  ></textarea>
                </div>
                
                <div className="pt-2">
                  <button 
                    type="submit" 
                    className="w-full bg-gold hover:bg-gold-light text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center uppercase tracking-widest text-sm"
                  >
                    Enviar Mensaje <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(new Array(galleryImages.length).fill(false));

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') setSelectedImageIndex(null);
      if (e.key === 'ArrowRight') setSelectedImageIndex((prev) => (prev !== null && prev < galleryImages.length - 1 ? prev + 1 : 0));
      if (e.key === 'ArrowLeft') setSelectedImageIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : galleryImages.length - 1));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex]);

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-softgray">
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-shrink-0 flex items-center h-full py-2"
            >
              <img 
                className="h-full w-auto object-contain max-h-12 sm:max-h-14" 
                src="logo-cucardas-goyetch.svg" 
                alt="Logo Cucardas Goyetche"
              />
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6 lg:space-x-8 items-center">
              <a href="#inicio" className="text-gray-700 hover:text-primary px-3 py-2 text-sm lg:text-base font-semibold transition-colors">INICIO</a>
              <a href="#nosotros" className="text-gray-700 hover:text-primary px-3 py-2 text-sm lg:text-base font-semibold transition-colors">NOSOTROS</a>
              <a href="#galeria" className="text-gray-700 hover:text-primary px-3 py-2 text-sm lg:text-base font-semibold transition-colors">GALERÍA</a>
              <a href="#contacto" className="text-gray-700 hover:text-primary px-3 py-2 text-sm lg:text-base font-semibold transition-colors">CONTACTO</a>
              
              {/* Social Icons Desktop */}
              <div className="flex space-x-4 pl-4 border-l border-gray-200">
                <a href="https://wa.me/5491160540456" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-600 transition-colors">
                  <MessageCircle className="w-5 h-5 lg:w-6 lg:h-6" />
                </a>
              </div>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-primary focus:outline-none p-2"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-100 shadow-inner overflow-hidden"
            >
              <div className="px-4 py-4 space-y-2 flex flex-col">
                <a href="#inicio" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">INICIO</a>
                <a href="#nosotros" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">NOSOTROS</a>
                <a href="#galeria" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">GALERÍA</a>
                <a href="#contacto" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">CONTACTO</a>
                
                <div className="flex space-x-6 pt-4 pb-2 px-3 border-t border-gray-100 justify-center">
                  <a href="https://www.instagram.com/cucardas.goyetche/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary p-2 bg-gray-50 rounded-full">
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a href="https://www.facebook.com/CucardasGoyetche" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary p-2 bg-gray-50 rounded-full">
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a href="https://wa.me/5491160540456" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-600 p-2 bg-gray-50 rounded-full">
                    <MessageCircle className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-grow flex flex-col items-center w-full">
        {/* Hero Section */}
        <section id="inicio" className="w-full text-white py-6 sm:py-8 lg:py-10 relative overflow-hidden flex justify-center bg-gray-900">
          {/* Background Image & Gradient */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[url('/fondo3.jpg')] bg-fixed bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity grayscale"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#A91F23]/80 via-gray-900/80 to-black/90 backdrop-blur-[2px]"></div>
          </div>
          
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
              className="md:w-1/2 text-center md:text-left mb-10 md:mb-0 pb-4 md:pb-0"
            >
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6">
                <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-gold-light text-xs sm:text-sm font-bold tracking-[0.2em] uppercase drop-shadow-sm">
                  Desde 1965
                </div>
                <div className="inline-flex items-center px-3 py-1 bg-white/10 backdrop-blur-sm border border-gold/40 rounded-full text-white text-xs sm:text-sm font-bold tracking-[0.1em] uppercase drop-shadow-sm">
                  <MapPin className="w-3.5 h-3.5 text-gold mr-1.5" />
                  Envíos a todo el país
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3 sm:mb-4 leading-tight text-white drop-shadow-md">
                Tradición y Calidad en cada detalle
              </h1>
              <p className="text-sm sm:text-base text-gray-300 mb-6 max-w-xl mx-auto md:mx-0 leading-relaxed font-light">
                Fabricantes de cucardas, rosetas y galardones. Diseñamos con pasión para premiar los momentos más especiales, manteniendo un estándar de excelencia en todo el país.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
                <a href="#galeria" className="bg-gold hover:bg-gold-light text-gray-900 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest inline-flex items-center transition-all shadow-lg hover:shadow-gold/30 hover:-translate-y-0.5">
                  Ver Catálogo <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
              className="md:w-1/2 flex flex-col items-center justify-center p-2 sm:p-4 perspective-1000"
            >
               <div 
                 className="relative w-32 h-32 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-full p-2 sm:p-4 flex items-center justify-center drop-shadow-2xl"
               >
                  <div className="absolute inset-0 bg-gold/10 rounded-full blur-3xl animate-pulse"></div>
                  <img src="Iso logo-cucardas-goyetch.svg" alt="Isologo Cucardas Goyetche" className="w-full h-full object-contain relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-500 ease-out" />
               </div>
            </motion.div>
          </div>
        </section>

        {/* Divider */}
        <RibbonDivider />

        {/* About Us Section */}
        <section id="nosotros" className="w-full py-4 sm:py-6 lg:py-8 relative flex justify-center overflow-hidden bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-6 lg:gap-10">
              
              <motion.div 
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="w-full md:w-5/12 flex justify-center"
              >
                  <div className="w-full max-w-xs sm:max-w-sm h-32 sm:h-40 bg-gray-200 rounded-xl p-4 sm:p-6 flex items-center justify-center relative overflow-hidden shadow-sm border border-gray-100 mx-auto group">
                     {/* Skeleton Pulse Animation */}
                     <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-[pulse_2s_ease-in-out_infinite] opacity-60"></div>
                     <History className="w-24 h-24 text-primary opacity-5 absolute -bottom-4 -right-4 pointer-events-none group-hover:scale-110 transition-transform duration-700 z-0" />
                     <div className="text-center relative z-10 w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-400/30 rounded-lg h-full">
                       <p className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-[0.2em] mb-1">Desde</p>
                       <p className="text-3xl sm:text-4xl font-bold text-primary drop-shadow-sm">1965</p>
                     </div>
                  </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                className="w-full md:w-7/12"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-10 h-1 bg-gold rounded-full inline-block"></span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-primary">
                    Nuestra Historia
                  </h2>
                </div>
                
                <div className="text-gray-600 space-y-3 md:space-y-4 text-sm sm:text-base leading-relaxed">
                  <p>
                    Con más de medio siglo de trayectoria, en <strong className="text-gray-800">Cucardas Goyetche</strong> nos enorgullece ser un referente a nivel nacional en la confección de cucardas, reconocimientos y galardones.
                  </p>
                  <p>
                    Comenzamos como un modesto emprendimiento familiar y, gracias a nuestro compromiso inquebrantable con la calidad y la atención al detalle, hemos crecido acompañando exposiciones rurales, torneos deportivos, eventos escolares y corporativos a lo largo de las décadas.
                  </p>
                </div>
                
                <ul className="space-y-2 sm:space-y-3 mt-6 sm:mt-8">
                  {[
                    { text: "Materiales de primera calidad", icon: Gem },
                    { text: "Atención personalizada", icon: Users },
                    { text: "Envíos a todo el país", icon: Truck }
                  ].map((item, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.6 + (idx * 0.15) }}
                      className="flex items-center text-gray-700 bg-gray-50 rounded-lg p-3 sm:p-4 text-sm sm:text-base"
                    >
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gold mr-3 sm:mr-4 shrink-0" />
                      <span className="font-medium">{item.text}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <RibbonDivider />

        {/* Gallery Section replacing Catalog */}
        <section id="galeria" className="w-full py-6 sm:py-8 lg:py-10 relative flex justify-center overflow-hidden bg-softgray">
          {/* Background image in Gallery */}
          <div 
            className="absolute inset-0 opacity-20 sm:opacity-[0.25] mix-blend-multiply bg-fixed"
            style={{ 
              backgroundImage: "url('Fondo.jpg')", 
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-br from-softgray/95 via-gray-100/70 to-gray-200/90 pointer-events-none"></div>
          
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center mb-6 sm:mb-8 flex flex-col items-center"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-2 sm:mb-3">Trabajos</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">Una muestra de nuestra dedicación.</p>
            </motion.div>
            
            {/* Masonry / Grid Gallery */}
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 md:gap-6 w-full">
              {galleryImages.map((src, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "50px" }}
                  transition={{ duration: 0.6, delay: (index % 5) * 0.15 + 0.2, ease: "easeOut" }}
                  className="aspect-square relative overflow-hidden rounded-xl bg-gray-200 cursor-pointer shadow-sm hover:shadow-md group"
                  onClick={() => setSelectedImageIndex(index)}
                >
                  {!imagesLoaded[index] && (
                    <div className="absolute inset-0 bg-gray-300 animate-pulse" />
                  )}
                  <img 
                    src={src} 
                    alt={`Cucarda detalle ${index + 1}`} 
                    loading="lazy"
                    onLoad={() => {
                      setImagesLoaded(prev => {
                        const next = [...prev];
                        next[index] = true;
                        return next;
                      });
                    }}
                    className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${imagesLoaded[index] ? 'opacity-100' : 'opacity-0'}`} 
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center">
                    <motion.div 
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      className="bg-white/90 rounded-full p-2 text-primary shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 opacity-0 group-hover:opacity-100"
                    >
                      <ArrowRight className="w-5 h-5 -rotate-45" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
          >
             <button 
               className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/70 hover:text-white p-2 z-10 transition-colors"
               onClick={() => setSelectedImageIndex(null)}
             >
               <X className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow-md" />
             </button>

             <button 
               className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-2 z-10 transition-colors bg-black/20 hover:bg-black/40 rounded-full"
               onClick={(e) => {
                 e.stopPropagation();
                 setSelectedImageIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : galleryImages.length - 1));
               }}
             >
               <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10" />
             </button>

             <button 
               className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-2 z-10 transition-colors bg-black/20 hover:bg-black/40 rounded-full"
               onClick={(e) => {
                 e.stopPropagation();
                 setSelectedImageIndex((prev) => (prev !== null && prev < galleryImages.length - 1 ? prev + 1 : 0));
               }}
             >
               <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10" />
             </button>
             
             <motion.div 
                key={selectedImageIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="max-w-5xl w-full max-h-[85vh] sm:max-h-[90vh] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
             >
               <img 
                 src={galleryImages[selectedImageIndex]} 
                 alt="Cucarda ampliada" 
                 className="max-w-full max-h-[85vh] sm:max-h-[90vh] object-contain rounded shadow-2xl select-none"
               />
             </motion.div>
             
             <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 text-center text-white/70 text-sm">
               {selectedImageIndex + 1} / {galleryImages.length}
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer id="contacto" className="w-full text-white pt-6 sm:pt-8 pb-4 border-t-4 border-gold relative overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/fondo2.jpg')] bg-fixed bg-cover bg-center bg-no-repeat opacity-30 mix-blend-luminosity grayscale"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/95 via-[#1a1a1a]/95 to-black/95 backdrop-blur-[1px]"></div>
        </div>
        
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-6 lg:mb-8">
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="flex flex-col items-center md:items-start text-center md:text-left"
            >
              <img src="logo-cucardas-goyetch.svg" alt="Cucardas Goyetche Logo en recuadro" className="h-12 mb-4 brightness-0 invert opacity-90" />
              <p className="text-gray-400 mb-4 text-xs sm:text-sm max-w-sm leading-relaxed">
                Fabricando premios y reconocimientos de excelencia desde 1965. 
                Nuestra pasión por el detalle nos hace líderes en el país.
              </p>
              
              <div className="flex space-x-4 mt-2">
                <a href="https://www.instagram.com/cucardas.goyetche/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://www.facebook.com/CucardasGoyetche" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://wa.me/5491160540456" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10 hidden md:block">
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="flex flex-col items-center md:items-start text-center md:text-left"
            >
              <h4 className="text-sm sm:text-base font-bold text-white mb-5 sm:mb-6 uppercase tracking-widest relative after:content-[''] after:absolute after:-bottom-2 after:left-1/2 md:after:left-0 after:-translate-x-1/2 md:after:translate-x-0 after:w-10 after:h-0.5 after:bg-gold">Contacto</h4>
              <ul className="space-y-3 sm:space-y-4 text-gray-300 w-full flex flex-col items-center md:items-start text-xs sm:text-sm">
                <li className="flex items-center group">
                  <div className="bg-white/5 p-2 rounded-full mr-3 group-hover:bg-gold/20 transition-colors">
                    <MessageCircle className="w-4 h-4 text-gold shrink-0" />
                  </div>
                  <a href="https://wa.me/5491160540456" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">WhatsApp: +54 9 11 6054-0456</a>
                </li>
                <li className="flex items-center group cursor-pointer" onClick={() => setIsContactModalOpen(true)}>
                  <div className="bg-white/5 p-2 rounded-full mr-3 group-hover:bg-gold/20 transition-colors">
                    <Mail className="w-4 h-4 text-gold shrink-0" />
                  </div>
                  <span className="hover:text-gold transition-colors break-all">info@cucardasgoyetche.com.ar</span>
                </li>
                <li className="flex items-start group text-left max-w-[250px]">
                  <div className="bg-white/5 p-2 rounded-full mr-3 mt-1 group-hover:bg-gold/20 transition-colors shrink-0">
                    <MapPin className="w-4 h-4 text-gold" />
                  </div>
                  <span>Buenos Aires, Argentina<br/><span className="text-[10px] sm:text-xs text-gold/70 mt-1 block font-medium">Hacemos envíos a todo el país</span></span>
                </li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center md:items-start text-center md:text-left lg:border-l lg:border-white/10 lg:pl-10"
            >
              <h4 className="text-sm sm:text-base font-bold text-white mb-5 sm:mb-6 uppercase tracking-widest relative after:content-[''] after:absolute after:-bottom-2 after:left-1/2 md:after:left-0 after:-translate-x-1/2 md:after:translate-x-0 after:w-10 after:h-0.5 after:bg-gold">Atención</h4>
              <ul className="space-y-2 sm:space-y-3 text-gray-300 w-full flex flex-col items-center md:items-start text-xs sm:text-sm">
                <li className="flex flex-col w-full max-w-[200px] border-b border-white/10 pb-2">
                  <span className="text-gray-400 text-[10px] sm:text-xs uppercase tracking-wider mb-1">Lunes a Viernes</span>
                  <span className="font-semibold text-white">9:00 - 18:00 hs</span>
                </li>
                <li className="flex flex-col w-full max-w-[200px] pt-1 opacity-60">
                  <span className="text-gray-400 text-[10px] sm:text-xs uppercase tracking-wider mb-1">Fines de semana</span>
                  <span>Cerrado</span>
                </li>
              </ul>
            </motion.div>

          </div>
          
          <div className="border-t border-white/10 pt-8 mt-4 flex flex-col items-center text-xs sm:text-sm text-gray-500 w-full gap-4">
            <p className="text-center">&copy; {new Date().getFullYear()} Cucardas Goyetche. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

