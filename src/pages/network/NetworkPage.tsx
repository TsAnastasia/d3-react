import scss from "./networkPage.module.scss";

import BasicNetwork from "./basic/BasicNetwork";
import { BASIC_NETWORK_DATA } from "./basic/data";

const NetworkPage = () => {
  return (
    <>
      <h1>Network chart</h1>
      <section>
        <h2 className={scss.subtitle}>Basic Network</h2>
        <BasicNetwork
          className={scss.chart}
          nodes={BASIC_NETWORK_DATA.nodes}
          links={BASIC_NETWORK_DATA.links}
        />
      </section>
    </>
  );
};

export default NetworkPage;
