import scss from "./schemePage.module.scss";

import { useCallback, useState } from "react";

import SchemeEdges from "./edges/SchemeEdges";
import Scheme from "./scheme/Scheme";
import {
  ISchemeDataEdge,
  ISchemeEdge,
  ISchemeNode,
  SCHEME_EDGE_TYPES,
} from "./scheme/utils/types";

const NODES: ISchemeNode[] = [
  { id: "001", x: 50, y: 140 },
  { id: "002", x: 50, y: 260 },
  { id: "003", x: 300, y: 160 },
];

const EDGES: ISchemeDataEdge[] = [["001", "003"]];

const formatEdge = (
  edges: ISchemeDataEdge[],
  nodes: ISchemeNode[]
): ISchemeEdge[] =>
  edges.map(([source, target, type]) => ({
    id: Math.random().toString(16).slice(-8),
    source: nodes.find((n) => n.id === source),
    target: nodes.find((n) => n.id === target),
    type: type || SCHEME_EDGE_TYPES[0],
  }));

const SchemePage = () => {
  const [nodes, setNodes] = useState(NODES);
  const [edges, setEdges] = useState<ISchemeEdge[]>(() =>
    formatEdge(EDGES, NODES)
  );
  const [selected, setSelected] = useState<ISchemeNode>();

  const add = useCallback(() => {
    setNodes((prev) =>
      prev.concat({ id: Math.random().toString(16).slice(-8), x: 20, y: 20 })
    );
  }, []);

  const remove = useCallback(() => {
    // TODO: remove edges
    setNodes((prev) => prev.filter((n) => n.id !== selected?.id));
  }, [selected?.id]);

  const save = useCallback(() => {
    console.log(nodes);
  }, [nodes]);

  const selectNode = useCallback(
    (node: ISchemeNode) =>
      setSelected((prev) => (prev?.id === node.id ? undefined : node)),
    []
  );

  return (
    <>
      <h1>Scheme page</h1>
      <section>
        <div className={scss.section}>
          <div>
            <h2>scheme graph</h2>
            <div className={scss.buttons}>
              <button type="button" onClick={add}>
                add
              </button>
              <button type="button" onClick={remove} disabled={!selected}>
                delete
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
        </div>

        <div className={scss.section}>
          <SchemeEdges edges={edges} nodes={nodes} setEdges={setEdges} />
        </div>
      </section>
    </>
  );
};

export default SchemePage;
