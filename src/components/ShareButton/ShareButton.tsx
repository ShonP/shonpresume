"use client";

import { FC } from "react";
import { Share2 } from "lucide-react";
import { trackShare } from "@/lib/analytics";

interface IShareButtonProps {
  title: string;
  text: string;
  label: string;
  slug?: string;
}

export const ShareButton: FC<IShareButtonProps> = ({ title, text, label, slug }) => {
  const handleShare = () => {
    trackShare("native_share", slug);
    
    if (navigator.share) {
      navigator.share({
        title,
        text,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
    >
      <Share2 size={16} />
      {label}
    </button>
  );
};
