import { IFromInputs } from "../interfaces";

export const FromInputs: IFromInputs[] = [
  {
    id: "gain1",
    name: "gain1",
    type: "number",
    label: "gain for link 1",
    rank: 1,
  },
  {
    id: "gain2",
    name: "gain2",
    type: "number",
    label: "gain for link 2",
    rank: 2,
  },
  {
    id: "gain3",
    name: "gain3",
    type: "number",
    label: "gain for link 3",
    rank: 3,
  },
  {
    id: "gain4",
    name: "gain4",
    type: "number",
    label: "gain for link 4",
    rank: 4,
  },
  {
    id: "gain5",
    name: "gain5",
    type: "number",
    label: "gain for link 5",
    rank: 5,
  },
  {
    id: "gain6",
    name: "gain6",
    type: "number",
    label: "gain for link 6",
    rank: 6,
  },
  {
    id: "gain7",
    name: "gain7",
    type: "number",
    label: "gain for link 7",
    rank: 7,
  },
  {
    id: "gain8",
    name: "gain8",
    type: "number",
    label: "gain for link 8",
    rank: 8,
  },
  {
    id: "gain9",
    name: "gain9",
    type: "number",
    label: "gain for link 9",
    rank: 9,
  },
  {
    id: "gain10",
    name: "gain10",
    type: "number",
    label: "gain for link 10",
    rank: 10,
  },
];

export const defaultFromInputs: { [key: string]: string } = {
  // ! keys must be same as inputs names is
  gain1: "",
  gain2: "",
  gain3: "",
  gain4: "",
  gain5: "",
  gain6: "",
  gain7: "",
  gain8: "",
  gain9: "",
  gain10: "",
};

export const gainColors = [
  "bg-red-500",
  "bg-green-300",
  "bg-green-400",
  "bg-green-500",
  "bg-green-600",
  "bg-green-700",
  "bg-green-800/95",
  "bg-green-900/95",
  "bg-green-900",
  "bg-green-950/90",
];
