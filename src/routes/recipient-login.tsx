import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useState } from "react";
import { HeartHandshake } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/recipient-login")({
  head: () => ({ meta: [{ title: "Recipient Login — Kakinada Blood Link" }] }),
  component: RecipientLogin,
});

function RecipientLogin() {
  const [e, setE] = useState("");
  const [p, setP] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    setErr("");
    setMsg("");
    setLoading(true);
    const { data, error } = await supabase
      .from("recipients")
      .select("id, name, area, blood_group, hospital")
      .eq("email", e.toLowerCase().trim())
      .eq("password", p)
      .maybeSingle();
    setLoading(false);
    if (error || !data) {
      setErr("Invalid email or password.");
      return;
    }
    localStorage.setItem("kbl_recipient", JSON.stringify(data));
    setMsg(`Welcome, ${data.name}. You can now raise ${data.blood_group} blood requests at ${data.hospital}, Kakinada.`);
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto bg-gold text-gold-foreground rounded-xl grid place-items-center"><HeartHandshake /></div>
          <h1 className="mt-4 text-3xl font-bold">Recipient Login</h1>
          <p className="text-muted-foreground text-sm">Access your Kakinada recipient account.</p>
        </div>
        <form onSubmit={submit} className="bg-card border border-border rounded-xl p-6 space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input type="email" required value={e} onChange={(ev) => setE(ev.target.value)} className="mt-1 w-full border border-input rounded-md px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input type="password" required value={p} onChange={(ev) => setP(ev.target.value)} className="mt-1 w-full border border-input rounded-md px-3 py-2 text-sm" />
          </div>
          <button disabled={loading} className="w-full py-3 bg-primary text-primary-foreground rounded-md font-semibold disabled:opacity-60">{loading ? "Signing in…" : "Login"}</button>
          {msg && <div className="text-sm text-green-800 bg-green-50 border border-green-200 rounded-md p-3">{msg}</div>}
          {err && <div className="text-sm text-primary bg-primary/5 border border-primary/20 rounded-md p-3">{err}</div>}
          <div className="text-sm text-center text-muted-foreground">New here? <Link to="/recipient-register" className="text-primary font-semibold">Register</Link></div>
        </form>
      </div>
    </Layout>
  );
}
