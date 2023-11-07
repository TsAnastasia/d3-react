import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { AppPages, AppRoutes } from "../../assets/constants/routes";

const HomePage = lazy(() => import("../../pages/home/HomePage"));
const InprocessPage = lazy(() => import("../../pages/inprocess/InprocessPage"));

const NetworkPage = lazy(() => import("../../pages/network/NetworkPage"));

const AppRouter = () => {
  return (
    <Routes>
      <Route path={AppRoutes.HOME} element={<HomePage />} />
      <Route path={AppRoutes.NETWORK} element={<NetworkPage />} />

      {/* in progress */}
      {AppPages.filter((p) => p.inprogress).map((page) => (
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
