"use client";

import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { Menu, X, Globe, Cpu, ChevronDown } from "lucide-react";
// TODO: Uncomment when restoring Tools and Finance
// import { Calculator, TrendingUp, Landmark, PiggyBank, DollarSign } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NavDropdown } from "./NavDropdown";

export const Header: FC = () => {
  const t = useTranslations();
  const locale = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  // TODO: Uncomment when restoring Tools
  // const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const [mobileBlogOpen, setMobileBlogOpen] = useState(false);

  // For English (default), use root path. For Hebrew, use /he
  const localePath = locale === "en" ? "" : `/${locale}`;
  const homeHref = locale === "en" ? "/" : `/${locale}`;

  const navLinks = [
    { name: t("nav.about"), href: `${homeHref}#about` },
    { name: t("nav.experience"), href: `${homeHref}#experience` },
    { name: t("nav.contact"), href: `${homeHref}#contact` },
  ];

  // TODO: Uncomment when restoring Tools
  // const toolsDropdownItems = [
  //   {
  //     name: t("tools.items.compoundInterest.title"),
  //     href: `${localePath}/tools/compound-interest`,
  //     icon: <Calculator size={16} />,
  //   },
  //   {
  //     name: t("tools.items.rentalYield.title"),
  //     href: `${localePath}/tools/rental-yield`,
  //     icon: <Landmark size={16} />,
  //     badge: t("common.comingSoon"),
  //   },
  //   {
  //     name: t("tools.items.taxCalculator.title"),
  //     href: `${localePath}/tools/tax-calculator`,
  //     icon: <TrendingUp size={16} />,
  //     badge: t("common.comingSoon"),
  //   },
  //   {
  //     name: t("tools.items.savingsGoal.title"),
  //     href: `${localePath}/tools/savings-goal`,
  //     icon: <PiggyBank size={16} />,
  //     badge: t("common.comingSoon"),
  //   },
  // ];

  const blogDropdownItems = [
    {
      name: t("blog.categories.tech"),
      href: `${localePath}/blog/category/tech`,
      icon: <Cpu size={16} />,
    },
    // TODO: Uncomment when restoring Finance
    // {
    //   name: t("blog.categories.finance"),
    //   href: `${localePath}/blog/category/finance`,
    //   icon: <DollarSign size={16} />,
    // },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ["about", "experience", "contact"];

      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchLocale = locale === "he" ? "en" : "he";
  const switchLocaleHref = switchLocale === "en" ? "/" : "/he";

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--border)]"
          : ""
      )}
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href={homeHref}
          className="text-xl font-bold gradient-text hover:opacity-80 transition-opacity"
        >
          {t("hero.name")}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.slice(0, 3).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "nav-link text-sm font-medium",
                activeSection === link.href.split("#")[1] && "active"
              )}
            >
              {link.name}
            </Link>
          ))}
          {/* TODO: Uncomment when restoring Tools */}
          {/* <NavDropdown label={t("nav.tools")} items={toolsDropdownItems} /> */}
          <NavDropdown label={t("nav.blog")} items={blogDropdownItems} />
          {navLinks.slice(3).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "nav-link text-sm font-medium",
                activeSection === link.href.split("#")[1] && "active"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href={switchLocaleHref}
            className="flex items-center gap-1 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            <Globe size={16} />
            {t("common.switchLang")}
          </Link>
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[var(--background)] border-b border-[var(--border)]">
          <div className="px-6 py-4 space-y-2">
            {navLinks.slice(0, 3).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
              >
                {link.name}
              </Link>
            ))}
            
            {/* TODO: Uncomment when restoring Tools */}
            {/* Mobile Tools Dropdown */}
            {/* <div>
              <button
                onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
                className="flex items-center justify-between w-full py-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
              >
                {t("nav.tools")}
                <ChevronDown
                  size={16}
                  className={cn(
                    "transition-transform duration-200",
                    mobileToolsOpen && "rotate-180"
                  )}
                />
              </button>
              {mobileToolsOpen && (
                <div className="ps-4 space-y-1 border-s-2 border-[var(--primary)]/30 ms-2">
                  {toolsDropdownItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2 py-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                    >
                      <span className="text-[var(--primary)]">{item.icon}</span>
                      {item.name}
                      {item.badge && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--primary)]/20 text-[var(--primary)]">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div> */}

            {/* Mobile Blog Dropdown */}
            <div>
              <button
                onClick={() => setMobileBlogOpen(!mobileBlogOpen)}
                className="flex items-center justify-between w-full py-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
              >
                {t("nav.blog")}
                <ChevronDown
                  size={16}
                  className={cn(
                    "transition-transform duration-200",
                    mobileBlogOpen && "rotate-180"
                  )}
                />
              </button>
              {mobileBlogOpen && (
                <div className="ps-4 space-y-1 border-s-2 border-[var(--primary)]/30 ms-2">
                  {blogDropdownItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2 py-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                    >
                      <span className="text-[var(--primary)]">{item.icon}</span>
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.slice(3).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
              >
                {link.name}
              </Link>
            ))}
            
            <div className="pt-2 border-t border-[var(--border)]">
              <Link
                href={switchLocaleHref}
                className="flex items-center gap-2 py-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
              >
                <Globe size={16} />
                {t("common.switchLang")}
              </Link>
              <ThemeToggle withLabel={t("common.toggleTheme")} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
