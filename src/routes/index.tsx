import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Droplet, HeartHandshake, Search, Siren, MapPin, Users, Activity, Award } from "lucide-react";
import { generateDonors, HOSPITALS, EMERGENCY_REQUESTS, SUCCESS_STORIES, BLOOD_GROUPS } from "@/lib/blood-data";

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

function Home() {
  const donors = generateDonors();
  const available = donors.filter((d) => d.available).length;
  const groupCounts = BLOOD_GROUPS.map((g) => ({ g, n: donors.filter((d) => d.bloodGroup === g).length }));
  const max = Math.max(...groupCounts.map((c) => c.n));

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-[#fff6f4] to-[#fff2e6]">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 w-96 h-96 rounded-full bg-gold/20 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center relative">
          <div>
            <div className="inline-flex items-center gap-2 bg-white border border-gold/40 text-gold-foreground px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
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
              <Link to="/search-donors" className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-primary text-primary rounded-md font-semibold hover:bg-secondary">
                <Search className="w-4 h-4" /> Find Blood
              </Link>
              <Link to="/emergency" className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-gold-foreground rounded-md font-semibold hover:opacity-90">
                <Siren className="w-4 h-4" /> Emergency Request
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              <Stat n={donors.length} l="Donors" />
              <Stat n={available} l="Available" />
              <Stat n={HOSPITALS.length} l="Hospitals" />
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl border border-border p-6">
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
              <div className="mt-5 pt-5 border-t border-border">
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Recent Emergency</div>
                {EMERGENCY_REQUESTS.slice(0, 1).map((r) => (
                  <div key={r.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary grid place-items-center font-bold">{r.bloodGroup}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{r.units} unit(s) needed · {r.hospital.split(",")[0]}</div>
                      <div className="text-xs text-muted-foreground">{r.area}, Kakinada · {r.posted}</div>
                    </div>
                    <Link to="/emergency" className="text-xs font-semibold text-primary hover:underline">View</Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <SectionHead eyebrow="What we do" title="A complete blood donor platform for Kakinada" />
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: HeartHandshake, t: "Register as Donor", d: "Join Kakinada's voluntary donor registry in under 2 minutes." },
            { icon: Search, t: "Search by Group & Area", d: "Filter donors by blood group and Kakinada locality." },
            { icon: Siren, t: "Emergency Requests", d: "Post urgent needs — hospitals across Kakinada respond." },
            { icon: Activity, t: "Eligibility Checker", d: "Instant check based on WHO donation guidelines." },
          ].map((f) => (
            <div key={f.t} className="p-6 bg-white rounded-xl border border-border hover:border-primary hover:shadow-lg transition">
              <div className="w-11 h-11 rounded-lg bg-primary/10 text-primary grid place-items-center mb-4">
                <f.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-lg">{f.t}</h3>
              <p className="text-sm text-muted-foreground mt-1">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Areas */}
      <section className="bg-gradient-to-br from-[#fff8f0] to-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHead eyebrow="Kakinada coverage" title="Serving every neighbourhood of Kakinada" />
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {["Jagannaickpur", "Sarpavaram", "Ramanayyapeta", "Ashok Nagar", "Bhanugudi Junction", "Gandhi Nagar", "Indrapalem", "Vakalapudi", "Sambamurthy Nagar", "Turangi", "Suryaraopeta", "Rama Rao Peta"].map((a) => (
              <div key={a} className="p-4 bg-white rounded-lg border border-border text-center hover:border-gold hover:shadow-md transition">
                <MapPin className="w-4 h-4 mx-auto text-primary mb-2" />
                <div className="text-sm font-medium">{a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stories */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <SectionHead eyebrow="Success stories" title="Real lives saved in Kakinada" />
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {SUCCESS_STORIES.map((s) => (
            <div key={s.name} className="p-6 bg-white rounded-xl border border-border relative">
              <div className="absolute -top-3 left-6 w-8 h-8 rounded-full bg-gold text-gold-foreground grid place-items-center text-xl font-serif">"</div>
              <p className="text-sm text-foreground/80 italic pt-2">{s.quote}</p>
              <div className="mt-4 pt-4 border-t border-border">
                <div className="font-semibold text-sm">{s.name}</div>
                <div className="text-xs text-muted-foreground">{s.area}, Kakinada</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="max-w-5xl mx-auto px-4 py-16 text-center">
          <Users className="w-10 h-10 mx-auto mb-4 text-gold" />
          <h2 className="text-3xl md:text-4xl font-bold">Ready to save a life in Kakinada?</h2>
          <p className="mt-3 text-primary-foreground/85 max-w-2xl mx-auto">
            Register today. When a patient in your area needs your blood group, we'll notify you.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/donor-register" className="px-6 py-3 bg-white text-primary rounded-md font-semibold hover:bg-gold hover:text-gold-foreground transition">Donor Registration</Link>
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
