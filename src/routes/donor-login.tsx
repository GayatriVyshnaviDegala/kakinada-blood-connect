import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useState } from "react";
import { Droplet } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/donor-login")({
  head: () => ({ meta: [{ title: "Donor Login — Kakinada Blood Link" }] }),
  component: LoginPage,
});

function LoginPage() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setMsg("");
    setLoading(true);
    const { data, error } = await supabase
      .from("donors")
      .select("id, name, area, blood_group")
      .eq("email", email.toLowerCase().trim())
      .eq("password", pw)
      .maybeSingle();
    setLoading(false);
    if (error || !data) {
      setErr("Invalid email or password. Try one of the seeded accounts, e.g. ravi.teja@example.in / donor123.");
      return;
    }
    localStorage.setItem("kbl_donor", JSON.stringify(data));
    setMsg(`Welcome back, ${data.name}! You are logged in as a ${data.blood_group} donor in ${data.area}, Kakinada.`);
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto bg-primary text-primary-foreground rounded-xl grid place-items-center"><Droplet fill="currentColor" /></div>
          <h1 className="mt-4 text-3xl font-bold">Donor Login</h1>
          <p className="text-muted-foreground text-sm">Access your Kakinada donor account.</p>
        </div>
        <form onSubmit={submit} className="bg-white border border-border rounded-xl p-6 shadow-sm space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full border border-input rounded-md px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input type="password" required value={pw} onChange={(e) => setPw(e.target.value)} className="mt-1 w-full border border-input rounded-md px-3 py-2 text-sm" />
          </div>
          <button disabled={loading} className="w-full py-3 bg-primary text-primary-foreground rounded-md font-semibold disabled:opacity-60">{loading ? "Signing in…" : "Login"}</button>
          {msg && <div className="text-sm text-green-800 bg-green-50 border border-green-200 rounded-md p-3">{msg}</div>}
          {err && <div className="text-sm text-primary bg-primary/5 border border-primary/20 rounded-md p-3">{err}</div>}
          <div className="text-sm text-center text-muted-foreground">
            New donor? <Link to="/donor-register" className="text-primary font-semibold">Register here</Link>
          </div>
        </form>
      </div>
    </Layout>
  );
}
