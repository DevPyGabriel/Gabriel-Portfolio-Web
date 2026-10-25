import { useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  Clock,
  Code2,
  Mail,
  MessageCircle,
  Send,
} from "lucide-react";

const CONTACT_CONFIG = {
  name: "Gabriel Fernández",
  email: "",
  linkedinUrl: "",
  githubUrl: "",
  whatsappNumber: "",
} as const;

type MeetingRequest = {
  name: string;
  email: string;
  date: string;
  time: string;
  topic: string;
  message: string;
};

const inputClassName =
  "w-full rounded-xl border border-base/15 bg-neutral-100 px-4 py-3 font-inter text-base text-base outline-none transition-colors placeholder:text-body/70 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/25";

const labelClassName =
  "mb-2 flex items-center gap-2 font-inter text-sm font-semibold text-base";

const getToday = () => {
  const today = new Date();
  const localDate = new Date(
    today.getTime() - today.getTimezoneOffset() * 60_000,
  );

  return localDate.toISOString().slice(0, 10);
};

const formatMeetingDate = (date: string) => {
  if (!date) return "Por definir";

  const [year, month, day] = date.split("-").map(Number);
  return new Intl.DateTimeFormat("es", {
    dateStyle: "long",
  }).format(new Date(year, month - 1, day));
};

const createWhatsAppMessage = (request: MeetingRequest) =>
  [
    `Hola ${CONTACT_CONFIG.name}, me gustaría agendar una reunión.`,
    "",
    `Nombre: ${request.name || "Por completar"}`,
    `Correo: ${request.email || "Por completar"}`,
    `Fecha: ${formatMeetingDate(request.date)}`,
    `Hora: ${request.time || "Por definir"}`,
    `Tema: ${request.topic || "Por definir"}`,
    "",
    "Mensaje:",
    request.message.trim() || "Sin mensaje adicional.",
  ].join("\n");

