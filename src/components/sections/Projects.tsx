import { ArrowUpRight, Paperclip, PenTool, Triangle, X } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const PROJECT_REVEAL = {
  // Ajusta el recorrido, el inicio y el final para controlar cómo responde al scroll.
  y: -100,
  x: -24,
  rotation: -16,
  opacity: 0,
  scrub: true,
  start: "top 75%",
  end: "top 25%",
};

export const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const motion = gsap.matchMedia();
      motion.add("(prefers-reduced-motion: no-preference)", () => {
        // scrub vincula el progreso de cada bloque al tramo entre start y end; al subir, revierte.
        // Añade `projects-reveal` a cualquier bloque nuevo que deba animarse.
        gsap.utils
          .toArray<HTMLElement>(".projects-reveal", section)
          .forEach((block) => {
            const finalRotation = block.classList.contains(
              "projects-reveal--tilted",
            )
              ? -3
              : 0;

            gsap.fromTo(
              block,
              {
                autoAlpha: PROJECT_REVEAL.opacity,
                y: PROJECT_REVEAL.y,
                x: PROJECT_REVEAL.x,
                rotation: PROJECT_REVEAL.rotation,
              },
              {
                autoAlpha: 1,
                y: 0,
                x: 0,
                rotation: finalRotation,
                ease: "back.out",
                scrollTrigger: {
                  trigger: block,
                  start: PROJECT_REVEAL.start,
                  end: PROJECT_REVEAL.end,
                  scrub: PROJECT_REVEAL.scrub,
                },
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
      id="proyectos"
      className="w-full min-h-dvh project-bg-img flex items-center justify-center"
    >
      <div className="mx-auto my-12 sm:my-16 md:my-20 lg:my-24">
        <div className="px-4 sm:px-6 md:px-12 lg:max-w-[1024px] h-full flex flex-col">
          <h4 className="text-center text-5xl xs:text-6xl sm:text-[54px] md:text-[64px] lg:text-8xl tracking-tight lg:tracking-normal text-surface leading-none max-w-xl lg:max-w-full pb-12 sm:pb-14 md:pb-16 lg:pb-20 xl:pb-24">
            <span className="projects-reveal inline-block relative">
              <div className="absolute px-3 py-1.5 text-sm bg-base rounded-md -top-8 text-surface flex items-center gap-1.5 shadow-header font-inter tracking-normal">
                <span>Desarrollo web</span>
                <PenTool size={16} />
              </div>
              Proyectos
            </span>{" "}
            <span className="projects-reveal">que</span>{" "}
            <span className="projects-reveal px-4 py-1 bg-yellow inline-block text-base rounded-xl">
              Solucionan
            </span>
            <br />
            <span className="projects-reveal">tus</span>{" "}
            <span className="projects-reveal projects-reveal--tilted hero-text__inner inline-block px-4 py-1 -mx-1 outline outline-base relative -rotate-3 bg-coral-100 text-coral">
              <span className="size-2.5 outline outline-base absolute -left-1.5 -top-1.5 bg-coral"></span>
              <span className="size-2.5 outline outline-base absolute -right-1.5 -top-1.5 bg-coral"></span>
              <span className="size-2.5 outline outline-base absolute -left-1.5 -bottom-1.5 bg-coral"></span>
              <span className="size-2.5 outline outline-base absolute -right-1.5 -bottom-1.5 bg-coral"></span>
              Problemas
            </span>
          </h4>
          <div className="">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
              <div className="w-full flex flex-col bg-surface p-2 rounded-xl relative shadow-card gap-2">

                <div className="absolute left-1/2 -top-3 text-pink">
                  <Paperclip className="size-8" />
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="size-3 flex items-center justify-center rounded-full bg-coral"></div>
                  <div className="size-3 flex items-center justify-center rounded-xs bg-mint-400"></div>
                  <Triangle className="fill-blue-400 size-3 stroke-4 stroke-blue-400" />
                </div>
                <div className="w-full min-h-60 bg-gray-300 rounded-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 size-8 bg-white rounded-full m-3 flex items-center justify-center shadow-tag">
                    <ArrowUpRight className="size-5" />
                  </div>
                  <img className="w-full h-full object-cover rounded-lg" src="" alt="" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-medium tracking-tight">
                    NovaDrive
                  </span>
                  <ul className="flex items-center gap-2 font-inter">
                    <li className="text-sm bg-blue-200 text-blue-700 px-2 py-1 rounded-md">
                      Landing Page
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
