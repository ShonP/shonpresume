"use client";

import { FC } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";
import {
  ArrowRight,
  CheckCircle,
  Layout,
  BarChart3,
  Globe,
  Zap,
  RefreshCw,
  Building2,
  Briefcase,
  Users,
  Rocket,
  MessageCircle,
  FileText,
  Target,
  Calendar,
} from "lucide-react";

const LandingPagesService: FC = () => {
  const t = useTranslations("landingPages");
  const locale = useLocale();
  const homeHref = locale === "en" ? "/" : `/${locale}`;

  const deliverables = [
    { icon: Layout, key: "customLayout" },
    { icon: Zap, key: "responsive" },
    { icon: Globe, key: "seoReady" },
    { icon: Target, key: "businessFocused" },
  ];

  const analyticsFeatures = [
    { icon: BarChart3, key: "clarity" },
    { icon: BarChart3, key: "googleAnalytics" },
  ];

  const useCases = [
    { icon: Building2, key: "realEstate" },
    { icon: Briefcase, key: "business" },
    { icon: Users, key: "portfolio" },
    { icon: Rocket, key: "marketing" },
  ];

  const gettingStarted = [
    { icon: FileText, key: "references" },
    { icon: MessageCircle, key: "content" },
    { icon: Target, key: "goals" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="px-6 mb-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-2 mb-6 text-sm font-medium rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
              {t("badge")}
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t("hero.title")}
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-[var(--muted)] mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href={`${homeHref}#contact`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold hover:opacity-90 transition-opacity"
            >
              {t("hero.cta")}
              <ArrowRight size={20} className="rtl:rotate-180" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="px-6 py-16 bg-[var(--card)]/50">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("approach.title")}
            </h2>
            <p className="text-[var(--muted)] text-lg max-w-2xl mx-auto">
              {t("approach.description")}
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8"
          >
            <ul className="space-y-4">
              {[1, 2, 3].map((num) => (
                <li key={num} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] font-semibold text-sm">
                    {num}
                  </div>
                  <p className="text-[var(--foreground)] pt-1">
                    {t(`approach.steps.${num}`)}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </section>

      {/* What I Deliver Section */}
      <section className="px-6 py-20">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("deliverables.title")}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {deliverables.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.key}
                  variants={fadeInUp}
                  className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 hover:border-[var(--primary)]/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[var(--primary)]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        {t(`deliverables.items.${item.key}.title`)}
                      </h3>
                      <p className="text-[var(--muted)] text-sm">
                        {t(`deliverables.items.${item.key}.description`)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Analytics Section */}
      <section className="px-6 py-16 bg-[var(--card)]/50">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("analytics.title")}
            </h2>
            <p className="text-[var(--muted)] text-lg max-w-2xl mx-auto">
              {t("analytics.subtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {analyticsFeatures.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.key}
                  variants={fadeInUp}
                  className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[var(--primary)]" />
                    </div>
                    <h3 className="font-semibold">
                      {t(`analytics.items.${item.key}.title`)}
                    </h3>
                  </div>
                  <p className="text-[var(--muted)] text-sm">
                    {t(`analytics.items.${item.key}.description`)}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            variants={fadeInUp}
            className="flex items-center justify-center gap-2 text-sm text-[var(--muted)]"
          >
            <CheckCircle className="w-4 h-4 text-[var(--primary)]" />
            {t("analytics.ownership")}
          </motion.div>
        </motion.div>
      </section>

      {/* Hosting & Updates Section */}
      <section className="px-6 py-20">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              variants={fadeInUp}
              className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8"
            >
              <div className="w-12 h-12 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-[var(--primary)]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {t("hosting.title")}
              </h3>
              <p className="text-[var(--muted)]">{t("hosting.description")}</p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8"
            >
              <div className="w-12 h-12 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center mb-4">
                <RefreshCw className="w-6 h-6 text-[var(--primary)]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {t("updates.title")}
              </h3>
              <p className="text-[var(--muted)]">{t("updates.description")}</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Use Cases Section */}
      <section className="px-6 py-16 bg-[var(--card)]/50">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("useCases.title")}
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {useCases.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.key}
                  variants={fadeInUp}
                  className="flex items-center gap-4 bg-[var(--card)] border border-[var(--border)] rounded-lg p-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[var(--primary)]" />
                  </div>
                  <span className="font-medium">
                    {t(`useCases.items.${item.key}`)}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Getting Started Section */}
      <section className="px-6 py-20">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("gettingStarted.title")}
            </h2>
            <p className="text-[var(--muted)] text-lg">
              {t("gettingStarted.subtitle")}
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="bg-gradient-to-br from-[var(--primary)]/10 to-[var(--primary)]/5 border border-[var(--primary)]/20 rounded-2xl p-8 md:p-12"
          >
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {gettingStarted.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={item.key} className="text-center">
                    <div className="w-14 h-14 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-[var(--primary)]" />
                    </div>
                    <h3 className="font-semibold mb-2">
                      {t(`gettingStarted.items.${item.key}.title`)}
                    </h3>
                    <p className="text-sm text-[var(--muted)]">
                      {t(`gettingStarted.items.${item.key}.description`)}
                    </p>
                  </div>
                );
              })}
            </div>

            <p className="text-center text-[var(--muted)] mb-8">
              {t("gettingStarted.note")}
            </p>

            <div className="text-center">
              <Link
                href={`${homeHref}#contact`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold hover:opacity-90 transition-opacity"
              >
                <Calendar className="w-5 h-5" />
                {t("gettingStarted.cta")}
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default LandingPagesService;
