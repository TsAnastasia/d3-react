import scss from "./networkPage.module.scss";

import { ChangeEventHandler, useCallback, useState } from "react";

import DATA1 from "./data/data1";
import DATA2 from "./data/data2";
import { INode } from "./force/types";
import Network from "./network/Network";
import { INetworkNode } from "./network/utils/types";

const NetworkPage = () => {
  const [node, setNode] = useState<INode>();
  const [indexData, setIndexData] = useState<number>(0);

  const handleChangeData = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setNode(undefined);
      setIndexData(Number(event.target.value));
    },
    []
  );

  const [zoomed, setZoomed] = useState<boolean>(true);
  const handleChangeZoomed = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => setZoomed(event.target.checked),
    []
  );

  const [draggable, setDraggable] = useState<boolean>(true);
  const handleChangeDraggable = useCallback<
    ChangeEventHandler<HTMLInputElement>
  >((event) => setDraggable(event.target.checked), []);

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
      <section>
        <h2 className={scss.subtitle}>Force Network</h2>
        <label>
          <span>zoomed</span>
          <input
            type="checkbox"
            checked={zoomed}
            onChange={handleChangeZoomed}
          />
        </label>
        <label>
          <span>draggablea</span>
          <input
            type="checkbox"
            checked={draggable}
            onChange={handleChangeDraggable}
          />
        </label>
        <label>
          <span>data</span>
          <input
            type="range"
            value={indexData}
            min={0}
            max={1}
            onChange={handleChangeData}
          />
        </label>
        <Network
          className={scss.chart}
          zoomed={zoomed}
          draggable={draggable}
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
