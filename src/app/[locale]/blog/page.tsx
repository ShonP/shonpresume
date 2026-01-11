import { setRequestLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import { Clock, Calendar, ArrowLeft, ArrowUpRight } from "lucide-react";

interface IPageProps {
  params: Promise<{ locale: string }>;
}

const categoryColors: Record<string, string> = {
  finance: "bg-green-500/10 text-green-500",
  "real-estate": "bg-blue-500/10 text-blue-500",
  tech: "bg-purple-500/10 text-purple-500",
  "stock-market": "bg-yellow-500/10 text-yellow-500",
};

export default async function BlogPage({ params }: IPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations();
  const posts = getAllPosts(locale);
  const homeHref = locale === "en" ? "/" : `/${locale}`;
  const blogPath = locale === "en" ? "" : `/${locale}`;

  return (
    <section className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <Link
            href={homeHref}
            className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-6"
          >
            <ArrowLeft size={16} className="rtl:rotate-180" />
            {t("common.backToHome")}
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold">{t("blog.allPosts")}</h1>
        </div>

        {posts.length === 0 ? (
          <p className="text-[var(--muted)] text-center py-12">{t("blog.noPosts")}</p>
        ) : (
          <div className="grid gap-6">
            {posts.map((post) => (
              <article key={post.slug}>
                <Link
                  href={`${blogPath}/blog/${post.slug}`}
                  className="group block p-6 rounded-lg bg-[var(--card)] border border-[var(--border)] card-hover"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            categoryColors[post.category] || categoryColors.tech
                          }`}
                        >
                          {t(`blog.categories.${post.category}`)}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-[var(--muted)]">
                          <Calendar size={12} />
                          {formatDate(post.date, locale)}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-[var(--muted)]">
                          <Clock size={12} />
                          {post.readingTime} {t("blog.minRead")}
                        </span>
                      </div>
                      <h2 className="text-xl font-semibold mb-2 group-hover:text-[var(--primary)] transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-[var(--muted)] line-clamp-2">
                        {post.excerpt}
                      </p>
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 text-xs bg-[var(--background)] text-[var(--muted)] rounded"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <ArrowUpRight
                      size={20}
                      className="flex-shrink-0 text-[var(--muted)] group-hover:text-[var(--primary)] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all"
                    />
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
