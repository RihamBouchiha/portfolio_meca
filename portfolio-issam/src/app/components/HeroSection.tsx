"use client";
import { useEffect, useRef } from "react";

const HeroSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];

    const numParticles = 80;
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
      });
    }

    const draw = () => {
      if (!ctx) return;

      ctx.fillStyle = "rgba(25, 25, 23, 1)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "white";
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Classes partagées pour toutes les sections
  const sectionClasses =
    "min-h-screen flex flex-col items-center justify-center px-6 text-center relative z-10 text-white";

  // Fonction pour scroll smooth avec offset
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // décalage pour le menu fixe
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative overflow-hidden scroll-smooth bg-black">
      {/* Canvas en arrière-plan */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0"></canvas>

      {/* Menu fixe */}
      <nav
        className="fixed top-0 left-0 w-full z-20 py-4 px-8 flex justify-center space-x-10 backdrop-blur-md"
        style={{
          background: "linear-gradient(to bottom, rgba(25,25,23,0.9), rgba(25,25,23,0))",
        }}
      >
        <button onClick={() => handleScroll("accueil")} className="hover:text-indigo-400 transition-colors">
          Accueil
        </button>
        <button onClick={() => handleScroll("sur-moi")} className="hover:text-indigo-400 transition-colors">
          Sur moi
        </button>
        <button onClick={() => handleScroll("education")} className="hover:text-indigo-400 transition-colors">
          Éducation
        </button>
        <button onClick={() => handleScroll("experience")} className="hover:text-indigo-400 transition-colors">
          Expérience
        </button>
        <button onClick={() => handleScroll("contact")} className="hover:text-indigo-400 transition-colors">
          Contact
        </button>
      </nav>

      {/* Section Accueil / Hero */}
      <section className={sectionClasses + " md:flex-row text-center md:text-left"} id="accueil">
        <div className="flex flex-col items-center md:items-start space-y-4">
          <div className="text-4xl font-bold">Salut, c'est Issam Oufadel !</div>
          <div className="text-lg text-gray-300">Ingénieur d'État en génie mécanique – Option productique.</div>
          <button
            onClick={() => handleScroll("contact")}
            className="mt-2 inline-block px-6 py-2 text-white font-medium rounded-lg transition-colors"
            style={{ backgroundColor: "rgba(143, 139, 126, 1)" }}
          >
            Contactez-moi
          </button>
        </div>
        <div className="relative w-80 h-80 rounded-full overflow-hidden shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:rotate-3 hover:brightness-110 mt-8 md:mt-0 md:ml-8">
          <img src="/issam.jpg" alt="Issam Oufadel" className="w-full h-full object-cover" />
          <div className="absolute inset-0 rounded-full ring-2 ring-indigo-400 opacity-0 hover:opacity-50 transition-opacity duration-500"></div>
        </div>
      </section>

      {/* Section Sur Moi */}
      <section className={sectionClasses} id="sur-moi">
        <h2 className="text-5xl font-bold mb-12">Sur moi</h2>
        <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
          Ingénieur d’État en génie mécanique, je vous présente à travers ce portfolio une sélection
          de mes projets académiques et de mes expériences industrielles les plus significatives.
          <br />
          Je suis très intéressé par le domaine aéronautique et je souhaite poursuivre mon parcours chez Safran.
        </p>
      </section>

      {/* Section Education */}
      <section className={sectionClasses} id="education">
        <h2 className="text-5xl font-bold mb-12">Éducation</h2>
        <div className="relative w-full max-w-3xl">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-600"></div>
          {/* Étape 1 */}
          <div className="flex items-center w-full mb-12">
            <div className="flex-1 text-right pr-10">
              <p className="text-indigo-400 font-semibold">Sept. 2022 – Sept. 2025</p>
              <p className="font-bold">Université Euro-Méditerranéenne de Fès – Maroc</p>
              <p className="text-gray-300">3ᵉ année cycle d’ingénieur en Génie Mécanique</p>
            </div>
            <div className="w-8 h-8 bg-indigo-400 rounded-full border-2 border-white mx-4 flex-shrink-0"></div>
            <div className="flex-1"></div>
          </div>
          {/* Étape 2 */}
          <div className="flex items-center w-full mb-12">
            <div className="flex-1"></div>
            <div className="w-8 h-8 bg-indigo-400 rounded-full border-2 border-white mx-4 flex-shrink-0"></div>
            <div className="flex-1 text-left pl-10">
              <p className="text-indigo-400 font-semibold">Sept. 2020 – Juil. 2022</p>
              <p className="font-bold">École Supérieure de Technologie de Fès (ESTF) – Maroc</p>
              <p className="text-gray-300">Diplôme Universitaire de Technologie en génie thermique énergétique</p>
            </div>
          </div>
          {/* Étape 3 */}
          <div className="flex items-center w-full">
            <div className="flex-1 text-right pr-10">
              <p className="text-indigo-400 font-semibold">Juin 2020</p>
              <p className="font-bold">Baccalauréat en Sciences Physiques – Maroc</p>
            </div>
            <div className="w-8 h-8 bg-indigo-400 rounded-full border-2 border-white mx-4 flex-shrink-0"></div>
            <div className="flex-1"></div>
          </div>
        </div>
      </section>

      <section id="experience" className={sectionClasses}>
  <h2 className="text-5xl font-bold mb-12">Expériences professionnelles</h2>

  <div className="relative w-full max-w-5xl mx-auto text-white">
    {/* Ligne verticale centrale */}
    <div className="absolute left-1/2 top-0 transform -translate-x-1/2 h-full w-1 bg-gray-600"></div>

    {/* Safran - gauche */}
    <div className="mb-16 flex md:justify-end relative">
      <div className="md:w-1/2 pr-12 text-right animate-slideLeft">
        <p className="text-indigo-400 font-semibold">Safran Aircraft Engines (Gennevilliers)</p>
        <p className="text-gray-300 text-sm">Févr. – Août 2025</p>
        <ul className="mt-2 text-gray-200 list-disc list-inside space-y-1">
          <li>Mise en place d’un système automatisé pour la génération des plans de contrôle.</li>
          <li>Création d’une liaison entre rapports de contrôle dimensionnel et modèles 3D.</li>
          <li>Support informatique aux difficultés rencontrées.</li>
          <li>Développement d’un modèle de machine learning.</li>
        </ul>
      </div>
      <div className="w-8 h-8 bg-indigo-400 rounded-full border-2 border-white absolute left-1/2 transform -translate-x-1/2 top-2 z-10"></div>
    </div>

    {/* Jesa - droite */}
    <div className="mb-16 flex md:justify-start relative">
      <div className="md:w-1/2 pl-12 text-left animate-slideRight">
        <p className="text-indigo-400 font-semibold">Jesa - Jacobs Engineering (Rabat)</p>
        <p className="text-gray-300 text-sm">Juil. – Sept. 2024</p>
        <ul className="mt-2 text-gray-200 list-disc list-inside space-y-1">
          <li>Étude et dimensionnement des lots CVC.</li>
          <li>Proposition de solutions pour réduire les coûts.</li>
          <li>Dimensionnement des réservoirs incendie.</li>
          <li>Réalisation du dossier d’achat et sélection technique.</li>
        </ul>
      </div>
      <div className="w-8 h-8 bg-indigo-400 rounded-full border-2 border-white absolute left-1/2 transform -translate-x-1/2 top-2 z-10"></div>
    </div>

    {/* Exprom - gauche */}
    <div className="mb-16 flex md:justify-end relative">
      <div className="md:w-1/2 pr-12 text-right animate-slideLeft">
        <p className="text-indigo-400 font-semibold">Exprom Facilities (Rabat)</p>
        <p className="text-gray-300 text-sm">Juil. – Sept. 2023</p>
        <ul className="mt-2 text-gray-200 list-disc list-inside space-y-1">
          <li>Optimisation de la maintenance CVC par AMDEC.</li>
          <li>Mise en place d’une GMAO pour les systèmes CVC.</li>
        </ul>
      </div>
      <div className="w-8 h-8 bg-indigo-400 rounded-full border-2 border-white absolute left-1/2 transform -translate-x-1/2 top-2 z-10"></div>
    </div>

    {/* OLEA FOOD - droite */}
    <div className="mb-16 flex md:justify-start relative">
      <div className="md:w-1/2 pl-12 text-left animate-slideRight">
        <p className="text-indigo-400 font-semibold">Les Conserves de Meknès – Usine OLEA FOOD</p>
        <p className="text-gray-300 text-sm">Juil. – Sept. 2022</p>
        <ul className="mt-2 text-gray-200 list-disc list-inside space-y-1">
          <li>Optimisation de la chaudière à fioul.</li>
          <li>Dimensionnement d’une installation photovoltaïque.</li>
        </ul>
      </div>
      <div className="w-8 h-8 bg-indigo-400 rounded-full border-2 border-white absolute left-1/2 transform -translate-x-1/2 top-2 z-10"></div>
    </div>

    {/* BrickPack - gauche */}
    <div className="mb-16 flex md:justify-end relative">
      <div className="md:w-1/2 pr-12 text-right animate-slideLeft">
        <p className="text-indigo-400 font-semibold">BrickPack Company (Meknès)</p>
        <p className="text-gray-300 text-sm">Juil. – Août 2021</p>
        <ul className="mt-2 text-gray-200 list-disc list-inside space-y-1">
          <li>Dimensionnement des installations électriques domestiques.</li>
        </ul>
      </div>
      <div className="w-8 h-8 bg-indigo-400 rounded-full border-2 border-white absolute left-1/2 transform -translate-x-1/2 top-2 z-10"></div>
    </div>
  </div>
</section>


      {/* Section Contact */}
      <section className={sectionClasses} id="contact">
        <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
          Contactez-moi via email ou téléphone...
        </p>
      </section>
      
    </div>
  );
};

export default HeroSection;
