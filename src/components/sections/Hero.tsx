import { HeroShape } from "../ui/Assets";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TechStack } from "../ui/TechStack";

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);
  const roleTextRef = useRef<HTMLSpanElement>(null);

  const roles = [
    {
      name: "Diseñador",
      class: "bg-pink",
    },
    {
      name: "Frontend",
      class: "bg-blue",
    },

    {
      name: "UI/UX",
      class: "bg-mint",
    },
  ];

  useGSAP(
    () => {
      const section = sectionRef.current;
      const roleElement = roleRef.current;
      const roleTextElement = roleTextRef.current;
      if (!section || !roleElement || !roleTextElement) return;

      const motion = gsap.matchMedia();

      motion.add("(prefers-reduced-motion: no-preference)", () => {
        const shapeMotion = gsap.timeline({
          repeat: -1,
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            toggleActions: "play pause resume pause",
          },
        });

        shapeMotion
          .to(".hero-shape", {
            y: -12,
            rotation: 25,
            duration: 1.8,
            ease: "sine.inOut",
          })
          .to(".hero-shape", {
            y: 0,
            rotation: 0,
            duration: 1.8,
            ease: "sine.inOut",
          })
          .to(".hero-shape", {
            y: -12,
            rotation: -25,
            duration: 1.8,
            ease: "sine.inOut",
          })
          .to(".hero-shape", {
            y: 0,
            rotation: 0,
            duration: 1.8,
            ease: "sine.inOut",
          });

        const colorProbe = document.createElement("span");
        colorProbe.style.cssText =
          "position: fixed; left: -9999px; visibility: hidden;";
        section.appendChild(colorProbe);
        const roleColors = roles.map(({ class: backgroundClass }) => {
          colorProbe.className = backgroundClass;
          return getComputedStyle(colorProbe).backgroundColor;
        });
        colorProbe.remove();

        const roleSequence = [1, 2, 0];
        gsap.set(roleElement, { backgroundColor: roleColors[1] });

        const roleMotion = gsap.timeline({
          repeat: -1,
          repeatDelay: 0.2,
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            toggleActions: "play pause resume pause",
          },
        });

        roleSequence.forEach((_, index) => {
          const nextRoleIndex = roleSequence[(index + 1) % roleSequence.length];

          roleMotion
            .to({}, { duration: 1.2 })
            .to(roleTextElement, {
              autoAlpha: 0,
              yPercent: 110,
              duration: 0.22,
              ease: "power2.in",
              onComplete: () => {
                roleTextElement.textContent = roles[nextRoleIndex].name;
                gsap.set(roleTextElement, { yPercent: -110 });
              },
            })
            .to(
              roleElement,
              {
                backgroundColor: roleColors[nextRoleIndex],
                duration: 0.58,
                ease: "sine.inOut",
              },
              "<",
            )
            .to(
              roleTextElement,
              {
                autoAlpha: 1,
                yPercent: 0,
                duration: 0.34,
                ease: "power3.out",
              },
              "<0.22",
            );
        });

        gsap.from(".hero-shape, .hero-role", {
          autoAlpha: 0,
          scale: 0.5,
          stagger: 0.14,
          duration: 0.8,
          ease: "back.out(1.7)",
        });

        gsap.from(".hero-text__inner", {
          y: -70,
          x: -8,
          rotate: -9,
          opacity: 0,
          stagger: 0.08,
          duration: 1,
          ease: "back.out",
        });
      });

      return () => motion.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="min-h-dvh w-full bg-neutral-100 flex items-center"
    >
      <div className="flex w-full max-w-300 flex-col mx-auto gap-5 px-4 md:gap-6 items-center font-[450] lg:font-normal">
        <div className="flex px-6 py-2 bg-surface w-fit font-inter items-center gap-3 rounded-full shadow-tag">
          <span className="relative flex size-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75"></span>
            <span className="relative inline-flex size-3 rounded-full bg-mint"></span>
          </span>
          <span>Disponible para trabajar</span>
        </div>

        <h2 className="flex flex-col sm:flex-row items-center gap-5 md:gap-6 text-5xl xs:text-6xl sm:text-[54px] md:text-[64px] lg:text-8xl tracking-tight lg:tracking-normal">
          <div className="flex items-center gap-5 md:gap-6">
            <span className="hero-text inline-block">
              <span className="hero-text__inner inline-block">Hey !</span>
            </span>
            <HeroShape className="hero-shape size-16 sm:size-20 md:size-24 lg:size-28 text-pink" />
          </div>
          <span className="hero-text inline-block">
            <span className="hero-text__inner inline-block">soy Gabriel</span>
          </span>
        </h2>

        <h1 className="flex flex-col sm:flex-row items-center gap-5 md:gap-6 text-5xl xs:text-6xl sm:text-[54px] md:text-[64px] lg:text-8xl tracking-tight lg:tracking-normal">
          <span className="hero-text inline-block">
            <span className="hero-text__inner inline-block px-4 py-1 -mx-1 outline outline-base relative -rotate-5">
              <span className="size-2.5 outline absolute -left-1.5 -top-1.5 bg-mint"></span>
              <span className="size-2.5 outline absolute -right-1.5 -top-1.5 bg-mint"></span>
              <span className="size-2.5 outline absolute -left-1.5 -bottom-1.5 bg-mint"></span>
              <span className="size-2.5 outline absolute -right-1.5 -bottom-1.5 bg-mint"></span>
              Trabajo
            </span>{" "}
            <span className="hero-text__inner inline-block">como</span>
          </span>
          <span
            ref={roleRef}
            aria-hidden="true"
            className={`hero-role ${roles[1].class} inline-block overflow-hidden rounded-xl px-4 py-1 text-center text-5xl xs:text-6xl sm:text-[54px] md:text-[64px] lg:text-[92px] sm:py-2`}
          >
            <span ref={roleTextRef} className="inline-block">
              {roles[1].name}
            </span>
          </span>
          <span className="sr-only">
            diseñador UI/UX, diseñador y desarrollador frontend
          </span>
        </h1>

        <div className="max-w-86 xs:max-w-sm sm:max-w-lg md:max-w-2xl text-center pt-4 pb-3 text-body font-inter font-normal">
          <p className="text-pretty">
            Combino desarrollo <span className="text-base font-medium">frontend y criterio de UI/UX</span> para crear interfaces intuitivas, atractivas y funcionales, cuidando tanto los detalles visuales como la <span className="text-base font-medium">experiencia de cada usuario.</span>
          </p>
        </div>

        <div className="flex items-center gap-4 font-inter tracking-[-0.01em]">
          <a
            href=""
            className="px-4 py-2 sm:px-5 sm:py-2.5 bg-yellow text-base rounded-full md:text-lg font-medium outline-2 outline-transparent outline-offset-2 transition-all duration-200 hover:outline-yellow hover:scale-105"
          >
            Descargar CV
          </a>
          <a
            href=""
            className="px-4 py-2 sm:px-5 sm:py-2.5 bg-base text-surface rounded-full md:text-lg outline-2 outline-transparent outline-offset-2 transition-all duration-200 hover:outline-base hover:scale-105"
          >
            Ver proyectos
          </a>
        </div>
        <TechStack />
      </div>
    </section>
  );
};
