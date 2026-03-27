"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const slides = [
    {
      title: "Welcome to Busan",
      subtitle: "Feel the ocean, lights, and stories of Busan.",
      image: "/images/busan1.jpg",
    },
    {
      title: "Discover the City Your Way",
      subtitle: "Ocean views, local food, culture, and night vibes await you.",
      image: "/images/busan2.jpg",
    },
    {
      title: "Walk Through the Streets",
      subtitle: "Experience the real life of Busan.",
      image: "/images/busan3.jpg",
    },
    {
      title: "Start Your Travel Course",
      subtitle: "Choose your language and begin your Busan journey.",
      image: "/images/busan4.jpg",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2200);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };
  const slide = slides[currentSlide];

  return (
    <main
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundImage: `url(${slide.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.45)",
          pointerEvents: "none",
        }}
      />

      <section
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          maxWidth: "720px",
        }}
      >
        <p
          style={{
            fontSize: "14px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            opacity: 0.7,
            marginBottom: "16px",
          }}
        >
          Busan Travel Guide
        </p>

        <h1
          style={{
            fontSize: "52px",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          {slide.title}
        </h1>

        <p
          style={{
            fontSize: "20px",
            opacity: 0.85,
            lineHeight: 1.6,
          }}
        >
          {slide.subtitle}
        </p>

        <div
          style={{
            marginTop: "28px",
            display: "flex",
            justifyContent: "center",
            gap: "12px",
          }}
        >
         <button
           type="button"
           onClick={goToPrevSlide}
           style={{
             width: "48px",
             height: "48px",
             borderRadius: "999px",
             border: "1px solid rgba(255,255,255,0.3)",
             background: "rgba(255,255,255,0.1)",
             color: "white",
             cursor: "pointer",
             fontSize: "20px",
           }}
           aria-label="Previous slide"
        >
          ←
         </button>

         <button
           type="button"
           onClick={goToNextSlide}
           style={{
            width: "48px",
            height: "48px",
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.3)",
            background: "rgba(255,255,255,0.1)",
            color: "white",
            cursor: "pointer",
            fontSize: "20px",
          }}
          aria-label="Next slide"
        >
          →
         </button>
        </div>

        <div
          style={{
            marginTop: "36px",
            display: "flex",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentSlide(index)}
              style={{
                width: currentSlide === index ? "36px" : "10px",
                height: "10px",
                borderRadius: "999px",
                backgroundColor:
                  currentSlide === index
                    ? "#fff"
                    : "rgba(255,255,255,0.4)",
                transition: "all 0.3s ease",
                border: "none",
                padding: 0,
                cursor: "pointer",
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => router.push("/language")}
          style={{
            marginTop: "40px",
            padding: "12px 22px",
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.3)",
            background: "rgba(255,255,255,0.1)",
            color: "white",
            cursor: "pointer",
            fontSize: "15px",
          }}
        >
          Start
        </button>
      </section>
    </main>
  );
}