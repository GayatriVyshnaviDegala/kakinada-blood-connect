import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BLOOD_GROUPS } from "@/lib/blood-data";
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
const PIE_COLORS = ["#dc2626", "#f59e0b", "#ef4444", "#fbbf24", "#b45309", "#f97316", "#7c2d12", "#a16207"];

function Dashboard() {
  const [monthly, setMonthly] = useState<{ m: string; n: number }[]>(MONTHS.map((m) => ({ m, n: 0 })));
  const [groups, setGroups] = useState<{ name: string; value: number }[]>([]);
  const [stock, setStock] = useState<{ g: string; units: number }[]>([]);

  useEffect(() => {
    (async () => {
      const [donorsRes, hospRes] = await Promise.all([
        supabase.from("donors").select("blood_group, created_at"),
        supabase.from("hospitals").select("stock"),
      ]);
      const rows = (donorsRes.data ?? []) as any[];

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
      setGroups(BLOOD_GROUPS.map((g) => ({ name: g, value: counts[g] })).filter((d) => d.value > 0));

      const totals: Record<string, number> = {};
      BLOOD_GROUPS.forEach((g) => (totals[g] = 0));
      (hospRes.data ?? []).forEach((h: any) => {
        const s = (h.stock as Record<string, number>) || {};
        BLOOD_GROUPS.forEach((g) => (totals[g] += Number(s[g] ?? 0)));
      });
      setStock(BLOOD_GROUPS.map((g) => ({ g, units: totals[g] })));
    })();
  }, []);

  return (
    <Layout>
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">Dashboard</div>
          <h1 className="mt-2 font-display text-4xl font-bold">Kakinada Blood Network — Live Analytics</h1>
          <p className="mt-2 text-muted-foreground text-sm">Registrations, donor distribution and hospital stock updated in real time.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card title="Donor Registrations" sub="Monthly trend · this year">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={monthly} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="m" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                <Line type="monotone" dataKey="n" stroke="#dc2626" strokeWidth={2.5} dot={{ r: 3, fill: "#dc2626" }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Blood Group Distribution" sub="Across registered donors">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={groups} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={2}>
                  {groups.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Hospital Blood Stock" sub="Units available across Kakinada hospitals" className="lg:col-span-2">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stock} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="g" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} cursor={{ fill: "hsl(var(--muted))" }} />
                <Bar dataKey="units" fill="#f59e0b" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </section>
    </Layout>
  );
}

function Card({ title, sub, children, className = "" }: { title: string; sub?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-card border border-border rounded-xl p-5 shadow-sm ${className}`}>
      <div className="mb-4">
        <div className="font-semibold text-foreground">{title}</div>
        {sub && <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>}
      </div>
      {children}
    </div>
  );
}
