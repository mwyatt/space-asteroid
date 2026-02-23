import {Application, Ticker} from "pixi.js";
import { Scene } from "./Scene";

export class SceneManager {
  private app: Application;
  private currentScene: Scene | null = null;

  constructor(app: Application) {
    this.app = app;

    // Bind update loop
    this.app.ticker.add(this.update, this);
  }

  /** Start or switch to a new scene */
  start(scene: Scene) {
    // Clean up old scene
    if (this.currentScene) {
      this.currentScene.onExit();
      this.app.stage.removeChild(this.currentScene);
    }

    // Set new scene
    this.currentScene = scene;

    // Add to stage
    this.app.stage.addChild(scene);

    // Call lifecycle hook
    scene.onEnter();
  }

  /** Called every frame by Pixi's ticker */
  private update(ticker: Ticker) {
    if (this.currentScene) {
      this.currentScene.update(ticker);
    }
  }
}
