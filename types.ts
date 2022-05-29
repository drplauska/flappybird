import { Body } from "matter-js";
import entities from "./entities";

export interface ComponentData {
  body: Body;
  color: string;
}

export type EntitiesType = ReturnType<typeof entities>;
