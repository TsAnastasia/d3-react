import scss from "./networkPage.module.scss";

import Network from "./network/Network";
import NetworkSettings from "./settings/NetworkSettings";
import { useNetworkSettings } from "./utils/useNetworkSettings";

const NetworkPage = () => {
  const {
    data,
    zoomed,
    draggable,
    handleChangeData,
    handleChangeZoomed,
    handleChangeDraggable,
    handleNodeClick,
    nodeColor,
  } = useNetworkSettings();

  return (
    <>
      <h1>Network chart</h1>
      <section className={scss.network}>
        <NetworkSettings
          zoomed={zoomed}
          draggable={draggable}
          handleChangeData={handleChangeData}
          handleChangeZoomed={handleChangeZoomed}
          handleChangeDraggable={handleChangeDraggable}
        />
        <Network
          className={scss.chart}
          zoomed={zoomed}
          draggable={draggable}
          data={data}
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
