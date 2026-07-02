import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { HOSPITALS, BLOOD_GROUPS } from "@/lib/blood-data";
import { Building2, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/hospitals")({
  head: () => ({ meta: [{ title: "Hospitals in Kakinada — Blood Bank Directory" }, { name: "description", content: "Directory of hospitals with blood banks in Kakinada, Andhra Pradesh, with live stock levels." }] }),
  component: Hospitals,
});

function Hospitals() {
  return (
    <Layout>
      <section className="bg-gradient-to-br from-[#fff6f4] to-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="text-xs uppercase tracking-[0.2em] text-gold-foreground font-semibold">Kakinada network</div>
          <h1 className="mt-2 text-4xl font-bold">Partner hospitals in <span className="text-primary">Kakinada</span></h1>
          <p className="mt-2 text-muted-foreground">Blood banks and stock levels across the city.</p>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 py-10 space-y-5">
        {HOSPITALS.map((h) => {
          const total = Object.values(h.stock).reduce((a, b) => a + b, 0);
          return (
            <div key={h.name} className="bg-white border border-border rounded-xl p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary" />
                    <h2 className="font-bold text-lg">{h.name}</h2>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-gold/20 text-gold-foreground rounded">{h.type}</span>
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {h.address}</div>
                  <div className="mt-1 text-sm text-muted-foreground flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {h.phone}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">Total units</div>
                  <div className="text-3xl font-bold text-primary font-display">{total}</div>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-4 md:grid-cols-8 gap-2">
                {BLOOD_GROUPS.map((g) => (
                  <div key={g} className="rounded-md border border-border p-2 text-center">
                    <div className="text-sm font-semibold text-primary">{g}</div>
                    <div className="text-xs text-muted-foreground">{h.stock[g as keyof typeof h.stock]}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </Layout>
  );
}
