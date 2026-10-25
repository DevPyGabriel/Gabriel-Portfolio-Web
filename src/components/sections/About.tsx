import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import type { CSSProperties } from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  FolderKanban,
  Paperclip,
  UserStar,
  UsersRound,
} from "lucide-react";
import { CardVector1, CardVector2, CardVector3 } from "../ui/Assets";

gsap.registerPlugin(ScrollTrigger);

const ABOUT_HEADING_REVEAL = {
  y: 36,
  x: -12,
  rotation: -6,
  duration: 0.8,
  stagger: 0.12,
  start: "top 75%",
};

const metrics = [
  {
    label: "Conocimiento",
    title: "Años de Experiencia",
    value: "+2",
    accent: "blue",
    description:
      "Diseñando y desarrollando experiencias digitales centradas en las personas.",
  },
  {
    label: "Trabajos",
    title: "Proyectos Desarrollados",
    value: "13",
    accent: "mint",
    description: "Proyectos para resolver tu problema con diseño y tecnología.",
  },
  {
    label: "Resultados",
    title: "Clientes Satisfechos",
    value: "+21",
    accent: "pink",
    description:
      "Colaboraciones que transforman ideas en soluciones útiles y memorables.",
  },
] as const;

type MetricCardProps = (typeof metrics)[number];

const metricTagClasses: Record<
  MetricCardProps["accent"],
  { background: string; foreground: string; icon: string }
> = {
  blue: {
    background: "bg-blue-200",
    foreground: "text-blue-900",
    icon: "bg-blue-500",
  },
  mint: {
    background: "bg-mint-200",
    foreground: "text-mint-900",
    icon: "bg-mint-500",
  },
  pink: {
    background: "bg-pink-200",
    foreground: "text-pink-900",
    icon: "bg-pink-500",
  },
};

