import {InputSystem} from "../input/InputSystem.ts";
import {Player} from "./Player.ts";
import {Application} from "pixi.js";

export class PlayerController {
  static movementSpeed = 5;

  constructor(private app: Application, private player: Player, private input: InputSystem) {}

  update(dt: number) {
    if (this.input.isDown("ArrowLeft")) this.player.x -= PlayerController.movementSpeed;
    if (this.input.isDown("ArrowRight")) this.player.x += PlayerController.movementSpeed;

    this.player.x = Math.max(this.player.width, Math.min(this.app.renderer.width - this.player.width, this.player.x));
  }
}
