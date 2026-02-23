import { Assets, Texture } from "pixi.js";

export class TextureManager {
  private static loaded = false;

  static async load() {
      if (this.loaded) return;

      const rockTexture = await Assets.load({
          alias: "rock",
          src: "/assets/rock-bak.png"
      });
      const rockSheet = buildAnimations(
          await Assets.load("/assets/rock.json")
      );
      const shipTexture = await Assets.load({
            alias: "ship",
          src: "/assets/ship.png"
      });

      rockTexture.source.scaleMode = 'nearest';
      // rockSheet.source.scaleMode = 'nearest';
      shipTexture.source.scaleMode = 'nearest';

      console.log(rockSheet)

      this.loaded = true;
  }

  static get(name: string): Texture {
    return Assets.get(name);
  }
}

function buildAnimations(sheet) {
  const animations = {};

  const frameNames = Object.keys(sheet.data.frames);

  for (const tag of sheet.data.meta.frameTags) {
    animations[tag.name] = frameNames
      .slice(tag.from, tag.to + 1)
      .map(name => sheet.textures[name]);
  }

  return animations;
}
