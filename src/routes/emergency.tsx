import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useEffect, useState } from "react";
import { KAKINADA_AREAS, BLOOD_GROUPS, type BloodRequest } from "@/lib/blood-data";
import { Field, Select } from "./donor-register";
import { Siren, MapPin, Phone, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/emergency")({
  head: () => ({ meta: [{ title: "Emergency Blood Request — Kakinada" }, { name: "description", content: "Post an urgent blood request in Kakinada. Reaches all registered donors instantly." }] }),
  component: Emergency,
});

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "Just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return d === 1 ? "Yesterday" : `${d}d ago`;
}

function Emergency() {
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [hospitals, setHospitals] = useState<string[]>([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [f, setF] = useState({ patient: "", bloodGroup: "", units: "1", hospital: "", area: "", urgency: "High", contact: "", note: "" });

  async function load() {
    const { data } = await supabase.from("blood_requests").select("*").order("posted_at", { ascending: false });
    setRequests((data ?? []) as BloodRequest[]);
  }

  useEffect(() => {
    load();
    supabase.from("hospitals").select("name").order("name").then(({ data }) => setHospitals((data ?? []).map((h) => h.name)));
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    const { error } = await supabase.from("blood_requests").insert({
      patient_name: f.patient,
      blood_group: f.bloodGroup,
      units: Number(f.units),
      hospital: f.hospital,
      area: f.area,
      urgency: f.urgency,
      contact: f.contact,
      note: f.note || null,
    });
    setLoading(false);
    if (error) {
      setErr(error.message);
      return;
    }
    setF({ patient: "", bloodGroup: "", units: "1", hospital: "", area: "", urgency: "High", contact: "", note: "" });
    load();
  }

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
          <Select label="Hospital (Kakinada)" value={f.hospital} onChange={(v) => setF({ ...f, hospital: v })} options={hospitals} required />
          <Select label="Area in Kakinada" value={f.area} onChange={(v) => setF({ ...f, area: v })} options={KAKINADA_AREAS} required />
          <Select label="Urgency" value={f.urgency} onChange={(v) => setF({ ...f, urgency: v })} options={["Critical", "High", "Moderate"]} required />
          <Field label="Contact number" value={f.contact} onChange={(v) => setF({ ...f, contact: v })} required placeholder="+91 98XXXXXXXX" />
          <div>
            <label className="text-sm font-medium">Additional note</label>
            <textarea rows={2} value={f.note} onChange={(e) => setF({ ...f, note: e.target.value })} className="mt-1 w-full border border-input rounded-md px-3 py-2 text-sm" />
          </div>
          {err && <div className="text-sm text-primary bg-primary/5 border border-primary/20 rounded-md p-3">{err}</div>}
          <button disabled={loading} className="w-full py-3 bg-primary text-primary-foreground rounded-md font-semibold hover:bg-primary/90 disabled:opacity-60">
            {loading ? "Posting…" : "Post Emergency Request"}
          </button>
        </form>

        <div className="lg:col-span-3">
          <h2 className="font-bold text-xl mb-4">Active requests in Kakinada</h2>
          <div className="space-y-3">
            {requests.map((r) => (
              <div key={r.id} className="bg-white border border-border rounded-xl p-5 flex flex-col md:flex-row md:items-center gap-4">
                <div className="w-14 h-14 rounded-lg bg-primary text-primary-foreground grid place-items-center text-xl font-bold shrink-0">{r.blood_group}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="font-semibold">{r.patient_name}</div>
                    <span className={"text-[10px] uppercase font-bold px-2 py-0.5 rounded " + (r.urgency === "Critical" ? "bg-primary text-primary-foreground" : r.urgency === "High" ? "bg-gold text-gold-foreground" : "bg-secondary text-secondary-foreground")}>{r.urgency}</span>
                    {r.status !== "OPEN" && <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-green-100 text-green-800">{r.status}</span>}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">{r.units} unit(s) · {r.hospital}</div>
                  <div className="mt-1 flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {r.area}, Kakinada</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {timeAgo(r.posted_at)}</span>
                  </div>
                </div>
                <a href={`tel:${r.contact.replace(/\s/g, "")}`} className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-semibold inline-flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> Call</a>
              </div>
            ))}
            {requests.length === 0 && <div className="text-center py-12 text-muted-foreground">No active requests right now in Kakinada.</div>}
          </div>
        </div>
      </section>
    </Layout>
  );
}
