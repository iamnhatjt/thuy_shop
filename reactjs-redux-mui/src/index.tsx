import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Routers from "./Routers";
import AppProvider from "./contexts/AppProvider";
import { DevSupport } from "@react-buddy/ide-toolbox";
import { useInitial } from "./dev";
import ComponentPreviews from "./dev/previews";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <AppProvider>
      <DevSupport
        ComponentPreviews={ComponentPreviews}
        useInitialHook={useInitial}
      >
        <Routers />
      </DevSupport>
    </AppProvider>
  </React.StrictMode>,
);
