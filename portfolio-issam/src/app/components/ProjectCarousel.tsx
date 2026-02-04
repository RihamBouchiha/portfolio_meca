"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

interface ProjectCarouselProps {
  images: string[];
  alt: string;
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ images, alt }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000); // change toutes les 3 secondes

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-56 w-full overflow-hidden">
      <Image
        src={images[current]}
        alt={alt}
        fill
        className="object-cover transition-opacity duration-700"
      />

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2.5 h-2.5 rounded-full ${
              idx === current ? "bg-indigo-400" : "bg-gray-400/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectCarousel;
