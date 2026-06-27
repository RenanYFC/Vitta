import type { RouteObject } from "react-router-dom";
import Layout from "@/components/feature/Layout";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import Collection from "../pages/collection/page";
import ProductDetail from "../pages/product/page";
import Cart from "../pages/cart/page";
import Checkout from "../pages/checkout/page";
import OrderConfirmation from "../pages/confirmation/page";
import About from "../pages/about/page";
import Favorites from "../pages/favorites/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/colecao",
        element: <Collection />,
      },
      {
        path: "/produto/:slug",
        element: <ProductDetail />,
      },
      {
        path: "/carrinho",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/pedido-confirmado",
        element: <OrderConfirmation />,
      },
      {
        path: "/sobre",
        element: <About />,
      },
      {
        path: "/favoritos",
        element: <Favorites />,
      },
      {
        path: "/conta",
        element: <NotFound />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

export default routes;
