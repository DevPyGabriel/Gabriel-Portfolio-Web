import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState, type ComponentType } from "react";
import {
  ArrowUpRight,
  ExternalLink,
  Paperclip,
  PenTool,
  Triangle,
  X,
} from "lucide-react";
import { React, TailwindCSS } from "../ui/Assets";

gsap.registerPlugin(ScrollTrigger);

type Technology = {
  name: string;
  Icon: ComponentType<{ className?: string }>;
};

type Project = {
  id: string;
  name: string;
  category: string;
  image?: string;
  imageAlt: string;
  detailPreviewImage?: string;
  detailPreviewAlt?: string;
  description: string;
  authors: string[];
  previewUrl?: string;
  year: number;
  technologies: Technology[];
};

const projects: Project[] = [
  {
    id: "novadrive",
    name: "NovaDrive",
    category: "Landing Page",
    image: "/assets/opengraph_img.webp",
    imageAlt: "Vista previa del proyecto NovaDrive",
    description:
      "Landing page para NovaDrive, desarrollada con React y Tailwind CSS.",
    authors: ["Gabriel"],
    year: 2026,
    previewUrl: "https://novadrive-ve.vercel.app",
    technologies: [
      { name: "React", Icon: React },
      { name: "Tailwind CSS", Icon: TailwindCSS },
    ],
  },
  {
    id: "novadrive",
    name: "NovaDrive",
    category: "Landing Page",
    image: "/assets/opengraph_img.webp",
    imageAlt: "Vista previa del proyecto NovaDrive",
    description:
      "Landing page para NovaDrive, desarrollada con React y Tailwind CSS.",
    authors: ["Gabriel"],
    year: 2026,
    previewUrl: "https://novadrive-ve.vercel.app",
    technologies: [
      { name: "React", Icon: React },
      { name: "Tailwind CSS", Icon: TailwindCSS },
    ],
  },
  {
    id: "novadrive",
    name: "NovaDrive",
    category: "Landing Page",
    image: "/assets/opengraph_img.webp",
    imageAlt: "Vista previa del proyecto NovaDrive",
    description:
      "Landing page para NovaDrive, desarrollada con React y Tailwind CSS.",
    authors: ["Gabriel"],
    year: 2026,
    previewUrl: "https://novadrive-ve.vercel.app",
    technologies: [
      { name: "React", Icon: React },
      { name: "Tailwind CSS", Icon: TailwindCSS },
    ],
  },
  {
    id: "novadrive",
    name: "NovaDrive",
    category: "Landing Page",
    image: "/assets/opengraph_img.webp",
    imageAlt: "Vista previa del proyecto NovaDrive",
    description:
      "Landing page para NovaDrive, desarrollada con React y Tailwind CSS.",
    authors: ["Gabriel"],
    year: 2026,
    previewUrl: "https://novadrive-ve.vercel.app",
    technologies: [
      { name: "React", Icon: React },
      { name: "Tailwind CSS", Icon: TailwindCSS },
    ],
  },
];

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

const PROJECT_CARD_HOVER =
  "hover:-translate-y-2 hover:shadow-card-hover hover:-rotate-5 transition-all duration-200";

const getProjectCardRotation = (index: number) =>
  Number((-5 + ((index * 0.618033988749895) % 1) * 10).toFixed(2));

