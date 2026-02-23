import {Application, Sprite, Texture} from "pixi.js";
import {Vector2} from "../../core/Vector2.ts";
import {Hitbox} from "../../core/Hitbox.ts";

export class Player extends Sprite {

  constructor(private app: Application) {
    super(Texture.from("ship"));
    this.anchor.set(0.5);
    this.scale.set(1.5);

    this.x = this.app.renderer.width / 2;
    this.y = this.app.renderer.height - 70;
  }

  getHitbox(): Hitbox {
    return {
      x: this.x,
      y: this.y,
      width: 40,
      height: 38
    };
  }

  getTipOfShip(): Vector2 {
    return new Vector2(
      this.x, this.y - this.height);
  }
}
