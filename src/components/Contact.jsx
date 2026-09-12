"use client";

import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import {
  Mail,
  Send,
  MapPin,
  Clock,
  ArrowUpRight,
  Sparkles,
  Check,
  AlertCircle,
} from "lucide-react";

/* ---------- Custom Brand Icons (Lucide removed brand icons) ---------- */
function LinkedInIcon({ size = 18, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon({ size = 18, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

/* ---------- Data ---------- */
const contactChannels = [
  {
    label: "Email",
    value: "sudaisinbox@gmail.com",
    href: "mailto:sudaisinbox@gmail.com",
    icon: Mail,
    color: "bg-accent/10 text-accent",
    hoverBorder: "hover:border-accent/40",
  },
  {
    label: "LinkedIn",
    value: "sudais-khan-78b3a6341",
    href: "https://www.linkedin.com/in/sudais-khan-78b3a6341/",
    icon: LinkedInIcon,
    color: "bg-blue-50 text-blue-600",
    hoverBorder: "hover:border-blue-300",
  },
  {
    label: "GitHub",
    value: "sudaiskhanDev",
    href: "https://github.com/sudaiskhanDev",
    icon: GitHubIcon,
    color: "bg-stone-100 text-stone-800",
    hoverBorder: "hover:border-stone-400",
  },
];

/* ---------- Variants ---------- */
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ---------- Input Field ---------- */
function InputField({
  label,
  type = "text",
  name,
  value,
  onChange,
  required,
  textarea,
}) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value;

  const Component = textarea ? "textarea" : "input";

  return (
    <div className="relative">
      <label
        className={`pointer-events-none absolute left-4 transition-all duration-300 ${
          isActive
            ? "-top-2.5 bg-white px-1.5 text-[11px] font-medium tracking-wide text-accent uppercase"
            : "top-4 text-sm text-stone-500"
        }`}
      >
        {label}
      </label>

      <Component
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={textarea ? 5 : undefined}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full rounded-2xl border bg-white px-4 py-4 text-sm text-stone-900 outline-none transition-all duration-300 placeholder:text-transparent resize-none ${
          focused
            ? "border-accent ring-4 ring-accent/10"
            : "border-stone-200 hover:border-stone-300"
        }`}
      />
    </div>
  );
}

/* ---------- Main Component ---------- */
export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Form state
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error as user types
    if (status === "error") {
      setStatus("idle");
      setErrorMsg("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Try again.");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  // Scroll-linked glow
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const glowOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.05, 0.15, 0.05]
  );

  return (
    <section
      id="contact"
      ref={ref}
      className="relative bg-white py-24 md:py-32 overflow-hidden"
    >
      {/* ---- Scroll-linked big glow ---- */}
      <motion.div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 h-[800px] w-[800px] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, #7C3AED 0%, transparent 70%)",
          y: glowY,
          opacity: glowOpacity,
        }}
      />

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#0A0A0A 1px, transparent 1px), linear-gradient(90deg, #0A0A0A 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* ==================== HEADER ==================== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="mb-16 max-w-3xl mx-auto text-center"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-3 text-xs font-mono tracking-widest text-stone-500 uppercase"
          >
            <span className="h-px w-8 bg-stone-300" />
            05 / Contact
            <span className="h-px w-8 bg-stone-300" />
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="mt-6 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] text-stone-900"
          >
            Let's build something{" "}
            <span className="text-accent">that ships</span>.
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-5 text-base md:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto"
          >
            Open to AI Engineer roles, freelance work, or a good conversation
            about LLMs and shipping. Reach out — I reply fast.
          </motion.p>
        </motion.div>

        {/* ==================== MAIN GRID ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* ---------- LEFT: Form ---------- */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="lg:col-span-3"
          >
            <motion.div
              variants={itemVariants}
              className="rounded-3xl border border-stone-200 bg-stone-50/50 p-6 md:p-10"
            >
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <InputField
                    label="Your name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                  <InputField
                    label="Email address"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <InputField
                  label="Your message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  textarea
                />

                {/* Error message */}
                {status === "error" && errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                  >
                    <AlertCircle size={14} className="shrink-0" />
                    {errorMsg}
                  </motion.div>
                )}

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={status !== "idle"}
                  whileHover={status === "idle" ? { y: -2 } : {}}
                  whileTap={status === "idle" ? { scale: 0.98 } : {}}
                  className={`group relative mt-2 inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3.5 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed ${
                    status === "error"
                      ? "bg-red-600"
                      : status === "sent"
                      ? "bg-emerald-600"
                      : "bg-stone-900 hover:bg-stone-800"
                  }`}
                >
                  {/* Shine sweep */}
                  <motion.span
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent"
                    animate={
                      status === "sending" ? { translateX: "200%" } : {}
                    }
                    transition={{
                      duration: 1.2,
                      repeat: status === "sending" ? Infinity : 0,
                    }}
                  />

                  <span className="relative flex items-center gap-2">
                    {status === "idle" && (
                      <>
                        Send message
                        <Send
                          size={14}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </>
                    )}
                    {status === "sending" && (
                      <>
                        Sending
                        <motion.span
                          className="inline-block h-3.5 w-3.5 rounded-full border-2 border-white border-t-transparent"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      </>
                    )}
                    {status === "sent" && (
                      <>
                        Message sent
                        <Check size={14} />
                      </>
                    )}
                    {status === "error" && (
                      <>
                        Failed to send
                        <AlertCircle size={14} />
                      </>
                    )}
                  </span>
                </motion.button>

                {/* Small helper text */}
                <p className="text-center text-xs text-stone-400">
                  Or email directly at{" "}
                  <a
                    href="mailto:sudaisinbox@gmail.com"
                    className="text-stone-600 hover:text-accent transition-colors"
                  >
                    sudaisinbox@gmail.com
                  </a>
                </p>
              </form>
            </motion.div>
          </motion.div>

          {/* ---------- RIGHT: Contact Channels ---------- */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="lg:col-span-2 flex flex-col gap-3"
          >
            {contactChannels.map((channel) => {
              const Icon = channel.icon;
              return (
                <motion.a
                  key={channel.label}
                  href={channel.href}
                  target={
                    channel.href.startsWith("http") ? "_blank" : undefined
                  }
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  whileHover={{ y: -4, x: 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className={`group flex items-center justify-between gap-4 rounded-2xl border border-stone-200 bg-white p-5 transition-colors ${channel.hoverBorder}`}
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 15,
                      }}
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${channel.color}`}
                    >
                      <Icon size={18} />
                    </motion.div>
                    <div className="min-w-0">
                      <div className="text-xs font-mono uppercase tracking-widest text-stone-400">
                        {channel.label}
                      </div>
                      <div className="mt-0.5 truncate text-sm font-medium text-stone-900">
                        {channel.value}
                      </div>
                    </div>
                  </div>

                  <ArrowUpRight
                    size={16}
                    className="shrink-0 text-stone-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent"
                  />
                </motion.a>
              );
            })}

            {/* Availability card */}
            <motion.div
              variants={itemVariants}
              className="mt-3 overflow-hidden rounded-2xl border border-stone-200 bg-stone-900 p-5 text-white"
            >
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/50">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Available now
              </div>

              <p className="mt-3 text-sm leading-relaxed text-white/80">
                Open to AI Engineer, Generative AI Engineer, and AI/ML Engineer
                roles — internship or full-time, remote or on-site.
              </p>

              <div className="mt-4 flex flex-col gap-1.5 text-xs text-white/60">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={11} />
                  Nowshera, Khyber Pakhtunkhwa, Pakistan
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={11} />
                  PKT (UTC+5) · Replies within 24h
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}