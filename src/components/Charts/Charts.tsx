"use client";

import { FC } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface IChartData {
  [key: string]: string | number;
}

interface ILineChartProps {
  data: IChartData[];
  dataKey: string;
  dataKey2?: string;
  xAxisKey?: string;
  color?: string;
  color2?: string;
  height?: number;
  title?: string;
  subtitle?: string;
  formatValue?: (value: number) => string;
  showDots?: boolean;
}

interface IBarChartProps {
  data: IChartData[];
  dataKey: string;
  dataKey2?: string;
  xAxisKey?: string;
  color?: string;
  color2?: string;
  height?: number;
  title?: string;
  subtitle?: string;
  formatValue?: (value: number) => string;
  horizontal?: boolean;
}

interface IAreaChartProps {
  data: IChartData[];
  dataKey: string;
  dataKey2?: string;
  xAxisKey?: string;
  color?: string;
  color2?: string;
  height?: number;
  title?: string;
  subtitle?: string;
  formatValue?: (value: number) => string;
  stacked?: boolean;
}

interface IPieChartProps {
  data: IChartData[];
  dataKey: string;
  nameKey?: string;
  colors?: string[];
  height?: number;
  title?: string;
  subtitle?: string;
  formatValue?: (value: number) => string;
  showLabels?: boolean;
  innerRadius?: number;
}

const defaultColors = [
  "#10b981", // Emerald
  "#3b82f6", // Blue
  "#8b5cf6", // Violet
  "#f59e0b", // Amber
  "#ef4444", // Red
  "#06b6d4", // Cyan
  "#ec4899", // Pink
  "#84cc16", // Lime
];

