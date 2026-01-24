"use client";

import { FC } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Mail, ArrowUpRight, FileText } from "lucide-react";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";
import { trackContactSubmit } from "@/lib/analytics";

const FORM_URLS = {
  en: "https://docs.google.com/forms/d/e/1FAIpQLSdfQkrcdqGj7n_iTgf4xnPu8_Ucyr8i1U2fNicFjzXPXfK-Kg/viewform?usp=dialog",
  he: "https://docs.google.com/forms/d/e/1FAIpQLScK2oDKLTj-_oaxNnRMzcRthe3GGQ4tbCh1rhQ_wWzcxCPuNg/viewform?usp=dialog",
};

export const Contact: FC = () => {
  const t = useTranslations("contact");
  const locale = useLocale();
  const formUrl = FORM_URLS[locale as keyof typeof FORM_URLS] || FORM_URLS.en;

  return (
    <section id="contact" className="py-24 px-6">
      <motion.div
        className="max-w-2xl mx-auto text-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
      >
        <motion.p
          variants={fadeInUp}
          className="text-[var(--primary)] mb-4"
        >
          06. {t("title")}
        </motion.p>

        <motion.h2
          variants={fadeInUp}
          className="text-3xl md:text-5xl font-bold mb-6"
        >
          {t("title")}
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="text-[var(--muted)] text-lg mb-12"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href={formUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-4 bg-[var(--primary)] text-[var(--background)] font-medium rounded-lg hover:bg-[var(--primary-light)] transition-colors"
            onClick={() => trackContactSubmit("form")}
          >
            <FileText size={20} />
            {t("contactForm")}
            <ArrowUpRight size={16} className="rtl:-scale-x-100" />
          </Link>
          <Link
            href="mailto:pazshon1@gmail.com"
            className="flex items-center gap-2 px-8 py-4 border border-[var(--border)] text-[var(--foreground)] font-medium rounded-lg hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
            onClick={() => trackContactSubmit("email")}
          >
            <Mail size={20} />
            {t("email")}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};
