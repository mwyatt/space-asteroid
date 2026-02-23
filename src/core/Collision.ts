import {Hitbox} from "./Hitbox.ts";

export function hitboxIntersects(a: Hitbox, b: Hitbox): boolean {
  return !(
    a.x + a.width < b.x ||
    a.x > b.x + b.width ||
    a.y + a.height < b.y ||
    a.y > b.y + b.height
  );
}
