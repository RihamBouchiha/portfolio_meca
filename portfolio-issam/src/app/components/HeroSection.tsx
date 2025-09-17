"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

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

  const sectionClasses =
    "min-h-screen flex flex-col items-center justify-center px-6 text-center relative z-10 text-white";

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative overflow-hidden scroll-smooth bg-black">
      <canvas ref={canvasRef} className="absolute inset-0 z-0"></canvas>

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
        <button onClick={() => handleScroll("plus")} className="hover:text-indigo-400 transition-colors">
          Plus d&apos;infos
        </button>
        <button onClick={() => handleScroll("contact")} className="hover:text-indigo-400 transition-colors">
          Contact
        </button>
      </nav>

      {/* Section Accueil / Hero */}
      <section className={sectionClasses + " md:flex-row text-center md:text-left"} id="accueil">
        <div className="flex flex-col items-center md:items-start space-y-4">
          <div className="text-4xl font-bold">Salut, c&apos;est Issam Oufadel !</div>
          <div className="text-lg text-gray-300">Ingénieur d&apos;État en génie mécanique – Option productique.</div>
          <button
            onClick={() => handleScroll("contact")}
            className="mt-2 inline-block px-6 py-2 text-white font-medium rounded-lg transition-colors"
            style={{ backgroundColor: "rgba(143, 139, 126, 1)" }}
          >
            Contactez-moi
          </button>
        </div>
        <div className="relative w-80 h-80 rounded-full overflow-hidden shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:rotate-3 hover:brightness-110 mt-8 md:mt-0 md:ml-8">
          <Image
            src="/issam.jpg"
            alt="Issam Oufadel"
            width={320}
            height={320}
            className="object-cover"
          />
          <div className="absolute inset-0 rounded-full ring-2 ring-indigo-400 opacity-0 hover:opacity-50 transition-opacity duration-500"></div>
        </div>
      </section>

      {/* Section Sur Moi */}
      <section className={sectionClasses} id="sur-moi">
        <h2 className="text-5xl font-bold mb-12">Sur moi</h2>
        <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
          Ingénieur d&apos;État en génie mécanique, je vous présente à travers ce portfolio une sélection
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
              <p className="text-gray-300">3ᵉ année cycle d&apos;ingénieur en Génie Mécanique</p>
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
<section id="experience" className="py-20 bg-gradient-to-b from-black to-gray-900 text-white">
  <h2 className="text-5xl font-bold text-center mb-16">Expériences professionnelles</h2>
  <div className="relative max-w-6xl mx-auto px-4 space-y-12">

    {[
      {
        company: "Safran Aircraft Engines (Gennevilliers)",
        period: "Févr. – Août 2025",
        tasks: [
          "Mise en place d’un système automatisé pour la génération des plans de contrôle.",
          "Création d’une liaison entre rapports de contrôle dimensionnel et modèles 3D.",
          "Support informatique aux difficultés rencontrées.",
          "Développement d’un modèle de machine learning."
        ],
        side: "left"
      },
      {
        company: "Jesa - Jacobs Engineering (Rabat)",
        period: "Juil. – Sept. 2024",
        tasks: [
          "Étude et dimensionnement des lots CVC.",
          "Proposition de solutions pour réduire les coûts.",
          "Dimensionnement des réservoirs incendie.",
          "Réalisation du dossier d’achat et sélection technique."
        ],
        side: "right"
      },
      {
        company: "Exprom Facilities (Rabat)",
        period: "Juil. – Sept. 2023",
        tasks: [
          "Optimisation de la maintenance CVC par AMDEC.",
          "Mise en place d’une GMAO pour les systèmes CVC."
        ],
        side: "left"
      },
      {
        company: "Les Conserves de Meknès – Usine OLEA FOOD",
        period: "Juil. – Sept. 2022",
        tasks: [
          "Optimisation de la chaudière à fioul.",
          "Dimensionnement d’une installation photovoltaïque."
        ],
        side: "right"
      },
      {
        company: "BrickPack Company (Meknès)",
        period: "Juil. – Août 2021",
        tasks: [
          "Dimensionnement des installations électriques domestiques."
        ],
        side: "left"
      }
    ].map((exp, idx) => (
      <div
        key={idx}
        className={`md:flex md:items-center relative ${
          exp.side === "left" ? "md:justify-start" : "md:justify-end"
        }`}
      >
        <div
          className={`bg-gray-800 p-6 rounded-xl shadow-lg md:w-1/2 ${
            exp.side === "left" ? "md:mr-12 text-left" : "md:ml-12 text-right"
          } animate-fadeIn`}
        >
          <p className="font-semibold">{exp.company}</p>
          <p className="text-gray-400 text-sm mb-4">{exp.period}</p>
          <ul className="list-disc list-inside space-y-1 text-gray-200">
            {exp.tasks.map((task, tIdx) => (
              <li key={tIdx}>{task}</li>
            ))}
          </ul>
        </div>
      </div>
    ))}
  </div>
</section>




      {/* Section Expérience */}
      {/* ...tu peux garder ton code existant pour les expériences... */}

      {/* Section Plus d'infos */}
      <section className={sectionClasses} id="plus">
        <h2 className="text-5xl font-bold mb-8">Plus d&apos;infos</h2>
        <p className="text-lg text-gray-300 max-w-2xl mb-6">
          Pour plus d&apos;informations détaillées sur mon parcours, vous pouvez télécharger mon CV ainsi que mon portfolio complet au format PDF :
        </p>
        <a
          href="/cv.pdf"
          download
          className="inline-block px-8 py-3 text-white rounded-lg shadow-md hover:opacity-90 transition"
          style={{ backgroundColor: "rgba(143, 139, 126, 1.00)" }}
        >
          📄 Télécharger le CV
        </a>
      </section>

      {/* Section Contact */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Contact</h2>

          <div className="space-y-6 text-lg text-gray-300">
            <p>
              <span className="font-semibold">Adresse :</span> 171, boulevard de Valmy BP 31, 92702 Colombes Cedex
            </p>
            <p>
              <span className="font-semibold">Email :</span>{" "}
              <a href="mailto:oufadelissam@gmail.com" className="text-blue-400 hover:underline">
                oufadelissam@gmail.com
              </a>
            </p>
            <p>
              <span className="font-semibold">Téléphone :</span>{" "}
              <a href="tel:+33611176429" className="text-blue-400 hover:underline">
                06 11 17 64 29
              </a>
            </p>
            <p>
              <span className="font-semibold">LinkedIn :</span>{" "}
              <a
                href="https://www.linkedin.com/in/issam-oufadel-8b8592212"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                linkedin.com/in/issam-oufadel-8b8592212
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
