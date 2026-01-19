import { create } from "zustand";
import { socketManager } from "../utils/socketManagment";
import { get } from "https";

export type Shape =
  | {
      type: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: "circle";
      x: number;
      y: number;
      radius: number;
};

interface CanvasStore {
  shapes: Shape[];
  setShapes: (shapes: Shape[]) => void;
  addShape: (shape: Shape) => void;
};

export const useCanvasStore = create<CanvasStore>((set, get) => ({
  shapes: [],

  setShapes: (shapes) => set({ shapes }),

  addShape: (shape) =>{
    const newShapes = [...get().shapes, shape];
    set((state) => ({
      shapes: [...state.shapes, shape],
    })),
    socketManager.sendShapes(newShapes);
    }
}));
