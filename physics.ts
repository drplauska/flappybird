import Matter from "matter-js";
import { getPipeSizePosPair } from "./utils/random";
import { Dimensions } from "react-native";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const Physics = (entities, { touches, time, dispatch }) => {
  let engine = entities.physics.engine;

  touches
    .filter(({ type }) => type === "press")
    .forEach((touch) => {
      Matter.Body.setVelocity(entities.Bird.body, {
        x: 0,
        y: -8,
      });
    });

  Matter.Engine.update(engine, time.delta);

  for (let index = 1; index <= 2; index++) {
    const topBody = entities[`ObstacleTop${index}`].body;
    const bottomBody = entities[`ObstacleBottom${index}`].body;

    if (topBody.bounds.max.x <= 0) {
      const pipeSizePos = getPipeSizePosPair(windowWidth * 0.9);
      Matter.Body.setPosition(topBody, pipeSizePos.pipeTop.pos);
      Matter.Body.setPosition(bottomBody, pipeSizePos.pipeBottom.pos);
    }

    Matter.Body.translate(topBody, {
      x: -3,
      y: 0,
    });
    Matter.Body.translate(bottomBody, {
      x: -3,
      y: 0,
    });
  }

  return entities;
};

export default Physics;
