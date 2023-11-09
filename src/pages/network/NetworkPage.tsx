import scss from "./networkPage.module.scss";

// import BasicNetwork from "./basic/BasicNetwork";
// import { BASIC_NETWORK_DATA } from "./basic/data";
// import ForceNetwork from "./force/ForceNetwork";
import DATA1 from "./data/data1";
import DATA2 from "./data/data2";
import { useCallback, useState } from "react";
import { INode } from "./force/types";
import Network from "./network/Network";
import { INetworkNode } from "./network/utils/types";

const NetworkPage = () => {
  const [node, setNode] = useState<INode>();
  const [indexData, setIndexData] = useState<0 | 1>(0);

  const handleToggle = useCallback(() => {
    setNode(undefined);
    setIndexData((prev) => (prev === 0 ? 1 : 0));
  }, []);

  const handleNodeClick = useCallback((node?: INode) => {
    console.log("node click", node);
    setNode((n) => (n?.id === node?.id ? undefined : node));
  }, []);

  const nodeColor = useCallback(
    (n: INetworkNode) =>
      n.id === node?.id ? "var(--color-primary)" : "var(--color-bg)",
    [node]
  );

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
        <input type="checkbox" checked={!!indexData} onChange={handleToggle} />
        {/* <ForceNetwork
          className={scss.chart}
          nodes={FORCE_DATA.nodes}
          links={FORCE_DATA.links}
          onNodeClick={handleNodeClick}
          selectedNode={node}
        /> */}
        <Network
          className={scss.chart}
          zoomed
          data={indexData === 0 ? DATA1 : DATA2}
          options={{
            nodeColor,
          }}
          onNodeClick={handleNodeClick}
        />
      </section>
    </>
  );
};

export default NetworkPage;
