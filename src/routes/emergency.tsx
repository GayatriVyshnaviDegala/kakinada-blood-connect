import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useState } from "react";
import { KAKINADA_AREAS, BLOOD_GROUPS, HOSPITALS, EMERGENCY_REQUESTS } from "@/lib/blood-data";
import { Field, Select } from "./donor-register";
import { Siren, MapPin, Phone, Clock } from "lucide-react";

export const Route = createFileRoute("/emergency")({
  head: () => ({ meta: [{ title: "Emergency Blood Request — Kakinada" }, { name: "description", content: "Post an urgent blood request in Kakinada. Reaches all registered donors instantly." }] }),
  component: Emergency,
});

function Emergency() {
  const [posted, setPosted] = useState<any[]>(() => JSON.parse(localStorage.getItem("kbl_emergency") || "[]"));
  const [f, setF] = useState({ patient: "", bloodGroup: "", units: "1", hospital: "", area: "", urgency: "High", contact: "", note: "" });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const r = { ...f, id: Date.now(), posted: "Just now", units: Number(f.units) };
    const next = [r, ...posted];
    setPosted(next);
    localStorage.setItem("kbl_emergency", JSON.stringify(next));
    setF({ patient: "", bloodGroup: "", units: "1", hospital: "", area: "", urgency: "High", contact: "", note: "" });
  }

  const all = [...posted, ...EMERGENCY_REQUESTS];

  return (
    <Layout>
      <section className="bg-primary text-primary-foreground py-14">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <Siren className="w-10 h-10 mx-auto text-gold" />
          <h1 className="mt-3 text-4xl md:text-5xl font-bold">Emergency Blood Request</h1>
          <p className="mt-3 text-primary-foreground/80 max-w-2xl mx-auto">Post an urgent need. Every registered voluntary donor in Kakinada matching the blood group is notified.</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12 grid lg:grid-cols-5 gap-8">
        <form onSubmit={submit} className="lg:col-span-2 bg-white border border-border rounded-xl p-6 shadow-sm space-y-4 h-fit">
          <h2 className="font-bold text-xl">Raise a request</h2>
          <Field label="Patient name" value={f.patient} onChange={(v) => setF({ ...f, patient: v })} required />
          <div className="grid grid-cols-2 gap-3">
            <Select label="Blood Group" value={f.bloodGroup} onChange={(v) => setF({ ...f, bloodGroup: v })} options={BLOOD_GROUPS} required />
            <Field label="Units needed" type="number" value={f.units} onChange={(v) => setF({ ...f, units: v })} required />
          </div>
          <Select label="Hospital (Kakinada)" value={f.hospital} onChange={(v) => setF({ ...f, hospital: v })} options={HOSPITALS.map((h) => h.name)} required />
          <Select label="Area in Kakinada" value={f.area} onChange={(v) => setF({ ...f, area: v })} options={KAKINADA_AREAS} required />
          <Select label="Urgency" value={f.urgency} onChange={(v) => setF({ ...f, urgency: v })} options={["Critical", "High", "Moderate"]} required />
          <Field label="Contact number" value={f.contact} onChange={(v) => setF({ ...f, contact: v })} required placeholder="+91 98XXXXXXXX" />
          <div>
            <label className="text-sm font-medium">Additional note</label>
            <textarea rows={2} value={f.note} onChange={(e) => setF({ ...f, note: e.target.value })} className="mt-1 w-full border border-input rounded-md px-3 py-2 text-sm" />
          </div>
          <button className="w-full py-3 bg-primary text-primary-foreground rounded-md font-semibold hover:bg-primary/90">Post Emergency Request</button>
        </form>

        <div className="lg:col-span-3">
          <h2 className="font-bold text-xl mb-4">Active requests in Kakinada</h2>
          <div className="space-y-3">
            {all.map((r) => (
              <div key={r.id} className="bg-white border border-border rounded-xl p-5 flex flex-col md:flex-row md:items-center gap-4">
                <div className="w-14 h-14 rounded-lg bg-primary text-primary-foreground grid place-items-center text-xl font-bold shrink-0">{r.bloodGroup}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="font-semibold">{r.patient}</div>
                    <span className={"text-[10px] uppercase font-bold px-2 py-0.5 rounded " + (r.urgency === "Critical" ? "bg-primary text-primary-foreground" : r.urgency === "High" ? "bg-gold text-gold-foreground" : "bg-secondary text-secondary-foreground")}>{r.urgency}</span>
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">{r.units} unit(s) · {r.hospital}</div>
                  <div className="mt-1 flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {r.area}, Kakinada</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {r.posted}</span>
                  </div>
                </div>
                <a href={`tel:${r.contact.replace(/\s/g, "")}`} className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-semibold inline-flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> Call</a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
