import { useRef, type FormEvent } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CalendarDays, MessageCircle, Paperclip, Send, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const WHATSAPP_NUMBER = "584246734897";

export const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const motion = gsap.matchMedia();
      motion.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".contact-heading-reveal", {
          y: 28,
          autoAlpha: 0,
          duration: 0.75,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 72%", once: true },
        });
        gsap.from(".contact-card-reveal", {
          y: 24,
          autoAlpha: 0,
          duration: 0.7,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 62%", once: true },
        });
      });

      return () => motion.revert();
    },
    { scope: sectionRef },
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const contact = String(data.get("contact") ?? "").trim();
    const service = String(data.get("service") ?? "").trim();
    const details = String(data.get("details") ?? "").trim();
    const preferredDate = String(data.get("date") ?? "").trim();

    const message = [
      "Hola Gabriel, quiero organizar una reunión.",
      "",
      `Nombre: ${name}`,
      `Contacto: ${contact}`,
      `Servicio: ${service}`,
      preferredDate ? `Fecha preferida: ${preferredDate}` : "",
      details ? `Detalles: ${details}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="contact-section relative w-full overflow-hidden bg-canvas py-24 md:py-28 lg:py-32"
      aria-labelledby="contact-heading"
    >
      <div className="absolute right-[-3rem] top-12 size-44 rotate-12 rounded-full border-[18px] border-white/60" aria-hidden="true" />
      <div className="absolute bottom-[-4rem] left-[-4rem] size-52 rotate-6 rounded-[2rem] border-2 border-base/15 bg-pink/25" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 md:px-12">
        <div className="mb-10 md:mb-14">
          <h2
            id="contact-heading"
            className="contact-heading-reveal max-w-4xl text-5xl leading-none tracking-tighter sm:text-6xl md:text-7xl lg:text-[82px] lg:leading-none"
          >
            <span className="inline-block relative">
              <span className="absolute -top-10 left-1 -rotate-3 whitespace-nowrap font-inter tracking-normal">
                <span className="relative flex items-center gap-1.5 rounded-md border-2 border-white bg-blue-200 py-1.5 px-5 text-xs font-semibold text-base shadow-tag outline-1 outline-base/10 sm:text-sm">
                  <span className="absolute -left-3 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-blue text-white shadow-[0_2px_6px_rgb(23_23_23/0.18)]">
                    <CalendarDays size={16} aria-hidden="true" />
                  </span>
                  <Paperclip className="absolute -top-3 left-16 size-5 -rotate-12 text-yellow" aria-hidden="true" />
                  <span>Agenda una conversación</span>
                </span>
              </span>
              ¿Tienes una idea?
            </span>
                <span className="inline-block px-2 md:px-3 lg:px-4 lg:py-1 -mx-1 outline outline-base relative rotate-1 bg-pink-100 text-pink">
                  <span className="size-2.5 outline outline-base absolute -left-1.5 -top-1.5 bg-pink"></span>
                  <span className="size-2.5 outline outline-base absolute -right-1.5 -top-1.5 bg-pink"></span>
                  <span className="size-2.5 outline outline-base absolute -left-1.5 -bottom-1.5 bg-pink"></span>
                  <span className="size-2.5 outline outline-base absolute -right-1.5 -bottom-1.5 bg-pink"></span>
                  Hagamosla
                </span>{" "}
            realidad.
          </h2>

          <p className="contact-heading-reveal mt-6 max-w-xl font-inter text-lg leading-relaxed text-neutral-700">
            Cuéntame qué quieres crear o mejorar. Te responderé por WhatsApp para definir los próximos pasos y una posible reunión.
          </p>
        </div>

        <div className="contact-card-reveal grid overflow-hidden rounded-2xl border-2 border-base bg-canvas shadow-card lg:grid-cols-[0.72fr_1.28fr]">
          <aside className="relative flex flex-col justify-between border-b-2 border-base bg-yellow-300 p-6 sm:p-8 lg:border-b-0 lg:border-r-2 lg:p-10">
            <div>
              <div className="mb-6 flex size-14 items-center justify-center rounded-full border-2 border-base bg-white shadow-tag -rotate-3">
                <MessageCircle className="size-6" strokeWidth={2.2} aria-hidden="true" />
              </div>
              <p className="text-3xl font-semibold leading-tight tracking-tighter sm:text-4xl">
                Una charla puede convertir tu idea en el siguiente proyecto.
              </p>
            </div>

            <div className="mt-10 flex items-center gap-3 font-inter text-sm font-semibold text-neutral-800">
              <Sparkles className="size-5 text-base" aria-hidden="true" />
              Respuesta directa y sin compromiso
            </div>
          </aside>

          <form className="p-5 sm:p-8 lg:p-10" onSubmit={handleSubmit}>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 font-inter text-sm font-semibold text-base">
                Nombre
                <input
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="¿Cómo te llamas?"
                  className="h-12 rounded-xl border-2 border-base/20 bg-white px-4 font-normal outline-none transition-colors placeholder:text-neutral-400 focus:border-blue focus:ring-2 focus:ring-blue/20"
                />
              </label>

              <label className="grid gap-2 font-inter text-sm font-semibold text-base">
                Email o WhatsApp
                <input
                  name="contact"
                  type="text"
                  required
                  autoComplete="email"
                  placeholder="Tu contacto preferido"
                  className="h-12 rounded-xl border-2 border-base/20 bg-white px-4 font-normal outline-none transition-colors placeholder:text-neutral-400 focus:border-blue focus:ring-2 focus:ring-blue/20"
                />
              </label>

              <label className="grid gap-2 font-inter text-sm font-semibold text-base">
                Servicio
                <select
                  name="service"
                  required
                  defaultValue=""
                  className="h-12 rounded-xl border-2 border-base/20 bg-white px-4 font-normal outline-none transition-colors focus:border-blue focus:ring-2 focus:ring-blue/20"
                >
                  <option value="" disabled>Selecciona una opción</option>
                  <option value="Desarrollo de sitios web">Desarrollo de sitios web</option>
                  <option value="Rediseño de página web">Rediseño de página web</option>
                  <option value="Diseño UI/UX">Diseño UI/UX</option>
                  <option value="Otro">Otro</option>
                </select>
              </label>

              <label className="grid gap-2 font-inter text-sm font-semibold text-base">
                Fecha preferida
                <input
                  name="date"
                  type="date"
                  className="h-12 rounded-xl border-2 border-base/20 bg-white px-4 font-normal outline-none transition-colors focus:border-blue focus:ring-2 focus:ring-blue/20"
                />
              </label>
            </div>

            <label className="mt-5 grid gap-2 font-inter text-sm font-semibold text-base">
              Cuéntame brevemente sobre tu proyecto
              <textarea
                name="details"
                rows={5}
                placeholder="Objetivo, alcance, plazos o cualquier detalle útil..."
                className="resize-y rounded-xl border-2 border-base/20 bg-white px-4 py-3 font-normal leading-relaxed outline-none transition-colors placeholder:text-neutral-400 focus:border-blue focus:ring-2 focus:ring-blue/20"
              />
            </label>

            <button
              type="submit"
              className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-base px-7 font-inter text-sm font-semibold text-white outline-2 outline-transparent outline-offset-2 shadow-button transition-all duration-200 hover:outline-base hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-base sm:w-auto"
            >
              Enviar por WhatsApp
              <Send className="size-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
