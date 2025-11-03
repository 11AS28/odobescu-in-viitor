import React, { useEffect, useState } from "react";
import '../components_css/slideshow.css';

export default function Slideshow({ images, interval = 4000 }) {
  // `images` e un array cu link-uri către poze
  // `interval` e timpul între slide-uri (ms), default 4 secunde

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer); // curăță la unmount
  }, [images, interval]);

  return (
    <section className="slideshow">
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Slide ${index}`}
          className={`slide ${index === current ? "active" : ""}`}
        />
      ))}
    </section>
  );
}
