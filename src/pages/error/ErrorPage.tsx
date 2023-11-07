import { FC } from "react";

import { cl } from "../../assets/utils/libs/classNames";

import scss from "./errorPage.module.scss";

interface I {
  className?: string;
}

const ErrorPage: FC<I> = ({ className }) => {
  const reloadPage = () => {
    location.reload();
  };

  const hardReloadPage = () => {
    localStorage.clear();
    sessionStorage.clear();

    // clear cookie (need check)
    // document.cookie.split(";").forEach(function (c) {
    //   document.cookie = c
    //     .replace(/^ +/, "")
    //     .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    // });

    reloadPage();
  };

  return (
    <section className={cl(scss.root, className)}>
      <p className={scss.text}>Произошла непредвиденная ошибка</p>
      <button type="button" className={scss.btn} onClick={reloadPage}>
        Обновить страницу
      </button>
      <button type="button" className={scss.btn} onClick={hardReloadPage}>
        Обновить с очиcткой данных
      </button>
    </section>
  );
};

export default ErrorPage;
