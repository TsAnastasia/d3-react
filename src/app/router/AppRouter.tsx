import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { APP_PAGES, AppRoutes } from "./routes";

const HomePage = lazy(() => import("../../pages/home/HomePage"));
const InprocessPage = lazy(() => import("../../pages/inprocess/InprocessPage"));

const NetworkPage = lazy(() => import("../../pages/network/NetworkPage"));
const SchemePage = lazy(() => import("../../pages/scheme/SchemePage"));

const AppRouter = () => {
  return (
    <Routes>
      <Route path={AppRoutes.HOME} element={<HomePage />} />
      <Route path={AppRoutes.NETWORK} element={<NetworkPage />} />
      <Route path={AppRoutes.SCHEME} element={<SchemePage />} />

      {/* in progress */}
      {APP_PAGES.filter((p) => p.inprogress).map((page) => (
        <Route
          key={page.key}
          path={AppRoutes[page.key]}
          element={<InprocessPage name={page.name || page.key} />}
        />
      ))}
      <Route path="*" element={<Navigate to={AppRoutes.HOME} replace />} />
    </Routes>
  );
};

export default AppRouter;
