import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { Briefcase, Calendar, Sparkles, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ABOUT_HEADING_REVEAL = {
  y: 36,
  x: -12,
  rotation: -6,
  duration: 0.8,
  stagger: 0.12,
  start: "top 75%",
};

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const motion = gsap.matchMedia();

      motion.add("(prefers-reduced-motion: no-preference)", () => {
        const heading = section.querySelector("h2");
        if (heading) {
          const headingParts =
            gsap.utils.toArray<HTMLElement>(".about-reveal", heading);

          gsap.fromTo(
            headingParts,
            {
              autoAlpha: 0,
              y: ABOUT_HEADING_REVEAL.y,
              x: ABOUT_HEADING_REVEAL.x,
              rotation: ABOUT_HEADING_REVEAL.rotation,
            },
            {
              autoAlpha: 1,
              y: 0,
              x: 0,
              rotation: (_index, element) =>
                element.classList.contains("about-reveal--tilted")
                  ? -3
                  : 0,
              duration: ABOUT_HEADING_REVEAL.duration,
              stagger: ABOUT_HEADING_REVEAL.stagger,
              ease: "power3.out",
              scrollTrigger: {
                trigger: heading,
                start: ABOUT_HEADING_REVEAL.start,
                toggleActions: "play none none none",
                once: true,
              },
            },
          );
        }

        gsap.from(".about-card-reveal", {
          autoAlpha: 0,
          y: 48,
          scale: 0.98,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-grid",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        gsap.from(".about-cta-reveal", {
          autoAlpha: 0,
          y: 24,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-cta-reveal",
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });

      return () => motion.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="sobremi"
      className="w-full min-h-dvh bg-neutral-100 flex items-center justify-center py-16 sm:py-20 md:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-8">
        <div className="mb-10 sm:mb-14 md:mb-16 text-center">
          <h2 className="text-4xl xs:text-5xl sm:text-[54px] md:text-[64px] lg:text-7xl tracking-tight lg:tracking-normal leading-[1.15] lg:leading-none">
            <span className="about-reveal inline-block relative">
              <div className="absolute px-3 py-1.5 text-xs sm:text-sm bg-base rounded-md -top-8 left-1/2 -translate-x-1/2 text-surface flex items-center gap-1.5 shadow-header font-inter tracking-normal whitespace-nowrap">
                <span>Sobre mí</span>
                <Sparkles size={16} />
              </div>
              Quién
            </span>{" "}
            <span className="about-reveal">soy</span>{" "}
            <span className="about-reveal about-reveal--tilted inline-block px-2 md:px-3 lg:px-4 lg:py-1 -mx-1 outline outline-base relative -rotate-2 bg-pink-100 text-pink">
              <span className="size-2.5 outline outline-base absolute -left-1.5 -top-1.5 bg-pink"></span>
              <span className="size-2.5 outline outline-base absolute -right-1.5 -top-1.5 bg-pink"></span>
              <span className="size-2.5 outline outline-base absolute -left-1.5 -bottom-1.5 bg-pink"></span>
              <span className="size-2.5 outline outline-base absolute -right-1.5 -bottom-1.5 bg-pink"></span>
              Gabriel Fernández
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start mb-10">
          <div className="about-card-reveal">
            <div className="relative rounded-2xl bg-surface shadow-card p-6 sm:p-8 h-full">
              <p className="font-inter text-base sm:text-lg leading-relaxed text-base mb-6">
                Diseñador UI/UX y desarrollador frontend con enfoque en crear
                interfaces que no solo se ven bien, sino que{" "}
                <span className="font-medium text-base">
                  resuelven problemas reales
                </span>
                . Combino criterio visual con código limpio para transformar ideas
                en experiencias digitales intuitivas, accesibles y memorables.
              </p>
              <p className="font-inter text-base sm:text-lg leading-relaxed text-body">
                Me apasiona encontrar el equilibrio perfecto entre estética y
                funcionalidad. Cada proyecto es una oportunidad para crear algo
                único que conecte con usuarios y genere resultados tangibles para
                quien lo necesita.
              </p>
            </div>
          </div>

          <div className="about-grid grid sm:grid-cols-2 gap-4 sm:gap-5">
            <article className="about-card-reveal">
              <div className="relative h-full rounded-2xl bg-surface shadow-card p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover motion-reduce:transition-none">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center justify-center size-11 rounded-xl bg-blue-50 text-blue-700 shadow-tag">
                    <Briefcase className="size-5" />
                  </div>
                  <div className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium font-inter">
                    Pasantías
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold tracking-tight mb-2">
                  Soporte Técnico
                </h3>
                <div className="flex items-center gap-2 text-body font-inter text-sm mb-2">
                  <Calendar className="size-4" />
                  <span>3 meses</span>
                </div>
                <p className="font-inter text-sm text-body leading-relaxed">
                  Resolución de incidencias, mantenimiento y atención a usuarios,
                  desarrollando habilidades analíticas y de comunicación.
                </p>
              </div>
            </article>

            <article className="about-card-reveal">
              <div className="relative h-full rounded-2xl bg-surface shadow-card p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover motion-reduce:transition-none">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center justify-center size-11 rounded-xl bg-mint-50 text-mint-700 shadow-tag">
                    <Briefcase className="size-5" />
                  </div>
                  <div className="px-2 py-0.5 rounded-full bg-mint-100 text-mint-700 text-xs font-medium font-inter">
                    Trainee
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold tracking-tight mb-2">
                  Desarrollador Frontend
                </h3>
                <div className="flex items-center gap-2 text-body font-inter text-sm mb-2">
                  <Calendar className="size-4" />
                  <span>3 meses</span>
                </div>
                <p className="font-inter text-sm text-body leading-relaxed">
                  Desarrollo con React, TypeScript y Tailwind CSS. Creación de
                  componentes reutilizables y maquetado responsive.
                </p>
              </div>
            </article>
          </div>
        </div>

        <div className="about-cta-reveal text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 px-6 sm:px-8 py-4 sm:py-5 rounded-2xl bg-surface shadow-card">
            <div className="text-center sm:text-left">
              <p className="font-semibold text-lg sm:text-xl tracking-tight mb-1">
                ¿Buscas talento que combine diseño y código?
              </p>
              <p className="font-inter text-sm sm:text-base text-body">
                Estoy listo para aportar valor a tu equipo
              </p>
            </div>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-base text-surface rounded-full font-inter font-medium outline-2 outline-transparent outline-offset-2 transition-all duration-200 hover:outline-base hover:scale-105"
            >
              Hablemos
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
