/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Drawing extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Drawing/costumes/costume1.png", {
        x: 480,
        y: 360
      })
    ];

    this.sounds = [new Sound("pop", "./Drawing/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "start" }, this.whenIReceiveStart),
      new Trigger(
        Trigger.BROADCAST,
        { name: "stress test" },
        this.whenIReceiveStressTest
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "rendertick" },
        this.whenIReceiveRendertick
      )
    ];

    this.vars.worldMap = [
      "11111111111111111111",
      "11111100000000000001",
      "11111101111111010101",
      "22000202000002020202",
      "19000001000001010101",
      "10000001000101010101",
      "10000000000101000101",
      "10000000000101000101",
      "10000000000001010001",
      "10000000000001010001",
      "10000000000000000001",
      "11111111111111111111"
    ];
  }

  *setUpVariables() {
    if (!(1 === this.toNumber(1 === 1))) {
      this.stage.vars.phosphorousSulfurous = 3;
    } else {
      this.stage.vars.phosphorousSulfurous = 0;
    }
    this.stage.vars.mousemode = 0;
    this.stage.vars.moveSpeed = 1;
    this.stage.vars.rotationSpeed = 0;
    this.stage.vars.xPosition = 11;
    this.stage.vars.yPosition = 7;
    this.stage.vars.directionX = -1;
    this.stage.vars.directionY = 0;
    this.stage.vars.planeX = 0;
    this.stage.vars.planeY = 0.66;
    this.stage.vars.actualResolution = 1;
    this.stage.vars.height = 300;
    this.stage.vars.resolution = 4;
    this.stage.vars.dir = 0;
    this.stage.vars.fov = 0.66;
  }

  *whenGreenFlagClicked() {
    this.stage.vars.fps = -5;
    this.stage.vars.speedofpc = 5;
    this.stage.watchers.fpsLimit.visible = true;
    this.stage.watchers.dynamicMode.visible = true;
    this.clearPen();
    this.stage.costume = "backdrop1";
    while (!this.keyPressed("space")) {
      yield;
    }
    this.stage.costume = "backdrop2";
    this.stage.watchers.fpsLimit.visible = false;
    this.stage.watchers.dynamicMode.visible = false;
    this.stage.watchers.testLength.visible = false;
    this.broadcast("start");
  }

  *raycast() {
    this.stage.vars.x = -240;
    this.stage.vars.olderres = this.stage.vars.oldRes;
    this.stage.vars.oldRes = this.stage.vars.resolution;
    if (this.toNumber(this.stage.vars.dynamicMode) === 1) {
      if (this.compare(this.stage.vars.speedofpc, 5) > 0) {
        this.stage.vars.resolution = Math.floor(
          0 -
            ((Math.abs(this.toNumber(this.stage.vars.moveSpeed)) * 11) /
              this.toNumber(this.stage.vars.speedofpc) +
              (Math.abs(this.toNumber(this.stage.vars.rotationSpeed)) * 2) /
                this.toNumber(this.stage.vars.speedofpc)) +
            (this.toNumber(this.stage.vars.fpsresolution) -
              this.toNumber(this.stage.vars.oldfpsresolution) / 2) /
              5 +
            (this.toNumber(this.stage.vars.phosphorousSulfurous) - 1) +
            (this.toNumber(this.stage.vars.speedofpc) + 0)
        );
      } else {
        this.stage.vars.resolution = Math.ceil(
          0 -
            (Math.abs(this.toNumber(this.stage.vars.moveSpeed)) * 10 +
              Math.abs(this.toNumber(this.stage.vars.rotationSpeed)) * 4) +
            (this.toNumber(this.stage.vars.fpsresolution) -
              this.toNumber(this.stage.vars.oldfpsresolution) / 2) /
              3 +
            (this.toNumber(this.stage.vars.phosphorousSulfurous) - 1) +
            this.toNumber(this.stage.vars.speedofpc)
        );
      }
    }
    if (this.compare(this.stage.vars.resolution, 12) > 0) {
      this.stage.vars.resolution = 12;
    }
    this.warp(this.readkeys)();
    if (
      !(
        this.compare(
          Math.abs(this.toNumber(this.stage.vars.moveSpeed)),
          0.0001
        ) < 0 &&
        this.compare(
          Math.abs(this.toNumber(this.stage.vars.rotationSpeed)),
          0.0001
        ) < 0
      ) ||
      !(
        this.compare(this.stage.vars.resolution, this.stage.vars.olderres) === 0
      ) ||
        this.toNumber(this.stage.vars.strafed) === 1
    ) {
      this.clearPen();
      while (
        !(
          this.compare(
            this.stage.vars.x,
            242 + this.toNumber(this.stage.vars.resolution)
          ) > 0
        )
      ) {
        this.penDown = false;
        this.penSize = 1;
        /* TODO: Implement pen_setPenShadeToNumber */ null;
        this.stage.vars.cameraX = (2 * this.toNumber(this.stage.vars.x)) / 240;
        this.stage.vars.rayXPosition = this.stage.vars.xPosition;
        this.stage.vars.rayYPosition = this.stage.vars.yPosition;
        this.stage.vars.rayXDirection =
          this.toNumber(this.stage.vars.directionX) +
          this.toNumber(this.stage.vars.planeX) *
            this.toNumber(this.stage.vars.cameraX);
        this.stage.vars.rayYDirection =
          this.toNumber(this.stage.vars.directionY) +
          this.toNumber(this.stage.vars.planeY) *
            this.toNumber(this.stage.vars.cameraX);
        this.stage.vars.mapX = Math.floor(
          this.toNumber(this.stage.vars.rayXPosition)
        );
        this.stage.vars.mapY = Math.floor(
          this.toNumber(this.stage.vars.rayYPosition)
        );
        this.warp(this.caculateWalls)();
        this.warp(this.drawCeiling)();
        this.warp(this.drawFloor)();
        this.warp(this.drawWalls)();
        if (!(this.compare(this.stage.vars.resolution, 13) > 0)) {
          this.stage.vars.x +=
            this.toNumber(this.stage.vars.actualResolution) / (1.2 + 0);
        } else {
          if (!(this.compare(this.stage.vars.resolution, 14) > 0)) {
            this.stage.vars.x +=
              this.toNumber(this.stage.vars.actualResolution) / (1.4 + 0);
          } else {
            this.stage.vars.x +=
              this.toNumber(this.stage.vars.actualResolution) / (1.8 + 0);
          }
        }
      }
    }
  }

  *drawWalls() {
    if (
      this.toNumber(
        this.letterOf(
          this.itemOf(this.vars.worldMap, this.stage.vars.mapX - 1),
          this.stage.vars.mapY - 1
        )
      ) === 1
    ) {
      this.penColor = Color.rgb(238, 125, 22);
    }
    if (
      this.toNumber(
        this.letterOf(
          this.itemOf(this.vars.worldMap, this.stage.vars.mapX - 1),
          this.stage.vars.mapY - 1
        )
      ) === 2
    ) {
      this.penColor = Color.rgb(44, 165, 226);
    }
    if (this.toNumber(this.stage.vars.side) === 1) {
      this.stage.vars.brightness = 115;
    } else {
      this.stage.vars.brightness = 150;
    }
    this.goto(
      this.toNumber(this.stage.vars.x),
      this.toNumber(this.stage.vars.drawStart)
    );
    /* TODO: Implement pen_setPenShadeToNumber */ null;
    this.penSize =
      this.toNumber(this.stage.vars.actualResolution) -
      this.toNumber(this.stage.vars.perpendicularWallDistance) / 48 +
      this.toNumber(this.stage.vars.phosphorousSulfurous);
    this.penDown = true;
    this.goto(
      this.toNumber(this.stage.vars.x),
      1 * (this.toNumber(this.stage.vars.drawEnd) / 5)
    );
    /* TODO: Implement pen_changePenShadeBy */ null;
    this.goto(
      this.toNumber(this.stage.vars.x),
      1.2 * this.toNumber(this.stage.vars.drawEnd)
    );
    this.penDown = false;
    this.penSize = 1;
    /* TODO: Implement pen_setPenShadeToNumber */ null;
  }

  *move2(speed) {
    this.stage.vars.directionXOld = this.stage.vars.directionX;
    this.stage.vars.directionX =
      0 - Math.cos(this.degToRad(this.toNumber(this.stage.vars.dir)));
    this.stage.vars.directionY =
      0 - Math.sin(this.degToRad(this.toNumber(this.stage.vars.dir)));
    this.stage.vars.planeXOld = this.stage.vars.planeX;
    this.stage.vars.planeX =
      (0 - Math.sin(this.degToRad(this.toNumber(this.stage.vars.dir)))) *
      this.toNumber(this.stage.vars.fov);
    this.stage.vars.planeY =
      Math.cos(this.degToRad(this.toNumber(this.stage.vars.dir))) *
      this.toNumber(this.stage.vars.fov);
    if (
      this.toNumber(
        this.letterOf(
          this.itemOf(
            this.vars.worldMap,
            Math.floor(
              this.toNumber(this.stage.vars.xPosition) +
                this.toNumber(this.stage.vars.directionX) *
                  this.toNumber(this.stage.vars.moveSpeed)
            ) - 1
          ),
          Math.floor(this.toNumber(this.stage.vars.yPosition)) - 1
        )
      ) === 0
    ) {
      this.stage.vars.xPosition +=
        this.toNumber(this.stage.vars.directionX) *
        this.toNumber(this.stage.vars.moveSpeed);
    }
    if (
      this.toNumber(
        this.letterOf(
          this.itemOf(
            this.vars.worldMap,
            Math.floor(this.toNumber(this.stage.vars.xPosition)) - 1
          ),
          Math.floor(
            this.toNumber(this.stage.vars.yPosition) +
              this.toNumber(this.stage.vars.directionY) *
                this.toNumber(this.stage.vars.moveSpeed)
          ) - 1
        )
      ) === 0
    ) {
      this.stage.vars.yPosition +=
        this.toNumber(this.stage.vars.directionY) *
        this.toNumber(this.stage.vars.moveSpeed);
    }
  }

  *rotate(speed) {
    this.stage.vars.dir += this.toNumber(speed);
    this.stage.vars.directionXOld = this.stage.vars.directionX;
    this.stage.vars.directionX =
      0 - Math.cos(this.degToRad(this.toNumber(this.stage.vars.dir)));
    this.stage.vars.directionY =
      0 - Math.sin(this.degToRad(this.toNumber(this.stage.vars.dir)));
    this.stage.vars.planeXOld = this.stage.vars.planeX;
    this.stage.vars.planeX =
      (0 - Math.sin(this.degToRad(this.toNumber(this.stage.vars.dir)))) *
      this.toNumber(this.stage.vars.fov);
    this.stage.vars.planeY =
      Math.cos(this.degToRad(this.toNumber(this.stage.vars.dir))) *
      this.toNumber(this.stage.vars.fov);
  }

  *drawFloor() {
    this.penColor = Color.rgb(14, 154, 108);
    this.goto(
      this.toNumber(this.stage.vars.x),
      this.toNumber(this.stage.vars.drawStart)
    );
    this.penSize =
      this.toNumber(this.stage.vars.actualResolution) -
      this.toNumber(this.stage.vars.perpendicularWallDistance) / 48 +
      this.toNumber(this.stage.vars.phosphorousSulfurous);
    this.penDown = true;
    this.goto(this.toNumber(this.stage.vars.x), -240);
    this.penDown = false;
    this.penSize = 1;
    /* TODO: Implement pen_setPenShadeToNumber */ null;
  }

  *caculateWalls() {
    this.stage.vars.distanceXDelta = Math.sqrt(
      1 +
        (this.toNumber(this.stage.vars.rayYDirection) *
          this.toNumber(this.stage.vars.rayYDirection)) /
          (this.toNumber(this.stage.vars.rayXDirection) *
            this.toNumber(this.stage.vars.rayXDirection))
    );
    this.stage.vars.distanceYDelta = Math.sqrt(
      1 +
        (this.toNumber(this.stage.vars.rayXDirection) *
          this.toNumber(this.stage.vars.rayXDirection)) /
          (this.toNumber(this.stage.vars.rayYDirection) *
            this.toNumber(this.stage.vars.rayYDirection))
    );
    this.stage.vars.wallFound = 0;
    if (this.compare(this.stage.vars.rayXDirection, 0) < 0) {
      this.stage.vars.stepX = -1;
      this.stage.vars.sideXDistance =
        (this.toNumber(this.stage.vars.rayXPosition) -
          this.toNumber(this.stage.vars.mapX)) *
        this.toNumber(this.stage.vars.distanceXDelta);
    } else {
      this.stage.vars.stepX = 1;
      this.stage.vars.sideXDistance =
        (this.toNumber(this.stage.vars.mapX) +
          1 -
          this.toNumber(this.stage.vars.rayXPosition)) *
        this.toNumber(this.stage.vars.distanceXDelta);
    }
    if (this.compare(this.stage.vars.rayYDirection, 0) < 0) {
      this.stage.vars.stepY = -1;
      this.stage.vars.sideYDistance =
        (this.toNumber(this.stage.vars.rayYPosition) -
          this.toNumber(this.stage.vars.mapY)) *
        this.toNumber(this.stage.vars.distanceYDelta);
    } else {
      this.stage.vars.stepY = 1;
      this.stage.vars.sideYDistance =
        (this.toNumber(this.stage.vars.mapY) +
          1 -
          this.toNumber(this.stage.vars.rayYPosition)) *
        this.toNumber(this.stage.vars.distanceYDelta);
    }
    while (!(this.toNumber(this.stage.vars.wallFound) === 1)) {
      if (
        this.compare(
          this.stage.vars.sideXDistance,
          this.stage.vars.sideYDistance
        ) < 0
      ) {
        this.stage.vars.sideXDistance += this.toNumber(
          this.stage.vars.distanceXDelta
        );
        this.stage.vars.mapX += this.toNumber(this.stage.vars.stepX);
        this.stage.vars.side = 0;
      } else {
        this.stage.vars.sideYDistance += this.toNumber(
          this.stage.vars.distanceYDelta
        );
        this.stage.vars.mapY += this.toNumber(this.stage.vars.stepY);
        this.stage.vars.side = 1;
      }
      this.stage.vars.mapXy = this.letterOf(
        this.itemOf(this.vars.worldMap, this.stage.vars.mapX - 1),
        this.stage.vars.mapY - 1
      );
      if (this.compare(this.stage.vars.mapXy, 0) > 0) {
        this.stage.vars.wallFound = 1;
      }
    }
    if (this.toNumber(this.stage.vars.side) === 0) {
      this.stage.vars.perpendicularWallDistance = Math.abs(
        (this.toNumber(this.stage.vars.mapX) -
          this.toNumber(this.stage.vars.rayXPosition) +
          (1 - this.toNumber(this.stage.vars.stepX)) / 2) /
          this.toNumber(this.stage.vars.rayXDirection)
      );
    } else {
      this.stage.vars.perpendicularWallDistance = Math.abs(
        (this.toNumber(this.stage.vars.mapY) -
          this.toNumber(this.stage.vars.rayYPosition) +
          (1 - this.toNumber(this.stage.vars.stepY)) / 2) /
          this.toNumber(this.stage.vars.rayYDirection)
      );
    }
    this.stage.vars.lineHeight = Math.abs(
      this.toNumber(this.stage.vars.height) /
        this.toNumber(this.stage.vars.perpendicularWallDistance)
    );
    this.stage.vars.drawStart =
      (0 - this.toNumber(this.stage.vars.lineHeight)) / 2;
    this.stage.vars.drawEnd = this.toNumber(this.stage.vars.lineHeight) / 2;
  }

  *whenIReceiveStart() {
    this.stage.vars.fps = 0;
    if (this.toNumber(this.stage.vars.dynamicMode) === 0) {
      this.broadcast("stress test");
    } else {
      null;
    }
    yield* this.setUpVariables();
    this.stage.vars.speedofpc = 0;
    while (true) {
      this.penDown = false;
      this.penSize = 1;
      this.visible = false;
      this.stage.vars.actualResolution =
        (this.toNumber(this.stage.vars.resolution) - 16) * -1;
      yield* this.raycast();
      this.stage.vars.counter++;
      if (this.compare(this.timer, 1) > 0) {
        this.restartTimer();
        if (this.compare(this.stage.vars.counter, 40) > 0) {
          this.stage.vars.oldfpsresolution = this.stage.vars.fpsresolution;
          this.stage.vars.fpsresolution = 40;
          this.stage.vars.ancientfps = this.stage.vars.veryoldfps;
          this.stage.vars.veryoldfps = this.stage.vars.olderfps;
          this.stage.vars.olderfps = this.stage.vars.oldFps;
          this.stage.vars.oldFps = this.stage.vars.fps;
          this.stage.vars.fps = this.stage.vars.counter;
        } else {
          this.stage.vars.oldfpsresolution = this.stage.vars.fpsresolution;
          this.stage.vars.fpsresolution = this.stage.vars.counter;
          this.stage.vars.ancientfps = this.stage.vars.veryoldfps;
          this.stage.vars.veryoldfps = this.stage.vars.olderfps;
          this.stage.vars.olderfps = this.stage.vars.oldFps;
          this.stage.vars.oldFps = this.stage.vars.fps;
          this.stage.vars.fps = this.stage.vars.counter;
        }
        this.stage.vars.counter = 0;
      }
      if (this.toNumber(this.stage.vars.dynamicMode) === 1) {
        if (this.compare(30, this.stage.vars.fps) < 0 && !null) {
          this.stage.vars.speedofpc += 0.1;
        } else {
          if (this.compare(this.stage.vars.fps, 25) < 0) {
            this.stage.vars.speedofpc -= 0.1;
          }
        }
      } else {
        null;
      }
      if (this.compare(this.stage.vars.speedofpc, 7) > 0) {
        this.stage.vars.speedofpc = 7;
      }
      if (this.compare(-7, this.stage.vars.speedofpc) > 0) {
        this.stage.vars.speedofpc = -7;
      }
      yield;
    }
  }

  *whenIReceiveStressTest() {
    yield* this.stressTest();
  }

  *readkeys() {
    this.stage.vars.strafed = 0;
    this.stage.vars.mxv = 0;
    if (this.keyPressed("m")) {
      if (this.toNumber(this.stage.vars.mkey) === 0) {
        this.stage.vars.mkey = 1;
        if (this.toNumber(this.stage.vars.mousemode) === 1) {
          this.stage.vars.mousemode = 0;
        } else {
          this.stage.vars.mousemode = 1;
        }
      }
    } else {
      this.stage.vars.mkey = 0;
    }
    if (this.keyPressed("w")) {
      this.stage.vars.moveSpeed += 0.1;
    }
    if (this.keyPressed("s")) {
      this.stage.vars.moveSpeed -= 0.1;
    }
    if (this.toNumber(this.stage.vars.mousemode) === 0) {
      if (this.keyPressed("q") || this.keyPressed("e")) {
        if (this.keyPressed("q")) {
          this.warp(this.strafe)(-0.2);
          this.stage.vars.strafed = 1;
        } else {
          if (this.keyPressed("e")) {
            this.warp(this.strafe)(0.2);
            this.stage.vars.strafed = 1;
          }
        }
      } else {
        null;
      }
      if (this.keyPressed("a")) {
        this.stage.vars.rotationSpeed += 2.5;
      }
      if (this.keyPressed("d")) {
        this.stage.vars.rotationSpeed -= 2.5;
      }
    } else {
      if (this.keyPressed("a")) {
        this.warp(this.strafe)(-0.2);
      }
      if (this.keyPressed("d")) {
        this.warp(this.strafe)(0.2);
      }
      this.stage.vars.nx = 0;
      this.stage.vars.nx += 0.05 * (0 - this.mouse.x);
      if (this.mouse.down) {
        this.stage.vars.rotationSpeed = this.stage.vars.nx;
      }
    }
    this.stage.vars.rotationSpeed =
      0.7 * this.toNumber(this.stage.vars.rotationSpeed);
    this.stage.vars.moveSpeed = 0.7 * this.toNumber(this.stage.vars.moveSpeed);
    this.warp(this.move2)(10);
    this.warp(this.rotate)(this.stage.vars.rotationSpeed);
  }

  *strafe(s) {
    this.stage.vars.dir -= 90;
    this.stage.vars.directionX =
      0 - Math.cos(this.degToRad(this.toNumber(this.stage.vars.dir)));
    this.stage.vars.directionY =
      0 - Math.sin(this.degToRad(this.toNumber(this.stage.vars.dir)));
    this.stage.vars.planeXOld = this.stage.vars.planeX;
    this.stage.vars.planeX =
      (0 - Math.sin(this.degToRad(this.toNumber(this.stage.vars.dir)))) *
      this.toNumber(this.stage.vars.fov);
    this.stage.vars.planeY =
      Math.cos(this.degToRad(this.toNumber(this.stage.vars.dir))) *
      this.toNumber(this.stage.vars.fov);
    if (
      this.toNumber(
        this.letterOf(
          this.itemOf(
            this.vars.worldMap,
            Math.floor(
              this.toNumber(this.stage.vars.xPosition) +
                this.toNumber(this.stage.vars.directionX) * this.toNumber(s)
            ) - 1
          ),
          Math.floor(this.toNumber(this.stage.vars.yPosition)) - 1
        )
      ) === 0
    ) {
      this.stage.vars.xPosition +=
        this.toNumber(this.stage.vars.directionX) * this.toNumber(s);
    }
    if (
      this.toNumber(
        this.letterOf(
          this.itemOf(
            this.vars.worldMap,
            Math.floor(this.toNumber(this.stage.vars.xPosition)) - 1
          ),
          Math.floor(
            this.toNumber(this.stage.vars.yPosition) +
              this.toNumber(this.stage.vars.directionY) * this.toNumber(s)
          ) - 1
        )
      ) === 0
    ) {
      this.stage.vars.yPosition +=
        this.toNumber(this.stage.vars.directionY) * this.toNumber(s);
    }
    this.stage.vars.dir += 90;
    this.stage.vars.directionX =
      0 - Math.cos(this.degToRad(this.toNumber(this.stage.vars.dir)));
    this.stage.vars.directionY =
      0 - Math.sin(this.degToRad(this.toNumber(this.stage.vars.dir)));
    this.stage.vars.planeXOld = this.stage.vars.planeX;
    this.stage.vars.planeX =
      (0 - Math.sin(this.degToRad(this.toNumber(this.stage.vars.dir)))) * 10;
    this.stage.vars.planeY =
      Math.cos(this.degToRad(this.toNumber(this.stage.vars.dir))) *
      this.toNumber(this.stage.vars.fov);
  }

  *stressTest() {
    this.stage.vars.ancientfps = 0;
    this.stage.vars.veryoldfps = 0;
    this.stage.vars.olderfps = 0;
    this.stage.vars.oldFps = 0;
    this.stage.vars.fps = 0;
    this.stage.vars.resolution = 10;
    yield* this.wait(1);
    this.broadcast("stop stress test");
  }

  *whenIReceiveRendertick() {}

  *drawCeiling() {}
}
