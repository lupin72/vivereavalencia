import { createBrowserRouter } from "react-router"
import Layout from "@/components/Layout"
import HomeShell from "@/home/HomeShell"
import Home from "@/pages/Home"
import Category from "@/pages/Category"
import Article from "@/pages/Article"
import QuartiereDetail from "@/pages/QuartiereDetail"
import NotFound from "@/pages/NotFound"

export const router = createBrowserRouter([
  // La home ridisegnata ha la sua cornice (nav, ricerca, scroll fluido).
  {
    Component: HomeShell,
    children: [{ path: "/", Component: Home }],
  },
  {
    Component: Layout,
    children: [
      { path: "/categoria/:cat", Component: Category },
      { path: "/articolo/:id", Component: Article },
      { path: "/quartieri/:id", Component: QuartiereDetail },
      { path: "*", Component: NotFound },
    ],
  },
])
