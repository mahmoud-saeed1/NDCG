import { ReactNode } from "react";

export interface IInputsModal {
  children?: ReactNode;
  title: string;
  isOpen: boolean;
  closeModal: () => void;
}

export interface IFromInputs {
  id: string;
  name: string;
  type: string;
  label: string;
  rank: number;
}
