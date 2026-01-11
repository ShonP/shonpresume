import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calculator, Building2, Receipt, PiggyBank } from "lucide-react";

interface IToolsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

interface ITool {
  id: string;
  icon: React.ReactNode;
  available: boolean;
}

export default async function ToolsPage({ params }: IToolsPageProps) {
  const { locale } = await params;
  
  return <ToolsPageContent locale={locale} />;
}

function ToolsPageContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const homeHref = locale === "en" ? "/" : `/${locale}`;
  const toolsPath = locale === "en" ? "/tools" : `/${locale}/tools`;

  const tools: ITool[] = [
    {
      id: "compoundInterest",
      icon: <Calculator className="w-8 h-8" />,
      available: true,
    },
    {
      id: "rentalYield",
      icon: <Building2 className="w-8 h-8" />,
      available: false,
    },
    {
      id: "taxCalculator",
      icon: <Receipt className="w-8 h-8" />,
      available: false,
    },
    {
      id: "savingsGoal",
      icon: <PiggyBank className="w-8 h-8" />,
      available: false,
    },
  ];

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <Link
            href={homeHref}
            className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--primary)] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            {t("common.backToHome")}
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-[var(--primary)]/10 rounded-xl">
              <Calculator className="w-8 h-8 text-[var(--primary)]" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">{t("tools.title")}</h1>
              <p className="text-[var(--muted)]">{t("tools.subtitle")}</p>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <ToolCard 
              key={tool.id}
              tool={tool}
              toolsPath={toolsPath}
              t={t}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

function ToolCard({ 
  tool, 
  toolsPath, 
  t, 
  locale 
}: { 
  tool: ITool; 
  toolsPath: string; 
  t: ReturnType<typeof useTranslations>;
  locale: string;
}) {
  const slugMap: Record<string, string> = {
    compoundInterest: "compound-interest",
    rentalYield: "rental-yield",
    taxCalculator: "tax-calculator",
    savingsGoal: "savings-goal",
  };

  const content = (
    <div className={`
      p-6 bg-[var(--card)] rounded-2xl border border-[var(--border)]
      transition-all duration-300 h-full
      ${tool.available 
        ? "hover:border-[var(--primary)] hover:shadow-lg hover:shadow-[var(--primary)]/10 cursor-pointer group" 
        : "opacity-60"
      }
    `}>
      <div className="flex items-start justify-between mb-4">
        <div className={`
          p-3 rounded-xl transition-colors
          ${tool.available 
            ? "bg-[var(--primary)]/10 text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white" 
            : "bg-[var(--muted)]/10 text-[var(--muted)]"
          }
        `}>
          {tool.icon}
        </div>
        {tool.available && (
          <ArrowRight className="w-5 h-5 text-[var(--muted)] group-hover:text-[var(--primary)] transition-colors rtl:rotate-180" />
        )}
        {!tool.available && (
          <span className="text-xs px-2 py-1 bg-[var(--muted)]/10 text-[var(--muted)] rounded-full">
            {locale === "he" ? "בקרוב" : "Coming Soon"}
          </span>
        )}
      </div>
      <h3 className={`
        text-xl font-semibold mb-2
        ${tool.available ? "group-hover:text-[var(--primary)] transition-colors" : ""}
      `}>
        {t(`tools.items.${tool.id}.title`)}
      </h3>
      <p className="text-[var(--muted)] text-sm leading-relaxed">
        {t(`tools.items.${tool.id}.description`)}
      </p>
    </div>
  );

  if (tool.available) {
    return (
      <Link href={`${toolsPath}/${slugMap[tool.id]}`}>
        {content}
      </Link>
    );
  }

  return content;
}

export async function generateMetadata({ params }: IToolsPageProps) {
  const { locale } = await params;
  
  const metadata = {
    en: {
      title: "Financial Tools | Shon Pazarker",
      description: "Free financial calculators and tools to help you make smart investment decisions",
    },
    he: {
      title: "כלים פיננסיים | שון פזרקר",
      description: "מחשבונים וכלים פיננסיים חינמיים לקבלת החלטות השקעה חכמות",
    },
  };

  return metadata[locale as keyof typeof metadata] || metadata.en;
}
