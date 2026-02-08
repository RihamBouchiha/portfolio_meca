"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Menu, X, Download, ArrowRight, Mail, Phone, MapPin } from "lucide-react";
// Assure-toi que ce composant existe, sinon remplace par une simple image dans le code
import ProjectCarousel from "../components/ProjectCarousel"; 

const HeroSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Parallax simple pour le background
  const { scrollY } = useScroll();
  const yBackground = useTransform(scrollY, [0, 1000], [0, 300]);
 
  // --- Animation des particules (Responsive & Optimisée) ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
    
    // Détection mobile pour réduire la charge
    const isMobile = window.innerWidth < 768;
    const numParticles = isMobile ? 25 : 60; 
    const connectionDistance = isMobile ? 80 : 120;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Initialisation
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.2, 
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 1.5 + 0.5, 
      });
    }

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(255, 255, 255, 0.4)"; 
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        particles.forEach((p2) => {
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < connectionDistance) {
                ctx.beginPath();
                // Opacité dynamique basée sur la distance
                ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 - dist/(connectionDistance * 10)})`; 
                ctx.lineWidth = 0.5;
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        });
      });
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleScroll = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Offset plus grand sur mobile pour la navbar
      const offset = window.innerWidth < 768 ? 60 : 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // --- Composants UI Réutilisables ---
  
  const CornerBrackets = () => (
    <>
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/50 transition-all duration-300 group-hover:w-4 group-hover:h-4"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/50 transition-all duration-300 group-hover:w-4 group-hover:h-4"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/50 transition-all duration-300 group-hover:w-4 group-hover:h-4"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/50 transition-all duration-300 group-hover:w-4 group-hover:h-4"></div>
    </>
  );

  const SectionHeading = ({ number, title }: { number: string, title: string }) => (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex items-center gap-4 mb-12 md:mb-20"
    >
        <span className="font-mono text-xs border border-white/20 px-2 py-1 text-gray-400">{number}</span>
        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight break-words">{title}</h2>
    </motion.div>
  );

  return (
    <div className="relative min-h-screen bg-[#050505] text-gray-200 selection:bg-white selection:text-black font-sans overflow-x-hidden">
      
      {/* Texture Noise */}
      <div className="fixed inset-0 opacity-[0.04] pointer-events-none z-[1] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* Background Canvas & Grid */}
      <div className="fixed inset-0 z-0 bg-black">
         <motion.div style={{ y: yBackground }} className="absolute inset-0 w-full h-full">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60"></canvas>
         </motion.div>
         <div className="absolute inset-0 opacity-[0.03]" 
              style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
         </div>
      </div>

      {/* Navbar Technique */}
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="flex justify-between items-center px-4 md:px-6 py-4 max-w-7xl mx-auto">
            <div className="font-mono font-bold text-base md:text-lg border border-white/50 px-3 py-1 tracking-widest hover:bg-white hover:text-black transition-colors cursor-pointer z-50" onClick={() => handleScroll('accueil')}>
                IO.SYS
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-1">
                {["accueil", "sur-moi", "parcours", "projets", "contact"].map((item) => (
                <button 
                    key={item}
                    onClick={() => handleScroll(item)} 
                    className="px-4 py-2 font-mono text-xs text-gray-400 hover:text-white hover:bg-white/10 transition-all uppercase tracking-wider relative group"
                >
                    {item.replace("-", " ")}
                    <span className="absolute bottom-1 left-4 w-0 h-[1px] bg-white transition-all group-hover:w-[calc(100%-32px)]"></span>
                </button>
                ))}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden z-50 p-2 text-white border border-white/20"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
               {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 md:hidden"
          >
             {["accueil", "sur-moi", "parcours", "projets", "contact"].map((item, idx) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => handleScroll(item)}
                  className="text-2xl font-bold uppercase tracking-widest hover:text-green-500 transition-colors"
                >
                  {item.replace("-", " ")}
                </motion.button>
             ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="accueil" className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-20 md:pt-0">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Colonne Texte */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="lg:col-span-7 space-y-6 md:space-y-8 text-left order-2 lg:order-1"
            >
                <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-green-500 animate-pulse rounded-full"></span>
                    <span className="font-mono text-[10px] md:text-xs text-green-500 tracking-widest uppercase">System Online • Open to work</span>
                </div>
                
                <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tighter text-white mix-blend-screen">
                    ISSAM<br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">OUFADEL</span>
                </h1>
                
                <div className="h-px w-full bg-gradient-to-r from-white/50 to-transparent"></div>
                
                <p className="text-lg md:text-2xl font-light text-gray-400 max-w-xl leading-relaxed">
                    Ingénieur d&apos;État <strong className="text-white font-medium">Génie Mécanique</strong>.
                    <br/><span className="font-mono text-xs md:text-sm text-gray-500 uppercase tracking-wide block mt-2">Spécialiste en fabrication et usinage CNC | Simulation et modélisation numérique | Usinage de précision | Automatisation et programmation Python </span>
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button onClick={() => handleScroll("contact")} className="relative w-full sm:w-auto bg-white text-black px-8 py-4 font-bold text-xs uppercase tracking-[0.2em] hover:bg-gray-300 transition-colors group text-center">
                        Me contacter
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                    </button>
                    <button onClick={() => handleScroll("projets")} className="w-full sm:w-auto border border-white/30 px-8 py-4 font-bold text-xs uppercase tracking-[0.2em] text-white hover:border-white hover:bg-white/5 transition-all text-center">
                        Explorer Data
                    </button>
                </div>
            </motion.div>

            {/* Colonne Image - Style Technique */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="lg:col-span-5 relative flex justify-center lg:justify-end order-1 lg:order-2 mb-8 lg:mb-0"
            >
                <div className="relative w-64 h-80 sm:w-80 sm:h-96 md:w-[400px] md:h-[500px]">
                    {/* Cadres décoratifs */}
                    <div className="absolute top-4 -right-4 w-full h-full border border-white/20 hidden sm:block"></div>
                    <div className="absolute -bottom-4 -left-4 w-full h-full border border-dashed border-white/20 hidden sm:block"></div>
                    
                    <div className="w-full h-full bg-gray-900 border border-white/10 relative overflow-hidden group">
                         {/* Effet scanline sur l'image */}
                         <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 pointer-events-none bg-[length:100%_2px,3px_100%]"></div>
                         
                         <Image
                            src="/issam.png"
                            alt="Issam Oufadel"
                            fill
                            priority
                            className="object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                        />
                    </div>
                    {/* Label technique */}
                    <div className="absolute -bottom-6 sm:-bottom-10 right-0 font-mono text-[8px] sm:text-[10px] text-gray-500 text-right">
                        ID: OUFADEL_I<br/>LOC: MAROC/FRANCE
                    </div>
                </div>
            </motion.div>
        </div>
      </section>

      {/* Sur Moi */}
      <section id="sur-moi" className="relative z-10 py-20 md:py-32 px-4 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
             <SectionHeading number="01" title="Mission Statement" />
             
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xl md:text-3xl leading-relaxed font-light text-gray-300 text-left md:text-justify border-l-2 border-white/20 pl-6 md:pl-0 md:border-none">
                  "Concevoir avec précision, innover avec audace."
              </p>
              <p className="mt-8 text-base md:text-lg text-gray-400 leading-relaxed font-light max-w-2xl">
                  Ingénieur d&apos;État passionné, je fusionne <span className="text-white border-b border-white/30">conception mécanique</span> et intelligence industrielle. Mon objectif est clair : intégrer le secteur aéronautique (Safran, Airbus) pour développer les systèmes de production de demain.
              </p>
            </motion.div>
        </div>
      </section>

      {/* Éducation - Style Timeline */}
      <section id="parcours" className="relative z-10 py-20 md:py-32 px-4 border-t border-white/5 bg-white/[0.02]">
         <div className="max-w-6xl mx-auto">
            <SectionHeading number="02" title="Timeline" />

            <div className="relative border-l border-white/10 ml-2 md:ml-12 space-y-12 md:space-y-16">
                {[
                    { date: "2025", title: "Université Euro-Méditerranéenne", sub: "Ingénieur d'État - Génie Mécanique", desc: "Focus: Productique & Systèmes complexes" },
                    { date: "2022", title: "ESTF - Fès", sub: "DUT - Génie Thermique & Énergétique", desc: "Major de promotion" },
                    { date: "2020", title: "Baccalauréat", sub: "Sciences Physiques", desc: "Mention Très Bien" }
                ].map((edu, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.2 }}
                      className="relative pl-8 md:pl-12 group"
                    >
                        {/* Point interactif */}
                        <div className="absolute -left-[5px] top-2 w-[9px] h-[9px] bg-black border border-white/50 group-hover:bg-white group-hover:scale-150 transition-all duration-300"></div>
                        
                        <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-8">
                            <span className="font-mono text-xl md:text-2xl font-bold text-white/40 group-hover:text-white transition-colors">{edu.date}</span>
                            <div>
                                <h3 className="text-lg md:text-2xl font-bold text-white mb-1">{edu.title}</h3>
                                <p className="text-sm md:text-base text-gray-400 font-light">{edu.sub}</p>
                                <p className="font-mono text-[10px] md:text-xs text-gray-500 mt-2 uppercase tracking-wide border-l-2 border-white/20 pl-3 py-1">{edu.desc}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
         </div>
      </section>

      {/* Expériences - Cartes Industrielles */}
      <section id="experience" className="relative z-10 py-20 md:py-32 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
            <SectionHeading number="03" title="Expérience" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    company: "Safran Aircraft Engines",
                    loc: "Gennevilliers",
                    period: "2025",
                    role: "Stagiaire Ingénieur",
                    tasks: ["Automatisation plans de contrôle", "Liaison Modèles 3D / Rapports", "Machine Learning"]
                  },
                  {
                    company: "Jesa - Jacobs Engineering",
                    loc: "Rabat",
                    period: "2024",
                    role: "Stagiaire Projet",
                    tasks: ["Dimensionnement CVC", "Value Engineering", "Dossier d'achat"]
                  },
                  {
                    company: "Exprom Facilities",
                    loc: "Rabat",
                    period: "2023",
                    role: "Technicien Supérieur",
                    tasks: ["Maintenance CVC", "Méthode AMDEC", "Déploiement GMAO"]
                  },
                  {
                    company: "OLEA FOOD",
                    loc: "Meknès",
                    period: "2022",
                    role: "Stagiaire",
                    tasks: ["Efficacité Énergétique", "Chaudière fioul", "Photovoltaïque"]
                  }
                ].map((job, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="relative border border-white/10 bg-black/80 backdrop-blur-sm transition-all duration-500 hover:border-white/40 hover:bg-white/5 group overflow-hidden p-6 md:p-8 flex flex-col justify-between min-h-[280px] md:min-h-[320px]"
                    >
                        <CornerBrackets />
                        <div>
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-white transition-colors">{job.company}</h3>
                                    <p className="text-xs md:text-sm text-gray-400 italic mt-1">{job.role}</p>
                                </div>
                                <span className="font-mono text-[10px] md:text-xs border border-white/20 px-2 py-1 text-gray-500 group-hover:text-white group-hover:border-white transition-all whitespace-nowrap">
                                    {job.period}
                                </span>
                            </div>
                            
                            <ul className="space-y-3">
                                {job.tasks.map((t, k) => (
                                    <li key={k} className="flex items-start md:items-center text-xs md:text-sm text-gray-400 group-hover:text-gray-200 transition-colors">
                                        <span className="w-1 h-1 bg-white/50 mr-3 mt-1.5 md:mt-0 flex-shrink-0"></span>
                                        {t}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center opacity-50 group-hover:opacity-100 transition-opacity">
                            <span className="font-mono text-[10px] uppercase flex items-center gap-1"><MapPin size={10}/> {job.loc}</span>
                            <span className="font-mono text-[10px]">EXP_0{i+1}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* Projets - Grille Technique */}
      <section id="projets" className="relative z-10 py-20 md:py-32 px-4 border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
            <SectionHeading number="04" title="Projets R&D" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    { t: "Suspension MacPherson", d: "Optimisation structurelle sous ANSYS.", i: ["/p.png", "/image.png", "/p3.png"] },
                    { t: "Train d'atterrissage", d: "Modélisation dynamique et contrôle.", i: ["/i.png", "/i2.png", "/i3.png"] },
                    { t: "Drone Médical", d: "Aérodynamique & IA de reconnaissance.", i: ["/r.png", "/r2.png", "/r33.png"] },
                    { t: "Tuyère Soyouz", d: "Simulation CFD OpenFOAM Supersonique.", i: ["/s.png", "/s2.png", "/s3.png"] },
                    { t: "Rover Martien", d: "Design complet & Impression 3D.", i: ["/t.png", "/t.png", "/t.png"] },
                    { t: "Bras Robotique", d: "Étude cinématique & Fabrication.", i: ["/q.png", "/q.png", "/q2.png"] },
                ].map((p, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="group relative bg-black border border-white/10 hover:border-white/30 transition-all duration-500"
                    >
                        {/* Status bar */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-800 to-gray-900 group-hover:from-white group-hover:to-gray-400 transition-all duration-500 z-20"></div>
                        
                        <div className="relative h-48 md:h-56 w-full bg-gray-900 overflow-hidden">
                            <div className="absolute inset-0 opacity-80 group-hover:opacity-100 transition-all duration-500 grayscale group-hover:grayscale-0">
                                {/* Fallback si ProjectCarousel n'est pas dispo */}
                                {ProjectCarousel ? (
                                    <ProjectCarousel alt={p.t} images={p.i} />
                                ) : (
                                    <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-600 font-mono text-xs">NO IMAGE SIGNAL</div>
                                )}
                            </div>
                            {/* Overlay Grid sur image */}
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
                        </div>
                        
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-bold uppercase tracking-wide text-white">{p.t}</h3>
                                <span className="w-2 h-2 rounded-full bg-green-900 group-hover:bg-green-500 transition-colors shadow-[0_0_10px_rgba(0,255,0,0.2)]"></span>
                            </div>
                            <p className="text-sm text-gray-400 font-light leading-relaxed group-hover:text-gray-300">{p.d}</p>
                            
                            <div className="mt-6 flex items-center gap-2 text-xs font-mono text-gray-500 group-hover:text-white transition-colors cursor-pointer">
                                <span>VOIR DÉTAILS</span>
                                <ArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="relative z-10 py-20 md:py-32 px-4 border-t border-white/10 bg-black text-center">
         <motion.div 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="max-w-4xl mx-auto border border-white/10 p-8 md:p-20 relative overflow-hidden group"
         >
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-700"></div>
            <CornerBrackets />

            <h2 className="text-3xl md:text-7xl font-bold mb-8 uppercase tracking-tighter text-white">Prêt à collaborer ?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto font-mono text-sm mb-12">
                <div className="text-center md:text-right md:border-r border-white/20 md:pr-8">
                    <p className="text-gray-500 mb-1 flex items-center justify-center md:justify-end gap-2"><Mail size={12}/> EMAIL</p>
                    <a href="mailto:oufadelissam@gmail.com" className="text-white hover:underline break-all">oufadelissam@gmail.com</a>
                </div>
                <div className="text-center md:text-left md:pl-8">
                    <p className="text-gray-500 mb-1 flex items-center justify-center md:justify-start gap-2"><Phone size={12}/> PHONE</p>
                    <p className="text-white">+33 6 11 17 64 29</p>
                </div>
            </div>

            <div>
                <a href="/cv.pdf" download className="inline-flex items-center justify-center gap-3 border border-white px-8 md:px-10 py-4 uppercase font-bold tracking-[0.2em] text-[10px] md:text-xs hover:bg-white hover:text-black transition-all duration-300">
                    <span>Télécharger CV</span>
                    <Download size={14} />
                </a>
            </div>
         </motion.div>
         
         <div className="mt-16 flex flex-col md:flex-row justify-between max-w-7xl mx-auto text-[10px] font-mono text-gray-600 uppercase gap-2">
             <span>© 2025 ISSAM OUFADEL</span>
             <span className="flex items-center gap-2 justify-center"><span className="w-1 h-1 bg-green-500 rounded-full"></span> System Status: Stable</span>
         </div>
      </footer>
    </div>
  );
};

export default HeroSection;
