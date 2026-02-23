import { Application } from "pixi.js";

export class Canvas {
  private app: Application;
  private gameWidth: number;
  private gameHeight: number;
  private scale = 1;

  constructor(app: Application, gameWidth: number, gameHeight: number) {
    this.app = app;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    window.addEventListener("resize", () => this.update());
    this.update();
  }

  /** Recalculate scale + CSS size */
  update() {
    const canvas = this.app.canvas;

    const scaleX = window.innerWidth / this.gameWidth;
    const scaleY = window.innerHeight / this.gameHeight;

    // integer scale for crisp pixel art
    this.scale = Math.floor(Math.min(scaleX, scaleY));

    canvas.style.width = this.gameWidth * this.scale + "px";
    canvas.style.height = this.gameHeight * this.scale + "px";

    canvas.style.position = "absolute";
    canvas.style.left = "50%";
    canvas.style.top = "50%";
    canvas.style.transform = "translate(-50%, -50%)";
  }

  /** Internal game resolution */
  get width() {
    return this.gameWidth;
  }

  get height() {
    return this.gameHeight;
  }

  /** CSS‑scaled size */
  get cssWidth() {
    return this.gameWidth * this.scale;
  }

  get cssHeight() {
    return this.gameHeight * this.scale;
  }

  /** Integer scale factor */
  getScale() {
    return this.scale;
  }
}
