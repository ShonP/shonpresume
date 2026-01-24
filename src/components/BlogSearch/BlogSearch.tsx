"use client";

import { FC, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Clock, Calendar, ArrowUpRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface IPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  readingTime: number;
  tags: string[];
  content?: string;
}

interface IBlogSearchProps {
  posts: IPost[];
  locale: string;
}

const categoryColors: Record<string, string> = {
  finance: "bg-green-500/10 text-green-500",
  "real-estate": "bg-blue-500/10 text-blue-500",
  tech: "bg-purple-500/10 text-purple-500",
  "stock-market": "bg-yellow-500/10 text-yellow-500",
};

// Function to highlight matching text
const highlightText = (text: string, query: string): React.ReactNode => {
  if (!query.trim()) return text;
  
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  
  return parts.map((part, i) => 
    regex.test(part) ? (
      <mark key={i} className="bg-[var(--primary)]/30 text-[var(--foreground)] rounded px-0.5">
        {part}
      </mark>
    ) : (
      part
    )
  );
};

// Function to find content snippet with match
const findContentSnippet = (content: string, query: string, maxLength: number = 150): string | null => {
  if (!query.trim() || !content) return null;
  
  const lowerContent = content.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const index = lowerContent.indexOf(lowerQuery);
  
  if (index === -1) return null;
  
  const start = Math.max(0, index - 50);
  const end = Math.min(content.length, index + query.length + 100);
  
  let snippet = content.slice(start, end);
  if (start > 0) snippet = "..." + snippet;
  if (end < content.length) snippet = snippet + "...";
  
  return snippet;
};

export const BlogSearch: FC<IBlogSearchProps> = ({ posts, locale }) => {
  const t = useTranslations();
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const blogPath = locale === "en" ? "" : `/${locale}`;

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return posts;
    
    const query = searchQuery.toLowerCase();
    return posts.filter((post) => {
      const titleMatch = post.title.toLowerCase().includes(query);
      const excerptMatch = post.excerpt.toLowerCase().includes(query);
      const tagsMatch = post.tags.some(tag => tag.toLowerCase().includes(query));
      const categoryMatch = post.category.toLowerCase().includes(query);
      const contentMatch = post.content?.toLowerCase().includes(query);
      
      return titleMatch || excerptMatch || tagsMatch || categoryMatch || contentMatch;
    });
  }, [posts, searchQuery]);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  const hasResults = filteredPosts.length > 0;
  const isSearching = searchQuery.trim().length > 0;

  return (
    <div className="space-y-8">
      {/* Search Input */}
      <div className="relative">
        <div 
          className={`relative flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 ${
            isFocused 
              ? "border-[var(--primary)] bg-[var(--card)] shadow-lg shadow-[var(--primary)]/10" 
              : "border-[var(--border)] bg-[var(--card)]/50"
          }`}
        >
          <Search 
            size={20} 
            className={`flex-shrink-0 transition-colors ${
              isFocused ? "text-[var(--primary)]" : "text-[var(--muted)]"
            }`} 
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={t("blog.searchPlaceholder")}
            className="flex-1 bg-transparent outline-none text-[var(--foreground)] placeholder:text-[var(--muted)]"
          />
          <AnimatePresence>
            {isSearching && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={clearSearch}
                className="flex-shrink-0 p-1 rounded-full hover:bg-[var(--background)] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
              >
                <X size={16} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        
        {/* Search Results Count */}
        <AnimatePresence>
          {isSearching && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full mt-2 text-sm text-[var(--muted)]"
            >
              {hasResults 
                ? t("blog.searchResults", { count: filteredPosts.length })
                : t("blog.noSearchResults")
              }
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Posts List */}
      <div className="grid gap-6 mt-8">
        <AnimatePresence mode="popLayout">
          {filteredPosts.length === 0 && isSearching ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <p className="text-[var(--muted)]">{t("blog.noSearchResults")}</p>
              <button
                onClick={clearSearch}
                className="mt-4 text-[var(--primary)] hover:underline"
              >
                {t("blog.clearSearch")}
              </button>
            </motion.div>
          ) : (
            filteredPosts.map((post) => {
              const contentSnippet = isSearching ? findContentSnippet(post.content || "", searchQuery) : null;
              
              return (
                <motion.article
                  key={post.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
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
                          {isSearching ? highlightText(post.title, searchQuery) : post.title}
                        </h2>
                        <p className="text-[var(--muted)] line-clamp-2">
                          {isSearching ? highlightText(post.excerpt, searchQuery) : post.excerpt}
                        </p>
                        
                        {/* Content snippet with match */}
                        {contentSnippet && (
                          <div className="mt-3 p-3 rounded-lg bg-[var(--background)] border border-[var(--border)]">
                            <p className="text-sm text-[var(--muted)]">
                              {highlightText(contentSnippet, searchQuery)}
                            </p>
                          </div>
                        )}
                        
                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {post.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 text-xs bg-[var(--background)] text-[var(--muted)] rounded"
                              >
                                #{isSearching ? highlightText(tag, searchQuery) : tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <ArrowUpRight
                        size={20}
                        className="flex-shrink-0 text-[var(--muted)] group-hover:text-[var(--primary)] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all rtl:group-hover:-translate-x-1 rtl:group-hover:translate-y-0"
                      />
                    </div>
                  </Link>
                </motion.article>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
