import {
  ChangeEventHandler,
  Dispatch,
  FC,
  memo,
  MouseEventHandler,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import {
  ISchemeEdge,
  ISchemeNode,
  SCHEME_EDGE_TYPES,
  SchemeEdgeType,
} from "../scheme/utils/types";

const Select: FC<{
  options: readonly string[];
  value: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  name: string;
}> = ({ options, value, onChange, name }) => {
  return (
    <select value={value} onChange={onChange} name={name}>
      {options.map((item) => (
        <option value={item} key={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

const SelectMemo = memo(Select);

const SchemeEdgesItem: FC<{
  edge: ISchemeEdge;
  nodes: ISchemeNode[];
  setEdges: Dispatch<SetStateAction<ISchemeEdge[]>>;
}> = ({ edge, nodes, setEdges }) => {
  const options = useMemo(() => nodes.map((n) => n.id), [nodes]);

  const handleChangeNode = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    (event) => {
      setEdges((prev) => {
        return prev.map((item) =>
          item.id === edge.id
            ? {
                ...item,
                [event.target.name as "source" | "target"]: nodes.find(
                  (e) => e.id === event.target.value
                ),
              }
            : item
        );
      });
    },
    [edge.id, nodes, setEdges]
  );

  const handleChangeType = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    (event) => {
      setEdges((prev) => {
        return prev.map((item) =>
          item.id === edge.id
            ? {
                ...item,
                type: event.target.value as SchemeEdgeType,
              }
            : item
        );
      });
    },
    [edge.id, setEdges]
  );

  const handleSwapNodes = useCallback<MouseEventHandler>(() => {
    setEdges((prev) => {
      return prev.map((item) =>
        item.id === edge.id
          ? {
              ...item,
              source: edge.target,
              target: edge.source,
            }
          : item
      );
    });
  }, [edge.id, edge.source, edge.target, setEdges]);

  const handleRemove = useCallback<MouseEventHandler>(() => {
    setEdges((prev) => prev.filter((item) => item.id !== edge.id));
  }, [edge.id, setEdges]);

  return (
    <li key={edge.id}>
      <span>{edge.id}</span>
      <SelectMemo
        options={options}
        value={edge.source?.id || ""}
        onChange={handleChangeNode}
        name="source"
      />
      <button type="button" onClick={handleSwapNodes}>
        {"<->"}
      </button>
      <SelectMemo
        options={options}
        value={edge.target?.id || ""}
        onChange={handleChangeNode}
        name="target"
      />
      <SelectMemo
        options={SCHEME_EDGE_TYPES}
        value={edge.type || ""}
        onChange={handleChangeType}
        name="type"
      />
      <button type="button" onClick={handleRemove}>
        x
      </button>
    </li>
  );
};

const SchemeEdgesItemMemo = memo(SchemeEdgesItem);

const SchemeEdges: FC<{
  edges: ISchemeEdge[];
  nodes: ISchemeNode[];
  setEdges: Dispatch<SetStateAction<ISchemeEdge[]>>;
}> = ({ edges, nodes, setEdges }) => {
  const handleAdd = useCallback(() => {
    setEdges((prev) =>
      prev.concat({
        id: Math.random().toString(16).slice(-8),
        source: nodes[0],
        target: nodes[0],
        type: SCHEME_EDGE_TYPES[0],
      })
    );
  }, [nodes, setEdges]);

  return (
    <div>
      <button type="button" onClick={handleAdd}>
        add
      </button>
      <ul>
        {edges.map((edge) => (
          <SchemeEdgesItemMemo
            key={edge.id}
            edge={edge}
            nodes={nodes}
            setEdges={setEdges}
          />
        ))}
      </ul>
    </div>
  );
};

export default SchemeEdges;
