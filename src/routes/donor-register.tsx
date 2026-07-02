import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useState } from "react";
import { KAKINADA_AREAS, BLOOD_GROUPS } from "@/lib/blood-data";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/donor-register")({
  head: () => ({ meta: [{ title: "Donor Registration — Kakinada Blood Link" }, { name: "description", content: "Register as a voluntary blood donor in Kakinada." }] }),
  component: DonorRegister,
});

function DonorRegister() {
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", age: "", gender: "Male", bloodGroup: "", area: "", address: "", password: "" });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const list = JSON.parse(localStorage.getItem("kbl_donors") || "[]");
    list.push({ ...form, id: Date.now(), registered: new Date().toISOString(), available: true });
    localStorage.setItem("kbl_donors", JSON.stringify(list));
    setDone(true);
  }

  if (done) {
    return (
      <Layout>
        <div className="max-w-xl mx-auto px-4 py-20 text-center">
          <CheckCircle2 className="w-16 h-16 text-primary mx-auto" />
          <h1 className="mt-4 text-3xl font-bold">Welcome to Kakinada Blood Link!</h1>
          <p className="mt-3 text-muted-foreground">Thank you {form.name}. You are now a registered voluntary donor for {form.area}, Kakinada. We'll contact you when a patient in your area needs {form.bloodGroup} blood.</p>
          <Link to="/donor-login" className="mt-6 inline-block px-6 py-3 bg-primary text-primary-foreground rounded-md font-semibold">Continue to Login</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="text-xs uppercase tracking-[0.2em] text-gold-foreground font-semibold">Voluntary registration</div>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold">Become a blood donor in Kakinada</h1>
          <p className="mt-2 text-muted-foreground">Takes 2 minutes. Free. You control your availability.</p>
        </div>
        <form onSubmit={submit} className="bg-white border border-border rounded-xl p-6 md:p-8 shadow-sm grid md:grid-cols-2 gap-4">
          <Field label="Full name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
          <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
          <Field label="Phone (+91)" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required placeholder="+91 98XXXXXXXX" />
          <Field label="Age" type="number" value={form.age} onChange={(v) => setForm({ ...form, age: v })} required />
          <Select label="Gender" value={form.gender} onChange={(v) => setForm({ ...form, gender: v })} options={["Male", "Female", "Other"]} />
          <Select label="Blood Group" value={form.bloodGroup} onChange={(v) => setForm({ ...form, bloodGroup: v })} options={BLOOD_GROUPS} required />
          <Select label="Area in Kakinada" value={form.area} onChange={(v) => setForm({ ...form, area: v })} options={KAKINADA_AREAS} required />
          <Field label="Password" type="password" value={form.password} onChange={(v) => setForm({ ...form, password: v })} required />
          <div className="md:col-span-2">
            <label className="text-sm font-medium">Full address in Kakinada</label>
            <textarea className="mt-1 w-full border border-input rounded-md px-3 py-2 text-sm" rows={2} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} required />
          </div>
          <div className="md:col-span-2 flex items-start gap-2 text-sm text-muted-foreground">
            <input type="checkbox" required className="mt-1 accent-primary" />
            <span>I confirm I am a resident of Kakinada, above 18 years and medically fit to donate blood.</span>
          </div>
          <button className="md:col-span-2 mt-2 py-3 bg-primary text-primary-foreground rounded-md font-semibold hover:bg-primary/90">Register as Donor</button>
        </form>
      </div>
    </Layout>
  );
}

export function Field({ label, value, onChange, type = "text", required, placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input type={type} value={value} required={required} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full border border-input rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
    </div>
  );
}
export function Select({ label, value, onChange, options, required }: { label: string; value: string; onChange: (v: string) => void; options: string[]; required?: boolean }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <select value={value} required={required} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full border border-input rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/40">
        <option value="">Select…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
