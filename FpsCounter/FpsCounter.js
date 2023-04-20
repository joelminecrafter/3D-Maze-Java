/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class FpsCounter extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("1", "./FpsCounter/costumes/1.svg", { x: 248, y: 198 }),
      new Costume("2", "./FpsCounter/costumes/2.svg", { x: 248, y: 198 }),
      new Costume("3", "./FpsCounter/costumes/3.svg", { x: 248, y: 198 }),
      new Costume("4", "./FpsCounter/costumes/4.svg", { x: 248, y: 198 }),
      new Costume("5", "./FpsCounter/costumes/5.svg", { x: 248, y: 198 }),
      new Costume("6", "./FpsCounter/costumes/6.svg", { x: 248, y: 198 }),
      new Costume("7", "./FpsCounter/costumes/7.svg", { x: 248, y: 198 }),
      new Costume("8", "./FpsCounter/costumes/8.svg", { x: 248, y: 198 }),
      new Costume("9", "./FpsCounter/costumes/9.svg", { x: 248, y: 198 }),
      new Costume("0", "./FpsCounter/costumes/0.svg", { x: 248, y: 198 }),
      new Costume("-", "./FpsCounter/costumes/-.svg", { x: 237, y: 198 }),
      new Costume(".", "./FpsCounter/costumes/..svg", { x: 237, y: 198 }),
      new Costume("costume1", "./FpsCounter/costumes/costume1.png", {
        x: 0,
        y: 0
      })
    ];

    this.sounds = [new Sound("pop", "./FpsCounter/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];

    this.vars.numberOfDigits = 2;
  }

  *startAsClone() {
    this.visible = true;
    while (true) {
      this.x = -40 + 40 * this.toNumber(this.vars.numberOfDigits);
      this.costume = this.letterOf(
        this.stage.vars.fps,
        this.vars.numberOfDigits - 1
      );
      if (
        this.compare(
          this.toString(this.stage.vars.fps).length,
          this.vars.numberOfDigits
        ) < 0
      ) {
        this.deleteThisClone();
      }
      yield;
    }
  }

  *whenGreenFlagClicked() {
    this.visible = true;
    this.vars.numberOfDigits = 0;
    this.goto(0, 0);
    while (true) {
      if (
        this.compare(
          this.vars.numberOfDigits,
          this.toString(this.stage.vars.fps).length
        ) < 0
      ) {
        this.vars.numberOfDigits++;
        this.createClone();
      }
      if (
        this.compare(
          this.toString(this.stage.vars.fps).length,
          this.vars.numberOfDigits
        ) < 0
      ) {
        this.vars.numberOfDigits--;
      }
      yield;
    }
  }
}
