import {Laser} from "./Laser.ts";
import {Vector2} from "../../core/Vector2.ts";
import {MainScene} from "../../scene/MainScene.ts";
import {hitboxIntersects} from "../../core/Collision.ts";
import {RockManager} from "../rock/RockManager.ts";
import * as Tone from "tone";
import {Player} from "../player";

export class LaserManager {
    private lasers: Laser[] = [];
    private synth
private notes = ["F#2", "G2", "G#2", "A2"];
private laserFireTimer = 0;
private laserFireGap = 40;

    constructor(private scene: MainScene) {
                const decay = 0.04 + Math.random() * 0.03; // 0.04 - 0.07
        const release = 0.04 + Math.random() * 0.03; // 0.04 - 0.07

        this.synth = new Tone.Synth({
          oscillator: { type: "triangle" },
          volume: -10,
        envelope: { attack: 0.01, decay, sustain: 0, release }
        }).toDestination();
    }

    addLaser(vector: Vector2) {
        const laser = new Laser(vector)
        this.lasers.push(laser);

        const note = this.notes[Math.floor(Math.random() * this.notes.length)];
        this.synth.triggerAttackRelease(note, "8n");

        this.scene.addChild(laser.debugBox)
        this.scene.addChild(laser)
    }

    destroyLaser(laser: Laser) {
        this.scene.removeChild(laser.debugBox);
        this.scene.removeChild(laser);
        // laser.destroy();
        this.lasers = this.lasers.filter(l => l !== laser);
    }

    update(deltaTime: number, player: Player, rockManager: RockManager) {
        this.lasers.forEach(laser => laser.update(deltaTime));

    this.laserFireTimer += deltaTime;
    if (this.laserFireTimer >= this.laserFireGap) {
        this.laserFireTimer = 0;
        this.addLaser(player.getTipOfShip());
    }

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
