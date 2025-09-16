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

    // Créer les particules
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

  // Fond "espace"
  ctx.fillStyle = "rgba(25, 25, 23, 1)";
  ctx.fillRect(0, 0, width, height);

  // Particules
  ctx.fillStyle = "white";
  particles.forEach(p => {
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

    // Nettoyage
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-900 flex items-center justify-center overflow-hidden">
      {/* Canvas particules */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0"></canvas>

      {/* Contenu */}
      <div className="relative flex items-center space-x-8 z-10">
        <div className="text-3xl font-bold text-white">Salut, c'est Issam Oufadel !</div>
        <div className="relative w-80 h-80 rounded-full overflow-hidden shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:rotate-3 hover:brightness-110">
          <img
            src="/issam.jpg"
            alt="Issam Oufadel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 rounded-full ring-2 ring-indigo-400 opacity-0 hover:opacity-50 transition-opacity duration-500"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
