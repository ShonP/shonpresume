"use client";

import { FC } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { TrendingUp, Building2, Code2, Calculator, ArrowUpRight } from "lucide-react";
import { fadeInUp, staggerContainer, scaleIn, viewportConfig } from "@/lib/animations";

const iconMap = {
  chart: TrendingUp,
  building: Building2,
  code: Code2,
  calculator: Calculator,
};

interface IServiceItem {
  title: string;
  description: string;
  icon: keyof typeof iconMap;
}

export const Services: FC = () => {
  const t = useTranslations("services");

  const items: IServiceItem[] = [
    {
      title: t("items.0.title"),
      description: t("items.0.description"),
      icon: "chart",
    },
    {
      title: t("items.1.title"),
      description: t("items.1.description"),
      icon: "building",
    },
    {
      title: t("items.2.title"),
      description: t("items.2.description"),
      icon: "code",
    },
    {
      title: t("items.3.title"),
      description: t("items.3.description"),
      icon: "calculator",
    },
  ];

  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-2xl md:text-3xl font-bold mb-12 flex items-center gap-4"
        >
          <span className="text-[var(--primary)]">03.</span>
          {t("title")}
          <span className="flex-1 h-px bg-[var(--border)] hidden md:block" />
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-2 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {items.map((item, index) => {
            const Icon = iconMap[item.icon];
            return (
              <motion.div
                key={index}
                variants={scaleIn}
                className="group p-6 rounded-lg bg-[var(--card)] border border-[var(--border)] card-hover cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
                    <Icon size={24} />
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="text-[var(--muted)] group-hover:text-[var(--primary)] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-[var(--primary)] transition-colors">
                  {item.title}
                </h3>
                <p className="text-[var(--muted)] text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mt-12 text-center"
        >
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--primary)] text-[var(--background)] font-medium rounded-lg hover:bg-[var(--primary-light)] transition-colors"
          >
            {t("cta")}
            <ArrowUpRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
