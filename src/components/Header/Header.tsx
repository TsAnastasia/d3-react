import scss from "./header.module.scss";

import { Link, NavLink } from "react-router-dom";

import { APP_PAGES, AppRoutes } from "../../app/router/routes";
import { cl } from "../../assets/utils/libs/classNames";

const Header = () => {
  return (
    <header className={scss.root}>
      <nav className={scss.nav}>
        <Link to={AppRoutes.HOME} className={scss.home}>
          home
        </Link>

        <ul className={scss.list}>
          {APP_PAGES.map((page) => (
            <NavLink
              key={page.key}
              to={AppRoutes[page.key]}
              className={({ isActive }) =>
                cl(
                  scss.link,
                  page.inprogress && scss.disabled,
                  isActive && scss.active
                )
              }
            >
              {page.name || page.key}
            </NavLink>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