const formatNumber = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K`;
  }
  return value.toLocaleString();
};

const formatCurrency = (value: number, symbol = "$"): string => {
  if (value >= 1000000) {
    return `${symbol}${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${symbol}${(value / 1000).toFixed(0)}K`;
  }
  return `${symbol}${value.toLocaleString()}`;
};

const formatPercent = (value: number): string => `${value}%`;

interface IChartHeaderProps {
  title?: string;
  subtitle?: string;
}

const ChartHeader: FC<IChartHeaderProps> = ({ title, subtitle }) => {
  if (!title && !subtitle) return null;
  return (
    <div className="mb-4 pb-3 border-b border-[var(--border)]">
      {title && (
        <h3 className="text-lg font-semibold text-[var(--foreground)]">
          {title}
        </h3>
      )}
      {subtitle && (
        <p className="text-sm text-[var(--muted)] mt-1">{subtitle}</p>
      )}
    </div>
  );
};

const CustomTooltip = ({
  active,
  payload,
  label,
  formatValue,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
  formatValue?: (value: number) => string;
}) => {
  if (!active || !payload || !payload.length) return null;

  const formatter = formatValue || formatNumber;

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-xl p-4 backdrop-blur-sm">
      <p className="text-sm font-medium text-[var(--foreground)] mb-2 pb-2 border-b border-[var(--border)]">
        {label}
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
            {formatter(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
};

export const ChartLine: FC<ILineChartProps> = ({
  data,
  dataKey,
  dataKey2,
  xAxisKey = "name",
  color = "#10b981",
  color2 = "#3b82f6",
  height = 350,
  title,
  subtitle,
  formatValue = formatNumber,
  showDots = true,
}) => {
  return (
    <div className="my-8 p-6 bg-gradient-to-br from-[var(--card)] to-[var(--background)] rounded-2xl border border-[var(--border)] shadow-lg">
      <ChartHeader title={title} subtitle={subtitle} />
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
          <defs>
            <linearGradient id="lineGradient1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
            {dataKey2 && (
              <linearGradient id="lineGradient2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color2} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color2} stopOpacity={0} />
              </linearGradient>
            )}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} />
          <XAxis
            dataKey={xAxisKey}
            stroke="var(--muted)"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: "var(--border)" }}
            dy={10}
          />
          <YAxis
            stroke="var(--muted)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => formatValue(value)}
            dx={-10}
          />
          <Tooltip content={<CustomTooltip formatValue={formatValue} />} />
          <Legend
            wrapperStyle={{ paddingTop: "20px" }}
            iconType="circle"
          />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={3}
            dot={showDots ? { fill: color, strokeWidth: 2, r: 4 } : false}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
          {dataKey2 && (
            <Line
              type="monotone"
              dataKey={dataKey2}
              stroke={color2}
              strokeWidth={3}
              dot={showDots ? { fill: color2, strokeWidth: 2, r: 4 } : false}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const ChartBar: FC<IBarChartProps> = ({
  data,
  dataKey,
  dataKey2,
  xAxisKey = "name",
  color = "#10b981",
  color2 = "#3b82f6",
  height = 350,
  title,
  subtitle,
  formatValue = formatNumber,
}) => {
  return (
    <div className="my-8 p-6 bg-gradient-to-br from-[var(--card)] to-[var(--background)] rounded-2xl border border-[var(--border)] shadow-lg">
      <ChartHeader title={title} subtitle={subtitle} />
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
          <defs>
            <linearGradient id="barGradient1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={1} />
              <stop offset="100%" stopColor={color} stopOpacity={0.6} />
            </linearGradient>
            {dataKey2 && (
              <linearGradient id="barGradient2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color2} stopOpacity={1} />
                <stop offset="100%" stopColor={color2} stopOpacity={0.6} />
              </linearGradient>
            )}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} vertical={false} />
          <XAxis
            dataKey={xAxisKey}
            stroke="var(--muted)"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: "var(--border)" }}
            dy={10}
          />
          <YAxis
            stroke="var(--muted)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => formatValue(value)}
            dx={-10}
          />
          <Tooltip content={<CustomTooltip formatValue={formatValue} />} />
          <Legend
            wrapperStyle={{ paddingTop: "20px" }}
            iconType="circle"
          />
          <Bar
            dataKey={dataKey}
            fill="url(#barGradient1)"
            radius={[8, 8, 0, 0]}
            maxBarSize={60}
          />
          {dataKey2 && (
            <Bar
              dataKey={dataKey2}
              fill="url(#barGradient2)"
              radius={[8, 8, 0, 0]}
              maxBarSize={60}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const ChartArea: FC<IAreaChartProps> = ({
  data,
  dataKey,
  dataKey2,
  xAxisKey = "name",
  color = "#10b981",
  color2 = "#3b82f6",
  height = 350,
  title,
  subtitle,
  formatValue = formatNumber,
  stacked = false,
}) => {
  return (
    <div className="my-8 p-6 bg-gradient-to-br from-[var(--card)] to-[var(--background)] rounded-2xl border border-[var(--border)] shadow-lg">
      <ChartHeader title={title} subtitle={subtitle} />
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
          <defs>
            <linearGradient id="areaGradient1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.4} />
              <stop offset="95%" stopColor={color} stopOpacity={0.05} />
            </linearGradient>
            {dataKey2 && (
              <linearGradient id="areaGradient2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color2} stopOpacity={0.4} />
                <stop offset="95%" stopColor={color2} stopOpacity={0.05} />
              </linearGradient>
            )}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} />
          <XAxis
            dataKey={xAxisKey}
            stroke="var(--muted)"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: "var(--border)" }}
            dy={10}
          />
          <YAxis
            stroke="var(--muted)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => formatValue(value)}
            dx={-10}
          />
          <Tooltip content={<CustomTooltip formatValue={formatValue} />} />
          <Legend
            wrapperStyle={{ paddingTop: "20px" }}
            iconType="circle"
          />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
            fill="url(#areaGradient1)"
            stackId={stacked ? "1" : undefined}
          />
          {dataKey2 && (
            <Area
              type="monotone"
              dataKey={dataKey2}
              stroke={color2}
              strokeWidth={2}
              fill="url(#areaGradient2)"
              stackId={stacked ? "1" : undefined}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const ChartPie: FC<IPieChartProps> = ({
  data,
  dataKey,
  nameKey = "name",
  colors = defaultColors,
  height = 350,
  title,
  subtitle,
  formatValue = formatNumber,
  showLabels = true,
  innerRadius = 0,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderCustomLabel = (props: any) => {
    const { cx, cy, midAngle, innerRadius: ir, outerRadius: or, percent, name } = props;
    const RADIAN = Math.PI / 180;
    const radius = ir + (or - ir) * 1.4;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="var(--foreground)"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={12}
      >
        {name} ({(percent * 100).toFixed(0)}%)
      </text>
    );
  };

  return (
    <div className="my-8 p-6 bg-gradient-to-br from-[var(--card)] to-[var(--background)] rounded-2xl border border-[var(--border)] shadow-lg">
      <ChartHeader title={title} subtitle={subtitle} />
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <defs>
            {colors.map((color, index) => (
              <linearGradient
                key={`pieGradient${index}`}
                id={`pieGradient${index}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor={color} stopOpacity={1} />
                <stop offset="100%" stopColor={color} stopOpacity={0.7} />
              </linearGradient>
            ))}
          </defs>
          <Pie
            data={data}
            dataKey={dataKey}
            nameKey={nameKey}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={100}
            label={showLabels ? renderCustomLabel : undefined}
            labelLine={showLabels}
            paddingAngle={2}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`url(#pieGradient${index % colors.length})`}
                stroke="var(--background)"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip formatValue={formatValue} />} />
          <Legend
            wrapperStyle={{ paddingTop: "20px" }}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

// Export formatting helpers for use in MDX
export { formatNumber, formatCurrency, formatPercent };
