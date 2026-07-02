import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useState } from "react";
import { HeartHandshake } from "lucide-react";

export const Route = createFileRoute("/recipient-login")({
  head: () => ({ meta: [{ title: "Recipient Login — Kakinada Blood Link" }] }),
  component: () => {
    const [e, setE] = useState(""); const [p, setP] = useState(""); const [m, setM] = useState("");
    return (
      <Layout>
        <div className="max-w-md mx-auto px-4 py-16">
          <div className="text-center mb-6">
            <div className="w-14 h-14 mx-auto bg-gold text-gold-foreground rounded-xl grid place-items-center"><HeartHandshake /></div>
            <h1 className="mt-4 text-3xl font-bold">Recipient Login</h1>
            <p className="text-muted-foreground text-sm">Access your Kakinada recipient account.</p>
          </div>
          <form onSubmit={(ev) => { ev.preventDefault(); setM(`Welcome, ${e}. You can now raise blood requests in Kakinada.`); }} className="bg-white border border-border rounded-xl p-6 space-y-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <input type="email" required value={e} onChange={(ev) => setE(ev.target.value)} className="mt-1 w-full border border-input rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium">Password</label>
              <input type="password" required value={p} onChange={(ev) => setP(ev.target.value)} className="mt-1 w-full border border-input rounded-md px-3 py-2 text-sm" />
            </div>
            <button className="w-full py-3 bg-primary text-primary-foreground rounded-md font-semibold">Login</button>
            {m && <div className="text-sm text-primary bg-primary/5 border border-primary/20 rounded-md p-3">{m}</div>}
            <div className="text-sm text-center text-muted-foreground">New here? <Link to="/recipient-register" className="text-primary font-semibold">Register</Link></div>
          </form>
        </div>
      </Layout>
    );
  },
});
