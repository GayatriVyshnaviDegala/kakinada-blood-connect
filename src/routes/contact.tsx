import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useState } from "react";
import { Mail, MapPin, Phone, Send, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — Kakinada Blood Link" }, { name: "description", content: "Reach the Kakinada Blood Link team for donor coordination, hospital tie-ups and volunteer opportunities in Kakinada." }] }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [f, setF] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  return (
    <Layout>
      <section className="bg-gradient-to-br from-[#fff6f4] to-white py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-xs uppercase tracking-[0.2em] text-gold-foreground font-semibold">We're in Kakinada</div>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold">Contact <span className="text-primary">us</span></h1>
          <p className="mt-3 text-muted-foreground">Questions, hospital partnerships, awareness camp requests — reach out.</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12 grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {[
            { i: MapPin, t: "Address", d: "Dept. of CSE, JNTUK\nJagannaickpur, Kakinada\nAndhra Pradesh 533003" },
            { i: Phone, t: "Helpline (24×7)", d: "+91 884 235 0000\n+91 98480 00000" },
            { i: Mail, t: "Email", d: "help@kakinadabloodlink.in\ncsp@kakinadabloodlink.in" },
          ].map((c) => (
            <div key={c.t} className="bg-white border border-border rounded-xl p-5 flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary grid place-items-center shrink-0"><c.i className="w-5 h-5" /></div>
              <div>
                <div className="font-semibold">{c.t}</div>
                <div className="text-sm text-muted-foreground whitespace-pre-line">{c.d}</div>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="lg:col-span-3 bg-white border border-border rounded-xl p-6 space-y-4">
          {sent ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-14 h-14 text-primary mx-auto" />
              <h3 className="mt-3 text-2xl font-bold">Message received</h3>
              <p className="text-muted-foreground text-sm mt-1">The Kakinada Blood Link team will get back to you within 24 hours.</p>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold">Send a message</h2>
              <div className="grid md:grid-cols-2 gap-3">
                <input required placeholder="Your name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} className="border border-input rounded-md px-3 py-2 text-sm" />
                <input required type="email" placeholder="Email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} className="border border-input rounded-md px-3 py-2 text-sm" />
                <input required placeholder="Phone (+91)" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} className="border border-input rounded-md px-3 py-2 text-sm" />
                <input required placeholder="Subject" value={f.subject} onChange={(e) => setF({ ...f, subject: e.target.value })} className="border border-input rounded-md px-3 py-2 text-sm" />
              </div>
              <textarea required rows={5} placeholder="How can we help you in Kakinada?" value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} className="w-full border border-input rounded-md px-3 py-2 text-sm" />
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md font-semibold"><Send className="w-4 h-4" /> Send Message</button>
            </>
          )}
        </form>
      </section>
    </Layout>
  );
}
