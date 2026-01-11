"use client";

import { FC } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ExternalLink, Briefcase, Building2, Calendar } from "lucide-react";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";

interface IExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
}

export const Experience: FC = () => {
  const t = useTranslations("experience");

  const items: IExperienceItem[] = [
    {
      title: t("items.0.title"),
      company: t("items.0.company"),
      period: t("items.0.period"),
      description: t("items.0.description"),
      skills: [
        t("items.0.skills.0"),
        t("items.0.skills.1"),
        t("items.0.skills.2"),
        t("items.0.skills.3"),
        t("items.0.skills.4"),
        t("items.0.skills.5"),
      ],
    },
    {
      title: t("items.1.title"),
      company: t("items.1.company"),
      period: t("items.1.period"),
      description: t("items.1.description"),
      skills: [
        t("items.1.skills.0"),
        t("items.1.skills.1"),
        t("items.1.skills.2"),
        t("items.1.skills.3"),
        t("items.1.skills.4"),
        t("items.1.skills.5"),
      ],
    },
    {
      title: t("items.2.title"),
      company: t("items.2.company"),
      period: t("items.2.period"),
      description: t("items.2.description"),
      skills: [
        t("items.2.skills.0"),
        t("items.2.skills.1"),
        t("items.2.skills.2"),
        t("items.2.skills.3"),
        t("items.2.skills.4"),
      ],
    },
  ];

  return (
    <section id="experience" className="py-24 px-6 bg-[var(--card)]/30">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-2xl md:text-3xl font-bold mb-16 flex items-center gap-4"
        >
          <span className="text-[var(--primary)]">02.</span>
          {t("title")}
          <span className="flex-1 h-px bg-[var(--border)] hidden md:block" />
        </motion.h2>

        {/* Timeline Container */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute start-6 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--primary)] via-[var(--primary)]/50 to-transparent" />

          <motion.div
            className="space-y-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {items.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="relative ps-16"
              >
                {/* Timeline Node */}
                <div className="absolute start-0 top-0">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="relative"
                  >
                    {/* Pulse Animation */}
                    <div className="absolute inset-0 bg-[var(--primary)]/30 rounded-full animate-ping" />
                    {/* Node Circle */}
                    <div className="relative w-12 h-12 bg-[var(--background)] border-4 border-[var(--primary)] rounded-full flex items-center justify-center shadow-lg shadow-[var(--primary)]/20">
                      <Briefcase className="w-5 h-5 text-[var(--primary)]" />
                    </div>
                  </motion.div>
                </div>

                {/* Content Card */}
                <motion.div
                  whileHover={{ y: -4 }}
                  className="group relative p-6 bg-[var(--card)] rounded-2xl border border-[var(--border)] hover:border-[var(--primary)]/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[var(--primary)]/5 overflow-hidden"
                >
                  {/* Period Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-[var(--primary)]/10 text-[var(--primary)] rounded-full">
                      <Calendar className="w-3 h-3" />
                      {item.period}
                    </span>
                  </div>

                  {/* Title & Company */}
                  <h3 className="text-xl font-bold mb-1 group-hover:text-[var(--primary)] transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[var(--primary)] mb-4">
                    <Building2 className="w-4 h-4" />
                    <span className="font-medium">{item.company}</span>
                  </div>

                  {/* Description */}
                  <p className="text-[var(--muted)] text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {item.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skillIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: skillIndex * 0.05 }}
                        className="px-3 py-1 text-xs bg-[var(--muted)]/10 text-[var(--muted)] rounded-full hover:bg-[var(--primary)]/10 hover:text-[var(--primary)] transition-colors cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>

                  {/* Hover Line Accent */}
                  <div className="absolute bottom-0 start-0 w-0 h-1 bg-gradient-to-r rtl:bg-gradient-to-l from-[var(--primary)] to-[var(--primary)]/50 rounded-b-2xl group-hover:w-full transition-all duration-500" />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Timeline End Cap */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="absolute start-6 -bottom-8 -translate-x-1/2 rtl:translate-x-1/2"
          >
            <div className="w-4 h-4 bg-[var(--primary)]/30 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-[var(--primary)] rounded-full" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
