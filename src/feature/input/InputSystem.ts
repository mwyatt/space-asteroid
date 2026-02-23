export class InputSystem {
  private keys = new Set<string>();

  constructor() {
    window.addEventListener("keydown", e => this.keys.add(e.key));
    window.addEventListener("keyup", e => this.keys.delete(e.key));

    // @todo touch related movement, detect that touch is available

    // export function isTouchDevice(): boolean {
    //   return navigator.maxTouchPoints > 0 || 'ontouchstart' in window;
    // }


    window.addEventListener("pointermove", (event) => {
      // this.player.x = event.clientX;
      // this.player.y = event.clientY;
    });
  }

  isDown(key: string) {
    return this.keys.has(key);
  }
}
