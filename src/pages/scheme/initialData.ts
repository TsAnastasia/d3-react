import {
  NODE_HEIGHT,
  NODE_STEP_X,
  NODE_STEP_Y,
  NODE_WIDTH,
  OFFFSET_X,
  OFFFSET_Y,
} from "./scheme/Scheme";
import { ISchemeDataEdge, ISchemeNode } from "./scheme/utils/types";

export const NODES: ISchemeNode[] = [
  { id: "001", x: OFFFSET_X, y: OFFFSET_Y },
  { id: "002", x: OFFFSET_X + NODE_WIDTH + NODE_STEP_X, y: OFFFSET_Y },
  {
    id: "003",
    x: OFFFSET_X + NODE_WIDTH + NODE_STEP_X,
    y: OFFFSET_Y + NODE_HEIGHT + NODE_STEP_Y,
  },
  {
    id: "004",
    x: OFFFSET_X + NODE_WIDTH + NODE_STEP_X,
    y: OFFFSET_Y + 2 * (NODE_HEIGHT + NODE_STEP_Y),
  },
  { id: "005", x: OFFFSET_X + 2 * (NODE_WIDTH + NODE_STEP_X), y: OFFFSET_Y },
  {
    id: "006",
    x: OFFFSET_X + 2 * (NODE_WIDTH + NODE_STEP_X),
    y: OFFFSET_Y + (NODE_HEIGHT + NODE_STEP_Y),
  },
  {
    id: "007",
    x: OFFFSET_X + 2 * (NODE_WIDTH + NODE_STEP_X),
    y: OFFFSET_Y + 2 * (NODE_HEIGHT + NODE_STEP_Y),
  },
  { id: "008", x: OFFFSET_X + 3 * (NODE_WIDTH + NODE_STEP_X), y: OFFFSET_Y },
];

export const EDGES: ISchemeDataEdge[] = [
  ["001", "002"],
  ["001", "003", "3"],
  ["001", "004"],
  ["003", "005"],
  ["003", "006"],
  ["004", "007"],
  ["005", "008", "4"],
  ["006", "008"],
];