const MetricCard = ({
  title,
  value,
  accent,
  description,
  label,
}: MetricCardProps) => {
  const tagClasses = metricTagClasses[accent];
  const TagIcon =
    accent === "blue"
      ? BriefcaseBusiness
      : accent === "mint"
        ? FolderKanban
        : UsersRound;
  const Vector =
    accent === "blue"
      ? CardVector1
      : accent === "mint"
        ? CardVector2
        : CardVector3;

  return (
    <article
      className={`about-note about-note--${accent} group relative max-w-90 w-full justify-between`}
      style={
        {
          "--note-rotation":
            accent === "blue" ? "-2deg" : accent === "mint" ? "2deg" : "-1deg",
        } as CSSProperties
      }
    >
      <div className="about-note__artwork" aria-hidden="true">
        <Vector
          className="about-note__vector"
          color="var(--note-accent)"
          focusable="false"
        />
      </div>
      <Paperclip
        className="about-note__clip"
        aria-hidden="true"
        focusable="false"
      />
      <div className="absolute -top-4 right-1 rotate-6 whitespace-nowrap font-inter tracking-normal">
        <div
          className={`relative flex items-center gap-1.5 rounded-md border-2 border-white ${tagClasses.background} py-1.5 pl-4 pr-5 text-xs font-semibold ${tagClasses.foreground} shadow-tag outline-1 outline-base/10 sm:text-sm`}
        >
          <span
            className={`absolute -right-3 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white ${tagClasses.icon} text-white shadow-[0_2px_6px_rgb(23_23_23/0.18)]`}
          >
            <TagIcon size={16} aria-hidden="true" />
          </span>
          <span>{label}</span>
        </div>
      </div>
      <p
        className={`text-5xl sm:text-6xl md:text-7xl font-semibold leading-none tracking-tight tabular-nums text-base z-20`}
      >
        {value}
      </p>
      <div className="flex flex-col gap-2 z-20">
        <h3 className={`text-lg sm:text-xl font-semibold tracking-tight`}>
          {title}
        </h3>
        <p className="font-inter text-sm text-body leading-relaxed">
          {description}
        </p>
      </div>
    </article>
  );
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
          const headingParts = gsap.utils.toArray<HTMLElement>(
            ".about-reveal",
            heading,
          );

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
                element.classList.contains("about-reveal--tilted") ? -3 : 0,
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

        const cardGrid = section.querySelector(".about-grid");
        const cardReveals = gsap.utils.toArray<HTMLElement>(
          ".about-card-reveal",
          section,
        );

        if (cardGrid && cardReveals.length > 0) {
          gsap.from(cardReveals, {
            autoAlpha: 0,
            y: 48,
            scale: 0.98,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardGrid,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
          });
        }

        const cta = section.querySelector(".about-cta-reveal");
        if (cta) {
          gsap.from(cta, {
            autoAlpha: 0,
            y: 24,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cta,
              start: "top 90%",
              toggleActions: "play none none none",
              once: true,
            },
          });
        }
      });

      return () => motion.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="sobremi"
      className="about-section w-full min-h-dvh bg-neutral-100 flex items-center justify-center py-16 sm:py-20 md:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-8">
        <div className="mb-8 sm:mb-10 text-center">
          <h2 className="text-4xl xs:text-5xl sm:text-[54px] md:text-[64px] lg:text-7xl tracking-tight lg:tracking-normal leading-[1.15] lg:leading-none">
            <span className="process-reveal inline-block relative">
              <div className="absolute -top-8 left-1 -rotate-3 whitespace-nowrap font-inter tracking-normal">
                <div className="relative flex items-center gap-1.5 rounded-md border-2 border-white bg-yellow-200 py-1.5 px-5 text-xs font-semibold text-blue-900 shadow-tag outline-1 outline-base/10 sm:text-sm">
                  <span className="absolute -left-3 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-yellow text-white shadow-[0_2px_6px_rgb(23_23_23/0.18)]">
                    <UserStar size={16} aria-hidden="true" />
                  </span>
                  <Paperclip
                    className="absolute -top-3 left-16 size-5 -rotate-12 text-yellow-500"
                    aria-hidden="true"
                  />
                  <span>Sobre mi</span>
                </div>
              </div>
              <span className="about-reveal inline-block">Quien</span>
            </span>{" "}
            <span className="about-reveal">soy ?</span> <br />
            <span className="about-reveal about-reveal--tilted inline-block px-2 md:px-3 lg:px-4 lg:py-1 -mx-1 outline outline-base relative -rotate-2 bg-coral-100 text-coral">
              <span className="size-2.5 outline outline-base absolute -left-1.5 -top-1.5 bg-coral"></span>
              <span className="size-2.5 outline outline-base absolute -right-1.5 -top-1.5 bg-coral"></span>
              <span className="size-2.5 outline outline-base absolute -left-1.5 -bottom-1.5 bg-coral"></span>
              <span className="size-2.5 outline outline-base absolute -right-1.5 -bottom-1.5 bg-coral"></span>
              Gabriel Fernández
            </span>
          </h2>
        </div>

        <div className="about-card-reveal mx-auto mb-10 max-w-2xl text-center">
          <p className="font-inter text-body text-sm sm:text-lg leading-[1.75] mb-4">
            <span className="font-medium bg-surface text-base px-2 py-1 rounded shadow-tag">
              Diseñador
            </span>{" "} UI/UX y Desarrollador Frontend apasionado por convertir
            problemas complejos en{" "}
            <span className="font-medium bg-surface text-base px-2 py-1 rounded shadow-tag">
              interfaces intuitivas
            </span>{" "}
            y{" "}
            <span className="font-medium bg-surface text-base px-2 py-1 rounded shadow-tag">
              código limpio y escalable
            </span>
            .
          </p>
        </div>

        <div className="about-grid about-canvas grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 mb-12 sm:mb-14">
          {metrics.map((metric, index) => (
            <div
              className={`about-card-reveal flex w-full justify-center ${index === 2 ? "sm:col-span-2 lg:col-span-1" : ""}`}
              key={metric.title}
            >
              <MetricCard {...metric} />
            </div>
          ))}
        </div>

        <div className="about-cta-reveal text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 px-6 sm:px-8 py-4 sm:py-5 rounded-2xl bg-coral-400">
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
