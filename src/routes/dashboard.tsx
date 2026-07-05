import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BLOOD_GROUPS } from "@/lib/blood-data";
import { Users, Droplet, Building2, HeartPulse } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Kakinada Blood Link" },
      { name: "description", content: "Live donor and blood stock analytics for Kakinada." },
    ],
  }),
  component: Dashboard,
});

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const PIE_COLORS = ["#dc2626", "#f97316", "#f59e0b", "#eab308", "#b45309", "#ef4444", "#7c2d12", "#a16207"];

function Dashboard() {
  const [monthly, setMonthly] = useState<{ m: string; n: number }[]>(MONTHS.map((m) => ({ m, n: 0 })));
  const [groups, setGroups] = useState<{ name: string; value: number }[]>([]);
  const [stock, setStock] = useState<{ g: string; units: number }[]>([]);
  const [kpi, setKpi] = useState({ donors: 0, hospitals: 0, units: 0, groups: 0 });

  useEffect(() => {
    (async () => {
      const [donorsRes, hospRes] = await Promise.all([
        supabase.from("donors").select("blood_group, created_at"),
        supabase.from("hospitals").select("stock"),
      ]);
      const rows = (donorsRes.data ?? []) as any[];
      const hosps = (hospRes.data ?? []) as any[];

      const year = new Date().getFullYear();
      const buckets = Array(12).fill(0);
      rows.forEach((r) => {
        const d = new Date(r.created_at);
        if (d.getFullYear() === year) buckets[d.getMonth()] += 1;
      });
      setMonthly(MONTHS.map((m, i) => ({ m, n: buckets[i] })));

      const counts: Record<string, number> = {};
      BLOOD_GROUPS.forEach((g) => (counts[g] = 0));
      rows.forEach((r) => {
        if (counts[r.blood_group] != null) counts[r.blood_group] += 1;
      });
      const groupData = BLOOD_GROUPS.map((g) => ({ name: g, value: counts[g] })).filter((d) => d.value > 0);
      setGroups(groupData);

      const totals: Record<string, number> = {};
      BLOOD_GROUPS.forEach((g) => (totals[g] = 0));
      hosps.forEach((h: any) => {
        const s = (h.stock as Record<string, number>) || {};
        BLOOD_GROUPS.forEach((g) => (totals[g] += Number(s[g] ?? 0)));
      });
      setStock(BLOOD_GROUPS.map((g) => ({ g, units: totals[g] })));

      const totalUnits = Object.values(totals).reduce((a, b) => a + b, 0);
      setKpi({
        donors: rows.length,
        hospitals: hosps.length,
        units: totalUnits,
        groups: groupData.length,
      });
    })();
  }, []);

  const tooltipStyle = {
    background: "var(--card)",
    border: "1px solid var(--border)",
    borderRadius: 8,
    fontSize: 12,
  };

  return (
    <Layout>
      <section className="max-w-7xl mx-auto px-4 py-10 md:py-14">
        {/* Header */}
        <div className="mb-8">
          <div className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">Dashboard</div>
          <h1 className="mt-2 font-display text-3xl md:text-4xl font-bold text-foreground">Kakinada Blood Network</h1>
          <p className="mt-2 text-muted-foreground text-sm">Live donor registrations, blood group distribution and hospital stock.</p>
        </div>

        {/* KPI cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          <Kpi icon={<Users className="w-5 h-5" />} label="Total Donors" value={kpi.donors} />
          <Kpi icon={<Building2 className="w-5 h-5" />} label="Hospitals" value={kpi.hospitals} />
          <Kpi icon={<Droplet className="w-5 h-5" />} label="Units in Stock" value={kpi.units} />
          <Kpi icon={<HeartPulse className="w-5 h-5" />} label="Blood Groups" value={kpi.groups} />
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <ChartCard title="Donor Registrations" sub="Monthly trend · this year">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={monthly} margin={{ top: 10, right: 16, left: -12, bottom: 0 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="n" name="Donors" stroke="#dc2626" strokeWidth={2.5} dot={{ r: 3, fill: "#dc2626" }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Blood Group Distribution" sub="Share of registered donors">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={groups} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={2} stroke="var(--card)" strokeWidth={2}>
                  {groups.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 12 }} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Hospital Blood Stock" sub="Total units available by group" className="lg:col-span-2">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={stock} margin={{ top: 10, right: 16, left: -12, bottom: 0 }} barCategoryGap="25%">
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="g" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "color-mix(in oklab, var(--muted) 40%, transparent)" }} />
                <Bar dataKey="units" name="Units" fill="#dc2626" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </section>
    </Layout>
  );
}

function Kpi({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-wider text-muted-foreground font-medium">{label}</div>
        <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">{icon}</div>
      </div>
      <div className="mt-3 text-3xl font-bold text-foreground tabular-nums">{value.toLocaleString()}</div>
    </div>
  );
}

function ChartCard({ title, sub, children, className = "" }: { title: string; sub?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-card border border-border rounded-xl p-5 md:p-6 shadow-sm ${className}`}>
      <div className="mb-5">
        <div className="font-semibold text-foreground text-base">{title}</div>
        {sub && <div className="text-xs text-muted-foreground mt-1">{sub}</div>}
      </div>
      {children}
    </div>
  );
}
