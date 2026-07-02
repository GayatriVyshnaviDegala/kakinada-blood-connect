import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Target, Heart, ShieldCheck, GraduationCap } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Kakinada Blood Link" },
      { name: "description", content: "Learn about Kakinada Blood Link, a student-run CSP that connects blood donors, recipients and hospitals across Kakinada, Andhra Pradesh." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <Layout>
      <section className="bg-gradient-to-br from-[#fff6f4] to-white py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="text-xs uppercase tracking-[0.2em] text-gold-foreground font-semibold">About the project</div>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold">Blood Donor Management System<br /><span className="text-primary">for Kakinada</span></h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-3xl mx-auto">
            A Community Service Project (CSP) developed by a 3rd year B.Tech CSE student to strengthen voluntary blood donation across Kakinada, Andhra Pradesh.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold">Our mission</h2>
          <p className="mt-4 text-muted-foreground">
            Every day, patients at hospitals in Kakinada — Government General Hospital, Apollo, Medicover, Trust and Hope — struggle to find matching blood on short notice. Kakinada Blood Link maintains a verified registry of local voluntary donors and matches them with genuine requests from patients and hospitals within the city.
          </p>
          <p className="mt-3 text-muted-foreground">
            The platform is intentionally focused on Kakinada. Every donor, every hospital, every request on this site is from within our city — so response times stay short and lives get saved.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { i: Target, t: "Focused on Kakinada", d: "Only Kakinada donors, hospitals & requests." },
            { i: Heart, t: "Voluntary donors", d: "Zero coercion. Zero payment. Pure service." },
            { i: ShieldCheck, t: "Verified data", d: "Donor eligibility & contact are checked." },
            { i: GraduationCap, t: "Student-led CSP", d: "Built as a 3rd year B.Tech CSE project." },
          ].map((c) => (
            <div key={c.t} className="p-5 bg-white rounded-xl border border-border">
              <c.i className="w-6 h-6 text-primary mb-2" />
              <div className="font-semibold">{c.t}</div>
              <p className="text-sm text-muted-foreground mt-1">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/40 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center">How it works</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {[
              { n: "01", t: "Register", d: "Donors sign up with their blood group and Kakinada area." },
              { n: "02", t: "Get matched", d: "When a patient in your locality needs your group, we alert you." },
              { n: "03", t: "Donate & save", d: "Visit the nearest Kakinada hospital and complete the donation." },
            ].map((s) => (
              <div key={s.n} className="bg-white p-6 rounded-xl border border-border">
                <div className="text-4xl font-display text-gold font-bold">{s.n}</div>
                <div className="mt-2 font-semibold text-lg">{s.t}</div>
                <p className="text-sm text-muted-foreground mt-1">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="text-xs uppercase tracking-[0.2em] text-gold-foreground font-semibold">Project details</div>
        <h2 className="mt-2 text-3xl font-bold">Built with modern technology</h2>
        <p className="mt-3 text-muted-foreground">
          Front-end: HTML5, CSS3, JavaScript, responsive design principles. Data model designed for Java Spring Boot + MySQL back-end integration.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm">
          {["HTML", "CSS", "JavaScript", "Bootstrap-style UI", "Java Spring Boot", "MySQL", "REST API"].map((t) => (
            <span key={t} className="px-3 py-1.5 bg-white border border-border rounded-full">{t}</span>
          ))}
        </div>
      </section>
    </Layout>
  );
}
