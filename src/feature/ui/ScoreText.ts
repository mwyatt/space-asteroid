import { Text } from "pixi.js";
import {MainScene} from "../../scene/MainScene.ts";

export class ScoreText extends Text {
  private currentScore = 0;

  constructor(private scene: MainScene) {
    super({
        text: 0,
        style: {
      fill: 0xffffff,
      fontSize: 32,
      fontFamily: "Jersey 15",
          align: 'right'
    }
    });
    this.resolution = 1;
    this.roundPixels = true;

    this.x = this.scene.app.renderer.width - 100;
    this.y = 50;
  }

  incrementScore(score: number) {
    this.currentScore += score;
    this.text = this.currentScore.toString();
  }
}
