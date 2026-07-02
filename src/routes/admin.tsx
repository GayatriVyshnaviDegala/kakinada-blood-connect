import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useMemo } from "react";
import { generateDonors, BLOOD_GROUPS, KAKINADA_AREAS, EMERGENCY_REQUESTS, HOSPITALS } from "@/lib/blood-data";
import { Users, Droplet, Siren, Building2, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Dashboard — Kakinada Blood Link" }] }),
  component: Admin,
});

function Admin() {
  const donors = useMemo(() => generateDonors(), []);
  const available = donors.filter((d) => d.available).length;
  const groupCounts = BLOOD_GROUPS.map((g) => ({ g, n: donors.filter((d) => d.bloodGroup === g).length }));
  const areaCounts = KAKINADA_AREAS.map((a) => ({ a, n: donors.filter((d) => d.area === a).length }));
  const maxG = Math.max(...groupCounts.map((c) => c.n));
  const maxA = Math.max(...areaCounts.map((c) => c.n));
  const totalDonations = donors.reduce((s, d) => s + d.donations, 0);
  const recent = [...donors].sort((a, b) => (a.lastDonation < b.lastDonation ? 1 : -1)).slice(0, 8);

  return (
    <Layout>
      <section className="bg-gradient-to-br from-[#1a1010] to-[#2a1414] text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">Admin</div>
              <h1 className="mt-1 text-3xl md:text-4xl font-bold">Kakinada Dashboard</h1>
              <p className="text-white/70 text-sm">Live overview of donors, requests and hospital stock across Kakinada.</p>
            </div>
            <div className="flex gap-2 text-xs">
              <span className="px-3 py-1.5 bg-white/10 rounded-full">Region: Kakinada</span>
              <span className="px-3 py-1.5 bg-gold/20 text-gold rounded-full">Live</span>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 -mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPI icon={Users} label="Total Donors" value={donors.length} tint="primary" />
        <KPI icon={Droplet} label="Available Now" value={available} tint="green" />
        <KPI icon={Siren} label="Emergency Requests" value={EMERGENCY_REQUESTS.length} tint="gold" />
        <KPI icon={Building2} label="Partner Hospitals" value={HOSPITALS.length} tint="primary" />
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-2 gap-6">
        <Card title="Blood group distribution">
          <div className="space-y-2">
            {groupCounts.map((c) => (
              <div key={c.g} className="flex items-center gap-3">
                <div className="w-10 font-bold text-primary">{c.g}</div>
                <div className="flex-1 h-6 bg-secondary rounded overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-gold flex items-center justify-end px-2 text-white text-xs font-semibold" style={{ width: `${(c.n / maxG) * 100}%` }}>{c.n}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Donors by Kakinada area">
          <div className="space-y-2">
            {areaCounts.map((c) => (
              <div key={c.a} className="flex items-center gap-3">
                <div className="w-32 text-sm truncate">{c.a}</div>
                <div className="flex-1 h-5 bg-secondary rounded overflow-hidden">
                  <div className="h-full bg-gold" style={{ width: `${(c.n / maxA) * 100}%` }} />
                </div>
                <div className="w-8 text-right text-sm font-semibold">{c.n}</div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-12 grid lg:grid-cols-3 gap-6">
        <Card title="Recent donations" className="lg:col-span-2">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase text-muted-foreground border-b border-border">
                <tr><th className="py-2">Donor</th><th>Group</th><th>Area</th><th>Last donated</th><th className="text-right">Total</th></tr>
              </thead>
              <tbody>
                {recent.map((d) => (
                  <tr key={d.id} className="border-b border-border/60">
                    <td className="py-2 font-medium">{d.name}</td>
                    <td className="text-primary font-semibold">{d.bloodGroup}</td>
                    <td>{d.area}</td>
                    <td className="text-muted-foreground">{d.lastDonation}</td>
                    <td className="text-right font-semibold">{d.donations}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <Card title="Activity">
          <div className="space-y-4">
            <Row label="Total donations logged" value={totalDonations} />
            <Row label="Avg donations/donor" value={(totalDonations / donors.length).toFixed(1)} />
            <Row label="Areas covered" value={KAKINADA_AREAS.length} />
            <Row label="Blood groups tracked" value={BLOOD_GROUPS.length} />
            <div className="pt-3 mt-3 border-t border-border flex items-center gap-2 text-sm text-green-700"><TrendingUp className="w-4 h-4" /> Kakinada donor base growing steadily.</div>
          </div>
        </Card>
      </section>
    </Layout>
  );
}

function KPI({ icon: Icon, label, value, tint }: any) {
  const t = tint === "green" ? "text-green-700 bg-green-50" : tint === "gold" ? "text-gold-foreground bg-gold/20" : "text-primary bg-primary/10";
  return (
    <div className="bg-white rounded-xl border border-border p-5 shadow-sm">
      <div className={"w-10 h-10 rounded-lg grid place-items-center " + t}><Icon className="w-5 h-5" /></div>
      <div className="mt-3 text-3xl font-bold font-display">{value}</div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}
function Card({ title, children, className = "" }: any) {
  return (
    <div className={"bg-white border border-border rounded-xl p-5 " + className}>
      <h3 className="font-bold mb-4">{title}</h3>
      {children}
    </div>
  );
}
function Row({ label, value }: { label: string; value: any }) {
  return <div className="flex items-center justify-between text-sm"><span className="text-muted-foreground">{label}</span><span className="font-semibold">{value}</span></div>;
}
