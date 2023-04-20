/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Text extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Text/costumes/costume1.svg", {
        x: 248.13679245283015,
        y: 186.91980829778706
      })
    ];

    this.sounds = [new Sound("pop", "./Text/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "stress test" },
        this.whenIReceiveStressTest
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "stop stress test" },
        this.whenIReceiveStopStressTest
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenIReceiveStressTest() {
    this.visible = true;
  }

  *whenIReceiveStopStressTest() {
    this.visible = false;
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }
}
