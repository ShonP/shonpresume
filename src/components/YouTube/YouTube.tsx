"use client";

import { FC } from "react";
import { Play } from "lucide-react";

interface IYouTubeProps {
  videoId: string;
  title?: string;
}

export const YouTube: FC<IYouTubeProps> = ({ videoId, title = "YouTube video" }) => {
  return (
    <div className="my-8">
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-[var(--border)] shadow-lg bg-[var(--card)]">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
      {title && (
        <div className="flex items-center gap-2 mt-3 text-sm text-[var(--muted)]">
          <Play size={14} className="text-red-500" />
          <span>{title}</span>
        </div>
      )}
    </div>
  );
};
