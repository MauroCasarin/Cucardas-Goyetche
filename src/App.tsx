/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight, Award, History, Mail, MapPin, Phone, Instagram, Facebook, MessageCircle, X, ChevronRight, ChevronLeft } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Images uploaded to public/
const galleryImages = Array.from({ length: 17 }, (_, i) => `img (${i + 1}).jpg`);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

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
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 sm:h-24">
            {/* Logo */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-shrink-0 flex items-center h-full py-2"
            >
              <img 
                className="h-full w-auto object-contain max-h-16 sm:max-h-20" 
                src="logo-cucardas-goyetch.svg" 
                alt="Logo Cucardas Goyetche"
              />
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6 lg:space-x-8 items-center">
              <a href="#inicio" className="text-gray-700 hover:text-burgundy px-3 py-2 text-sm lg:text-base font-semibold transition-colors">INICIO</a>
              <a href="#nosotros" className="text-gray-700 hover:text-burgundy px-3 py-2 text-sm lg:text-base font-semibold transition-colors">NOSOTROS</a>
              <a href="#galeria" className="text-gray-700 hover:text-burgundy px-3 py-2 text-sm lg:text-base font-semibold transition-colors">GALERÍA</a>
              <a href="#contacto" className="text-gray-700 hover:text-burgundy px-3 py-2 text-sm lg:text-base font-semibold transition-colors">CONTACTO</a>
              
              {/* Social Icons Desktop */}
              <div className="flex space-x-4 pl-4 border-l border-gray-200">
                <a href="https://www.instagram.com/cucardas.goyetche/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-burgundy transition-colors">
                  <Instagram className="w-5 h-5 lg:w-6 lg:h-6" />
                </a>
                <a href="https://www.facebook.com/CucardasGoyetche" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-burgundy transition-colors">
                  <Facebook className="w-5 h-5 lg:w-6 lg:h-6" />
                </a>
              </div>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-burgundy focus:outline-none p-2"
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
                <a href="#inicio" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-burgundy hover:bg-gray-50">INICIO</a>
                <a href="#nosotros" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-burgundy hover:bg-gray-50">NOSOTROS</a>
                <a href="#galeria" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-burgundy hover:bg-gray-50">GALERÍA</a>
                <a href="#contacto" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-burgundy hover:bg-gray-50">CONTACTO</a>
                
                <div className="flex space-x-6 pt-4 pb-2 px-3 border-t border-gray-100 justify-center">
                  <a href="https://www.instagram.com/cucardas.goyetche/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-burgundy p-2 bg-gray-50 rounded-full">
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a href="https://www.facebook.com/CucardasGoyetche" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-burgundy p-2 bg-gray-50 rounded-full">
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
        <section id="inicio" className="w-full bg-burgundy text-white py-16 sm:py-24 lg:py-32 relative overflow-hidden flex justify-center">
          <div className="absolute inset-0 bg-black/20"></div>
          
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="md:w-1/2 text-center md:text-left mb-12 md:mb-0"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-4 sm:mb-6 leading-tight">
                Tradición y Calidad en cada detalle
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-200 mb-8 max-w-xl mx-auto md:mx-0">
                Fabricantes de cucardas, rosetas y galardones desde 1965. Premiando los mejores momentos.
              </p>
              <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                <a href="#galeria" className="bg-gold hover:bg-gold-light text-burgundy-dark font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 inline-flex items-center justify-center">
                  Ver Trabajos
                </a>
                <a href="https://wa.me/5491160540456" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold py-3 px-8 rounded-full transition-colors inline-flex items-center justify-center backdrop-blur-sm">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp
                </a>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:w-1/2 flex justify-center"
            >
               <motion.div 
                 animate={{ rotate: [0, 5, -5, 0] }}
                 transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                 className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full border-4 border-gold p-2 bg-white/10 shadow-2xl backdrop-blur-sm flex items-center justify-center"
               >
                  <Award className="w-24 h-24 sm:w-32 sm:h-32 text-gold opacity-90 drop-shadow-lg" />
               </motion.div>
            </motion.div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="nosotros" className="w-full py-16 sm:py-20 lg:py-24 bg-white flex justify-center">
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-16">
              
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="w-full md:w-5/12 flex justify-center"
              >
                 <div className="aspect-square bg-softgray rounded-2xl p-6 sm:p-10 flex items-center justify-center relative overflow-hidden shadow-sm border border-gray-100 max-w-xs sm:max-w-sm w-full mx-auto group">
                    <History className="w-40 h-40 text-burgundy opacity-5 absolute -bottom-8 -right-8 pointer-events-none group-hover:scale-110 transition-transform duration-700" />
                    <div className="text-center relative z-10 w-full flex flex-col items-center">
                      <p className="text-5xl sm:text-6xl font-bold text-burgundy mb-1 sm:mb-2 drop-shadow-sm">1965</p>
                      <p className="text-sm sm:text-base font-semibold text-gray-500 uppercase tracking-[0.3em]">Desde</p>
                    </div>
                 </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="w-full md:w-7/12"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-10 h-1 bg-gold rounded-full inline-block"></span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-burgundy">
                    Nuestra Historia
                  </h2>
                </div>
                
                <div className="text-gray-600 space-y-4 md:space-y-6 text-sm sm:text-base lg:text-lg leading-relaxed">
                  <p>
                    Con más de medio siglo de trayectoria, en <strong className="text-gray-800">Cucardas Goyetche</strong> nos enorgullece ser un referente a nivel nacional en la confección de cucardas, reconocimientos y galardones.
                  </p>
                  <p>
                    Comenzamos como un modesto emprendimiento familiar y, gracias a nuestro compromiso inquebrantable con la calidad y la atención al detalle, hemos crecido acompañando exposiciones rurales, torneos deportivos, eventos escolares y corporativos a lo largo de las décadas.
                  </p>
                </div>
                
                <ul className="space-y-3 sm:space-y-4 mt-8 sm:mt-10">
                  {[
                    "Materiales de primera calidad",
                    "Atención personalizada",
                    "Envíos a todo el país"
                  ].map((item, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center text-gray-700 bg-gray-50 rounded-lg p-3 sm:p-4 text-sm sm:text-base"
                    >
                      <Award className="w-5 h-5 sm:w-6 sm:h-6 text-gold mr-3 sm:mr-4 shrink-0" />
                      <span className="font-medium">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Gallery Section replacing Catalog */}
        <section id="galeria" className="w-full py-16 sm:py-20 lg:py-24 bg-softgray flex justify-center border-t border-gray-200/50">
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-14 flex flex-col items-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-burgundy mb-4 sm:mb-6">Trabajos Recientes</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg">Una muestra de nuestra dedicación. Haz clic en las imágenes para ampliarlas y ver el detalle de cada cucarda y roseta.</p>
            </div>
            
            {/* Masonry / Grid Gallery */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 w-full">
              {galleryImages.map((src, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "50px" }}
                  transition={{ duration: 0.4, delay: (index % 4) * 0.1 }}
                  className="aspect-square relative overflow-hidden rounded-xl bg-gray-200 cursor-pointer shadow-sm hover:shadow-md group"
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img 
                    src={src} 
                    alt={`Cucarda detalle ${index + 1}`} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-burgundy/0 group-hover:bg-burgundy/20 transition-colors duration-300 flex items-center justify-center">
                    <motion.div 
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      className="bg-white/90 rounded-full p-2 text-burgundy shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 opacity-0 group-hover:opacity-100"
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
      <footer id="contacto" className="w-full bg-[#1a1a1a] text-white pt-16 sm:pt-20 pb-8 border-t-4 border-gold">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 mb-12 lg:mb-16">
            
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <img src="logo-cucardas-goyetch.svg" alt="Cucardas Goyetche Logo en recuadro" className="h-16 mb-6 brightness-0 invert opacity-90" />
              <p className="text-gray-400 mb-6 text-sm sm:text-base max-w-sm leading-relaxed">
                Fabricando premios y reconocimientos de excelencia desde 1965. 
                Nuestra pasión por el detalle nos hace líderes en el país.
              </p>
              
              <div className="flex space-x-5 mt-2">
                <a href="https://www.instagram.com/cucardas.goyetche/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10">
                  <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
                <a href="https://www.facebook.com/CucardasGoyetche" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10">
                  <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
                <a href="https://wa.me/5491160540456" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10 hidden md:block">
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h4 className="text-base sm:text-lg font-bold text-white mb-6 sm:mb-8 uppercase tracking-widest relative after:content-[''] after:absolute after:-bottom-3 after:left-1/2 md:after:left-0 after:-translate-x-1/2 md:after:translate-x-0 after:w-12 after:h-0.5 after:bg-gold">Contacto</h4>
              <ul className="space-y-4 sm:space-y-5 text-gray-300 w-full flex flex-col items-center md:items-start text-sm sm:text-base">
                <li className="flex items-center group">
                  <div className="bg-white/5 p-2 rounded-full mr-3 sm:mr-4 group-hover:bg-gold/20 transition-colors">
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-gold shrink-0" />
                  </div>
                  <a href="https://wa.me/5491160540456" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">+54 9 11 6054-0456</a>
                </li>
                <li className="flex items-center group">
                  <div className="bg-white/5 p-2 rounded-full mr-3 sm:mr-4 group-hover:bg-gold/20 transition-colors">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gold shrink-0" />
                  </div>
                  <a href="mailto:info@cucardasgoyetche.com.ar" className="hover:text-gold transition-colors break-all">info@cucardasgoyetche.com.ar</a>
                </li>
                <li className="flex items-start group text-left max-w-[250px]">
                  <div className="bg-white/5 p-2 rounded-full mr-3 sm:mr-4 mt-1 group-hover:bg-gold/20 transition-colors shrink-0">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
                  </div>
                  <span>Buenos Aires, Argentina<br/><span className="text-xs sm:text-sm text-gold/70 mt-1 block font-medium">Hacemos envíos a todo el país</span></span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-center md:items-start text-center md:text-left lg:border-l lg:border-white/10 lg:pl-10">
              <h4 className="text-base sm:text-lg font-bold text-white mb-6 sm:mb-8 uppercase tracking-widest relative after:content-[''] after:absolute after:-bottom-3 after:left-1/2 md:after:left-0 after:-translate-x-1/2 md:after:translate-x-0 after:w-12 after:h-0.5 after:bg-gold">Atención</h4>
              <ul className="space-y-3 sm:space-y-4 text-gray-300 w-full flex flex-col items-center md:items-start text-sm sm:text-base">
                <li className="flex flex-col w-full max-w-[200px] border-b border-white/10 pb-3">
                  <span className="text-gray-400 text-xs sm:text-sm uppercase tracking-wider mb-1">Lunes a Viernes</span>
                  <span className="font-semibold text-white">9:00 - 18:00 hs</span>
                </li>
                <li className="flex flex-col w-full max-w-[200px] pt-1 opacity-60">
                  <span className="text-gray-400 text-xs sm:text-sm uppercase tracking-wider mb-1">Fines de semana</span>
                  <span>Cerrado</span>
                </li>
              </ul>
            </div>

          </div>
          
          <div className="border-t border-white/10 pt-8 mt-4 flex flex-col md:flex-row justify-between items-center text-xs sm:text-sm text-gray-500 w-full gap-4">
            <p className="text-center md:text-left">&copy; {new Date().getFullYear()} Cucardas Goyetche. Todos los derechos reservados.</p>
            <p className="text-center md:text-right">Diseño web UX/UI Modernizado</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

