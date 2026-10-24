import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { Paperclip, Workflow } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Phase = {
  number: string;
  title: string;
  description: string;
  tone: "mint" | "pink" | "blue" | "yellow";
};

const phases: Phase[] = [
  {
    number: "01",
    title: "Llamada de descubrimiento",
    description:
      "Conocemos tu proyecto, objetivos, público objetivo y necesidades. Identificamos el alcance, restricciones y qué éxito significa para ti.",
    tone: "pink",
  },
  {
    number: "02",
    title: "Propuesta de solución",
    description:
      "Te presento una propuesta clara con estrategia, wireframes conceptuales, alcance, tiempos y presupuesto personalizado para tu proyecto.",
    tone: "blue",
  },
  {
    number: "03",
    title: "Desarrollo de la propuesta",
    description:
      "Diseño y desarrollo iterativo con feedback constante. Creación de maquetas, componentes UI, y desarrollo frontend con enfoque en UX y performance.",
    tone: "yellow",
  },
  {
    number: "04",
    title: "Entrega del proyecto",
    description:
      "Revisión final, ajustes, despliegue en producción, optimización y entrega de archivos/documentación. Te acompaño en el lanzamiento.",
    tone: "mint",
  },
];

const phaseToneClasses = {
  mint: "bg-mint-400",
  pink: "bg-pink-400",
  blue: "bg-blue-400",
  yellow: "bg-yellow-400",
} satisfies Record<Phase["tone"], string>;

const PROCESS_HEADING_REVEAL = {
  y: 36,
  x: -12,
  rotation: -6,
  duration: 0.8,
  stagger: 0.12,
  start: "top 75%",
};

export const Process = () => {
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
            gsap.utils.toArray<HTMLElement>(".process-reveal", heading);

          gsap.fromTo(
            headingParts,
            {
              autoAlpha: 0,
              y: PROCESS_HEADING_REVEAL.y,
              x: PROCESS_HEADING_REVEAL.x,
              rotation: PROCESS_HEADING_REVEAL.rotation,
            },
            {
              autoAlpha: 1,
              y: 0,
              x: 0,
              rotation: (_index, element) =>
                element.classList.contains("process-reveal--tilted")
                  ? -3
                  : 0,
              duration: PROCESS_HEADING_REVEAL.duration,
              stagger: PROCESS_HEADING_REVEAL.stagger,
              ease: "power3.out",
              scrollTrigger: {
                trigger: heading,
                start: PROCESS_HEADING_REVEAL.start,
                toggleActions: "play none none none",
                once: true,
              },
            },
          );
        }

        gsap.utils
          .toArray<HTMLElement>(".process-card-reveal", section)
          .forEach((card, index) => {
            gsap.fromTo(
              card,
              {
                autoAlpha: 0,
                y: 40,
                scale: 0.98,
              },
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 90%",
                  toggleActions: "play none none none",
                },
                delay: index * 0.05,
              },
            );
          });
      });

      return () => motion.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="proceso"
      className="w-full min-h-dvh bg-neutral-100 flex items-center justify-center py-20 sm:py-24 md:py-28 lg:py-48"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 xl:gap-20 items-start">
          <div className="lg:sticky lg:top-32">
            <div className="mb-0 xs:mb-2 sm:mb-4">
              <h2 className="text-4xl xs:text-5xl sm:text-[54px] md:text-[64px] lg:text-6xl xl:text-7xl tracking-tight lg:tracking-normal leading-[1.15] lg:leading-none">
                <span className="process-reveal inline-block relative">
                  <div className="absolute -top-8 left-1 -rotate-3 whitespace-nowrap font-inter tracking-normal">
                    <div className="relative flex items-center gap-1.5 rounded-md border-2 border-white bg-pink-200 py-1.5 px-5 text-xs font-semibold text-blue-900 shadow-tag outline-1 outline-base/10 sm:text-sm">
                      <span className="absolute -left-3 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-pink text-white shadow-[0_2px_6px_rgb(23_23_23/0.18)]">
                        <Workflow size={16} aria-hidden="true" />
                      </span>
                      <Paperclip className="absolute -top-3 left-16 size-5 -rotate-12 text-blue-500" aria-hidden="true" />
                      <span>Mi proceso</span>
                    </div>
                  </div>
                  Así trabajo
                </span>{" "}
                <span className="process-reveal">cuando</span>{" "}
                <span className="process-reveal process-reveal--tilted inline-block px-2 md:px-3 lg:px-4 lg:py-1 -mx-1 outline outline-base relative -rotate-2 bg-blue-100 text-blue">
                  <span className="size-2.5 outline outline-base absolute -left-1.5 -top-1.5 bg-blue"></span>
                  <span className="size-2.5 outline outline-base absolute -right-1.5 -top-1.5 bg-blue"></span>
                  <span className="size-2.5 outline outline-base absolute -left-1.5 -bottom-1.5 bg-blue"></span>
                  <span className="size-2.5 outline outline-base absolute -right-1.5 -bottom-1.5 bg-blue"></span>
                  contratas
                </span>{" "}
                <br className="hidden lg:block" />
                <span className="process-reveal">mis servicios</span>
              </h2>
            </div>
            <div className="mt-8 hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface shadow-tag font-inter w-fit">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75 motion-reduce:animate-none"></span>
                <span className="relative inline-flex size-2 rounded-full bg-mint"></span>
              </span>
              <span className="text-sm font-medium">
                Sin rodeos, con resultados claros
              </span>
            </div>
          </div>

          <div className="relative flex flex-col gap-6">
            {phases.map((phase, index) => {
              return (
                <article
                  key={phase.number}
                  className="process-card-reveal sticky group"
                  style={{
                    top: `calc(clamp(6rem, 12vh, 7rem) + ${20 * index}px)`,
                  }}
                >
                  <div
                    className={`relative min-h-75 flex flex-col rounded-2xl p-6 sm:p-8 text-base transition-all duration-300 motion-reduce:transition-none ${phaseToneClasses[phase.tone]}`}
                  >
                    <div className="flex-1">
                      <h3 className="mb-3 text-2xl font-semibold tracking-tight text-base sm:text-3xl">
                        {phase.title}
                      </h3>
                      <p className="max-w-md font-inter text-base/70 leading-relaxed sm:text-lg">
                        {phase.description}
                      </p>
                    </div>
                    <div className="absolute bottom-4 right-6 sm:bottom-6 sm:right-8">
                      <span className="text-6xl font-bold leading-none text-base sm:text-7xl lg:text-8xl">
                        {phase.number}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-12 sm:mt-16 lg:hidden text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface shadow-tag font-inter">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75 motion-reduce:animate-none"></span>
              <span className="relative inline-flex size-2 rounded-full bg-mint"></span>
            </span>
            <span className="text-base font-medium">
              ¿Listo para empezar? Hablemos sobre tu proyecto
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
