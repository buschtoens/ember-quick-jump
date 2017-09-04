import Service from '@ember/service';

class Bindings {
  components = new WeakMap();
  shortcuts = new Map();

  static normalizeShortcut;
}

export default class QuickJumpService extends Service {
  components = new WeakMap();
  shortcuts = new Map();

  register(component, shortcut) {
    if (this.components.has(component)) {
      this.updateShortcut(component, shortcut);
    } else {
    }
  }

  unregister(component) {
    this.components.get(component);
  }

  constructor() {
    document.addEventListener('keydown', event => this.handleKeyEvent(event));
  }

  willDestroy() {}
}
