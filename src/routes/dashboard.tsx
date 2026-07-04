import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useEffect, useMemo, useState } from "react";
import { Droplet, HeartHandshake, Trophy, CalendarDays, Bell, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { BLOOD_GROUPS } from "@/lib/blood-data";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
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
      { title: "Donor Dashboard — Kakinada Blood Link" },
      { name: "description", content: "Track your donations, lives impacted and next eligible date across Kakinada." },
    ],
  }),
  component: DonorDashboard,
});

type LocalDonor = { id: string; name: string; area: string; blood_group: string };

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const PIE_COLORS = ["#dc2626", "#f59e0b", "#ef4444", "#fbbf24", "#b45309", "#f97316", "#78350f", "#a16207"];

function DonorDashboard() {
  const [donor, setDonor] = useState<LocalDonor | null>(null);
  const [me, setMe] = useState<{ donations: number; last_donation: string | null } | null>(null);
  const [monthly, setMonthly] = useState<{ m: string; n: number }[]>([]);
  const [groups, setGroups] = useState<{ name: string; value: number }[]>([]);
  const [stock, setStock] = useState<{ g: string; units: number }[]>([]);
  const [hospitalName, setHospitalName] = useState<string>("Kakinada network");

  useEffect(() => {
    const raw = typeof window !== "undefined" ? localStorage.getItem("kbl_donor") : null;
    if (raw) setDonor(JSON.parse(raw));
  }, []);

  useEffect(() => {
    (async () => {
      const [allDonors, hospRes] = await Promise.all([
        supabase.from("donors").select("blood_group, created_at, donations, last_donation, id"),
        supabase.from("hospitals").select("name, stock").limit(1).maybeSingle(),
      ]);
      const rows = (allDonors.data ?? []) as any[];

      // Monthly donations trend (donors registered per month, current year)
      const year = new Date().getFullYear();
      const buckets = Array(12).fill(0);
      rows.forEach((r) => {
        const d = new Date(r.created_at);
        if (d.getFullYear() === year) buckets[d.getMonth()] += 1 + (r.donations || 0);
      });
      setMonthly(MONTHS.map((m, i) => ({ m, n: buckets[i] })));

      // Blood group distribution
      const counts: Record<string, number> = {};
      BLOOD_GROUPS.forEach((g) => (counts[g] = 0));
      rows.forEach((r) => {
        if (counts[r.blood_group] != null) counts[r.blood_group] += 1;
      });
      setGroups(BLOOD_GROUPS.map((g) => ({ name: g, value: counts[g] })));

      // Nearby stock
      if (hospRes.data) {
        setHospitalName(hospRes.data.name);
        const s = (hospRes.data.stock as Record<string, number>) || {};
        setStock(BLOOD_GROUPS.map((g) => ({ g, units: Number(s[g] ?? 0) })));
      } else {
        setStock(BLOOD_GROUPS.map((g) => ({ g, units: 0 })));
      }

      // Current donor stats
      if (donor) {
        const mine = rows.find((r) => r.id === donor.id);
        if (mine) setMe({ donations: mine.donations || 0, last_donation: mine.last_donation });
      }
    })();
  }, [donor]);

  const nextEligibleDays = useMemo(() => {
    if (!me?.last_donation) return null;
    const last = new Date(me.last_donation);
    const next = new Date(last.getTime() + 90 * 86400_000);
    const diff = Math.ceil((next.getTime() - Date.now()) / 86400_000);
    return diff;
  }, [me]);

  const donations = me?.donations ?? 0;
  const lives = donations * 3;
  const points = donations * 200;

  return (
    <Layout>
      <div className="bg-[#0f0708] min-h-[calc(100vh-4rem)] text-white/90">
        <div className="max-w-7xl mx-auto px-4 py-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">Donor Dashboard</div>
              <h1 className="mt-2 font-display text-4xl md:text-5xl font-bold">
                Welcome back{donor ? <>, <span className="text-white">{donor.name.split(" ")[0]}</span>.</> : "."}
              </h1>
              <p className="mt-2 text-white/60 text-sm">
                {donor
                  ? nextEligibleDays && nextEligibleDays > 0
                    ? `You're eligible to donate again in ${nextEligibleDays} days. Keep saving lives.`
                    : "You are eligible to donate now. Every unit saves up to 3 lives."
                  : "Sign in as a donor to see your personal stats. Network data shown below."}
              </p>
            </div>
            <div className="flex gap-2">
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white/5 border border-white/10 text-sm hover:bg-white/10">
                <Bell className="w-4 h-4" /> Alerts
              </button>
              <Link to="/emergency" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90">
                Raise request <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Stat cards */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatCard icon={<Droplet className="w-5 h-5" fill="currentColor" />} tone="rose" value={donations} label="Total donations" hint={donations > 0 ? "+1 this quarter" : "Log your first donation"} />
            <StatCard icon={<HeartHandshake className="w-5 h-5" />} tone="rose" value={lives} label="Lives impacted" hint="3 lives saved / donation" />
            <StatCard icon={<Trophy className="w-5 h-5" />} tone="gold" value={points.toLocaleString()} label="Reward points" hint={points >= 2000 ? "Gold tier" : "Silver tier"} />
            <StatCard
              icon={<CalendarDays className="w-5 h-5" />}
              tone="rose"
              value={nextEligibleDays && nextEligibleDays > 0 ? `${nextEligibleDays} days` : "Now"}
              label="Next eligible"
              hint={me?.last_donation ? `from ${new Date(me.last_donation).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}` : "No donations logged"}
            />
          </div>

          {/* Monthly donations */}
          <Card className="mt-6">
            <CardHeader title="Monthly donations" sub="Network-wide trend" badge="+18% YoY" />
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthly} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity={0.55} />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#ffffff10" strokeDasharray="3 3" />
                  <XAxis dataKey="m" stroke="#ffffff60" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#ffffff60" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "#1a0d0e", border: "1px solid #ffffff20", borderRadius: 8, color: "#fff" }} />
                  <Area type="monotone" dataKey="n" stroke="#ef4444" strokeWidth={2.5} fill="url(#g1)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {/* Blood group distribution */}
            <Card>
              <CardHeader title="Blood group distribution" sub="Across active donors" />
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={groups} dataKey="value" nameKey="name" innerRadius={55} outerRadius={95} paddingAngle={2}>
                      {groups.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: "#1a0d0e", border: "1px solid #ffffff20", borderRadius: 8, color: "#fff" }} />
                    <Legend wrapperStyle={{ color: "#ffffff90", fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Nearby blood stock */}
            <Card>
              <CardHeader title="Nearby blood stock" sub={`${hospitalName} · live`} badge={stock.some((s) => s.units < 20) ? `${stock.filter((s) => s.units < 20).length} low` : undefined} />
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stock} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid stroke="#ffffff10" strokeDasharray="3 3" />
                    <XAxis dataKey="g" stroke="#ffffff60" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#ffffff60" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ background: "#1a0d0e", border: "1px solid #ffffff20", borderRadius: 8, color: "#fff" }} cursor={{ fill: "#ffffff08" }} />
                    <Bar dataKey="units" radius={[6, 6, 0, 0]}>
                      {stock.map((s, i) => (
                        <Cell key={i} fill={s.units < 20 ? "#ef4444" : "#f59e0b"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-[#160a0b] border border-white/10 rounded-2xl p-5 ${className}`}>{children}</div>;
}

function CardHeader({ title, sub, badge }: { title: string; sub?: string; badge?: string }) {
  return (
    <div className="flex items-start justify-between mb-4">
      <div>
        <div className="font-semibold text-white">{title}</div>
        {sub && <div className="text-xs text-white/50 mt-0.5">{sub}</div>}
      </div>
      {badge && <span className="text-xs font-semibold px-2 py-1 rounded-full bg-primary/15 text-primary border border-primary/30">{badge}</span>}
    </div>
  );
}

function StatCard({
  icon,
  value,
  label,
  hint,
  tone,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  hint?: string;
  tone: "rose" | "gold";
}) {
  const chip = tone === "gold" ? "bg-gold/15 text-gold border-gold/30" : "bg-primary/15 text-primary border-primary/30";
  const hintColor = tone === "gold" ? "text-gold" : "text-primary";
  return (
    <div className="bg-[#160a0b] border border-white/10 rounded-2xl p-5">
      <div className={`w-10 h-10 rounded-lg grid place-items-center border ${chip}`}>{icon}</div>
      <div className="mt-4 font-display text-4xl font-bold text-white">{value}</div>
      <div className="text-xs text-white/60 mt-1">{label}</div>
      {hint && <div className={`text-xs mt-2 font-semibold ${hintColor}`}>{hint}</div>}
    </div>
  );
}
