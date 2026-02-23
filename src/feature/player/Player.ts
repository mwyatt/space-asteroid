import {AnimatedSprite, Application, Container, Graphics, Sprite, Texture} from "pixi.js";
import {Vector2} from "../../core/Vector2.ts";
import {Hitbox} from "../../core/Hitbox.ts";
import {MainScene} from "../../scene/MainScene.ts";
import {AsepriteAnimation} from "../../animation/AsepriteAnimation.ts";
import {AssetStore} from "../../core/AssetStore.ts";

export class Player extends Container {
  static movementSpeed = 5;

  private sprite: AsepriteAnimation;
  private debugBox: Graphics;

  constructor(private scene: MainScene) {
    super()
    this.sprite = new AsepriteAnimation(AssetStore.getSheet("ship"));
    this.sprite.scale.set(1.5);
    this.sprite.anchor.set(0.5);
    this.sprite.animationSpeed = 0.2
    this.sprite.loop = false

    this.x = this.scene.app.renderer.width / 2;
    this.y = this.scene.app.renderer.height - 70;

    this.debugBox = new Graphics()
    this.updateDebugBox()

    this.addChild(this.sprite);
    // this.addChild(this.debugBox)
  }

  getHitbox(): Hitbox {
    return {
      x: -30,
      y: -30,
      width: 60,
      height: 60
    };
  }

  getTipOfShip(): Vector2 {
    return new Vector2(
      this.x, this.y - this.height);
  }

  update(deltaTime: number) {
    if (this.scene.input.isDown("ArrowLeft")) {
      this.x -= Player.movementSpeed * deltaTime
      this.sprite.playAnimation('tilt')
    } else if (this.scene.input.isDown("ArrowRight")) {
      this.x += Player.movementSpeed * deltaTime
        this.sprite.playAnimation('tilt')
    } else if (this.scene.input.isDown("finger")) {
      this.x = this.scene.input.getClientXPos();
      this.sprite.playAnimation('tilt')
    } else {
        this.sprite.playAnimation('idle')
    }

    // this.x = Math.max(this.width, Math.min(this.scene.app.renderer.width - this.width, this.x));

    this.updateDebugBox()
  }

  updateDebugBox() {
    const hitbox = this.getHitbox();
    this.debugBox.clear();
    this.debugBox.rect(hitbox.x, hitbox.y, hitbox.width, hitbox.height).fill({color: 0xff0000, alpha: 0.1})
  }
}
