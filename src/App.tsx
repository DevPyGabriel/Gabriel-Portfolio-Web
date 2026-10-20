import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Hero } from "./components/sections/Hero"
import { Header } from "./components/layout/Header"

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;

    // GSAP entrega el tiempo en segundos; Lenis espera milisegundos.
    const raf = (time: number) => lenis?.raf(time * 1000);
    const syncLenisWithMotionPreference = () => {
      if (motionPreference.matches) {
        if (!lenis) return;

        lenis.off("scroll", ScrollTrigger.update);
        gsap.ticker.remove(raf);
        lenis.destroy();
        lenis = null;
        ScrollTrigger.refresh();
        return;
      }

      if (lenis) return;

      lenis = new Lenis({
        // Duración de la animación de desplazamiento, en segundos.
        duration: 1.8,
        // Curva de aceleración y desaceleración; t representa el progreso de 0 a 1.
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        // Multiplicador de la distancia recibida de la rueda del mouse.
        wheelMultiplier: 0.75,
        // Multiplicador de la distancia recibida de gestos táctiles.
        touchMultiplier: 0.9,
        // Suaviza el desplazamiento iniciado con la rueda del mouse.
        smoothWheel: true,
        // Sincroniza el gesto táctil con el desplazamiento suave de Lenis.
        syncTouch: true,
        // Intensidad de interpolación para el desplazamiento táctil sincronizado (0 a 1).
        syncTouchLerp: 0.075,
      });

      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(raf);
      // Desactiva el ajuste de tiempo de GSAP tras pausas largas, para mantener sincronizado Lenis.
      gsap.ticker.lagSmoothing(0);
      ScrollTrigger.refresh();
    };

    syncLenisWithMotionPreference();
    motionPreference.addEventListener("change", syncLenisWithMotionPreference);

    return () => {
      motionPreference.removeEventListener("change", syncLenisWithMotionPreference);

      if (!lenis) return;

      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="font-bricolage text-base">
      <Header />
      <main>
        <Hero />
      </main>
    </div>
  );
}
