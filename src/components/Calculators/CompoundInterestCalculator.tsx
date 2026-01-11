"use client";

import { FC, useState, useMemo } from "react";
import { Calculator, TrendingUp, DollarSign, Percent, Calendar } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ICalculatorInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
  icon: React.ReactNode;
}

const CalculatorInput: FC<ICalculatorInputProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
  prefix,
  suffix,
  icon,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-[var(--foreground)] flex items-center gap-2">
          {icon}
          {label}
        </label>
        <div className="flex items-center gap-1 text-lg font-semibold text-[var(--primary)]">
          {prefix}
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            aria-label={label}
            className="w-24 text-right bg-transparent border-b border-[var(--border)] focus:border-[var(--primary)] outline-none"
          />
          {suffix}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="w-full h-2 bg-[var(--border)] rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
      />
      <div className="flex justify-between text-xs text-[var(--muted)]">
        <span>{prefix}{min.toLocaleString()}{suffix}</span>
        <span>{prefix}{max.toLocaleString()}{suffix}</span>
      </div>
    </div>
  );
};

interface IResultCardProps {
  title: string;
  value: string;
  subtitle?: string;
  color?: string;
}

const ResultCard: FC<IResultCardProps> = ({ title, value, subtitle, color = "var(--primary)" }) => {
  return (
    <div className="bg-[var(--card)] rounded-xl p-4 border border-[var(--border)] hover:border-[var(--primary)] transition-colors">
      <p className="text-sm text-[var(--muted)] mb-1">{title}</p>
      <p className="text-2xl font-bold" style={{ color }}>{value}</p>
      {subtitle && <p className="text-xs text-[var(--muted)] mt-1">{subtitle}</p>}
    </div>
  );
};

interface ICompoundInterestCalculatorProps {
  locale?: "he" | "en";
}

