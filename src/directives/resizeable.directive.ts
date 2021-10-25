import { VNode } from 'vue';
import { DirectiveBinding } from 'vue/types/options';
import { Vue } from 'vue-property-decorator';

// eslint-disable-next-line @typescript-eslint/naming-convention
let _id = 0;

class ResizeableDirectiveController {
  resizeEnabled = true;
  minWidth = 0;
  maxWidth = 0;
  resizing = false;
  element: HTMLElement = null;
  handleUp: (event: MouseEvent) => void = null;
  handleDown: (event: MouseEvent) => void = null;
  handleMove: (event: MouseEvent) => void = null;
  vnode: VNode = null;
  id = 0;

  constructor(id: number, vNode: VNode, el: HTMLElement) {
    this.id = id;
    this.vnode = vNode;
    this.element = el;
    this.handleDown = this.onMouseDown.bind(this) as (event: MouseEvent) => void;
    this.handleUp = this.onMouseUp.bind(this) as (event: MouseEvent) => void;
  }

  private onMouseUp() {
    document.removeEventListener('mousemove', this.handleMove);
    if (this.resizing) {
      this.resizing = false;
      // this.vnode.context.$emit('resize', this.element.clientWidth);
      this.emit(this.vnode, 'resize', this.element.clientWidth);
    }
  }

  private onMouseDown(event: MouseEvent): void {
    const isHandle = (<HTMLElement>event.target).classList.contains('resize-handle');
    const initialWidth = this.element.clientWidth;
    const mouseDownScreenX = event.screenX;

    if (isHandle) {
      event.stopPropagation();
      this.resizing = true;
      this.handleMove = (e: MouseEvent) => this.move(e, initialWidth, mouseDownScreenX);
      document.addEventListener('mousemove', this.handleMove);
    }
  }

  private move(event: MouseEvent, initialWidth: number, mouseDownScreenX: number): void {
    if (!this.resizing) {
      return;
    }
    const movementX = event.screenX - mouseDownScreenX;
    const newWidth = initialWidth + movementX;

    const overMinWidth = !this.minWidth || newWidth >= this.minWidth;
    const underMaxWidth = !this.maxWidth || newWidth <= this.maxWidth;

    if (overMinWidth && underMaxWidth) {
      this.element.style.width = `${newWidth}px`;
    }
  }

  private emit(vnode: VNode, name: string, data: unknown) {
    const handlers = (vnode.data && vnode.data.on) || (vnode.componentOptions && vnode.componentOptions.listeners);
    if (handlers && handlers[name]) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      handlers[name].fns(data);
    }
  }
}

interface IDirValue {
  resizeEnabled: boolean;
  minWidth?: number;
  maxWidth?: number;
}

export interface IHasResizeableDirectiveController extends HTMLElement {
  __resizeable__: ResizeableDirectiveController;
}

export default Vue.directive('resizeable', {
  resizing: false,
  bind(el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
    const ctrl = new ResizeableDirectiveController(_id++, vnode, el);
    const value = binding.value as IDirValue;
    // eslint-disable-next-line no-undefined
    if (value.resizeEnabled !== undefined && value.resizeEnabled !== null) {
      ctrl.resizeEnabled = value.resizeEnabled;
    }
    ctrl.minWidth = value.minWidth;
    ctrl.maxWidth = value.maxWidth;
    (el as IHasResizeableDirectiveController).__resizeable__ = ctrl;
    document.addEventListener('mouseup', ctrl.handleUp);
    el.addEventListener('mousedown', ctrl.handleDown);
  },
  unbind(el: HTMLElement) {
    const ctrl = (el as IHasResizeableDirectiveController).__resizeable__;
    document.removeEventListener('mouseup', ctrl.handleUp);
    el.removeEventListener('mousedown', ctrl.handleDown);
  },
  inserted(el: HTMLElement) {
    const node = document.createElement('span');
    const ctrl = (el as IHasResizeableDirectiveController).__resizeable__;
    if (ctrl.resizeEnabled) {
      node.classList.add('resize-handle');
    } else {
      node.classList.add('resize-handle--not-resizable');
    }
    el.appendChild(node);
  },
});
