import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, BriefcaseBusiness, Code2, LayoutTemplate, Palette, Paperclip } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
} from "react";

gsap.registerPlugin(ScrollTrigger);

type Service = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  color: string;
  softColor: string;
  Icon: ComponentType<{ className?: string; strokeWidth?: number }>;
};

const services: Service[] = [
  {
    title: "Desarrollo Web",
    description:
      "Sitios rápidos, responsivos y pensados para convertir visitas en oportunidades.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=85",
    imageAlt: "Laptop con código durante el desarrollo web",
    color: "#77CDFF",
    softColor: "#E9F7FF",
    Icon: Code2,
  },
  {
    title: "Rediseño Web",
    description:
      "Renovamos tu sitio para mejorar su claridad, estética, experiencia y rendimiento.",
    image:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=900&q=85",
    imageAlt: "Diseño de interfaz sobre una mesa de trabajo",
    color: "#FFE09A",
    softColor: "#FFFAEE",
    Icon: LayoutTemplate,
  },
  {
    title: "Diseño UI/UX",
    description:
      "Experiencias visuales claras, atractivas y fáciles de usar para personas y negocios.",
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=900&q=85",
    imageAlt: "Proceso creativo de diseño de producto digital",
    color: "#FF8FC7",
    softColor: "#FFF2F8",
    Icon: Palette,
  },
];

