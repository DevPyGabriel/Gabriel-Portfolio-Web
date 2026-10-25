import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Hero } from "./components/sections/Hero"
import { Header } from "./components/layout/Header"
import { Projects } from "./components/sections/Projects";
import { Process } from "./components/sections/Process";
import { About } from "./components/sections/About";
import { Contact } from "./components/sections/Contact";

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
        
        autoRaf: true,
        anchors: true,
        respectReducedMotion: true,
        lerp: 0.05,
        // Multiplicador de la distancia recibida de la rueda del mouse.
        wheelMultiplier: 0.8,
        // Suaviza el desplazamiento iniciado con la rueda del mouse.
        smoothWheel: true,
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
        <Projects />
        <Process />
        <About />
        <Contact />
      </main>
    </div>
  );
}
