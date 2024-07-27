import scss from "./homePage.module.scss";

import { memo } from "react";
import { Link } from "react-router-dom";

import { APP_PAGES, AppRoutes } from "../../app/router/routes";
import { cl } from "../../assets/utils/libs/classNames";

const HomePage = () => {
  return (
    <>
      <h1>D3 React components</h1>
      <ul className={scss.list}>
        {APP_PAGES.map((page) => (
          <li
            key={page.key}
            className={cl(scss.item, page.inprogress && scss.disabled)}
          >
            <Link
              key={page.key}
              to={AppRoutes[page.key]}
              className={cl(scss.link, page.inprogress && scss.disabled)}
            >
              {page.name || page.key}
            </Link>
            {page.description && (
              <p className={scss.description}>{page.description}</p>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default memo(HomePage);
