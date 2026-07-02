import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useMemo, useState } from "react";
import { generateDonors, KAKINADA_AREAS, BLOOD_GROUPS } from "@/lib/blood-data";
import { Search, Phone, MapPin, CheckCircle2, XCircle } from "lucide-react";

export const Route = createFileRoute("/search-donors")({
  head: () => ({ meta: [{ title: "Search Donors — Kakinada Blood Link" }, { name: "description", content: "Search voluntary blood donors by group and locality across Kakinada." }] }),
  component: SearchDonors,
});

function SearchDonors() {
  const donors = useMemo(() => generateDonors(), []);
  const [bg, setBg] = useState("");
  const [area, setArea] = useState("");
  const [onlyAvail, setOnlyAvail] = useState(false);

  const results = donors.filter((d) => (!bg || d.bloodGroup === bg) && (!area || d.area === area) && (!onlyAvail || d.available));

  return (
    <Layout>
      <section className="bg-gradient-to-br from-[#fff6f4] to-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="text-xs uppercase tracking-[0.2em] text-gold-foreground font-semibold">Find a donor</div>
            <h1 className="mt-2 text-4xl font-bold">Search donors across <span className="text-primary">Kakinada</span></h1>
            <p className="mt-2 text-muted-foreground">Filter by blood group and locality — every donor listed is from Kakinada.</p>
          </div>
          <div className="mt-8 bg-white p-4 md:p-6 rounded-xl border border-border shadow-sm grid md:grid-cols-4 gap-3">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider">Blood Group</label>
              <select className="mt-1 w-full border border-input rounded-md px-3 py-2 text-sm" value={bg} onChange={(e) => setBg(e.target.value)}>
                <option value="">All</option>
                {BLOOD_GROUPS.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider">Area in Kakinada</label>
              <select className="mt-1 w-full border border-input rounded-md px-3 py-2 text-sm" value={area} onChange={(e) => setArea(e.target.value)}>
                <option value="">All areas</option>
                {KAKINADA_AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <label className="flex items-end gap-2 text-sm">
              <input type="checkbox" className="accent-primary" checked={onlyAvail} onChange={(e) => setOnlyAvail(e.target.checked)} /> Available now
            </label>
            <div className="flex items-end">
              <div className="w-full text-center bg-primary/5 border border-primary/20 text-primary rounded-md py-2 text-sm font-semibold flex items-center justify-center gap-2">
                <Search className="w-4 h-4" /> {results.length} donors
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((d) => (
            <div key={d.id} className="bg-white border border-border rounded-xl p-5 hover:shadow-lg hover:border-primary transition">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold text-lg">{d.name}</div>
                  <div className="text-xs text-muted-foreground">{d.gender} · {d.age} yrs · {d.donations} donations</div>
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary text-primary-foreground grid place-items-center font-bold">{d.bloodGroup}</div>
              </div>
              <div className="mt-3 text-sm text-muted-foreground flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {d.area}, Kakinada</div>
              <div className="mt-1 text-sm text-muted-foreground flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {d.phone}</div>
              <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs">
                <span className={"flex items-center gap-1 font-semibold " + (d.available ? "text-green-700" : "text-muted-foreground")}>
                  {d.available ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />} {d.available ? "Available" : "Recently donated"}
                </span>
                <a href={`tel:${d.phone.replace(/\s/g, "")}`} className="px-3 py-1.5 bg-primary text-primary-foreground rounded-md font-semibold">Contact</a>
              </div>
            </div>
          ))}
          {results.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">No donors found for this filter in Kakinada. Try widening your search.</div>
          )}
        </div>
      </section>
    </Layout>
  );
}
