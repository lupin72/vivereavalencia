import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import Nav from "./Nav";
import Footer from "./Footer";

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div style={{ background: "#fff", color: "#111" }}>
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
