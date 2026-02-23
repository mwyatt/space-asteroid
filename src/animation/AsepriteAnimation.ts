import { AnimatedSprite } from 'pixi.js';

export class AsepriteAnimation extends AnimatedSprite {
    private animations;
    private currentAnimation: string | null = null;

    constructor(sheet) {
        const frameNames = Object.keys(sheet.data.frames); // ordered
        const firstTexture = sheet.textures[frameNames[0]];

        super([firstTexture]);

        this.sheet = sheet;
        this.animations = this.buildAnimationsFromTags(sheet);
    }

    buildAnimationsFromTags(sheet) {
        const animations = {};
        const tags = sheet.data.meta.frameTags;
        const frameNames = Object.keys(sheet.data.frames); // ordered

        for (const tag of tags) {
            const { name, from, to } = tag;

            const frames = [];
            for (let i = from; i <= to; i++) {
                const frameName = frameNames[i];
                const texture = sheet.textures[frameName];
                frames.push(texture);
            }

            animations[name] = frames;
        }

        return animations;
    }

    playAnimation(name, onComplete?) {
        if (this.currentAnimation === name) return;

        const frames = this.animations[name];
        if (!frames) {
            console.warn(`Animation '${name}' not found`);
            return;
        }

        this.textures = frames;
        this.currentAnimation = name;

        this.loop = false;
        this.gotoAndPlay(0);

        this.removeAllListeners('complete');

        if (onComplete) {
            this.once('complete', onComplete);
        }
    }
}