export const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !selectedProject || dialog.open) return;

    dialog.showModal();
    const animation = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? undefined
      : gsap.fromTo(
          dialog,
          {
            scale: 0.4,
            opacity: 0,
            transformOrigin: "center center",
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.45,
            ease: "power3.out",
            clearProps: "transform,opacity,transformOrigin",
          },
        );

    return () => {
      animation?.kill();
      if (dialog.open) dialog.close();
    };
  }, [selectedProject]);

  const closeProjectDialog = () => {
    dialogRef.current?.close();
  };

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
              ? -5
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

        gsap.utils
          .toArray<HTMLElement>(".project-card-reveal", section)
          .forEach((card, index) => {
            const finalRotation = getProjectCardRotation(index);

            gsap.fromTo(
              card,
              {
                autoAlpha: 0,
                y: 48,
                scale: 0.94,
                rotation: finalRotation + (index % 2 === 0 ? 8 : -8),
              },
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                rotation: finalRotation,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 85%",
                  end: "top 55%",
                  scrub: true,
                },
              },
            );
          });
      });

      motion.add("(prefers-reduced-motion: reduce)", () => {
        gsap.utils
          .toArray<HTMLElement>(".project-card-reveal", section)
          .forEach((card, index) => {
            gsap.set(card, { rotation: getProjectCardRotation(index) });
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
      className="w-full min-h-dvh project-bg-img flex items-center justify-center py-16"
    >
      <div className="mx-auto my-12 sm:my-16 md:my-20 lg:my-24">
        <div className="px-4 sm:px-6 md:px-12 lg:max-w-5xl h-full flex flex-col">
          <h4 className="text-center text-5xl xs:text-6xl sm:text-[54px] md:text-[64px] lg:text-8xl tracking-tight lg:tracking-normal text-surface leading-none lg:max-w-full pb-12 sm:pb-14 md:pb-16 lg:pb-20 xl:pb-24">
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
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 place-items-center px-4 xs:px-0">
            {projects.map((project, index) => (
              <article
                key={`${project.id}-${index}`}
                className={`project-card-reveal group relative w-full max-w-md flex flex-col gap-2 rounded-xl bg-surface p-2 shadow-card transition-[transform,box-shadow] duration-300 ease-out ${PROJECT_CARD_HOVER} motion-reduce:transition-none motion-reduce:hover:transform md:max-w-full`}
              >
                <button
                  type="button"
                  className="absolute inset-0 z-10 cursor-pointer rounded-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-coral focus-visible:ring-offset-4"
                  aria-label={`Ver detalles de ${project.name}`}
                  onClick={() => setSelectedProject(project)}
                />
                <div className="absolute left-1/2 -top-3 text-pink transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:transition-none">
                  <Paperclip className="size-8 lg:size-10" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="size-3 rounded-full bg-coral" />
                  <span className="size-3 rounded-xs bg-blue-400" />
                  <Triangle className="size-3 fill-yellow-500 stroke-4 stroke-yellow-500" />
                </div>
                <div className="relative min-h-60 w-full overflow-hidden rounded-lg bg-gray-100">
                  {project.image ? (
                    <img
                      className="max-h-72 aspect-square w-full rounded-lg object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:transform-none"
                      src={project.image}
                      alt={project.imageAlt}
                    />
                  ) : (
                    <div
                      className="flex min-h-60 items-center justify-center font-inter text-sm text-body"
                      role="img"
                      aria-label={project.imageAlt}
                    >
                      Vista previa no disponible
                    </div>
                  )}
                  <span className="absolute right-0 top-0 m-3 flex size-8 items-center justify-center rounded-full bg-white shadow-tag">
                    <ArrowUpRight className="size-5" />
                  </span>
                </div>
                <div className="flex w-full flex-col gap-2">
                  <div className="flex items-center justify-between gap-3">
                    <h5 className="text-2xl font-medium tracking-tight">
                      {project.name}
                    </h5>
                    <span className="rounded-md bg-blue-200 px-2 py-1 font-inter text-sm text-blue-700">
                      {project.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {project.technologies.map(({ name, Icon }) => (
                        <Icon key={name} className="size-6" aria-label={name} />
                      ))}
                    </div>
                    <span className="font-inter text-xs text-body">
                      Desarrollado en {project.year}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
      <dialog
        ref={dialogRef}
        aria-labelledby="project-dialog-title"
        aria-describedby="project-dialog-description"
        className="m-auto max-h-[90dvh] w-[min(92vw,48rem)] overflow-y-auto rounded-2xl border-0 bg-surface p-0 text-base shadow-header backdrop:bg-base/60 backdrop:backdrop-blur-sm"
        onClose={() => setSelectedProject(null)}
        onCancel={(event) => {
          event.preventDefault();
          closeProjectDialog();
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") closeProjectDialog();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeProjectDialog();
        }}
      >
        {selectedProject && (
          <div>
            <div className="flex h-14 items-center gap-2 border-b border-gray-200 px-4 sm:px-6">
              <span className="size-3 rounded-full bg-coral" />
              <span className="size-3 rounded-xs bg-blue-400" />
              <Triangle className="size-3 fill-yellow-500 stroke-4 stroke-yellow-500" />
              <div className="ml-3 flex h-8 min-w-0 flex-1 items-center gap-2 rounded-md bg-gray-100 px-3 font-inter text-xs text-body sm:max-w-md">
                <span className="truncate">
                  Portfolio / {selectedProject.category}
                </span>
              </div>
              <button
                type="button"
                className="ml-auto flex size-9 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
                aria-label="Cerrar detalles del proyecto"
                onClick={closeProjectDialog}
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="p-4 sm:p-6">
              <div className="mb-8 aspect-[1.45/1] overflow-hidden rounded-xl bg-gray-100 shadow-card sm:aspect-[1.6/1]">
                {selectedProject.image ? (
                  <img
                    className="size-full object-cover"
                    src={selectedProject.image}
                    alt={selectedProject.imageAlt}
                  />
                ) : (
                  <div
                    className="flex size-full items-center justify-center font-inter text-sm text-body"
                    role="img"
                    aria-label={selectedProject.imageAlt}
                  >
                    Vista previa no disponible
                  </div>
                )}
              </div>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h2
                  id="project-dialog-title"
                  className="text-3xl font-semibold tracking-tight sm:text-4xl"
                >
                  {selectedProject.name}
                </h2>
                {selectedProject.previewUrl ? (
                  <a
                    className="inline-flex items-center gap-1.5 font-inter text-sm font-medium text-blue-600 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
                    href={selectedProject.previewUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Vista previa <ExternalLink className="size-4" />
                  </a>
                ) : (
                  <span className="font-inter text-sm text-body">
                    Vista previa próximamente
                  </span>
                )}
              </div>
              <p
                id="project-dialog-description"
                className="mb-8 font-inter text-base leading-relaxed text-base sm:text-lg"
              >
                {selectedProject.description}
              </p>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-6 font-inter sm:gap-x-12">
                <div>
                  <dt className="mb-1 text-sm text-body">Autores</dt>
                  <dd className="text-base">
                    {selectedProject.authors.join(", ")}
                  </dd>
                </div>
                <div>
                  <dt className="mb-1 text-sm text-body">Año</dt>
                  <dd className="text-base">{selectedProject.year}</dd>
                </div>
                <div>
                  <dt className="mb-1 text-sm text-body">Tipo de proyecto</dt>
                  <dd className="text-base">{selectedProject.category}</dd>
                </div>
                <div>
                  <dt className="mb-1 text-sm text-body">Herramientas</dt>
                  <dd className="text-base">
                    {selectedProject.technologies
                      .map(({ name }) => name)
                      .join(", ")}
                  </dd>
                </div>
              </dl>
              {selectedProject.detailPreviewImage && (
                <div className="mt-8 overflow-hidden rounded-xl bg-base p-3 sm:p-5">
                  <img
                    className="w-full rounded-lg"
                    src={selectedProject.detailPreviewImage}
                    alt={
                      selectedProject.detailPreviewAlt ??
                      `Vista adicional del proyecto ${selectedProject.name}`
                    }
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
};