export const ServicesHoverModal = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const quickX = useRef<((value: number) => void)[]>([]);
  const quickY = useRef<((value: number) => void)[]>([]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const motion = gsap.matchMedia();
      motion.add("(prefers-reduced-motion: no-preference)", () => {
        const heading = section.querySelector("h2");
        if (heading) {
          const headingParts = gsap.utils.toArray<HTMLElement>(
            ".services-reveal",
            heading,
          );

          gsap.fromTo(
            headingParts,
            {
              autoAlpha: 0,
              y: 28,
              x: 8,
              rotation: 4,
            },
            {
              autoAlpha: 1,
              y: 0,
              x: 0,
              rotation: (_index, element) =>
                element.classList.contains("services-reveal--tilted") ? -2 : 0,
              duration: 0.75,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: heading,
                start: "top 78%",
                toggleActions: "play none none none",
                once: true,
              },
            },
          );
        }

        const intro = section.querySelector(".services-intro-reveal");
        if (intro) {
          gsap.from(intro, {
            autoAlpha: 0,
            y: 18,
            duration: 0.55,
            delay: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: intro,
              start: "top 82%",
              toggleActions: "play none none none",
              once: true,
            },
          });
        }

        gsap.utils
          .toArray<HTMLElement>(".service-row-reveal", section)
          .forEach((row, index) => {
            gsap.fromTo(
              row,
              {
                autoAlpha: 0,
                y: 32,
                scale: 0.985,
              },
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.65,
                delay: index * 0.04,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: row,
                  start: "top 88%",
                  toggleActions: "play none none none",
                  once: true,
                },
              },
            );
          });
      });

      return () => motion.revert();
    },
    { scope: sectionRef },
  );

  useEffect(() => {
    if (!modalRef.current) return;

    gsap.set(modalRef.current, {
      xPercent: -50,
      yPercent: -50,
    });

    quickX.current = [
      gsap.quickTo(modalRef.current, "left", {
        duration: 0.65,
        ease: "power3",
      }),
    ];
    quickY.current = [
      gsap.quickTo(modalRef.current, "top", {
        duration: 0.65,
        ease: "power3",
      }),
    ];

    const handleMouseMove = (event: globalThis.MouseEvent) => {
      quickX.current.forEach((move) => move(event.clientX));
      quickY.current.forEach((move) => move(event.clientY));
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const animateModal = (visible: boolean) => {
    if (!modalRef.current) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(modalRef.current, {
        autoAlpha: visible ? 1 : 0,
        scale: visible ? 1 : 0,
      });
      return;
    }

    gsap.to(modalRef.current, {
      autoAlpha: visible ? 1 : 0,
      scale: visible ? 1 : 0,
      duration: 0.38,
      ease: visible ? "power3.out" : "power3.in",
    });
  };

  const setActive = (index: number | null) => {
    setActiveIndex(index);
    animateModal(index !== null);
  };

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="overflow-hidden bg-canvas pt-20 sm:pt-24 lg:pt-40 pb-12 sm:pb-16 lg:pb-20"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 md:px-12">
        <div className="mb-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-end md:gap-8 lg:mb-14">
          <h2 className="text-4xl leading-[1.15] xs:text-5xl sm:text-[54px] md:text-[64px] lg:text-6xl xl:text-7xl lg:leading-none tracking-tight">
            <span className="services-reveal inline-block relative">
              <span className="absolute -top-8 left-1 -rotate-3 whitespace-nowrap font-inter tracking-normal">
                <span className="relative flex items-center gap-1.5 rounded-md border-2 border-white bg-yellow-200 py-1.5 px-5 text-xs font-semibold shadow-tag outline-1 outline-base/10 sm:text-sm text-base">
                  <span className="absolute -left-3 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-yellow text-surface shadow-[0_2px_6px_rgb(23_23_23/0.18)]">
                    <BriefcaseBusiness size={16} aria-hidden="true" />
                  </span>
                  <Paperclip className="absolute -top-3 left-16 size-5 -rotate-12 text-blue" aria-hidden="true" />
                  <span>Mis servicios</span>
                </span>
              </span>
              Cómo
            </span>{" "}
            <span className="services-reveal">puedo</span>{" "}
            <span className="services-reveal services-reveal--tilted inline-block px-2 md:px-3 lg:px-4 lg:py-1 -mx-1 outline outline-base relative -rotate-2 bg-mint-100 text-mint">
              <span className="size-2.5 outline outline-base absolute -left-1.5 -top-1.5 bg-mint"></span>
              <span className="size-2.5 outline outline-base absolute -right-1.5 -top-1.5 bg-mint"></span>
              <span className="size-2.5 outline outline-base absolute -left-1.5 -bottom-1.5 bg-mint"></span>
              <span className="size-2.5 outline outline-base absolute -right-1.5 -bottom-1.5 bg-mint"></span>
              ayudarte
            </span>
          </h2>
          <p className="services-intro-reveal max-w-md font-inter text-sm text-body leading-relaxed md:max-w-sm">
            Tres servicios, una misma intención. Construir una presencia digital
            clara y memorable.
          </p>
        </div>

        <div className="flex flex-col border-t border-neutral-300">
          {services.map((service, index) => {
            const Icon = service.Icon;
            return (
              <button
                key={service.title}
                type="button"
                className="service-row-reveal group relative flex w-full flex-col items-stretch justify-center gap-4 border-b border-neutral-300 py-6 text-left transition-opacity duration-200 hover:opacity-55 sm:py-8 md:flex-row md:items-center md:justify-between md:min-h-36 lg:py-12"
                style={{
                  backgroundColor:
                    activeIndex === index ? service.softColor : "transparent",
                }}
                onMouseEnter={() => setActive(index)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(index)}
                onBlur={() => setActive(null)}
                onClick={() => setActive(activeIndex === index ? null : index)}
              >
                <div className="flex min-w-0 items-center gap-4 sm:gap-7">
                  <span
                    className="flex size-12 shrink-0 items-center justify-center rounded-xl border-2 border-neutral-900 shadow-tag transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105 sm:size-16 sm:rounded-2xl"
                    style={{ backgroundColor: service.color }}
                  >
                    <Icon className="size-6 sm:size-8" strokeWidth={1.8} />
                  </span>
                  <h3 className="font-bricolage text-2xl leading-tight tracking-tight font-[450] transition-transform duration-300 group-hover:translate-x-2 xs:text-3xl sm:text-4xl lg:text-6xl lg:leading-none">
                    {service.title}
                  </h3>
                </div>

                <p className="ml-16 max-w-md font-inter text-sm leading-relaxed text-body sm:ml-20 md:hidden">
                  {service.description}
                </p>

                <div className="hidden items-center gap-5 md:flex">
                  <p className="max-w-xs font-inter text-sm leading-relaxed text-body">
                    {service.description}
                  </p>
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-neutral-900 transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight className="size-5" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div
        ref={modalRef}
        className="pointer-events-none fixed left-0 top-0 z-40 hidden h-[290px] w-[360px] origin-center overflow-hidden rounded-2xl border-2 border-neutral-900 bg-white shadow-card md:block"
        style={{ scale: 0, opacity: 0 }}
        aria-hidden="true"
      >
        <div
          className="absolute left-0 top-0 h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
          style={{
            transform: `translateY(-${Math.max(activeIndex ?? 0, 0) * 100}%)`,
          }}
        >
          {services.map((service) => (
            <div
              key={service.title}
              className="h-[290px] w-[360px] p-4"
              style={{ backgroundColor: service.color }}
            >
              <div className="h-full w-full overflow-hidden rounded-xl border border-neutral-900/20 bg-white">
                <img
                  src={service.image}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
