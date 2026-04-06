"use client";

import { FC } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Globe, BookOpen, ExternalLink } from "lucide-react";

interface ILinkItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  external: boolean;
}

interface ISideProject {
  name: string;
  description: string;
  href: string;
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
    href: "https://www.linkedin.com/in/shonpazarker/",
    icon: <Linkedin size={20} />,
    external: true,
  },
  {
    label: "Medium",
    href: "https://medium.com/@pazshon1",
    icon: <MediumIcon />,
    external: true,
  },
  {
    label: "Website",
    href: "/",
    icon: <Globe size={20} />,
    external: false,
  },
];

const SIDE_PROJECTS: ISideProject[] = [
  {
    name: "AI Manga Reader",
    description: "Translate manga to any language with AI",
    href: "https://manga.equival.io/",
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

function MediumIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12Zm7.42 0c0 3.54-1.51 6.42-3.38 6.42S14.2 15.54 14.2 12s1.52-6.42 3.38-6.42 3.38 2.88 3.38 6.42ZM24 12c0 3.17-.53 5.75-1.19 5.75S21.62 15.17 21.62 12s.53-5.75 1.19-5.75S24 8.83 24 12Z" />
    </svg>
  );
}

const LinktreePage: FC = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center px-4 py-12">
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

      <div className="relative z-10 flex w-full max-w-md flex-col items-center gap-8 mt-8">
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

        {/* Side Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="w-full"
        >
          <h2 className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
            Side Projects
          </h2>
          <div className="flex flex-col gap-3">
            {SIDE_PROJECTS.map((project) => (
              <a
                key={project.name}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--card)]/40 px-5 py-4 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-[var(--primary)]/50 hover:bg-[var(--card-hover)]/80 hover:shadow-[0_0_24px_-6px_var(--primary)] active:scale-[0.98]"
              >
                <span className="text-[var(--muted)] transition-colors duration-300 group-hover:text-[var(--primary)]">
                  <BookOpen size={20} />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--foreground)]">
                    {project.name}
                  </p>
                  <p className="text-xs text-[var(--muted)] truncate">
                    {project.description}
                  </p>
                </div>
                <ExternalLink
                  size={14}
                  className="shrink-0 text-[var(--muted)] transition-colors duration-300 group-hover:text-[var(--primary)]"
                />
              </a>
            ))}
          </div>
        </motion.div>

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

export default LinktreePage;
