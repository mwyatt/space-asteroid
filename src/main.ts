import {Application} from "pixi.js";
import {SceneManager} from "./core/SceneManager.ts";
import {MainScene} from "./scene/MainScene.ts";
import {TextureManager} from "./core/TextureManager.ts";

(async () => {
  await TextureManager.load();

  const app = new Application();
  await app.init({
    background: "#291d1e",
    // resizeTo: window,
    width: 420,
    height: 700,

    // @todo not sure of impact of this yet?
    resolution: 1,
    antialias: false,
  });

  document.getElementById("pixi-container")!.appendChild(app.canvas);

  const sceneManager = new SceneManager(app);
  sceneManager.start(new MainScene(app));
})();
