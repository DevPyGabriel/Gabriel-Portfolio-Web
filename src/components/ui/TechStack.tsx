import { useEffect, useRef, useState } from "react";
import { Astro, Figma, React, TailwindCSS, TypeScript } from "./Assets";

const technologies = [
  { name: "Figma", Icon: Figma },
  { name: "React", Icon: React },
  { name: "TypeScript", Icon: TypeScript },
  { name: "Tailwind CSS", Icon: TailwindCSS },
  { name: "Astro", Icon: Astro },
];

export const TechStack = () => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);
  const [isPageVisible, setIsPageVisible] = useState(
    () => document.visibilityState === "visible",
  );
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updatePageVisibility = () => {
      setIsPageVisible(document.visibilityState === "visible");
    };

    document.addEventListener("visibilitychange", updatePageVisibility);
    return () =>
      document.removeEventListener("visibilitychange", updatePageVisibility);
  }, []);

  useEffect(() => {
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const updateMotionPreference = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    motionPreference.addEventListener("change", updateMotionPreference);
    return () =>
      motionPreference.removeEventListener("change", updateMotionPreference);
  }, []);

  const isPlaying = isInView && isPageVisible && !prefersReducedMotion;

  return (
    <div
      role="group"
      aria-label="Tecnologías y herramientas"
      className="tech-stack mt-12 w-screen max-w-full"
    >
      <div
        ref={viewportRef}
        className="tech-stack__viewport"
        data-playing={isPlaying}
        tabIndex={prefersReducedMotion ? 0 : -1}
      >
        <div className="tech-stack__track" aria-hidden="true">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              className="tech-stack__group"
            >
              {technologies.map(({ name, Icon }) => (
                <li key={name} className="tech-stack__item">
                  <Icon
                    className={`tech-stack__icon ${
                      name === "Astro" ? "tech-stack__icon--astro" : ""
                    }`}
                    focusable="false"
                  />
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <ul className="sr-only">
        {technologies.map(({ name }) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
};
