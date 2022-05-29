import windowSize from "./windowSize";

export const getRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getPipeSizePosPair = (addToPosX = 0) => {
  let yPosTop = -getRandom(300, windowSize.height - 100);

  const pipeTop = {
    pos: { x: windowSize.width + addToPosX, y: yPosTop },
    size: { height: windowSize.height * 2, width: 75 },
  };

  const pipeBottom = {
    pos: {
      x: windowSize.width + addToPosX,
      y: windowSize.height * 2 + 200 + yPosTop,
    },
    size: { height: windowSize.height * 2, width: 75 },
  };

  return { pipeTop, pipeBottom };
};
