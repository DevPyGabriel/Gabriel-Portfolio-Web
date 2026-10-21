import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Menu, X } from "lucide-react";

export interface HeaderNavItem {
  label: string;
  href: string;
  hoverClass: string;
  activeClass: string;
  focusClass: string;
  underlineClass: string;
}

const items: HeaderNavItem[] = [
  {
    label: "Inicio",
    href: "#inicio",
    hoverClass: "hover:bg-blue-500 hover:text-base",
    activeClass: "bg-blue-500 text-base",
    focusClass: "focus-visible:outline-blue",
    underlineClass: "bg-blue-500",
  },
  {
    label: "Proyectos",
    href: "#proyectos",
    hoverClass: "hover:bg-mint-500 hover:text-base",
    activeClass: "bg-mint-500 text-base",
    focusClass: "focus-visible:outline-mint",
    underlineClass: "bg-mint-500",
  },
  {
    label: "Sobre mi",
    href: "#sobremi",
    hoverClass: "hover:bg-pink-500 hover:text-base",
    activeClass: "bg-pink-500 text-base",
    focusClass: "focus-visible:outline-pink",
    underlineClass: "bg-pink-500",
  },
  {
    label: "Contacto",
    href: "#contacto",
    hoverClass: "hover:bg-coral-500 hover:text-base",
    activeClass: "bg-coral-500 text-base",
    focusClass: "focus-visible:outline-coral",
    underlineClass: "bg-coral-500",
  },
];

export const Header = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sections = items
      .map((item, index) => {
        const target = document.getElementById(item.href.slice(1));
        return target ? { index, target } : null;
      })
      .filter((section): section is { index: number; target: HTMLElement } =>
        Boolean(section),
      );

    if (sections.length === 0) return;

    let frame = 0;

    const updateActiveSection = () => {
      frame = 0;
      const headerBottom = headerRef.current?.getBoundingClientRect().bottom ?? 0;
      const activeLine = headerBottom + 24;
      let nextIndex = sections[0].index;

      for (const section of sections) {
        if (section.target.getBoundingClientRect().top <= activeLine) {
          nextIndex = section.index;
        }
      }

      setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    panelRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        triggerRef.current?.focus();
        setOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = [
        triggerRef.current,
        ...Array.from(
          panelRef.current?.querySelectorAll<HTMLElement>("a[href]") ?? [],
        ),
      ].filter((element): element is HTMLElement => element !== null);
      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      const focusedIndex = focusableElements.indexOf(
        document.activeElement as HTMLElement,
      );

      if (focusedIndex === -1) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && focusedIndex === 0) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && focusedIndex === focusableElements.length - 1) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      root.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    const desktopMedia = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };

    desktopMedia.addEventListener("change", closeOnDesktop);
    return () => desktopMedia.removeEventListener("change", closeOnDesktop);
  }, []);

  useGSAP(
    () => {
      const panel = panelRef.current;
      if (!open || !panel || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      gsap.fromTo(
        panel,
        { autoAlpha: 0, y: -8 },
        { autoAlpha: 1, y: 0, duration: 0.28, ease: "power3.out" },
      );
      gsap.fromTo(
        panel.querySelectorAll("[data-nav-row]"),
        { autoAlpha: 0, y: 8 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.04,
          ease: "power3.out",
        },
      );
    },
    { dependencies: [open], scope: headerRef },
  );

  const handleNavigate = () => setOpen(false);

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 font-bricolage sm:px-6 sm:pt-6"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-full bg-surface px-5 py-2 md:py-3 shadow-header sm:px-6">
        <a
          href={items[0].href}
          onClick={handleNavigate}
          className="shrink-0 rounded-full font-bold tracking-tight text-base outline-none transition-colors duration-200 hover:text-blue focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-4 font-inter"
        >
          FOCUS <span className="text-blue">STUDIO</span>
        </a>

        <nav aria-label="Navegación principal" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {items.map((item, index) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={index === activeIndex ? "location" : undefined}
                  onClick={handleNavigate}
                  className={`relative block rounded-lg px-2 py-1.5 outline-none transition-colors duration-200 ${item.hoverClass} ${item.focusClass} focus-visible:outline-2 focus-visible:outline-offset-2 ${
                    index === activeIndex ? item.activeClass : "text-base"
                  }`}
                >
                  {item.label}
                  {index === activeIndex && (
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-4 bottom-1 h-0.5 rounded-full ${item.underlineClass}`}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="header-menu-panel"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="grid size-10 shrink-0 place-items-center rounded-full text-base outline-none transition-colors duration-200 hover:bg-blue-50 hover:text-blue focus-visible:ring-2 focus-visible:ring-blue md:hidden"
        >
          {open ? (
            <X aria-hidden="true" className="size-5" />
          ) : (
            <Menu aria-hidden="true" className="size-5" />
          )}
        </button>
      </div>

      {open && (
        <>
          <button
            type="button"
            tabIndex={-1}
            aria-label="Cerrar menú"
            onClick={handleNavigate}
            className="fixed inset-0 z-40 cursor-default bg-base/10 md:hidden"
          />
          <div
            ref={panelRef}
            id="header-menu-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            tabIndex={-1}
            className="absolute inset-x-4 top-full z-50 mt-3 rounded-3xl bg-surface p-3 shadow-header outline-none sm:inset-x-6 md:hidden"
          >
            <nav aria-label="Secciones del sitio">
              <ul className="flex flex-col gap-1">
                {items.map((item, index) => (
                  <li key={item.href} data-nav-row>
                    <a
                      href={item.href}
                      aria-current={index === activeIndex ? "location" : undefined}
                      onClick={handleNavigate}
                      className={`group relative block rounded-2xl px-4 py-3 text-base outline-none transition-colors duration-200 ${item.focusClass} focus-visible:outline-2 focus-visible:outline-offset-2 w-fit`}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-4 bottom-2 h-0.5 origin-left rounded-full transition-transform duration-200 motion-reduce:transition-none ${item.underlineClass} ${
                          index === activeIndex
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                        }`}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </>
      )}
    </header>
  );
};