export const CompoundInterestCalculator: FC<ICompoundInterestCalculatorProps> = ({ locale = "en" }) => {
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [annualInterestRate, setAnnualInterestRate] = useState(8);
  const [investmentPeriod, setInvestmentPeriod] = useState(20);

  const translations = {
    en: {
      title: "Compound Interest Calculator",
      subtitle: "See how your money grows over time with the power of compound interest",
      initialInvestment: "Initial Investment",
      monthlyContribution: "Monthly Contribution",
      annualInterestRate: "Annual Interest Rate",
      investmentPeriod: "Investment Period",
      years: "years",
      totalValue: "Total Value",
      totalContributions: "Total Contributions",
      totalInterest: "Total Interest Earned",
      growthMultiplier: "Growth Multiplier",
      principal: "Principal + Contributions",
      interest: "Interest Earned",
      projectedGrowth: "Projected Growth",
      chartSubtitle: "See how your investment grows year by year",
      disclaimer: "This calculator is for educational purposes only. Actual returns may vary based on market conditions.",
    },
    he: {
      title: "מחשבון ריבית דריבית",
      subtitle: "ראו כיצד הכסף שלכם צומח לאורך זמן בעזרת כוח הריבית דריבית",
      initialInvestment: "השקעה ראשונית",
      monthlyContribution: "הפקדה חודשית",
      annualInterestRate: "ריבית שנתית",
      investmentPeriod: "תקופת השקעה",
      years: "שנים",
      totalValue: "שווי סופי",
      totalContributions: "סך הפקדות",
      totalInterest: "סך רווחים",
      growthMultiplier: "מכפיל צמיחה",
      principal: "קרן + הפקדות",
      interest: "רווחים",
      projectedGrowth: "תחזית צמיחה",
      chartSubtitle: "ראו כיצד ההשקעה צומחת שנה אחר שנה",
      disclaimer: "מחשבון זה לצרכי למידה בלבד. התשואות בפועל עשויות להשתנות בהתאם לתנאי השוק.",
    },
  };

  const t = translations[locale];

  const calculation = useMemo(() => {
    const monthlyRate = annualInterestRate / 100 / 12;

    const data = [];
    let balance = initialInvestment;
    let totalContributions = initialInvestment;

    for (let year = 0; year <= investmentPeriod; year++) {
      const monthsThisYear = year === 0 ? 0 : 12;
      
      for (let month = 0; month < monthsThisYear; month++) {
        balance = balance * (1 + monthlyRate) + monthlyContribution;
        totalContributions += monthlyContribution;
      }

      data.push({
        name: `${year}`,
        principal: Math.round(totalContributions),
        interest: Math.round(balance - totalContributions),
        total: Math.round(balance),
      });
    }

    const finalBalance = balance;
    const finalContributions = totalContributions;
    const totalInterest = finalBalance - finalContributions;
    const multiplier = finalBalance / (initialInvestment || 1);

    return {
      data,
      finalBalance,
      finalContributions,
      totalInterest,
      multiplier,
    };
  }, [initialInvestment, monthlyContribution, annualInterestRate, investmentPeriod]);

  const formatCurrency = (value: number) => {
    if (locale === "he") {
      return `₪${value.toLocaleString("he-IL")}`;
    }
    return `$${value.toLocaleString("en-US")}`;
  };

  const currencySymbol = locale === "he" ? "₪" : "$";

  return (
    <div className="my-12 p-6 md:p-8 bg-gradient-to-br from-[var(--card)] to-[var(--background)] rounded-2xl border border-[var(--border)] shadow-xl">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 mb-3 px-4 py-2 bg-[var(--primary)]/10 rounded-full">
          <Calculator className="w-5 h-5 text-[var(--primary)]" />
          <span className="text-sm font-medium text-[var(--primary)]">{t.title}</span>
        </div>
        <p className="text-[var(--muted)]">{t.subtitle}</p>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <CalculatorInput
          label={t.initialInvestment}
          value={initialInvestment}
          onChange={setInitialInvestment}
          min={0}
          max={1000000}
          step={1000}
          prefix={currencySymbol}
          icon={<DollarSign className="w-4 h-4" />}
        />
        <CalculatorInput
          label={t.monthlyContribution}
          value={monthlyContribution}
          onChange={setMonthlyContribution}
          min={0}
          max={10000}
          step={100}
          prefix={currencySymbol}
          icon={<TrendingUp className="w-4 h-4" />}
        />
        <CalculatorInput
          label={t.annualInterestRate}
          value={annualInterestRate}
          onChange={setAnnualInterestRate}
          min={1}
          max={20}
          step={0.5}
          suffix="%"
          icon={<Percent className="w-4 h-4" />}
        />
        <CalculatorInput
          label={t.investmentPeriod}
          value={investmentPeriod}
          onChange={setInvestmentPeriod}
          min={1}
          max={50}
          step={1}
          suffix={` ${t.years}`}
          icon={<Calendar className="w-4 h-4" />}
        />
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <ResultCard
          title={t.totalValue}
          value={formatCurrency(Math.round(calculation.finalBalance))}
          color="#10b981"
        />
        <ResultCard
          title={t.totalContributions}
          value={formatCurrency(Math.round(calculation.finalContributions))}
          color="#3b82f6"
        />
        <ResultCard
          title={t.totalInterest}
          value={formatCurrency(Math.round(calculation.totalInterest))}
          color="#8b5cf6"
        />
        <ResultCard
          title={t.growthMultiplier}
          value={`${calculation.multiplier.toFixed(1)}x`}
          color="#f59e0b"
        />
      </div>

      {/* Chart */}
      <div className="p-6 bg-[var(--background)] rounded-xl border border-[var(--border)]">
        <div className="mb-4 pb-3 border-b border-[var(--border)]">
          <h3 className="text-lg font-semibold text-[var(--foreground)]">{t.projectedGrowth}</h3>
          <p className="text-sm text-[var(--muted)]">{t.chartSubtitle}</p>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={calculation.data} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
            <defs>
              <linearGradient id="principalGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="interestGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} />
            <XAxis
              dataKey="name"
              stroke="var(--muted)"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: "var(--border)" }}
            />
            <YAxis
              stroke="var(--muted)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => formatCurrency(value)}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload || !payload.length) return null;
                return (
                  <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-xl p-4 backdrop-blur-sm">
                    <p className="text-sm font-medium text-[var(--foreground)] mb-2 pb-2 border-b border-[var(--border)]">
                      {locale === "he" ? `שנה ${label}` : `Year ${label}`}
                    </p>
                    {payload.map((entry, index) => (
                      <div key={index} className="flex items-center justify-between gap-4 py-1">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: entry.color }}
                          />
                          <span className="text-sm text-[var(--muted)]">{entry.name}</span>
                        </div>
                        <span className="text-sm font-semibold text-[var(--foreground)]">
                          {formatCurrency(entry.value as number)}
                        </span>
                      </div>
                    ))}
                  </div>
                );
              }}
            />
            <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="circle" />
            <Area
              type="monotone"
              dataKey="principal"
              name={t.principal}
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#principalGradient)"
              stackId="1"
            />
            <Area
              type="monotone"
              dataKey="interest"
              name={t.interest}
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#interestGradient)"
              stackId="1"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Disclaimer */}
      <p className="mt-6 text-xs text-center text-[var(--muted)]">
        {t.disclaimer}
      </p>
    </div>
  );
};
