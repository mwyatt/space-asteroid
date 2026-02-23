import {AnimatedSprite, Container, Graphics, Sprite, Texture} from "pixi.js";
import {Vector2} from "../../core/Vector2.ts";
import {Hitbox} from "../../core/Hitbox.ts";
import {EventBus} from "../../core/EventBus.ts";
import {AsepriteAnimation} from "../../animation/AsepriteAnimation.ts";
import {AssetStore} from "../../core/AssetStore.ts";

export class Rock extends Container {
  private sprite: AsepriteAnimation;

  private fallSpeed = 2;
  private rotationSpeed = 0.1;

  debugBox: Graphics;

  constructor(vector: Vector2, private splittable: boolean | null = null) {
    super();
    this.sprite = new AsepriteAnimation(AssetStore.getSheet("rock"));
    this.sprite.scale.set(1.5);
    this.sprite.anchor.set(0.5);
    this.sprite.animationSpeed = 0.2
    this.sprite.loop = false

    this.splittable = splittable;

    // Random
    this.fallSpeed = Math.random() * 2; // Speed between 1 and 3
    this.rotationSpeed = 0.01 + Math.random() * 0.05; // Rotation speed between 0.01 and 0.06
    this.x = vector.x;
    this.y = vector.y;

    // Generate splittable property if not provided
    if (this.splittable === null) {
      this.splittable = Math.random() > 0.5;
      if (this.splittable) {
        this.sprite.scale.set(2);
        this.tint = 0xff8844; // warm orange
      }
    }

    this.debugBox = new Graphics()
    this.updateDebugBox()

    this.addChild(this.sprite);
    // this.addChild(this.debugBox)
  }

  getHitbox(): Hitbox {
    return {
      x: this.x - 30,
      y: this.y - 30,
      width: 60,
      height: 60
    };
  }

  update(deltaTime: number) {
    this.y += this.fallSpeed * deltaTime;
    this.sprite.rotation += this.rotationSpeed * deltaTime;
    this.updateDebugBox()
  }

  updateDebugBox() {
    const hitbox = this.getHitbox();
    this.debugBox.clear();
    this.debugBox.rect(hitbox.x, hitbox.y, hitbox.width, hitbox.height).fill({color: 0xff0000, alpha: 0.1})
  }

  takeHit() {
    if (this.splittable) {
      EventBus.emit("rockSplit", { rock: this });
    } else {
      this.sprite.playAnimation('death')
      this.sprite.onComplete = () => {
        EventBus.emit("rockDestroyed", { rock: this });
      }
    }
  }
}
