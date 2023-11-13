import { ChangeEventHandler, useCallback, useState } from "react";

import { INetworkData, INetworkNode } from "../network/utils/types";
import DATA1 from "./data/data1";
import DATA2 from "./data/data2";

export const DATA_ARR: INetworkData[] = [
  DATA1,
  DATA2,
  { nodes: [], links: [] },
];

export interface INetworkSettings {
  zoomed: boolean;
  draggable: boolean;
  handleChangeData: ChangeEventHandler<HTMLInputElement>;
  handleChangeZoomed: ChangeEventHandler<HTMLInputElement>;
  handleChangeDraggable: ChangeEventHandler<HTMLInputElement>;
}

export interface INetworkSettingsData {
  node: INetworkNode | undefined;
  data: INetworkData;
  handleNodeClick: (node?: INetworkNode) => void;
  nodeColor: (node: INetworkNode) => string;
}

export const useNetworkSettings = (): INetworkSettings &
  INetworkSettingsData => {
  const [node, setNode] = useState<INetworkNode>();

  const [data, setData] = useState<INetworkData>(DATA1);
  const handleChangeData = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setNode(undefined);
      setData(DATA_ARR[Number(event.target.value)]);
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

  const handleNodeClick = useCallback((node?: INetworkNode) => {
    console.log("node click", node);
    setNode((n) => (n?.id === node?.id ? undefined : node));
  }, []);

  const nodeColor = useCallback(
    (n: INetworkNode) =>
      n.id === node?.id ? "var(--color-primary)" : "var(--color-bg)",
    [node]
  );

  return {
    node,
    data,
    zoomed,
    draggable,
    handleChangeData,
    handleChangeZoomed,
    handleChangeDraggable,
    handleNodeClick,
    nodeColor,
  };
};
