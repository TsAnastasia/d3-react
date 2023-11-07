import { BrowserRouter } from "react-router-dom";
import App from "./app/App";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import "./index.scss";

import reactDom from "react-dom/client";

const root = reactDom.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ErrorBoundary>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ErrorBoundary>
);
