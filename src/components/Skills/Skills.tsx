"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";
import {
  Code2,
  Cloud,
  Database,
  Bot,
  GitBranch,
  Cpu,
  Sparkles,
} from "lucide-react";

const iconMap: Record<string, FC<{ className?: string }>> = {
  code: Code2,
  cloud: Cloud,
  database: Database,
  bot: Bot,
  git: GitBranch,
  cpu: Cpu,
  sparkles: Sparkles,
};

export const Skills: FC = () => {
  const t = useTranslations("skills");

  const categories = [
    {
      key: "backend",
      icon: "cpu",
    },
    {
      key: "cloud",
      icon: "cloud",
    },
    {
      key: "frontend",
      icon: "code",
    },
    {
      key: "ai",
      icon: "bot",
    },
    {
      key: "database",
      icon: "database",
    },
    {
      key: "devops",
      icon: "git",
    },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {categories.map((category) => {
            const Icon = iconMap[category.icon];
            const skills = t(`categories.${category.key}.items`)
              .split(",")
              .map((s: string) => s.trim());

            return (
              <motion.div
                key={category.key}
                variants={fadeInUp}
                className="group relative overflow-hidden rounded-xl bg-[var(--card-bg)] border border-[var(--border)] p-6 hover:border-[var(--primary)] transition-all duration-300"
              >
                {/* Gradient background on hover */}
                <div
                  className="absolute inset-0 bg-[var(--primary)] opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                />

                <div className="relative z-10">
                  <div
                    className="inline-flex p-3 rounded-lg bg-[var(--primary)]/10 mb-4"
                  >
                    <Icon className="w-6 h-6 text-[var(--primary)]" />
                  </div>

                  <h3 className="text-lg font-semibold mb-4 text-[var(--foreground)]">
                    {t(`categories.${category.key}.name`)}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-xs rounded-full bg-[var(--background)] text-[var(--muted)] border border-[var(--border)] group-hover:border-[var(--primary)] group-hover:text-[var(--primary)] transition-colors duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
