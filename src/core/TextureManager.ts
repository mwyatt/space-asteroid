import {Assets, Texture, TextureStyle} from "pixi.js";
import {AssetStore} from "./AssetStore.ts";

export class TextureManager {
  private static loaded = false;

  static async load() {
      TextureStyle.defaultOptions.scaleMode = 'nearest';

      const rockTexture = await Assets.load({
          alias: "rock",
          src: "/assets/rock-bak.png"
      });
      const shipTexture = await Assets.load({
            alias: "ship",
          src: "/assets/ship-bak.png"
      });

      rockTexture.source.scaleMode = 'nearest';
      // rockSheet.source.scaleMode = 'nearest';
      shipTexture.source.scaleMode = 'nearest';

    const rockSheet = await Assets.load("/assets/rock.json")
    const shipSheet = await Assets.load("/assets/ship.json")
    const laserSheet = await Assets.load("/assets/laser.json")

      AssetStore.addSheet("rock", rockSheet);
      AssetStore.addSheet("ship", shipSheet);
      AssetStore.addSheet("laser", laserSheet);

      this.loaded = true;
  }

  static get(name: string): Texture {
    return Assets.get(name);
  }
}

export function buildAnimations(sheet) {
  const animations = {};

  const frameNames = Object.keys(sheet.data.frames);

  for (const tag of sheet.data.meta.frameTags) {
    animations[tag.name] = frameNames
      .slice(tag.from, tag.to + 1)
      .map(name => sheet.textures[name]);
  }

  return animations;
}
