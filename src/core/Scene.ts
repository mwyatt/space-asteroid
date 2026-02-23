// core/Scene.ts
import {Container, Ticker} from "pixi.js";

export abstract class Scene extends Container {
  /** Called when the scene becomes active */
  abstract onEnter(): void;

  /** Called when the scene is removed */
  abstract onExit(): void;

  /** Called every frame by the SceneManager */
  update(ticker: Ticker): void {}
}
