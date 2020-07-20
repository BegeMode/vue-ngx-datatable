import { VNode } from 'vue';
import { Vue } from 'vue-property-decorator';
import { DirectiveBinding } from 'vue/types/options';

class VisibilityController {
  _isVisible = false;
  timeout: any;
  vnode: VNode = null;
  element: HTMLElement = null;

  constructor(vNode: VNode, el: HTMLElement) {
    this.vnode = vNode;
    this.element = el;
  }

  set isVisible(value: boolean) {
    this._isVisible = value;
    if (value) {
      this.element.classList.add('visible');
    } else {
      this.element.classList.remove('visible');
    }
  }

  get isVisible(): boolean {
    return this._isVisible;
  }

  stopCheck(): void {
    clearTimeout(this.timeout);
  }

  onVisibilityChange(visible: boolean): void {
    if (this.isVisible !== visible) {
      this.isVisible = visible;
      this.emit('visible', visible);
    }
  }

  runCheck(timeout: number): void {
    const check = () => {
      clearTimeout(this.timeout);
      // https://davidwalsh.name/offsetheight-visibility
      const { offsetHeight, offsetWidth } = this.element;

      if (offsetHeight && offsetWidth) {
        this.onVisibilityChange(true);
      } else {
        this.onVisibilityChange(false);
      }
      this.timeout = setTimeout(() => check(), timeout);
    };
    this.timeout = setTimeout(() => check());
  }

  private emit(name: string, data: any) {
    const handlers =
      (this.vnode.data && this.vnode.data.on) || (this.vnode.componentOptions && this.vnode.componentOptions.listeners);

    if (handlers && handlers[name]) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      handlers[name].fns(data);
    }
  }
}

/**
 * Visibility Observer Directive
 *
 * Usage:
 *
 * <div
 *   v-visibility-observer
 * >
 * </div>
 *
 */
export default Vue.directive('visibility-observer', {
  resizing: false,
  bind(el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
    const ctrl = new VisibilityController(vnode, el);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (el as any).__visibility__ = ctrl;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (binding?.value?.on) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      ctrl.runCheck(binding?.value?.timeout ?? 1000);
    }
  },
  unbind(el: HTMLElement) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const ctrl = (el as any).__visibility__ as VisibilityController;
    ctrl.stopCheck();
  },
});
