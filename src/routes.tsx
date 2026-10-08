import { createBrowserRouter } from "react-router";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Category from "@/pages/Category";
import Article from "@/pages/Article";
import QuartiereDetail from "@/pages/QuartiereDetail";
import NotFound from "@/pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "categoria/:cat", Component: Category },
      { path: "articolo/:id", Component: Article },
      { path: "quartieri/:id", Component: QuartiereDetail },
      { path: "*", Component: NotFound },
    ],
  },
]);
