"use client";

import { FC, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react";
import { fadeInUp, viewportConfig } from "@/lib/animations";
import { trackNewsletterSignup } from "@/lib/analytics";

type SubmitStatus = "idle" | "loading" | "success" | "error";

export const Newsletter: FC = () => {
  const t = useTranslations("newsletter");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    // Simulate API call - replace with your newsletter service
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // TODO: Integrate with your newsletter service (e.g., ConvertKit, Mailchimp, Resend)
      console.log("Newsletter signup:", email);
      trackNewsletterSignup("newsletter_section");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="py-24 px-6 bg-[var(--card)]/30">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="max-w-2xl mx-auto text-center"
      >
        <div className="inline-flex items-center justify-center p-4 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] mb-6">
          <Mail size={32} />
        </div>

        <h2 className="text-2xl md:text-3xl font-bold mb-4">{t("title")}</h2>
        <p className="text-[var(--muted)] mb-8">{t("description")}</p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("placeholder")}
            required
            className="flex-1 px-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-lg text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--primary)] transition-colors"
            dir="ltr"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[var(--primary)] text-[var(--background)] font-medium rounded-lg hover:bg-[var(--primary-light)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {status === "loading" ? (
              <div className="w-5 h-5 border-2 border-[var(--background)] border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Send size={18} />
                {t("button")}
              </>
            )}
          </button>
        </form>

        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center justify-center gap-2 text-[var(--primary)]"
          >
            <CheckCircle size={18} />
            {t("success")}
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center justify-center gap-2 text-red-500"
          >
            <AlertCircle size={18} />
            {t("error")}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};
