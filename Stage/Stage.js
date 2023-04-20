/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("backdrop2", "./Stage/costumes/backdrop2.svg", { x: 0, y: 0 })
    ];

    this.sounds = [new Sound("pop", "./Stage/sounds/pop.wav")];

    this.triggers = [];

    this.vars.phosphorousSulfurous = 0;
    this.vars.moveSpeed = 4.029326300926895e-147;
    this.vars.rotationSpeed = 4.588674373323873e-146;
    this.vars.xPosition = 9.89838476690047;
    this.vars.yPosition = 7.801300915567502;
    this.vars.directionX = -0.2868032327;
    this.vars.directionY = -0.9579895123;
    this.vars.planeX = -0.632273078118;
    this.vars.planeY = 0.18929013358200003;
    this.vars.actualResolution = 6;
    this.vars.height = 300;
    this.vars.resolution = 10;
    this.vars.dir = 793.3333333333302;
    this.vars.fov = 0.66;
    this.vars.fpsLimit = 0;
    this.vars.dynamicMode = 0;
    this.vars.x = -240;
    this.vars.brightness = 150;
    this.vars.directionXOld = -0.2868032327;
    this.vars.planeXOld = -0.632273078118;
    this.vars.distanceXDelta = 1.0599374696991264;
    this.vars.distanceYDelta = 3.016504822368911;
    this.vars.wallFound = 1;
    this.vars.stepX = -1;
    this.vars.sideXDistance = 6.251926638340126;
    this.vars.stepY = -1;
    this.vars.sideYDistance = 5.433705269099468;
    this.vars.mapX = 4;
    this.vars.side = 0;
    this.vars.mapY = 6;
    this.vars.mapXy = 2;
    this.vars.perpendicularWallDistance = 3.053781083573724;
    this.vars.lineHeight = 98.23886905767371;
    this.vars.drawStart = -49.119434528836855;
    this.vars.drawEnd = 49.119434528836855;
    this.vars.fps = 24;
    this.vars.counter = 9;
    this.vars.ancientfps = 24;
    this.vars.veryoldfps = 24;
    this.vars.olderfps = 26;
    this.vars.oldFps = 24;
    this.vars.mxv = 0;
    this.vars.mkey = 0;
    this.vars.mousemode = 0;
    this.vars.nx = 0;
    this.vars.cameraX = 2.0833333333333335;
    this.vars.rayXPosition = 9.898391949588117;
    this.vars.rayYPosition = 7.801324907159369;
    this.vars.rayXDirection = -1.6040416177625003;
    this.vars.rayYDirection = -0.5636270829124999;
    this.vars.oldRes = 10;
    this.vars.olderres = 10;
    this.vars.speedofpc = 0;
    this.vars.testLength = 0;
    this.vars.fpsresolution = 24;
    this.vars.oldfpsresolution = 24;
    this.vars.horrificpc = 0;
    this.vars.strafed = 0;

    this.watchers.fpsLimit = new Watcher({
      label: "FPS Limit",
      style: "normal",
      visible: false,
      value: () => this.vars.fpsLimit,
      x: 245,
      y: 175
    });
    this.watchers.dynamicMode = new Watcher({
      label: "dynamic mode?",
      style: "normal",
      visible: false,
      value: () => this.vars.dynamicMode,
      x: 245,
      y: 175
    });
    this.watchers.testLength = new Watcher({
      label: "Test Length",
      style: "normal",
      visible: false,
      value: () => this.vars.testLength,
      x: 240,
      y: 180
    });
  }
}
