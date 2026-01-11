import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

const BASE_URL = "https://shonpz.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["en", "he"];
  const currentDate = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/he`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/he/blog`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // TODO: Uncomment when restoring Tools
    // {
    //   url: `${BASE_URL}/tools/compound-interest`,
    //   lastModified: currentDate,
    //   changeFrequency: "monthly",
    //   priority: 0.7,
    // },
    // {
    //   url: `${BASE_URL}/he/tools/compound-interest`,
    //   lastModified: currentDate,
    //   changeFrequency: "monthly",
    //   priority: 0.7,
    // },
  ];

  // Blog category pages (only tech for now)
  const categoryPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/blog/category/tech`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/he/blog/category/tech`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    // TODO: Uncomment when restoring Finance
    // {
    //   url: `${BASE_URL}/blog/category/finance`,
    //   lastModified: currentDate,
    //   changeFrequency: "weekly",
    //   priority: 0.7,
    // },
    // {
    //   url: `${BASE_URL}/he/blog/category/finance`,
    //   lastModified: currentDate,
    //   changeFrequency: "weekly",
    //   priority: 0.7,
    // },
  ];

  // Blog posts - only tech posts for now
  const blogPosts: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    const posts = getAllPosts(locale);
    const techPosts = posts.filter((post) => post.category === "tech");
    const localePath = locale === "en" ? "" : `/${locale}`;

    for (const post of techPosts) {
      blogPosts.push({
        url: `${BASE_URL}${localePath}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return [...staticPages, ...categoryPages, ...blogPosts];
}
