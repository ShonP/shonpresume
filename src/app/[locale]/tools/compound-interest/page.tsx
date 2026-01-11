import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CompoundInterestCalculator } from "@/components/Calculators";

interface ICompoundInterestPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function CompoundInterestPage({ params }: ICompoundInterestPageProps) {
  const { locale } = await params;
  
  return <CompoundInterestPageContent locale={locale} />;
}

function CompoundInterestPageContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const toolsPath = locale === "en" ? "/tools" : `/${locale}/tools`;

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <Link
            href={toolsPath}
            className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--primary)] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            {t("tools.backToTools")}
          </Link>
        </div>

        {/* Calculator */}
        <CompoundInterestCalculator locale={locale as "he" | "en"} />
      </div>
    </main>
  );
}

export async function generateMetadata({ params }: ICompoundInterestPageProps) {
  const { locale } = await params;
  
  const metadata = {
    en: {
      title: "Compound Interest Calculator | Shon Pazarker",
      description: "Calculate how your money grows over time with the power of compound interest",
    },
    he: {
      title: "מחשבון ריבית דריבית | שון פזרקר",
      description: "חשבו כיצד הכסף שלכם צומח לאורך זמן בעזרת כוח הריבית דריבית",
    },
  };

  return metadata[locale as keyof typeof metadata] || metadata.en;
}
