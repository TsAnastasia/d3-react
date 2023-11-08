import scss from "./networkPage.module.scss";

// import BasicNetwork from "./basic/BasicNetwork";
// import { BASIC_NETWORK_DATA } from "./basic/data";
import ForceNetwork from "./force/ForceNetwork";
import { FORCE_DATA } from "./force/data";
import { useCallback, useState } from "react";
import { INode } from "./force/types";

const NetworkPage = () => {
  const [node, setNode] = useState<INode>();

  const handleNodeClick = useCallback((node?: INode) => {
    console.log("node click", node);
    setNode((n) => (n?.id === node?.id ? undefined : node));
  }, []);

  return (
    <>
      <h1>Network chart</h1>
      {/* <section>
        <h2 className={scss.subtitle}>Basic Network</h2>
        <BasicNetwork
          className={scss.chart}
          nodes={BASIC_NETWORK_DATA.nodes}
          links={BASIC_NETWORK_DATA.links}
        />
      </section> */}
      <section>
        <h2 className={scss.subtitle}>Force Network</h2>
        <ForceNetwork
          className={scss.chart}
          nodes={FORCE_DATA.nodes}
          links={FORCE_DATA.links}
          onNodeClick={handleNodeClick}
          selectedNode={node}
        />
      </section>
    </>
  );
};

export default NetworkPage;
