import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsBaseDirectory = path.join(process.cwd(), "content/posts");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: "finance" | "real-estate" | "tech" | "stock-market";
  tags: string[];
  readingTime: number;
  image?: string;
}

export interface Post extends PostMeta {
  content: string;
}

function getPostsDirectory(locale: string): string {
  return path.join(postsBaseDirectory, locale);
}

function ensurePostsDirectory(locale: string) {
  const dir = getPostsDirectory(locale);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function getAllPosts(locale: string = "he"): PostMeta[] {
  ensurePostsDirectory(locale);
  const postsDirectory = getPostsDirectory(locale);
  
  const files = fs.readdirSync(postsDirectory);
  const posts = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const fullPath = path.join(postsDirectory, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      const wordsPerMinute = 200;
      const words = content.trim().split(/\s+/).length;
      const readingTime = Math.ceil(words / wordsPerMinute);

      return {
        slug,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        category: data.category,
        tags: data.tags || [],
        readingTime,
        image: data.image,
      } as PostMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPostBySlug(slug: string, locale: string = "he"): Post | null {
  ensurePostsDirectory(locale);
  const postsDirectory = getPostsDirectory(locale);
  
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const readingTime = Math.ceil(words / wordsPerMinute);

    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      category: data.category,
      tags: data.tags || [],
      readingTime,
      image: data.image,
      content,
    };
  } catch {
    return null;
  }
}

export function getPostsByCategory(category: string, locale: string = "he"): PostMeta[] {
  return getAllPosts(locale).filter((post) => post.category === category);
}

export function getAllCategories(locale: string = "he"): string[] {
  const posts = getAllPosts(locale);
  const categories = new Set(posts.map((post) => post.category));
  return Array.from(categories);
}

export function getAllTags(locale: string = "he"): string[] {
  const posts = getAllPosts(locale);
  const tags = new Set(posts.flatMap((post) => post.tags));
  return Array.from(tags);
}

export function getAllPostSlugs(): { locale: string; slug: string }[] {
  const locales = ["he", "en"];
  const slugs: { locale: string; slug: string }[] = [];
  
  for (const locale of locales) {
    const posts = getAllPosts(locale);
    for (const post of posts) {
      slugs.push({ locale, slug: post.slug });
    }
  }
  
  return slugs;
}
