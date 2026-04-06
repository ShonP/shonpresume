import { Metadata } from "next";

interface ILinktreeLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Shon Pazarker | Links",
  description: "All my links in one place — GitHub, LinkedIn, Portfolio & more.",
};

export default function LinktreeLayout({ children }: ILinktreeLayoutProps) {
  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-background">
      {children}
    </div>
  );
}
