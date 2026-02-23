import {Laser} from "./Laser.ts";
import {Vector2} from "../../core/Vector2.ts";
import {MainScene} from "../../scene/MainScene.ts";
import {hitboxIntersects} from "../../core/Collision.ts";
import {RockManager} from "../rock/RockManager.ts";

export class LaserManager {
    private lasers: Laser[] = [];

    constructor(private scene: MainScene) {
    }

    addLaser(vector: Vector2) {
        const laser = new Laser(vector)
        this.lasers.push(laser);
        this.scene.addChild(laser.debugBox)
        this.scene.addChild(laser)
    }

    destroyLaser(laser: Laser) {
        this.scene.removeChild(laser.debugBox);
        this.scene.removeChild(laser);
        // laser.destroy();
        this.lasers = this.lasers.filter(l => l !== laser);
    }

    update(deltaTime: number, rockManager: RockManager) {
        this.lasers.forEach(laser => laser.update(deltaTime));

        // Lasers hitting rocks
          for (const laser of this.lasers) {
            for (const rock of rockManager.rocks) {
              if (hitboxIntersects(laser.getHitbox(), rock.getHitbox())) {
                this.destroyLaser(laser);
                rockManager.hitRock(rock);
              }
            }
          }

        // Remove lasers that are off-screen
        const offscreenLasers = this.lasers.filter(laser => laser.y < 50);
        offscreenLasers.forEach(laser => {
            this.destroyLaser(laser);
        });
    }
}
