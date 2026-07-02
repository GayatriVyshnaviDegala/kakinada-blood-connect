import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useState } from "react";
import { FAQS } from "@/lib/blood-data";
import { ChevronDown, Info, Sparkles, CheckCircle2, XCircle } from "lucide-react";

export const Route = createFileRoute("/awareness")({
  head: () => ({ meta: [{ title: "Blood Donation Awareness — Kakinada" }, { name: "description", content: "Learn about blood donation, eligibility and FAQs. Kakinada community awareness." }] }),
  component: Awareness,
});

function Awareness() {
  return (
    <Layout>
      <section className="bg-gradient-to-br from-[#fff6f4] to-white py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-xs uppercase tracking-[0.2em] text-gold-foreground font-semibold">Awareness</div>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold">Know before you <span className="text-primary">donate</span></h1>
          <p className="mt-3 text-muted-foreground">Simple facts for every Kakinada resident.</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-5">
        {[
          { t: "3 lives per donation", d: "One unit of blood is separated into red cells, plasma and platelets — helping up to three patients." },
          { t: "Only 1% donate", d: "Less than 1% of India's population donates blood voluntarily. Kakinada can do better." },
          { t: "38,000 donations/day", d: "India needs about 38,000 donations every day for surgery, trauma & thalassemia patients." },
        ].map((f) => (
          <div key={f.t} className="p-6 bg-white border border-border rounded-xl">
            <Sparkles className="w-5 h-5 text-gold mb-3" />
            <div className="font-bold text-lg">{f.t}</div>
            <p className="text-sm text-muted-foreground mt-1">{f.d}</p>
          </div>
        ))}
      </section>

      <EligibilityChecker />

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center">Frequently asked questions</h2>
        <div className="mt-8 space-y-3">
          {FAQS.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
        </div>
      </section>
    </Layout>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white border border-border rounded-xl">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left">
        <span className="font-semibold">{q}</span>
        <ChevronDown className={"w-5 h-5 transition " + (open ? "rotate-180 text-primary" : "text-muted-foreground")} />
      </button>
      {open && <div className="px-5 pb-5 text-sm text-muted-foreground">{a}</div>}
    </div>
  );
}

function EligibilityChecker() {
  const [f, setF] = useState({ age: "", weight: "", healthy: "", recent: "", tattoo: "" });
  const [result, setResult] = useState<null | { ok: boolean; msg: string }>(null);
  function check(e: React.FormEvent) {
    e.preventDefault();
    const age = Number(f.age), w = Number(f.weight);
    if (age < 18 || age > 65) return setResult({ ok: false, msg: "Age must be between 18 and 65." });
    if (w < 50) return setResult({ ok: false, msg: "Weight must be at least 50 kg." });
    if (f.healthy !== "yes") return setResult({ ok: false, msg: "You must be in general good health." });
    if (f.recent === "yes") return setResult({ ok: false, msg: "Please wait 3 months from your last donation." });
    if (f.tattoo === "yes") return setResult({ ok: false, msg: "Please wait 6 months after a tattoo/piercing." });
    setResult({ ok: true, msg: "Great! You appear eligible. Visit any Kakinada hospital blood bank to donate." });
  }
  return (
    <section className="bg-secondary/40 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center">
          <Info className="w-8 h-8 text-primary mx-auto" />
          <h2 className="mt-2 text-3xl font-bold">Eligibility Checker</h2>
          <p className="text-muted-foreground">Answer 5 quick questions.</p>
        </div>
        <form onSubmit={check} className="mt-8 bg-white border border-border rounded-xl p-6 grid md:grid-cols-2 gap-4">
          <label className="text-sm">Age<input type="number" required value={f.age} onChange={(e) => setF({ ...f, age: e.target.value })} className="mt-1 w-full border border-input rounded-md px-3 py-2" /></label>
          <label className="text-sm">Weight (kg)<input type="number" required value={f.weight} onChange={(e) => setF({ ...f, weight: e.target.value })} className="mt-1 w-full border border-input rounded-md px-3 py-2" /></label>
          <label className="text-sm">In good health?<select required value={f.healthy} onChange={(e) => setF({ ...f, healthy: e.target.value })} className="mt-1 w-full border border-input rounded-md px-3 py-2 bg-white"><option value="">Select</option><option value="yes">Yes</option><option value="no">No</option></select></label>
          <label className="text-sm">Donated in last 3 months?<select required value={f.recent} onChange={(e) => setF({ ...f, recent: e.target.value })} className="mt-1 w-full border border-input rounded-md px-3 py-2 bg-white"><option value="">Select</option><option value="no">No</option><option value="yes">Yes</option></select></label>
          <label className="text-sm md:col-span-2">Tattoo/piercing in last 6 months?<select required value={f.tattoo} onChange={(e) => setF({ ...f, tattoo: e.target.value })} className="mt-1 w-full border border-input rounded-md px-3 py-2 bg-white"><option value="">Select</option><option value="no">No</option><option value="yes">Yes</option></select></label>
          <button className="md:col-span-2 py-3 bg-primary text-primary-foreground rounded-md font-semibold">Check Eligibility</button>
          {result && (
            <div className={"md:col-span-2 p-4 rounded-md flex items-start gap-2 text-sm " + (result.ok ? "bg-green-50 text-green-800 border border-green-200" : "bg-primary/5 text-primary border border-primary/20")}>
              {result.ok ? <CheckCircle2 className="w-5 h-5 mt-0.5" /> : <XCircle className="w-5 h-5 mt-0.5" />}
              {result.msg}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
