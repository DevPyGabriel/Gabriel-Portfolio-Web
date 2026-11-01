import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { CircleHelp, Minus, Paperclip, Plus, Sparkles } from "lucide-react";
import { useRef, useState } from "react";

const accentClasses = [
  "bg-blue-300 text-blue-900",
  "bg-mint-300 text-mint-900",
  "bg-pink-300 text-pink-900",
  "bg-yellow-400 text-yellow-900",
  "bg-coral-300 text-coral-900",
];

const faqs = [
  {
    question: "¿Cuánto tiempo tarda un proyecto web?",
    answer:
      "Depende del alcance y la complejidad. Una landing page suele tomar entre 2 y 4 semanas, mientras que un sitio más completo puede requerir entre 6 y 10 semanas.",
  },
  {
    question: "¿Puedo solicitar cambios durante el proceso?",
    answer:
      "Sí. Cada etapa incluye momentos de revisión para compartir feedback y ajustar el diseño o las funcionalidades antes de avanzar al siguiente paso.",
  },
  {
    question: "¿Mi sitio se verá bien en móviles?",
    answer:
      "Desde luego. El diseño se desarrolla para adaptarse a móviles, tablets y escritorio, cuidando la legibilidad, navegación y velocidad en cada tamaño.",
  },
  {
    question: "¿Trabajas con sitios hechos en otras plataformas?",
    answer:
      "Sí. Según el estado actual del sitio, puedo mejorar su diseño, experiencia, estructura o rendimiento, conservando lo que ya funciona bien.",
  },
  {
    question: "¿Qué necesito para comenzar?",
    answer:
      "Una idea clara de tu objetivo, público y contenido disponible. Si todavía no tienes todo definido, podemos ordenar la información durante una llamada inicial.",
  },
];

export const Faq = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState(0);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const motion = gsap.matchMedia();
      motion.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".faq-heading-reveal", {
          y: 24,
          autoAlpha: 0,
          duration: 0.75,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        });
        gsap.from(".faq-item", {
          y: 18,
          autoAlpha: 0,
          duration: 0.55,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 65%",
            once: true,
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
      id="faq"
      className="relative w-full overflow-hidden bg-canvas py-24 md:py-28 lg:py-32"
      aria-labelledby="faq-heading"
    >
      <div className="absolute -right-16 top-20 size-40 rotate-12 rounded-[2rem] border-2 border-base/20 bg-white/30 sm:-right-8 sm:size-52" aria-hidden="true" />
      <div className="absolute bottom-16 left-[-5rem] size-36 rounded-full border-[1.5rem] border-pink-300/70" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 md:px-12">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <div className="faq-heading-reveal max-w-xl pb-1">
            <div id="faq-heading-wrap" className="mb-8 xs:mb-10 sm:mb-12">
              <h2
                id="faq-heading"
                className="text-4xl leading-[1.15] tracking-tight xs:text-5xl sm:text-[54px] md:text-[64px] lg:text-6xl xl:text-7xl lg:leading-none lg:tracking-normal"
              >
                <span className="faq-heading-reveal inline-block relative">
                  <span className="absolute -top-8 left-1 -rotate-3 whitespace-nowrap font-inter tracking-normal">
                    <span className="relative flex items-center gap-1.5 rounded-md border-2 border-white bg-pink-200 py-1.5 px-5 text-xs font-semibold text-base shadow-tag outline-1 outline-base/10 sm:text-sm">
                      <span className="absolute -left-3 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-pink text-white shadow-[0_2px_6px_rgb(23_23_23/0.18)]">
                        <CircleHelp size={16} aria-hidden="true" />
                      </span>
                      <Paperclip className="absolute -top-3 left-16 size-5 -rotate-12 text-pink-600" aria-hidden="true" />
                      <span>Preguntas frecuentes</span>
                    </span>
                  </span>
                  Algunas dudas
                </span>{" "}
                <span className="faq-heading-reveal inline-block px-2 md:px-3 lg:px-4 lg:py-1 -mx-1 outline outline-base relative -rotate-2 bg-blue-100 text-blue">
                  comunes
                  <span className="size-2.5 outline outline-base absolute -left-1.5 -top-1.5 bg-blue" />
                  <span className="size-2.5 outline outline-base absolute -right-1.5 -top-1.5 bg-blue" />
                  <span className="size-2.5 outline outline-base absolute -left-1.5 -bottom-1.5 bg-blue" />
                  <span className="size-2.5 outline outline-base absolute -right-1.5 -bottom-1.5 bg-blue" />
                </span>
              </h2>
            </div>
            <p className="faq-heading-reveal max-w-md font-inter text-base leading-relaxed text-body sm:text-lg">
              Si te quedas pensando “¿y esto cómo funciona?”, probablemente la respuesta esté aquí.
            </p>
          </div>

          <div className="border-t-2 border-base">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              const panelId = `faq-panel-${index}`;
              const buttonId = `faq-button-${index}`;

              return (
                <article key={faq.question} className="faq-item border-b-2 border-base">
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                      className="group flex w-full items-center justify-between gap-4 py-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-4 focus-visible:ring-offset-yellow-200 sm:py-6"
                    >
                      <span className="text-xl font-semibold leading-snug tracking-tight sm:text-2xl lg:text-[28px]">
                        {faq.question}
                      </span>
                      <span className={`relative flex size-11 shrink-0 items-center justify-center rounded-full border-2 border-base shadow-tag transition-transform duration-300 group-hover:rotate-6 sm:size-12 ${accentClasses[index]}`} aria-hidden="true">
                        {isOpen ? (
                          <Minus className="size-5" strokeWidth={2.2} />
                        ) : (
                          <Plus className="size-5" strokeWidth={2.2} />
                        )}
                      </span>
                    </button>
                  </h3>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-6 pr-12 font-inter text-base leading-relaxed text-body sm:text-lg sm:pr-16">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-10 flex justify-end lg:mt-12" aria-hidden="true">
          <span className="flex items-center gap-2 rounded-full border-2 border-white bg-mint-400 px-4 py-2 font-inter text-sm font-semibold text-base shadow-tag rotate-2">
            <Sparkles className="size-4" />
            Siempre claro, siempre directo
          </span>
        </div>
      </div>
    </section>
  );
};
