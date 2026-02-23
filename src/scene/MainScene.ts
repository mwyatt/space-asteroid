import { Scene } from "../core/Scene";
import { Player, PlayerController } from "../feature/player";
import { InputSystem } from "../feature/input";
import {Application, Ticker} from "pixi.js";
import {RockManager} from "../feature/rock/RockManager.ts";
import {LaserManager} from "../feature/projectile/LaserManager.ts";
import {ScoreText} from "../feature/ui/ScoreText.ts";
import {EventBus} from "../core/EventBus.ts";
import {Vector2} from "../core/Vector2.ts";

export class MainScene extends Scene {
  private app!: Application;
  private input!: InputSystem;
  private player!: Player;
  private controller!: PlayerController;
  private rockManager!: RockManager;
  private laserManager!: LaserManager;
  private scoreText!: ScoreText;

  private laserFireTimer = 0;
  private rockSpawnTimer = 0;

  constructor(private app: Application) {
    super();
  }

  onEnter() {
    this.input = new InputSystem();
    this.player = new Player(this.app);
    this.controller = new PlayerController(this.app, this.player, this.input);
    this.rockManager = new RockManager(this);
    this.laserManager = new LaserManager(this);
    this.scoreText = new ScoreText(this);

    this.addChild(this.player);
    this.addChild(this.scoreText);

    EventBus.on("rockDestroyed", this.onRockDestroyed);
    EventBus.on("rockSplit", this.onRockSplit);
  }

  private onRockDestroyed = (event) => {
    this.rockManager.destroyRock(event.rock);
    this.scoreText.incrementScore(100);
  };

  private onRockSplit = (event) => {
    this.rockManager.destroyRock(event.rock);
    this.scoreText.incrementScore(50);

    // Create two smaller rocks at the position of the destroyed rock
    this.rockManager.addRock(new Vector2(
        event.rock.x - 20, event.rock.y
    ), false);
    this.rockManager.addRock(new Vector2(
        event.rock.x + 20, event.rock.y
    ), false);
  };

  update(ticker: Ticker) {
    const { deltaTime } = ticker;
    this.controller.update(deltaTime);
    this.rockManager.update(deltaTime);
    this.laserManager.update(deltaTime, this.rockManager);

    // @todo refactor this away
    this.laserFireTimer += deltaTime;
    if (this.laserFireTimer >= 30) {
        this.laserFireTimer = 0;
      this.laserManager.addLaser(this.player.getTipOfShip());
    }

    // @todo refactor this away
    this.rockSpawnTimer += deltaTime;
    if (this.rockSpawnTimer >= 120) {
        this.rockSpawnTimer = 0;
      this.rockManager.addRock(new Vector2(
            Math.random() * this.app.renderer.width,
            50
        ));
    }
  }

  onExit() {
    this.input.destroy();
  }
}
