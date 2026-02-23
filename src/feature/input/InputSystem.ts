export class InputSystem {
  private keys = new Set<string>();
  private clientXPos = 0;

  constructor() {
    if (this.isTouchDevice()) {
    window.addEventListener("pointermove", (event) => {
      this.clientXPos = event.clientX;
      this.keys.add('finger')
    });
    window.addEventListener("pointerup", (event) => {
      this.keys.delete('finger')
    });

    } else {

    window.addEventListener("keydown", e => this.keys.add(e.key));
    window.addEventListener("keyup", e => this.keys.delete(e.key));
    }
  }

  isDown(key: string) {
    return this.keys.has(key);
  }

  getClientXPos() {
    return this.clientXPos;
  }

    isTouchDevice(): boolean {
      return navigator.maxTouchPoints > 0 || 'ontouchstart' in window;
    }

}
