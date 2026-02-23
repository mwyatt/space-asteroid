import {Graphics, Sprite, Texture} from "pixi.js";
import {Vector2} from "../../core/Vector2.ts";
import {Hitbox} from "../../core/Hitbox.ts";

export class Laser extends Sprite {
  static speed = 10;

  debugBox: Graphics;

  constructor(vector: Vector2) {
    super(Texture.from("rock"));
    this.anchor.set(0.5);
    this.scale.x = 0.2;
    this.scale.y = 1.5;

    this.x = vector.x;
    this.y = vector.y;

    this.debugBox = new Graphics()
    this.updateDebugBox()
  }

  getHitbox(): Hitbox {
    return {
      x: this.x - 10,
      y: this.y - 10,
      width: 20,
      height: 20
    };
  }

  update(deltaTime: number) {
    this.y -= Laser.speed * deltaTime;

    this.updateDebugBox()
  }

  updateDebugBox() {
    const hitbox = this.getHitbox();
    this.debugBox.clear();
    this.debugBox.rect(hitbox.x, hitbox.y, hitbox.width, hitbox.height).fill({color: 0xff0000, alpha: 0.1})
  }
}
