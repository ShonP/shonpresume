"use client";

import { FC } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";

interface IPostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  readingTime: number;
}

interface IBlogPreviewProps {
  posts: IPostMeta[];
}

const categoryColors: Record<string, string> = {
  finance: "bg-green-500/10 text-green-500",
  "real-estate": "bg-blue-500/10 text-blue-500",
  tech: "bg-purple-500/10 text-purple-500",
  "stock-market": "bg-yellow-500/10 text-yellow-500",
};

export const BlogPreview: FC<IBlogPreviewProps> = ({ posts }) => {
  const t = useTranslations("blog");
  const locale = useLocale();
  const blogPath = locale === "en" ? "" : `/${locale}`;

  if (posts.length === 0) {
    return (
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="text-2xl md:text-3xl font-bold mb-12 flex items-center gap-4"
          >
            <span className="text-[var(--primary)]">05.</span>
            {t("title")}
            <span className="flex-1 h-px bg-[var(--border)] hidden md:block" />
          </motion.h2>
          <p className="text-[var(--muted)] text-center">{t("noPosts")}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-2xl md:text-3xl font-bold mb-12 flex items-center gap-4"
        >
          <span className="text-[var(--primary)]">05.</span>
          {t("title")}
          <span className="flex-1 h-px bg-[var(--border)] hidden md:block" />
        </motion.h2>

        <motion.div
          className="grid gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {posts.slice(0, 3).map((post) => (
            <motion.article
              key={post.slug}
              variants={fadeInUp}
            >
              <Link
                href={`${blogPath}/blog/${post.slug}`}
                className="group block p-6 rounded-lg bg-[var(--card)] border border-[var(--border)] card-hover"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span
                        className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${
                          categoryColors[post.category] || categoryColors.tech
                        }`}
                      >
                        {t(`categories.${post.category}`)}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-[var(--muted)]">
                        <Calendar size={12} />
                        {formatDate(post.date, locale)}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-[var(--primary)] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-[var(--muted)] text-sm line-clamp-2 mb-3">
                      {post.excerpt}
                    </p>
                    <span className="flex items-center gap-1 text-xs text-[var(--muted)]">
                      <Clock size={12} />
                      {post.readingTime} {t("minRead")}
                    </span>
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="flex-shrink-0 text-[var(--muted)] group-hover:text-[var(--primary)] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all"
                  />
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mt-12 text-center"
        >
          <Link
            href={`${blogPath}/blog`}
            className="inline-flex items-center gap-2 text-[var(--primary)] hover:underline"
          >
            {t("allPosts")}
            <ArrowUpRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
