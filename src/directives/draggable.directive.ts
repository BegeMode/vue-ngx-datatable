import { TableColumn } from 'types';
import { VNode } from 'vue';
import { Vue } from 'vue-property-decorator';
import { DirectiveBinding } from 'vue/types/options';

let idCounter = 0;

class DraggableController {
  id = 0;
  vnode: VNode = null;
  element: HTMLElement = null;
  handleUp: (event: MouseEvent) => void = null;
  handleDown: (event: MouseEvent) => void = null;
  handleMove: (event: MouseEvent) => void = null;
  dragModel: TableColumn;
  dragX = true;
  dragY = true;

  private _dragEvent: MouseEvent = null;
  private isDragging = false;
  private mouseDownPos: { x: number; y: number };

  constructor(id: number, vNode: VNode, el: HTMLElement, dragModel: TableColumn, dragX: boolean, dragY: boolean) {
    this.id = id;
    this.vnode = vNode;
    this.element = el;
    this.dragModel = dragModel;
    this.dragX = dragX;
    this.dragY = dragY;
    this.handleUp = this.onMouseUp.bind(this) as (event: MouseEvent) => void;
    this.handleMove = this.onMouseMove.bind(this) as (event: MouseEvent) => void;
  }

  unsubscribe() {
    document.removeEventListener('mousemove', this.handleMove);
    document.removeEventListener('mouseup', this.handleUp);
  }

  set dragEvent(value: MouseEvent) {
    this._dragEvent = value;
    if (value) {
      this.onMouseDown(value);
    }
  }
  get dragEvent() {
    return this._dragEvent;
  }

  onMouseDown(event: MouseEvent): void {
    // we only want to drag the inner header text
    const isDragElm = (<HTMLElement>event.target).classList.contains('draggable');

    if (isDragElm && (this.dragX || this.dragY)) {
      event.preventDefault();
      this.isDragging = true;

      this.mouseDownPos = { x: event.clientX, y: event.clientY };

      document.addEventListener('mouseup', this.handleUp);
      document.addEventListener('mousemove', this.handleMove);

      this.emit('dragStart', {
        event,
        element: this.element,
        model: this.dragModel,
      });
    }
  }

  private onMouseUp(event: MouseEvent): void {
    document.removeEventListener('mousemove', this.handleMove);
    if (!this.isDragging) {
      return;
    }

    this.isDragging = false;
    this.element.classList.remove('dragging');

    this.unsubscribe();
    this.emit('dragEnd', {
      event,
      element: this.element,
      model: this.dragModel,
    });
  }

  private onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) {
      return;
    }

    const x = event.clientX - this.mouseDownPos.x;
    const y = event.clientY - this.mouseDownPos.y;

    if (this.dragX) {
      this.element.style.left = `${x}px`;
    }
    if (this.dragY) {
      this.element.style.top = `${y}px`;
    }

    this.element.classList.add('dragging');

    this.emit('dragging', {
      event,
      element: this.element,
      model: this.dragModel,
    });
  }

  private emit(name: string, data: any): void {
    const handlers =
      (this.vnode.data && this.vnode.data.on) || (this.vnode.componentOptions && this.vnode.componentOptions.listeners);
    if (handlers && handlers[name]) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      handlers[name].fns(data);
    }
  }
}

export default Vue.directive('draggable', {
  bind(el: HTMLElement, binding: DirectiveBinding, vnode: VNode): void {
    const ctrl = new DraggableController(
      idCounter++,
      vnode,
      el,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      binding.value.dragModel as TableColumn,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      binding.value.dragX,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      binding.value.dragY
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (el as any).__draggable__ = ctrl;
  },
  update(el: HTMLElement, binding: DirectiveBinding, vnode: VNode): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const ctrl: DraggableController = (el as any).__draggable__ as DraggableController;
    if (!ctrl) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    ctrl.dragX = binding.value.dragX as boolean;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    ctrl.dragEvent = binding.value.dragEvent as MouseEvent;
  },
  unbind(el: HTMLElement) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const ctrl: DraggableController = (el as any).__draggable__ as DraggableController;
    ctrl.unsubscribe();
  },
});
