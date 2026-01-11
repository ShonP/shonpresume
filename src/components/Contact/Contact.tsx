"use client";

import { FC } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";
import { trackContactSubmit } from "@/lib/analytics";

export const Contact: FC = () => {
  const t = useTranslations("contact");

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
            href="mailto:pazshon1@gmail.com"
            className="flex items-center gap-2 px-8 py-4 bg-[var(--primary)] text-[var(--background)] font-medium rounded-lg hover:bg-[var(--primary-light)] transition-colors"
            onClick={() => trackContactSubmit("email")}
          >
            <Mail size={20} />
            {t("email")}
            <ArrowUpRight size={16} />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};
