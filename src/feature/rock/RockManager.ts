import {Rock} from "./Rock.ts";
import {Application} from "pixi.js";
import {MainScene} from "../../scene/MainScene.ts";
import {Vector2} from "../../core/Vector2.ts";
import {EventBus} from "../../core/EventBus.ts";

export class RockManager {
    private rocks: Rock[] = [];

    constructor(private scene: MainScene) {
    }

    addRock(vector: Vector2, splittable: boolean | null = null) {
        const rock = new Rock(vector, splittable)

        this.rocks.push(rock);
        this.scene.addChild(rock)
        this.scene.addChild(rock.debugBox)
    }


    hitRock(rock: Rock) {
        rock.takeHit();
    }

    destroyRock(rock: Rock) {
        this.scene.removeChild(rock.debugBox);
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
    }
}
