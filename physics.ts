import Matter from "matter-js";
import { getPipeSizePosPair } from "./utils/random";
import windowSize from "./utils/windowSize";
import { GameEngineUpdateEventOptionType } from "react-native-game-engine";
import { EntitiesType } from "./types";

const Physics = (
  entities: EntitiesType,
  { touches, time, dispatch }: GameEngineUpdateEventOptionType
) => {
  let engine = entities.physics.engine;

  touches
    .filter(({ type }) => type === "press")
    .forEach(() => {
      Matter.Body.setVelocity(entities.Bird.body, {
        x: 0,
        y: -4,
      });
    });

  Matter.Engine.update(engine, time.delta);

  const obstacles = [
    // make single source of truth
    { top: "ObstacleTop1", bottom: "ObstacleBottom1" },
    { top: "ObstacleTop2", bottom: "ObstacleBottom2" },
  ] as const;

  obstacles.forEach((obstacle) => {
    const topEntity = entities[obstacle.top];
    const bottomEntity = entities[obstacle.bottom];

    if (topEntity.body.bounds.max.x <= 50 && !topEntity.point) {
      topEntity.point = true;
      dispatch({ type: "new_point" });
    }

    if (topEntity.body.bounds.max.x <= 0) {
      topEntity.point = false;
      const pipeSizePos = getPipeSizePosPair(windowSize.width * 0.9);
      Matter.Body.setPosition(topEntity.body, pipeSizePos.pipeTop.pos);
      Matter.Body.setPosition(bottomEntity.body, pipeSizePos.pipeBottom.pos);
    }

    Matter.Body.translate(topEntity.body, {
      x: -3,
      y: 0,
    });
    Matter.Body.translate(bottomEntity.body, {
      x: -3,
      y: 0,
    });
  });

  for (let index = 1; index <= 2; index++) {}

  Matter.Events.on(engine, "collisionStart", () => {
    dispatch({ type: "game_over" });
  });

  return entities;
};

export default Physics;
