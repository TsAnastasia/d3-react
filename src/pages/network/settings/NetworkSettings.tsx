import scss from "./networkSettings.module.scss";

import { FC, memo } from "react";

import { DATA_ARR, INetworkSettings } from "../utils/useNetworkSettings";

const NetworkSettings: FC<INetworkSettings> = ({
  zoomed,
  draggable,
  handleChangeData,
  handleChangeZoomed,
  handleChangeDraggable,
}) => {
  return (
    <div className={scss.root}>
      <p className={scss.title}>Settings</p>
      <label className={scss.boolean}>
        <span>zoomed</span>
        <input type="checkbox" checked={zoomed} onChange={handleChangeZoomed} />
      </label>
      <label className={scss.boolean}>
        <span>draggable</span>
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
          min={0}
          max={DATA_ARR.length}
          onChange={handleChangeData}
        />
      </label>
    </div>
  );
};

export default memo(NetworkSettings);
