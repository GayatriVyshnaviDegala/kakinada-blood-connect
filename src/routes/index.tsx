import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useEffect, useState } from "react";
import { Droplet, HeartHandshake, Search, Siren, MapPin, Users, Activity, Award } from "lucide-react";
import { BLOOD_GROUPS, type BloodRequest } from "@/lib/blood-data";
import { supabase } from "@/integrations/supabase/client";
import heroDonation from "@/assets/hero-donation.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kakinada Blood Link — Voluntary Blood Donor Network, Kakinada" },
      { name: "description", content: "Find and register blood donors across Kakinada, Andhra Pradesh. A student-run community service platform connecting donors, patients and hospitals." },
      { property: "og:title", content: "Kakinada Blood Link" },
      { property: "og:description", content: "Voluntary blood donor network for Kakinada, Andhra Pradesh." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Home,
});

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${Math.max(m, 1)}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function Home() {
  const [stats, setStats] = useState({ donors: 0, available: 0, hospitals: 0 });
  const [groupCounts, setGroupCounts] = useState<{ g: string; n: number }[]>(BLOOD_GROUPS.map((g) => ({ g, n: 0 })));
  const [recentReq, setRecentReq] = useState<BloodRequest | null>(null);

  useEffect(() => {
    (async () => {
      const [donorsRes, availRes, hospRes, reqRes] = await Promise.all([
        supabase.from("donors").select("blood_group"),
        supabase.from("donors").select("id", { count: "exact", head: true }).eq("available", true),
        supabase.from("hospitals").select("id", { count: "exact", head: true }),
        supabase.from("blood_requests").select("*").eq("status", "OPEN").order("posted_at", { ascending: false }).limit(1).maybeSingle(),
      ]);
      const rows = donorsRes.data ?? [];
      setStats({ donors: rows.length, available: availRes.count ?? 0, hospitals: hospRes.count ?? 0 });
      setGroupCounts(BLOOD_GROUPS.map((g) => ({ g, n: rows.filter((r: any) => r.blood_group === g).length })));
      if (reqRes.data) setRecentReq(reqRes.data as BloodRequest);
    })();
  }, []);

  const max = Math.max(1, ...groupCounts.map((c) => c.n));

  return (
    <Layout>
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-secondary to-accent">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 w-96 h-96 rounded-full bg-gold/20 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center relative">
          <div>
            <div className="inline-flex items-center gap-2 bg-card border border-gold/40 text-gold-foreground px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
              <Award className="w-3.5 h-3.5" /> Community Service Project · Kakinada
            </div>
            <h1 className="mt-5 text-4xl md:text-6xl font-bold leading-tight text-foreground">
              Every drop counts.<br />
              <span className="text-primary">Save a life in Kakinada.</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-xl">
              Kakinada Blood Link is a student-led voluntary blood donor network connecting patients, hospitals and donors across every corner of Kakinada — from Jagannaickpur to Vakalapudi.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/donor-register" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md font-semibold hover:bg-primary/90 shadow">
                <Droplet className="w-4 h-4" fill="currentColor" /> Become a Donor
              </Link>
              <Link to="/search-donors" className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-primary text-primary rounded-md font-semibold hover:bg-secondary">
                <Search className="w-4 h-4" /> Find Blood
              </Link>
              <Link to="/emergency" className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-gold-foreground rounded-md font-semibold hover:opacity-90">
                <Siren className="w-4 h-4" /> Emergency Request
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              <Stat n={stats.donors} l="Donors" />
              <Stat n={stats.available} l="Available" />
              <Stat n={stats.hospitals} l="Hospitals" />
            </div>
          </div>

          <div className="relative">
            <div className="bg-card rounded-2xl shadow-2xl border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-xl font-bold">Live Blood Availability</h3>
                <span className="text-xs text-muted-foreground">Kakinada network</span>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {groupCounts.map(({ g, n }) => (
                  <div key={g} className="rounded-lg border border-border p-3 text-center hover:border-primary transition">
                    <div className="text-2xl font-bold text-primary">{g}</div>
                    <div className="text-xs text-muted-foreground mt-1">{n} donors</div>
                    <div className="h-1.5 bg-secondary rounded mt-2 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-gold" style={{ width: `${(n / max) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              {recentReq && (
                <div className="mt-5 pt-5 border-t border-border">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Recent Emergency</div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary grid place-items-center font-bold">{recentReq.blood_group}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{recentReq.units} unit(s) needed · {recentReq.hospital.split(",")[0]}</div>
                      <div className="text-xs text-muted-foreground">{recentReq.area}, Kakinada · {timeAgo(recentReq.posted_at)}</div>
                    </div>
                    <Link to="/emergency" className="text-xs font-semibold text-primary hover:underline">View</Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pt-8">
        <div className="relative rounded-2xl overflow-hidden shadow-xl border border-border">
          <img src={heroDonation} alt="Volunteers and nurses at a blood donation camp in Kakinada" width={1536} height={1024} className="w-full h-64 md:h-96 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-10 text-white max-w-xl">
            <div className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">Every drop matters</div>
            <h2 className="mt-2 font-display text-2xl md:text-4xl font-bold leading-tight">One donation from Kakinada can save up to three lives.</h2>
          </div>
        </div>
      </section>


      <section className="max-w-7xl mx-auto px-4 py-20">
        <SectionHead eyebrow="What we do" title="A complete blood donor platform for Kakinada" />
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: HeartHandshake, t: "Register as Donor", d: "Join Kakinada's voluntary donor registry in under 2 minutes." },
            { icon: Search, t: "Search by Group & Area", d: "Filter donors by blood group and Kakinada locality." },
            { icon: Siren, t: "Emergency Requests", d: "Post urgent needs — hospitals across Kakinada respond." },
            { icon: Activity, t: "Eligibility Checker", d: "Instant check based on WHO donation guidelines." },
          ].map((f) => (
            <div key={f.t} className="p-6 bg-card rounded-xl border border-border hover:border-primary hover:shadow-lg transition">
              <div className="w-11 h-11 rounded-lg bg-primary/10 text-primary grid place-items-center mb-4">
                <f.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-lg">{f.t}</h3>
              <p className="text-sm text-muted-foreground mt-1">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-secondary to-background py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHead eyebrow="Kakinada coverage" title="Serving every neighbourhood of Kakinada" />
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {["Jagannaickpur", "Sarpavaram", "Ramanayyapeta", "Ashok Nagar", "Bhanugudi Junction", "Gandhi Nagar", "Indrapalem", "Vakalapudi", "Sambamurthy Nagar", "Turangi", "Suryaraopeta", "Rama Rao Peta"].map((a) => (
              <div key={a} className="p-4 bg-card rounded-lg border border-border text-center hover:border-gold hover:shadow-md transition">
                <MapPin className="w-4 h-4 mx-auto text-primary mb-2" />
                <div className="text-sm font-medium">{a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="bg-primary text-primary-foreground">
        <div className="max-w-5xl mx-auto px-4 py-16 text-center">
          <Users className="w-10 h-10 mx-auto mb-4 text-gold" />
          <h2 className="text-3xl md:text-4xl font-bold">Ready to save a life in Kakinada?</h2>
          <p className="mt-3 text-primary-foreground/85 max-w-2xl mx-auto">
            Register today. When a patient in your area needs your blood group, we'll notify you.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/donor-register" className="px-6 py-3 bg-card text-primary rounded-md font-semibold hover:bg-gold hover:text-gold-foreground transition">Donor Registration</Link>
            <Link to="/recipient-register" className="px-6 py-3 bg-gold text-gold-foreground rounded-md font-semibold hover:opacity-90">Recipient Registration</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Stat({ n, l }: { n: number; l: string }) {
  return (
    <div>
      <div className="text-3xl font-bold text-primary font-display">{n}+</div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{l}</div>
    </div>
  );
}

export function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="text-xs uppercase tracking-[0.2em] text-gold-foreground font-semibold">{eyebrow}</div>
      <h2 className="mt-3 text-3xl md:text-4xl font-bold">{title}</h2>
      {sub && <p className="mt-3 text-muted-foreground">{sub}</p>}
    </div>
  );
}
