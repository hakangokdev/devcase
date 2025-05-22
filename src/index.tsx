import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ElementProductsDesktop } from "./screens/ElementProductsDesktop";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <ElementProductsDesktop />
  </StrictMode>,
);
