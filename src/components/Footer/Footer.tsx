"use client";

import { FC } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Github, Linkedin, Heart, Code2 } from "lucide-react";
import { trackOutboundClick } from "@/lib/analytics";

export const Footer: FC = () => {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/ShonP", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/shonpazarker", label: "LinkedIn" },
  ];

  return (
    <footer className="border-t border-[var(--border)] py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
                aria-label={social.label}
                onClick={() => trackOutboundClick(social.label, social.href)}
              >
                <social.icon size={20} />
              </Link>
            ))}
          </div>

          <p className="text-sm text-[var(--muted)] flex items-center gap-1">
            {t("footer.built")} <Heart size={14} className="text-[var(--primary)]" /> 
            {" "}&copy; {currentYear} {t("hero.name")}. {t("footer.rights")}.
          </p>
        </div>

        {/* Open Source Note */}
        <div className="mt-8 pt-6 border-t border-[var(--border)]">
          <Link
            href="https://github.com/ShonP/shonpresume"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
          >
            <Code2 size={16} />
            {t("footer.openSource")}
          </Link>
        </div>
      </div>
    </footer>
  );
};
