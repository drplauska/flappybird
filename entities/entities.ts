import Matter from "matter-js";
import Bird from "../components/Bird";
import Floor from "../components/Floor";
import Obstacle from "../components/Obstacle";
import { getPipeSizePosPair } from "../utils/random";
import windowSize from "../utils/windowSize";
import Component from "../components/Component";

const entities = () => {
  let engine = Matter.Engine.create({
    enableSleeping: false,
    gravity: { y: 0.5 },
  });

  let world = engine.world;

  const pipeSizePosA = getPipeSizePosPair();
  const pipeSizePosB = getPipeSizePosPair(windowSize.width);

  return {
    physics: { engine, world },
    Bird: Component({
      world,
      color: "green",
      pos: { x: 50, y: 200 },
      size: { height: 40, width: 40 },
      componentToRender: Bird,
    }),

    ObstacleTop1: Component({
      world,
      label: "ObstacleTop1",
      color: "red",
      pos: pipeSizePosA.pipeTop.pos,
      size: pipeSizePosA.pipeTop.size,
      componentToRender: Obstacle,
      isStatic: true,
    }),
    ObstacleBottom1: Component({
      world,
      label: "ObstacleBottom1",
      color: "red",
      pos: pipeSizePosA.pipeBottom.pos,
      size: pipeSizePosA.pipeBottom.size,
      componentToRender: Obstacle,
      isStatic: true,
    }),

    ObstacleTop2: Component({
      world,
      label: "ObstacleTop2",
      color: "red",
      pos: pipeSizePosB.pipeTop.pos,
      size: pipeSizePosB.pipeTop.size,
      componentToRender: Obstacle,
      isStatic: true,
    }),
    ObstacleBottom2: Component({
      world,
      label: "ObstacleBottom2",
      color: "red",
      pos: pipeSizePosB.pipeBottom.pos,
      size: pipeSizePosB.pipeBottom.size,
      componentToRender: Obstacle,
      isStatic: true,
    }),

    Floor: Component({
      world,
      color: "green",
      pos: { x: windowSize.width / 2, y: windowSize.height },
      size: { height: 50, width: windowSize.width },
      componentToRender: Floor,
      isStatic: true,
    }),
  };
};

export default entities;
