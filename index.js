import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Drawing from "./Drawing/Drawing.js";
import Text from "./Text/Text.js";
import FpsCounter from "./FpsCounter/FpsCounter.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Drawing: new Drawing({
    x: 250,
    y: 58.94332143460422,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 1
  }),
  Text: new Text({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 2
  }),
  FpsCounter: new FpsCounter({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 13,
    size: 100,
    visible: true,
    layerOrder: 3
  })
};

const project = new Project(stage, sprites, {
  frameRate: 30 // Set to 60 to make your project run faster
});
export default project;
