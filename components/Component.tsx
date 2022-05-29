import Matter, { Body, World } from "matter-js";
import React from "react";
import { View } from "react-native";

interface ComponentProps {
  world: World;
  label?: string;
  color: string;
  pos: { x: number; y: number };
  size: { width: number; height: number };
  componentToRender: React.ReactNode;
  isStatic?: boolean;
}

const Component = ({
  world,
  label,
  color,
  pos,
  size,
  componentToRender,
  isStatic,
}: ComponentProps) => {
  const initialObstacle = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { label, isStatic }
  );
  Matter.World.add(world, initialObstacle);

  return {
    body: initialObstacle,
    color,
    pos,
    renderer: componentToRender,
    point: false,
  };
};

export default Component;
