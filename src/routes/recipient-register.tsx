import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useState } from "react";
import { KAKINADA_AREAS, BLOOD_GROUPS, HOSPITALS } from "@/lib/blood-data";
import { Field, Select } from "./donor-register";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/recipient-register")({
  head: () => ({ meta: [{ title: "Recipient Registration — Kakinada Blood Link" }] }),
  component: RecipientRegister,
});

function RecipientRegister() {
  const [done, setDone] = useState(false);
  const [f, setF] = useState({ name: "", email: "", phone: "", bloodGroup: "", area: "", hospital: "", password: "" });
  function submit(e: React.FormEvent) {
    e.preventDefault();
    const list = JSON.parse(localStorage.getItem("kbl_recipients") || "[]");
    list.push({ ...f, id: Date.now() });
    localStorage.setItem("kbl_recipients", JSON.stringify(list));
    setDone(true);
  }
  if (done)
    return (
      <Layout>
        <div className="max-w-xl mx-auto px-4 py-20 text-center">
          <CheckCircle2 className="w-16 h-16 text-primary mx-auto" />
          <h1 className="mt-4 text-3xl font-bold">Registered</h1>
          <p className="mt-3 text-muted-foreground">You can now request donors in Kakinada. Log in to raise emergency requests.</p>
          <Link to="/recipient-login" className="mt-6 inline-block px-6 py-3 bg-primary text-primary-foreground rounded-md font-semibold">Login</Link>
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="text-xs uppercase tracking-[0.2em] text-gold-foreground font-semibold">For patients & families</div>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold">Recipient Registration</h1>
          <p className="mt-2 text-muted-foreground">Register to request donors from Kakinada's network.</p>
        </div>
        <form onSubmit={submit} className="bg-white border border-border rounded-xl p-6 md:p-8 grid md:grid-cols-2 gap-4">
          <Field label="Full name" value={f.name} onChange={(v) => setF({ ...f, name: v })} required />
          <Field label="Email" type="email" value={f.email} onChange={(v) => setF({ ...f, email: v })} required />
          <Field label="Phone (+91)" value={f.phone} onChange={(v) => setF({ ...f, phone: v })} required />
          <Select label="Required Blood Group" value={f.bloodGroup} onChange={(v) => setF({ ...f, bloodGroup: v })} options={BLOOD_GROUPS} required />
          <Select label="Area in Kakinada" value={f.area} onChange={(v) => setF({ ...f, area: v })} options={KAKINADA_AREAS} required />
          <Select label="Preferred Hospital" value={f.hospital} onChange={(v) => setF({ ...f, hospital: v })} options={HOSPITALS.map((h) => h.name)} required />
          <Field label="Password" type="password" value={f.password} onChange={(v) => setF({ ...f, password: v })} required />
          <button className="md:col-span-2 mt-2 py-3 bg-primary text-primary-foreground rounded-md font-semibold">Register as Recipient</button>
        </form>
      </div>
    </Layout>
  );
}
