import { Vue } from 'vue-property-decorator';
import { VNode } from 'vue';

let _id = 0;

class DraggableController {
  id = 0;
  vnode: VNode = null;
  element: HTMLElement = null;
  handleUp = null;
  handleDown = null;
  handleMove = null;
  dragModel: any;
  dragX: boolean = true;
  dragY: boolean = true;

  private _dragEventTarget: any = null;
  private isDragging: boolean = false;
  private mouseDownPos: { x: number, y: number };

  constructor(id, vNode: VNode, el, dragModel: any, dragX: boolean, dragY: boolean) {
    this.id = id;
    this.vnode = vNode;
    this.element = el;
    this.dragModel = dragModel;
    this.dragX = dragX;
    this.dragY = dragY;
    this.handleUp = this.onMouseUp.bind(this);
    this.handleMove = this.onMouseMove.bind(this);
  }

  unsubscribe() {
    document.removeEventListener('mousemove', this.handleMove);
    document.removeEventListener('mouseup', this.handleUp);
  }

  set dragEventTarget(value) {
    this._dragEventTarget = value;
    if (value) {
      this.onMouseDown(value);
    }
  }
  get dragEventTarget() {
    return this._dragEventTarget;
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
        model: this.dragModel
      });
    }
  }

  private onMouseUp(event: MouseEvent): void {
    document.removeEventListener('mousemove', this.handleMove);
    if (!this.isDragging) return;

    this.isDragging = false;
    this.element.classList.remove('dragging');

    this.unsubscribe();
    this.emit('dragEnd', {
      event,
      element: this.element,
      model: this.dragModel
    });
  }

  private onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;

    const x = event.clientX - this.mouseDownPos.x;
    const y = event.clientY - this.mouseDownPos.y;

    if (this.dragX) this.element.style.left = `${x}px`;
    if (this.dragY) this.element.style.top = `${y}px`;

    this.element.classList.add('dragging');

    this.emit('dragging', {
      event,
      element: this.element,
      model: this.dragModel
    });
  }

  private emit(name, data) {
    const handlers = (this.vnode.data && this.vnode.data.on) ||
      (this.vnode.componentOptions && this.vnode.componentOptions.listeners);
  
    if (handlers && handlers[name]) {
      handlers[name].fns(data);
    }
  }
}

export default Vue.directive('draggable', {
  bind(el, binding, vnode) {
    const ctrl = new DraggableController(_id++, vnode, el, binding.value.dragModel,
      binding.value.dragX, binding.value.dragY);
    el.__draggable__ = ctrl;
  },
  update(el: any, binding, vnode) {
    const ctrl: DraggableController = el.__draggable__;
    if (!ctrl) {
      return;
    }
    ctrl.dragX = binding.value.dragX;
    ctrl.dragEventTarget = binding.value.dragEventTarget;
  },
  unbind(el: any) {
    const ctrl: DraggableController = el.__draggable__;
    ctrl.unsubscribe();
  },
});
