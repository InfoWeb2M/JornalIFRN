import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Noticia from "./pages/Noticia/index.jsx";
import Cronicas from "./pages/Cronicas/Cronicas.jsx";
import CronicaDetalhada from "./pages/CronicaDetalhada/cronicaDetalhada.jsx";
import AcervoIlustracoes from "./pages/AcervoIlustracoes/index.jsx";
import EnviarSugestoes from "./pages/Enviar/index.jsx";
import Noticias from "./pages/NewsPage/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/noticia",
    element: <Noticia />,
  },
  {
    path: "/cronicas",
    element: <Cronicas />,
  },
  {
    path: "/cronica",
    element: <CronicaDetalhada />,
  },
  {
    path: "/ilustracoes",
    element: <AcervoIlustracoes />,
  },
  {
    path: "/contato",
    element: <EnviarSugestoes />,
  },
  {
    path: "/noticias",
    element: <Noticias />
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
