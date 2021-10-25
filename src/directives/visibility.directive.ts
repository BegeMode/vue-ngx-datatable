import { VNode } from 'vue';
import { DirectiveBinding } from 'vue/types/options';
import { Vue } from 'vue-property-decorator';

class VisibilityController {
  _isVisible = false;
  timeout: number;
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
      this.timeout = setTimeout(() => check(), timeout) as unknown as number;
    };
    this.timeout = setTimeout(() => check()) as unknown as number;
  }

  private emit(name: string, data: unknown) {
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
    (el as unknown as { __visibility__: VisibilityController }).__visibility__ = ctrl;
    const b = binding as { value: { on: boolean; timeout: number } };
    if (b?.value?.on) {
      ctrl.runCheck(b?.value?.timeout ?? 1000);
    }
  },
  unbind(el: HTMLElement) {
    const ctrl = (el as unknown as { __visibility__: VisibilityController }).__visibility__;
    ctrl.stopCheck();
  },
});
