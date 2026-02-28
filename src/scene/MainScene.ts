import { Scene } from "../core/Scene";
import { Player, PlayerController } from "../feature/player";
import { InputSystem } from "../feature/input";
import {Application, Ticker} from "pixi.js";
import {RockManager} from "../feature/rock/RockManager.ts";
import {LaserManager} from "../feature/projectile/LaserManager.ts";
import {ScoreText} from "../feature/ui/ScoreText.ts";
import {EventBus} from "../core/EventBus.ts";
import {Vector2} from "../core/Vector2.ts";
import {AssetStore} from "../core/AssetStore.ts";

export class MainScene extends Scene {
  private app!: Application;
  private input!: InputSystem;
  private player!: Player;
  private controller!: PlayerController;
  private rockManager!: RockManager;
  private laserManager!: LaserManager;
  private scoreText!: ScoreText;
private isPaused = true;

  constructor(private app: Application) {
    super();
  }

  onEnter() {
    this.input = new InputSystem();
    this.player = new Player(this);
    this.controller = new PlayerController(this.app, this.player, this.input);
    this.rockManager = new RockManager(this, AssetStore.getSheet("rock"));
    this.laserManager = new LaserManager(this);
    this.scoreText = new ScoreText(this);

    this.addChild(this.player);
    this.addChild(this.scoreText);

    EventBus.on("rockDestroyed", this.onRockDestroyed);
    EventBus.on("rockSplit", this.onRockSplit);

  this.isPaused = true;
  document.getElementById("overlay")!.style.display = "flex";
  document.getElementById("startBtn")!.onclick = () => {
    this.isPaused = false;
    document.getElementById("overlay")!.style.display = "none";
  };

  window.addEventListener("keydown", this.handleKeyDown);
  }

  private handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === "Escape") {
    this.isPaused = true;
    document.getElementById("overlay")!.style.display = "flex";
  }
};

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
  if (this.isPaused) return;
    const { deltaTime } = ticker;
    this.player.update(deltaTime);
    this.rockManager.update(deltaTime);
    this.laserManager.update(deltaTime, this.player, this.rockManager);
  }

  onExit() {
    this.input.destroy();
    window.removeEventListener("keydown", this.handleKeyDown);
  }
}
