import { notFound } from "next/navigation";
import Link from "next/link";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getPostBySlug, getAllPostSlugs } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import { Clock, Calendar, ArrowLeft } from "lucide-react";
import { MDXComponents } from "@/components/MDXComponents";
import { ShareButton } from "@/components/ShareButton";

interface IPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map(({ locale, slug }) => ({
    locale,
    slug,
  }));
}

export async function generateMetadata({ params }: IPageProps) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

const categoryColors: Record<string, string> = {
  finance: "bg-green-500/10 text-green-500",
  "real-estate": "bg-blue-500/10 text-blue-500",
  tech: "bg-purple-500/10 text-purple-500",
  "stock-market": "bg-yellow-500/10 text-yellow-500",
};

export default async function BlogPostPage({ params }: IPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();
  const post = getPostBySlug(slug, locale);
  const blogPath = locale === "en" ? "" : `/${locale}`;

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <Link
          href={`${blogPath}/blog`}
          className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-8"
        >
          <ArrowLeft size={16} className="rtl:rotate-180" />
          {t("blog.backToBlog")}
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span
              className={`px-3 py-1 text-sm rounded-full ${
                categoryColors[post.category] || categoryColors.tech
              }`}
            >
              {t(`blog.categories.${post.category}`)}
            </span>
            <span className="flex items-center gap-1 text-sm text-[var(--muted)]">
              <Calendar size={14} />
              {formatDate(post.date, locale)}
            </span>
            <span className="flex items-center gap-1 text-sm text-[var(--muted)]">
              <Clock size={14} />
              {post.readingTime} {t("blog.minRead")}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-6">{post.title}</h1>

          <p className="text-xl text-[var(--muted)] leading-relaxed">
            {post.excerpt}
          </p>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm bg-[var(--card)] text-[var(--muted)] rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="prose max-w-none">
          <MDXRemote
            source={post.content}
            components={MDXComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
          />
        </div>

        <footer className="mt-16 pt-8 border-t border-[var(--border)]">
          <div className="flex items-center justify-between">
            <Link
              href={`${blogPath}/blog`}
              className="inline-flex items-center gap-2 text-[var(--primary)] hover:underline"
            >
              <ArrowLeft size={16} className="rtl:rotate-180" />
              {t("blog.backToBlog")}
            </Link>
            <ShareButton
              title={post.title}
              text={post.excerpt}
              label={t("common.share")}
            />
          </div>
        </footer>
      </div>
    </article>
  );
}
