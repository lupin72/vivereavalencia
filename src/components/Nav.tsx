import { useState } from "react";
import { Link, useNavigate } from "react-router";
import logo from "@/imports/195941231_padded_logo.png";
import { C, navItems } from "@/data";

export default function Nav() {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="nav-wrap">
      <div className="nav-inner">
        <Link to="/" className="nav-logo" style={{ display: "flex", alignItems: "center" }}>
          <img src={logo} alt="Vivere a Valencia" style={{ height: "80px", width: "auto" }} />
        </Link>

        <div className="nav-cats hidden lg:flex">
          {navItems.map((n) => (
            <Link key={n.id} to={`/categoria/${n.id}`} className={`nav-cat ${n.id}`}>{n.label}</Link>
          ))}
        </div>

        <div className="nav-utils">
          <button onClick={() => setSearchOpen((v) => !v)} aria-label="Cerca">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="5.5" cy="5.5" r="4.5" /><line x1="9" y1="9" x2="13" y2="13" />
            </svg>
          </button>
          <Link to="/#newsletter">Newsletter</Link>
          <button className="lg:hidden" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="0" y1="1" x2="18" y2="1" />
              <line x1="0" y1="6" x2="18" y2="6" />
              <line x1="0" y1="11" x2="18" y2="11" />
            </svg>
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="wrap py-3" style={{ borderTop: "1px solid var(--c-rule)" }}>
          <form onSubmit={(e) => { e.preventDefault(); const q = (e.currentTarget.querySelector("input") as HTMLInputElement).value; if (q) { setSearchOpen(false); navigate(`/cerca?q=${encodeURIComponent(q)}`); } }}>
            <input autoFocus type="text" placeholder="Cerca articoli, guide, quartieri…"
              style={{ width: "100%", background: "none", border: "none", outline: "none", fontFamily: "Inter", fontWeight: 400, fontSize: ".9rem", color: "#111" }} />
          </form>
        </div>
      )}

      <div className="lg:hidden overflow-hidden transition-all duration-300"
        style={{ maxHeight: menuOpen ? "300px" : "0", borderTop: menuOpen ? "1px solid var(--c-rule)" : "none", background: "#fff" }}>
        <div className="wrap py-6 grid grid-cols-2 gap-y-5">
          {navItems.map((n) => (
            <Link key={n.id} to={`/categoria/${n.id}`} onClick={() => setMenuOpen(false)}
              style={{ fontFamily: "Inter", fontSize: ".7rem", fontWeight: 500, letterSpacing: ".12em", textTransform: "uppercase", color: C[n.id] }}>
              {n.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
