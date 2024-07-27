import scss from "./schemePage.module.scss";

import { useCallback, useRef, useState } from "react";

import Scheme from "./scheme/Scheme";
import { ISchemeEdge, ISchemeNode } from "./scheme/utils/types";

const NODES: ISchemeNode[] = [
  { id: "001", x: 50, y: 140 },
  { id: "002", x: 50, y: 260 },
  { id: "003", x: 300, y: 160 },
];

const EDGES: ISchemeEdge[] = [["001", "003"]];

const SchemePage = () => {
  const [nodes, setNodes] = useState(NODES);
  const [edges, setEdges] = useState(EDGES);
  const [selected, setSelected] = useState<ISchemeNode>();
  const addedEdge = useRef<ISchemeNode>();

  const add = useCallback(() => {
    setNodes((prev) =>
      prev.concat({ id: Math.random().toString(16).slice(-8), x: 20, y: 20 })
    );
  }, []);

  const remove = useCallback(() => {
    // TODO: remove edges
    setNodes((prev) => prev.filter((n) => n.id !== selected?.id));
  }, [selected?.id]);

  const addEdge = useCallback(() => {
    addedEdge.current = selected;
    setSelected(undefined);
  }, [selected]);

  const save = useCallback(() => {
    console.log(nodes);
  }, [nodes]);

  const selectNode = useCallback((node: ISchemeNode) => {
    if (addedEdge.current?.id)
      setEdges((prev) => [...prev, [String(addedEdge.current?.id), node.id]]);
    setSelected((prev) => {
      if (prev?.id === node.id) {
        addedEdge.current = undefined;
        return undefined;
      }
      {
        return node;
      }
    });
  }, []);

  return (
    <>
      <h1>Scheme page</h1>
      <section className={scss.section}>
        <div>
          <h2>scheme graph</h2>
          <div className={scss.buttons}>
            <button type="button" onClick={add}>
              add
            </button>
            <button type="button" onClick={remove} disabled={!selected}>
              delete
            </button>
            <button type="button" onClick={addEdge} disabled={!selected}>
              add edge
            </button>
            <button type="button" onClick={save}>
              save
            </button>
          </div>
        </div>
        <Scheme
          edges={edges}
          nodes={nodes}
          selected={selected}
          selectNode={selectNode}
          className={scss.scheme}
        />
      </section>
    </>
  );
};

export default SchemePage;
