import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { BlogPreview } from "@/components/BlogPreview";
import { Contact } from "@/components/Contact";
import { getAllPosts } from "@/lib/posts";

interface IPageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: IPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const allPosts = getAllPosts(locale);
  // TODO: Remove filter to show all posts including finance
  const posts = allPosts.filter((post) => post.category === "tech");

  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Education />
      <BlogPreview posts={posts} />
      <Contact />
    </>
  );
}
