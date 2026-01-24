import { setRequestLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { getAllPostsWithContent } from "@/lib/posts";
import { ArrowLeft } from "lucide-react";
import { BlogSearch } from "@/components/BlogSearch";

interface IPageProps {
  params: Promise<{ locale: string }>;
}

export default async function BlogPage({ params }: IPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations();
  const posts = getAllPostsWithContent(locale);
  const homeHref = locale === "en" ? "/" : `/${locale}`;

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
          <BlogSearch posts={posts} locale={locale} />
        )}
      </div>
    </section>
  );
}
