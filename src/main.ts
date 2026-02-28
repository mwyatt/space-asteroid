import {Application} from "pixi.js";
import {SceneManager} from "./core/SceneManager.ts";
import {MainScene} from "./scene/MainScene.ts";
import {TextureManager} from "./core/TextureManager.ts";

// After app initialization
function resizeApp(app) {
  const width = Math.min(window.innerWidth, 600);
  const height = Math.min(window.innerHeight, 800);
  app.renderer.resize(width, height);
  app.renderer.background.color = 0x291d1e; // Ensure background color stays
}

(async () => {
let resizeTimeout: number | undefined;
  await TextureManager.load();

  const app = new Application();
  await app.init({
    background: "#291d1e",
    resizeTo: window,
    // width: 420,
    // height: 700,
    // maxWidth: 420,
    // maxHeight: 700,

    // resolution: 1,
    // antialias: false,
  });

window.addEventListener("resize", () => {
  if (resizeTimeout !== undefined) {
    clearTimeout(resizeTimeout);
  }
  resizeTimeout = window.setTimeout(() => {
    resizeApp(app);
    resizeTimeout = undefined;
  }, 1000);
});

  resizeApp(app); // Call once to set initial size

  document.getElementById("pixi-container")!.appendChild(app.canvas);

  const sceneManager = new SceneManager(app);
  sceneManager.start(new MainScene(app));
})();
