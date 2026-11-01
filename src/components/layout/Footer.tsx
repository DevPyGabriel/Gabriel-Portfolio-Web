import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp, ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { GithubIcon } from "../ui/Assets";
import { WHATSAPP_NUMBER } from "../sections/Contact";

gsap.registerPlugin(ScrollTrigger);

const footerNavigation = [
  { label: "Inicio", href: "#inicio" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Servicios", href: "#servicios" },
  { label: "Proceso", href: "#proceso" },
  { label: "Sobre mí", href: "#sobremi" },
  { label: "Preguntas", href: "#faq" },
  { label: "Contacto", href: "#contacto" },
];

export const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const currentYear = new Date().getFullYear();

  useGSAP(
    () => {
      const footer = footerRef.current;
      if (!footer) return;

      const motion = gsap.matchMedia();
      motion.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".footer-reveal", {
          y: 24,
          autoAlpha: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: footer, start: "top 85%", once: true },
        });
      });

      return () => motion.revert();
    },
    { scope: footerRef },
  );

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola Gabriel, quiero hablar sobre un proyecto web.")}`;

  return (
    <footer ref={footerRef} className="relative overflow-hidden border-t-2 border-base bg-base text-white" aria-label="Pie de página">
      <div className="absolute -right-20 -top-24 size-64 rotate-12 rounded-full border-[24px] border-blue-500/20" aria-hidden="true" />
      <div className="absolute bottom-16 left-[42%] size-24 -rotate-12 rounded-2xl border-2 border-pink-400/20 bg-pink-400/5" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-7 pt-16 sm:px-8 sm:pt-20 md:px-12 lg:pt-24">
        <div className="footer-reveal grid items-end gap-8 border-b border-white/20 pb-10 sm:pb-12 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="mb-3 font-inter text-sm font-semibold text-pink-300">¿Listo para comenzar?</p>
            <h2 className="max-w-3xl text-4xl leading-[1.05] tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Construyamos algo que
              <span className="mt-1 block text-yellow-300">realmente conecte.</span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="#contacto"
              className="inline-flex h-12 items-center gap-2 rounded-full border-2 border-white bg-pink px-6 font-inter text-sm font-semibold text-base outline-2 outline-transparent outline-offset-2 transition-all duration-200 hover:outline-pink hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <Mail className="size-4" aria-hidden="true" />
              Iniciar proyecto
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              aria-label="Enviar un mensaje por WhatsApp"
              className="inline-flex size-12 items-center justify-center rounded-full border-2 border-white/70 text-white outline-2 outline-transparent outline-offset-2 transition-all duration-200 hover:border-mint hover:bg-mint hover:text-base hover:outline-mint hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <MessageCircle className="size-5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="grid gap-10 py-10 sm:grid-cols-2 sm:py-12 lg:grid-cols-[1.4fr_0.6fr_0.8fr]">
          <div className="footer-reveal">
            <a href="#inicio" aria-label="Volver al inicio" className="inline-block rounded-sm font-inter text-xl font-bold tracking-tight text-white outline-none transition-colors hover:text-blue-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
              FOCUS <span className="text-blue-300">STUDIO</span>
            </a>
            <p className="mt-4 max-w-sm font-inter text-sm leading-relaxed text-neutral-300 sm:text-base">
              Diseño y desarrollo experiencias digitales claras, funcionales y memorables para ideas con intención.
            </p>
          </div>

          <nav className="footer-reveal" aria-label="Navegación del pie de página">
            <p className="mb-4 font-inter text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400">Explorar</p>
            <ul className="grid grid-cols-2 gap-x-5 gap-y-2.5 sm:grid-cols-1">
              {footerNavigation.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="group inline-flex items-center gap-2 rounded-sm font-inter text-sm text-neutral-200 outline-none transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                    <span className="h-px w-0 bg-pink transition-all duration-200 group-hover:w-3" aria-hidden="true" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-reveal sm:col-span-2 lg:col-span-1">
            <p className="mb-4 font-inter text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400">Redes</p>
            <div className="flex gap-3">
              <a href="https://www.linkedin.com/in/gabriel-co-fernandez/" target="_blank" rel="noreferrer" aria-label="Abrir perfil de LinkedIn" className="grid size-11 place-items-center rounded-full border-2 border-white/70 bg-transparent text-white outline-2 outline-transparent outline-offset-2 transition-all duration-200 hover:scale-105 hover:border-blue hover:bg-blue focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                <span className="font-inter text-lg font-bold" aria-hidden="true">in</span>
              </a>
              <a href="https://github.com/DevPyGabriel" target="_blank" rel="noreferrer" aria-label="Abrir perfil de GitHub" className="grid size-11 place-items-center rounded-full border-2 border-white/70 bg-white text-base outline-2 outline-transparent outline-offset-2 transition-all duration-200 hover:scale-105 hover:border-pink hover:bg-pink hover:outline-pink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                <GithubIcon size={20} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-reveal flex flex-col gap-4 border-t border-white/20 pt-6 font-inter text-xs text-neutral-400 sm:flex-row sm:items-center sm:justify-between sm:text-sm">
          <p>© {currentYear} Gabriel Fernández. Todos los derechos reservados.</p>
          <a href="#inicio" className="group inline-flex w-fit items-center gap-2 rounded-full text-neutral-200 outline-none transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
            Volver arriba
            <span className="grid size-8 place-items-center rounded-full border border-white/30 bg-white/5 transition-transform duration-200 group-hover:-translate-y-1">
              <ArrowUp className="size-4" aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};