export const Contact = () => {
  const [request, setRequest] = useState<MeetingRequest>({
    name: "",
    email: "",
    date: "",
    time: "",
    topic: "",
    message: "",
  });
  const [feedback, setFeedback] = useState("");
  const whatsappNumber = CONTACT_CONFIG.whatsappNumber.replace(/\D/g, "");
  const messagePreview = createWhatsAppMessage(request);
  const hasConfiguredContactLinks =
    CONTACT_CONFIG.email ||
    CONTACT_CONFIG.linkedinUrl ||
    CONTACT_CONFIG.githubUrl ||
    whatsappNumber;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!whatsappNumber) {
      setFeedback(
        "El destino aún no está configurado. Añade el número internacional en CONTACT_CONFIG.whatsappNumber.",
      );
      return;
    }

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messagePreview)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setFeedback("WhatsApp se abrió con tu mensaje listo para enviar.");
  };

  return (
    <section
      id="contacto"
      className="w-full scroll-mt-28 bg-surface py-20 sm:py-24 md:py-28 lg:py-36"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-8">
        <header className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-coral-100 px-4 py-2 font-inter text-sm font-semibold text-coral-700">
            <MessageCircle size={16} aria-hidden="true" />
            Contacto
          </span>
          <h2 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Hablemos de tu{" "}
            <span className="relative inline-block -rotate-2 bg-yellow-200 px-2 text-base">
              próximo proyecto
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl font-inter text-base leading-relaxed text-body sm:text-lg">
            Cuéntame qué tienes en mente y coordinemos una reunión.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <form
            className="rounded-2xl bg-neutral-100 p-5 sm:p-8"
            onSubmit={handleSubmit}
          >
            <div className="mb-7">
              <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Agenda una reunión
              </h3>
              <p className="mt-2 font-inter text-sm leading-relaxed text-body">
                Completa tus datos y elige cuándo te viene bien.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClassName} htmlFor="meeting-name">
                  Nombre
                </label>
                <input
                  autoComplete="name"
                  className={inputClassName}
                  id="meeting-name"
                  name="name"
                  onChange={(event) => {
                    setRequest((current) => ({
                      ...current,
                      name: event.target.value,
                    }));
                    setFeedback("");
                  }}
                  placeholder="Tu nombre"
                  required
                  value={request.name}
                />
              </div>

              <div>
                <label className={labelClassName} htmlFor="meeting-email">
                  Correo electrónico
                </label>
                <input
                  autoComplete="email"
                  className={inputClassName}
                  id="meeting-email"
                  name="email"
                  onChange={(event) => {
                    setRequest((current) => ({
                      ...current,
                      email: event.target.value,
                    }));
                    setFeedback("");
                  }}
                  placeholder="tu@correo.com"
                  required
                  type="email"
                  value={request.email}
                />
              </div>

              <div>
                <label className={labelClassName} htmlFor="meeting-date">
                  <CalendarDays size={16} aria-hidden="true" />
                  Fecha
                </label>
                <input
                  className={inputClassName}
                  id="meeting-date"
                  min={getToday()}
                  name="date"
                  onChange={(event) => {
                    setRequest((current) => ({
                      ...current,
                      date: event.target.value,
                    }));
                    setFeedback("");
                  }}
                  required
                  type="date"
                  value={request.date}
                />
              </div>

              <div>
                <label className={labelClassName} htmlFor="meeting-time">
                  <Clock size={16} aria-hidden="true" />
                  Hora
                </label>
                <input
                  className={inputClassName}
                  id="meeting-time"
                  name="time"
                  onChange={(event) => {
                    setRequest((current) => ({
                      ...current,
                      time: event.target.value,
                    }));
                    setFeedback("");
                  }}
                  required
                  type="time"
                  value={request.time}
                />
              </div>

              <div className="sm:col-span-2">
                <label className={labelClassName} htmlFor="meeting-topic">
                  ¿En qué te puedo ayudar?
                </label>
                <select
                  className={inputClassName}
                  id="meeting-topic"
                  name="topic"
                  onChange={(event) => {
                    setRequest((current) => ({
                      ...current,
                      topic: event.target.value,
                    }));
                    setFeedback("");
                  }}
                  required
                  value={request.topic}
                >
                  <option disabled value="">
                    Selecciona un tema
                  </option>
                  <option>Diseño UI/UX</option>
                  <option>Desarrollo frontend</option>
                  <option>Diseño y desarrollo</option>
                  <option>Otro</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className={labelClassName} htmlFor="meeting-message">
                  Cuéntame un poco más{" "}
                  <span className="font-normal text-body">(opcional)</span>
                </label>
                <textarea
                  className={`${inputClassName} min-h-28 resize-y`}
                  id="meeting-message"
                  name="message"
                  onChange={(event) => {
                    setRequest((current) => ({
                      ...current,
                      message: event.target.value,
                    }));
                    setFeedback("");
                  }}
                  placeholder="Objetivo, contexto o cualquier detalle útil..."
                  rows={4}
                  value={request.message}
                />
              </div>
            </div>

            <div className="mt-7 flex flex-col items-start gap-3">
              <button
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-base px-6 py-3 font-inter font-semibold text-surface shadow-button transition-all duration-200 hover:-translate-y-0.5 hover:shadow-button-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral motion-reduce:transition-none"
                type="submit"
              >
                Enviar por WhatsApp
                <Send size={17} aria-hidden="true" />
              </button>
              <p
                aria-live="polite"
                className="font-inter text-sm text-body"
                role="status"
              >
                {feedback}
              </p>
            </div>
          </form>

          <aside className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl bg-blue-50 p-5 sm:p-7">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p className="font-inter text-sm font-semibold text-blue-700">
                    Vista previa
                  </p>
                  <h3 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
                    Tu mensaje
                  </h3>
                </div>
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-mint-200 text-mint-800">
                  <MessageCircle size={21} aria-hidden="true" />
                </span>
              </div>

              <pre className="whitespace-pre-wrap break-words rounded-xl bg-surface p-4 font-inter text-sm leading-relaxed text-base shadow-card sm:p-5">
                {messagePreview}
              </pre>
              <p className="mt-4 font-inter text-xs leading-relaxed text-body">
                El mensaje se abrirá en WhatsApp para que puedas revisarlo y
                enviarlo.
              </p>
            </div>

            {hasConfiguredContactLinks && (
              <div className="rounded-2xl bg-yellow-100 p-5 sm:p-7">
                <h3 className="text-xl font-semibold tracking-tight">
                  También puedes encontrarme en
                </h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  {CONTACT_CONFIG.email && (
                    <a
                      className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2.5 font-inter text-sm font-medium text-base shadow-tag transition-colors hover:bg-yellow-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base"
                      href={`mailto:${CONTACT_CONFIG.email}`}
                    >
                      <Mail size={16} aria-hidden="true" />
                      Gmail
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  )}
                  {CONTACT_CONFIG.linkedinUrl && (
                    <a
                      className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2.5 font-inter text-sm font-medium text-base shadow-tag transition-colors hover:bg-yellow-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base"
                      href={CONTACT_CONFIG.linkedinUrl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <BriefcaseBusiness size={16} aria-hidden="true" />
                      LinkedIn
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  )}
                  {CONTACT_CONFIG.githubUrl && (
                    <a
                      className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2.5 font-inter text-sm font-medium text-base shadow-tag transition-colors hover:bg-yellow-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base"
                      href={CONTACT_CONFIG.githubUrl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <Code2 size={16} aria-hidden="true" />
                      GitHub
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  )}
                  {whatsappNumber && (
                    <a
                      className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2.5 font-inter text-sm font-medium text-base shadow-tag transition-colors hover:bg-yellow-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base"
                      href={`https://wa.me/${whatsappNumber}`}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <MessageCircle size={16} aria-hidden="true" />
                      WhatsApp
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
};