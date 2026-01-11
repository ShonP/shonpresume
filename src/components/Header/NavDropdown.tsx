"use client";

import { FC, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface INavDropdownItem {
  name: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string;
}

interface INavDropdownProps {
  label: string;
  items: INavDropdownItem[];
  isActive?: boolean;
}

export const NavDropdown: FC<INavDropdownProps> = ({
  label,
  items,
  isActive = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={cn(
          "nav-link text-sm font-medium flex items-center gap-1 transition-colors",
          isActive && "active"
        )}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen ? "true" : "false"}
        aria-haspopup="true"
      >
        {label}
        <ChevronDown
          size={14}
          className={cn(
            "transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Dropdown Menu */}
      <div
        className={cn(
          "absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200",
          isOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2"
        )}
      >
        <div className="bg-[var(--background)] border border-[var(--border)] rounded-lg shadow-xl min-w-[200px] overflow-hidden">
          {items.map((item, index) => {
            const isDisabled = !!item.badge;
            
            if (isDisabled) {
              return (
                <div
                  key={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 text-sm text-[var(--muted)] opacity-50 cursor-not-allowed",
                    index !== items.length - 1 && "border-b border-[var(--border)]"
                  )}
                >
                  {item.icon && (
                    <span className="text-[var(--muted)]">{item.icon}</span>
                  )}
                  <div className="flex-1">
                    <span className="block">{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--muted)]/20 text-[var(--muted)]">
                      {item.badge}
                    </span>
                  )}
                </div>
              );
            }
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-sm text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--primary)]/10 transition-colors",
                  index !== items.length - 1 && "border-b border-[var(--border)]"
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.icon && (
                  <span className="text-[var(--primary)]">{item.icon}</span>
                )}
                <div className="flex-1">
                  <span className="block">{item.name}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
