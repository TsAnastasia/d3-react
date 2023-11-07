import scss from "./app.module.scss";

import { Suspense, lazy } from "react";

const Header = lazy(() => import("../components/Header/Header"));
const AppRouter = lazy(() => import("./router/AppRouter"));
const Footer = lazy(() => import("../components/Footer/Footer"));

const App = () => {
  return (
    <div className={scss.root}>
      <Suspense>
        <Header />
        <main className={scss.main}>
          <Suspense>
            <AppRouter />
          </Suspense>
        </main>
        <Footer />
      </Suspense>
    </div>
  );
};

export default App;
