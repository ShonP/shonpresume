"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";
import { GraduationCap, Calendar, MapPin, Languages } from "lucide-react";

export const Education: FC = () => {
  const t = useTranslations("education");

  const educationItems = [
    {
      key: "degree1",
      icon: GraduationCap,
    },
    {
      key: "degree2",
      icon: GraduationCap,
    },
  ];

  const languages = ["hebrew", "english"];

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
          <span className="text-[var(--primary)]">04.</span>
          {t("title")}
          <span className="flex-1 h-px bg-[var(--border)] hidden md:block" />
        </motion.h2>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Education Timeline */}
          <motion.div
            className="lg:col-span-2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute start-6 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--primary)] via-[var(--primary)] to-transparent" />

              <div className="space-y-8">
                {educationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.key}
                      variants={fadeInUp}
                      className="relative ps-16"
                    >
                      {/* Timeline dot */}
                      <div
                        className="absolute start-0 w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center"
                      >
                        <Icon className="w-6 h-6 text-[var(--primary)]" />
                      </div>

                      <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-6 hover:border-[var(--primary)] transition-colors duration-300">
                        <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
                          {t(`items.${item.key}.degree`)}
                        </h3>

                        <div className="flex flex-wrap gap-4 text-sm text-[var(--muted)] mb-3">
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-[var(--primary)]" />
                            {t(`items.${item.key}.institution`)}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-[var(--primary)]" />
                            {t(`items.${item.key}.period`)}
                          </span>
                        </div>

                        <p className="text-sm text-[var(--muted)]">
                          {t(`items.${item.key}.location`)}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Languages Card */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="h-fit"
          >
            <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-6 hover:border-[var(--primary)] transition-colors duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-[var(--primary)]/10">
                  <Languages className="w-6 h-6 text-[var(--primary)]" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--foreground)]">
                  {t("languages.title")}
                </h3>
              </div>

              <div className="space-y-4">
                {languages.map((lang) => (
                  <div key={lang} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-[var(--foreground)]">
                        {t(`languages.${lang}.name`)}
                      </span>
                      <span className="text-xs text-[var(--primary)]">
                        {t(`languages.${lang}.level`)}
                      </span>
                    </div>
                    <div className="h-2 bg-[var(--background)] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]"
                        initial={{ width: 0 }}
                        whileInView={{ width: lang === "hebrew" ? "100%" : "95%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Flags */}
              <div className="flex gap-4 mt-6 pt-4 border-t border-[var(--border)]">
                <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                  <span className="text-xl">🇮🇱</span>
                  <span>{t("languages.hebrew.name")}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                  <span className="text-xl">🇺🇸</span>
                  <span>{t("languages.english.name")}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
