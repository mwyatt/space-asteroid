import { Texture } from "pixi.js";

export interface AnimationFrame {
  texture: Texture;
  duration: number; // milliseconds this frame should display
}

export class AnimationController {
  private frames: AnimationFrame[];
  private currentFrameIndex = 0;
  private elapsed = 0;
  private loop: boolean;
  private playing = true;

  constructor(frames: AnimationFrame[], loop = true) {
    this.frames = frames;
    this.loop = loop;
  }

  update(deltaTime: number) {
    if (!this.playing) return;

    // Convert Pixi deltaTime (frames) to ms
    const dtMs = deltaTime * (1000 / 60);
    this.elapsed += dtMs;

    const current = this.frames[this.currentFrameIndex];

    if (this.elapsed >= current.duration) {
      this.elapsed = 0;
      this.currentFrameIndex++;

      if (this.currentFrameIndex >= this.frames.length) {
        if (this.loop) {
          this.currentFrameIndex = 0;
        } else {
          this.currentFrameIndex = this.frames.length - 1;
          this.playing = false;
        }
      }
    }
  }

  get texture(): Texture {
    return this.frames[this.currentFrameIndex].texture;
  }

  reset() {
    this.currentFrameIndex = 0;
    this.elapsed = 0;
    this.playing = true;
  }
}
