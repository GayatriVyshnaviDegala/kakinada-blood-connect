import { Link } from "@tanstack/react-router";
import { type ReactNode, useEffect, useState } from "react";
import { Droplet, Menu, X, Sun, Moon } from "lucide-react";

function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("kbl_theme");
    const initial = saved ? saved === "dark" : document.documentElement.classList.contains("dark");
    setDark(initial);
    document.documentElement.classList.toggle("dark", initial);
  }, []);
  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("kbl_theme", next ? "dark" : "light");
  }
  return (
    <button onClick={toggle} aria-label="Toggle theme" className="p-2 rounded-md hover:bg-secondary text-foreground/70 hover:text-primary transition">
      {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/search-donors", label: "Find Donors" },
  { to: "/emergency", label: "Emergency" },
  { to: "/hospitals", label: "Hospitals" },
  { to: "/awareness", label: "Awareness" },
  { to: "/contact", label: "Contact" },
  { to: "/dashboard", label: "Dashboard" },
];

export function Layout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-md bg-primary text-primary-foreground grid place-items-center shadow">
              <Droplet className="w-5 h-5" fill="currentColor" />
            </div>
            <div className="leading-tight">
              <div className="font-display font-bold text-lg text-primary">Kakinada Blood Link</div>
              <div className="text-[10px] uppercase tracking-widest text-gold-foreground">Community Service Project</div>
            </div>
          </Link>
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary rounded-md hover:bg-secondary transition"
                activeProps={{ className: "px-3 py-2 text-sm font-semibold text-primary rounded-md bg-secondary" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="hidden lg:flex items-center gap-2">
            <Link to="/donor-login" className="px-3 py-2 text-sm font-medium text-primary hover:underline">
              Donor Login
            </Link>
            <Link
              to="/donor-register"
              className="px-4 py-2 text-sm font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
            >
              Register as Donor
            </Link>
          </div>
          <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <div className="lg:hidden border-t border-border bg-white">
            <div className="px-4 py-3 flex flex-col gap-1">
              {NAV.map((n) => (
                <Link key={n.to} to={n.to} className="py-2 text-sm font-medium" onClick={() => setOpen(false)}>
                  {n.label}
                </Link>
              ))}
              <div className="flex gap-2 pt-2 border-t border-border mt-2">
                <Link to="/donor-login" className="flex-1 text-center py-2 border border-primary text-primary rounded-md text-sm" onClick={() => setOpen(false)}>Donor Login</Link>
                <Link to="/donor-register" className="flex-1 text-center py-2 bg-primary text-primary-foreground rounded-md text-sm" onClick={() => setOpen(false)}>Register</Link>
              </div>
            </div>
          </div>
        )}
      </header>
      <main className="flex-1">{children}</main>
      <footer className="bg-[#1a1010] text-white/85 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12 grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-md bg-primary grid place-items-center">
                <Droplet className="w-4 h-4" fill="currentColor" />
              </div>
              <span className="font-display font-bold text-lg text-white">Kakinada Blood Link</span>
            </div>
            <p className="text-sm text-white/70">
              A student-led CSP initiative connecting voluntary blood donors with patients across Kakinada, Andhra Pradesh.
            </p>
          </div>
          <div>
            <h4 className="text-gold font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {NAV.slice(0, 5).map((n) => (
                <li key={n.to}><Link to={n.to} className="hover:text-gold">{n.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-gold font-semibold mb-3">For Users</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/donor-register" className="hover:text-gold">Donor Registration</Link></li>
              <li><Link to="/recipient-register" className="hover:text-gold">Recipient Registration</Link></li>
              <li><Link to="/donor-login" className="hover:text-gold">Donor Login</Link></li>
              <li><Link to="/recipient-login" className="hover:text-gold">Recipient Login</Link></li>
              <li><Link to="/admin" className="hover:text-gold">Admin Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-gold font-semibold mb-3">Contact</h4>
            <address className="not-italic text-sm space-y-1 text-white/70">
              <div>Dept. of CSE, JNTUK</div>
              <div>Jagannaickpur, Kakinada</div>
              <div>Andhra Pradesh 533003</div>
              <div className="pt-2">Helpline: <span className="text-white">+91 884 235 0000</span></div>
              <div>Email: help@kakinadabloodlink.in</div>
            </address>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
          © {new Date().getFullYear()} Kakinada Blood Link · Community Service Project · 3rd Year B.Tech CSE
        </div>
      </footer>
    </div>
  );
}
