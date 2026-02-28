import {Rock} from "./Rock.ts";
import {MainScene} from "../../scene/MainScene.ts";
import {Vector2} from "../../core/Vector2.ts";

export class RockManager {
    private rocks: Rock[] = [];
  private rockSpawnTimer = 0;

    constructor(private scene: MainScene, private rockSheet) {
    }

    addRock(vector: Vector2, splittable: boolean | null = null) {
        const rock = new Rock(vector, splittable)

        this.rocks.push(rock);
        this.scene.addChild(rock)
    }

    hitRock(rock: Rock) {
        rock.takeHit();
    }

    destroyRock(rock: Rock) {
        this.scene.removeChild(rock);
        this.rocks = this.rocks.filter(r => r !== rock);
    }

    update(deltaTime: number) {
        this.rocks.forEach(rock => rock.update(deltaTime));

        const rockYLimit  = this.scene.app.renderer.height - 50;

        const offscreenRocks = this.rocks.filter(rock => rock.y > rockYLimit);
        offscreenRocks.forEach(rock => {
            this.destroyRock(rock);
        });

    this.rockSpawnTimer += deltaTime;
    if (this.rockSpawnTimer >= 120) {
        this.rockSpawnTimer = 0;
        const rockWidth = 64; // or use your actual rock sprite width
        const minX = rockWidth / 2;
        const maxX = this.scene.app.renderer.width - rockWidth / 2;
        const spawnX = Math.random() * (maxX - minX) + minX;

      this.addRock(new Vector2(
            spawnX,
            50
        ));
    }
    }
}
