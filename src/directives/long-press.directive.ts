import { TableColumn } from 'types/table-column.type';
import { VNode } from 'vue';
import { Vue } from 'vue-property-decorator';
import { DirectiveBinding } from 'vue/types/options';

// eslint-disable-next-line @typescript-eslint/naming-convention
let _id = 0;

class LongPressController {
  id = 0;
  pressEnabled = true;
  pressModel: TableColumn;
  duration = 200;
  _pressing: boolean;
  _isLongPressing: boolean;
  timeout: number;
  mouseX = 0;
  mouseY = 0;
  vnode: VNode = null;
  element: HTMLElement = null;
  handleUp: (event: MouseEvent) => void = null;
  handleDown: (event: MouseEvent) => void = null;
  handleMove: (event: MouseEvent) => void = null;

  constructor(id: number, vNode: VNode, el: HTMLElement) {
    this.id = id;
    this.vnode = vNode;
    this.element = el;
    this.handleDown = this.onMouseDown.bind(this) as (event: MouseEvent) => void;
    this.handleUp = this.onMouseUp.bind(this) as (event: MouseEvent) => void;
    this.handleMove = this.onMouseMove.bind(this) as (event: MouseEvent) => void;
    el.addEventListener('mousedown', this.handleDown);
  }

  unsubscribe() {
    document.removeEventListener('mousemove', this.handleMove);
    document.removeEventListener('mouseup', this.handleUp);
  }

  set pressing(value: boolean) {
    this._pressing = value;
    if (value) {
      this.element.classList.add('press');
    } else {
      this.element.classList.remove('press');
    }
  }

  get pressing(): boolean {
    return this._pressing;
  }

  set isLongPressing(value: boolean) {
    this._isLongPressing = value;
    // console.log('set isLongPressing, id, value', this.id, value);
    if (value) {
      this.element.classList.add('longpress');
    } else {
      this.element.classList.remove('longpress');
    }
  }

  get isLongPressing(): boolean {
    return this._isLongPressing;
  }

  private onMouseDown(event: MouseEvent): void {
    // don't do right/middle clicks
    if (event.which !== 1 || !this.pressEnabled) {
      return;
    }

    // don't start drag if its on resize handle
    const target = <HTMLElement>event.target;
    if (target.classList.contains('resize-handle')) {
      return;
    }

    this.mouseX = event.clientX;
    this.mouseY = event.clientY;

    this.pressing = true;
    this.isLongPressing = false;

    document.addEventListener('mouseup', this.handleUp);

    this.timeout = (setTimeout(() => {
      this.isLongPressing = true;
      this.emit('longPressStart', {
        event,
        model: this.pressModel,
      });

      document.addEventListener('mousemove', this.handleMove);

      this.loop(event);
    }, this.duration) as unknown) as number;

    this.loop(event);
  }

  private onMouseUp(): void {
    document.removeEventListener('mousemove', this.handleMove);
    this.endPress();
  }

  private onMouseMove(event: MouseEvent): void {
    if (this.pressing && !this.isLongPressing) {
      const xThres = Math.abs(event.clientX - this.mouseX) > 10;
      const yThres = Math.abs(event.clientY - this.mouseY) > 10;

      // console.log('long-press mouse move, id=', this.id);

      if (xThres || yThres) {
        this.endPress();
      }
    }
  }

  private loop(event: MouseEvent): void {
    if (this.isLongPressing) {
      this.timeout = (setTimeout(() => {
        this.emit('longPressing', {
          event,
          model: this.pressModel,
        });
        this.loop(event);
      }, 50) as unknown) as number;
    }
  }

  private endPress(): void {
    clearTimeout(this.timeout);
    if (this.isLongPressing) {
      this.unsubscribe();
      this.isLongPressing = false;
      this.pressing = false;

      this.emit('longPressEnd', {
        model: this.pressModel,
      });
    }
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

interface IDirValue {
  pressModel: TableColumn;
  pressEnabled: boolean;
  duration?: number;
}

export interface IHasLongPressController extends HTMLElement {
  __longpress__: LongPressController;
}

export default Vue.directive('long-press', {
  bind(el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
    const ctrl = new LongPressController(_id++, vnode, el);
    const value = binding.value as IDirValue;
    // eslint-disable-next-line no-undefined
    if (value.pressEnabled !== undefined && value.pressEnabled !== null) {
      ctrl.pressEnabled = value.pressEnabled;
    }
    // eslint-disable-next-line no-undefined
    if (value.duration !== undefined && value.duration !== null) {
      ctrl.duration = value.duration;
    }
    ctrl.pressModel = value.pressModel;
    (el as IHasLongPressController).__longpress__ = ctrl;
  },
  unbind(el: Element) {
    const ctrl: LongPressController = (el as IHasLongPressController).__longpress__;
    ctrl.element.removeEventListener('mousedown', ctrl.handleDown);
    ctrl.unsubscribe();
  },
});
