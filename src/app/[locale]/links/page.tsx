"use client";

import { FC } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, BookOpen, Home } from "lucide-react";

interface ILinkItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  external: boolean;
}

const LINKS: ILinkItem[] = [
  {
    label: "GitHub",
    href: "https://github.com/ShonP",
    icon: <Github size={20} />,
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shon-pazarker/",
    icon: <Linkedin size={20} />,
    external: true,
  },
  {
    label: "AI Manga Reader",
    href: "https://manga.equival.io/",
    icon: <BookOpen size={20} />,
    external: true,
  },
  {
    label: "Portfolio",
    href: "/",
    icon: <Home size={20} />,
    external: false,
  },
  {
    label: "Reddit",
    href: "https://www.reddit.com/user/LifeSubstantial5234",
    icon: <RedditIcon />,
    external: true,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.4,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

function RedditIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="14" r="7" />
      <circle cx="9" cy="12.5" r="1" fill="currentColor" />
      <circle cx="15" cy="12.5" r="1" fill="currentColor" />
      <path d="M9.5 16.5c1 1 4 1 5 0" />
      <path d="M17 7l2-2" />
      <circle cx="19.5" cy="4.5" r="1.5" />
      <path d="M12 7V3" />
    </svg>
  );
}

const LinksPage: FC = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12">
      {/* Animated gradient background */}
      <motion.div
        className="pointer-events-none fixed inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(ellipse at 20% 50%, var(--primary) 0%, transparent 50%)",
            "radial-gradient(ellipse at 80% 20%, var(--primary) 0%, transparent 50%)",
            "radial-gradient(ellipse at 50% 80%, var(--primary) 0%, transparent 50%)",
            "radial-gradient(ellipse at 20% 50%, var(--primary) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Noise/grain overlay for premium feel */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center gap-8">
        {/* Profile photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] opacity-75 blur-sm" />
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-[var(--card)] text-2xl font-bold text-[var(--primary)] ring-2 ring-[var(--primary)]/30">
              SP
            </div>
          </div>
        </motion.div>

        {/* Name & title */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-center"
        >
          <h1 className="text-2xl font-bold text-[var(--foreground)]">
            Shon Pazarker
          </h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Senior Software Engineer
          </p>
        </motion.div>

        {/* Links */}
        <motion.ul
          className="flex w-full flex-col gap-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {LINKS.map((link) => (
            <motion.li key={link.label} variants={itemVariants}>
              <LinkButton {...link} />
            </motion.li>
          ))}
        </motion.ul>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="mt-4 text-xs text-[var(--muted)]"
        >
          © {new Date().getFullYear()} Shon Pazarker
        </motion.p>
      </div>
    </div>
  );
};

const LinkButton: FC<ILinkItem> = ({ label, href, icon, external }) => {
  const className =
    "group flex w-full items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)]/60 px-5 py-4 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-[var(--primary)]/50 hover:bg-[var(--card-hover)]/80 hover:shadow-[0_0_24px_-6px_var(--primary)] active:scale-[0.98]";

  const content = (
    <>
      <span className="text-[var(--muted)] transition-colors duration-300 group-hover:text-[var(--primary)]">
        {icon}
      </span>
      <span className="flex-1 text-sm font-medium text-[var(--foreground)]">
        {label}
      </span>
      <span className="text-[var(--muted)] transition-transform duration-300 group-hover:translate-x-0.5">
        →
      </span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
};

export default LinksPage;
