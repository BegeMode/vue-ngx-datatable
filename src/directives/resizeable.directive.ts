import { Vue } from 'vue-property-decorator';
import { VNode } from 'vue';

let _id = 0;

class ResizeableDirectiveController {
  resizeEnabled = true;
  minWidth = 0;
  maxWidth = 0;
  resizing = false;
  element: HTMLElement = null;
  handleUp = null;
  handleDown = null;
  handleMove = null;
  vnode: VNode = null;
  id = 0;

  constructor(id, vNode: VNode, el) {
    this.id = id;
    this.vnode = vNode;
    this.element = el;
    this.handleDown = this.onMouseDown.bind(this);
    this.handleUp = this.onMouseUp.bind(this);
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
    const isHandle = (<HTMLElement>(event.target)).classList.contains('resize-handle');
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

  private emit(vnode, name, data) {
    const handlers = (vnode.data && vnode.data.on) ||
      (vnode.componentOptions && vnode.componentOptions.listeners);
  
    if (handlers && handlers[name]) {
      handlers[name].fns(data);
    }
  }
}

export default Vue.directive('resizeable', {
  resizing: false,
  bind(el, binding, vnode) {
    const ctrl = new ResizeableDirectiveController(_id++, vnode, el);
    if (binding.value.resizeEnabled !== undefined && binding.value.resizeEnabled !== null) {
      ctrl.resizeEnabled = binding.value.resizeEnabled;
    }
    ctrl.minWidth = binding.value.minWidth;
    ctrl.maxWidth = binding.value.maxWidth;
    el.__resizeable__ = ctrl;
    document.addEventListener('mouseup', ctrl.handleUp);
    el.addEventListener('mousedown', ctrl.handleDown);
  },
  unbind(el: any) {
    const ctrl = el.__resizeable__;
    document.removeEventListener('mouseup', ctrl.handleUp);
    el.removeEventListener('mousedown', ctrl.handleDown);
  },
  inserted(el: any) {
    const node = document.createElement('span');
    const ctrl = el.__resizeable__;
    if (ctrl.resizeEnabled) {
      node.classList.add('resize-handle');
    } else {
      node.classList.add('resize-handle--not-resizable');
    }
    el.appendChild(node);
  },
});

/*@Directive({
  selector: '[resizeable]',
  host: {
    '[class.resizeable]': 'resizeEnabled'
  }
})
export class ResizeableDirective implements OnDestroy, AfterViewInit {

  @Input() resizeEnabled: boolean = true;
  @Input() minWidth: number;
  @Input() maxWidth: number;

  @Output() resize: EventEmitter<any> = new EventEmitter();

  element: HTMLElement;
  subscription: Subscription;
  resizing: boolean = false;

  constructor(element: ElementRef, private renderer: Renderer2) {
    this.element = element.nativeElement;
  }

  ngAfterViewInit(): void {
    const renderer2 = this.renderer;
    const node = renderer2.createElement('span');
    if (this.resizeEnabled) {
      renderer2.addClass(node, 'resize-handle');
    } else {
      renderer2.addClass(node, 'resize-handle--not-resizable');
    }
    renderer2.appendChild(this.element, node);
  }

  ngOnDestroy(): void {
    this._destroySubscription();
  }

  onMouseup(): void {
    this.resizing = false;

    if (this.subscription && !this.subscription.closed) {
      this._destroySubscription();
      this.resize.emit(this.element.clientWidth);
    }
  }

  @HostListener('mousedown', ['$event'])
  onMousedown(event: MouseEvent): void {
    const isHandle = (<HTMLElement>(event.target)).classList.contains('resize-handle');
    const initialWidth = this.element.clientWidth;
    const mouseDownScreenX = event.screenX;

    if (isHandle) {
      event.stopPropagation();
      this.resizing = true;

      const mouseup = fromEvent(document, 'mouseup');
      this.subscription = mouseup
        .subscribe((ev: MouseEvent) => this.onMouseup());

      const mouseMoveSub = fromEvent(document, 'mousemove')
        .pipe(takeUntil(mouseup))
        .subscribe((e: MouseEvent) => this.move(e, initialWidth, mouseDownScreenX));

      this.subscription.add(mouseMoveSub);
    }
  }

  move(event: MouseEvent, initialWidth: number, mouseDownScreenX: number): void {
    const movementX = event.screenX - mouseDownScreenX;
    const newWidth = initialWidth + movementX;

    const overMinWidth = !this.minWidth || newWidth >= this.minWidth;
    const underMaxWidth = !this.maxWidth || newWidth <= this.maxWidth;

    if (overMinWidth && underMaxWidth) {
      this.element.style.width = `${newWidth}px`;
    }
  }

  private _destroySubscription() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }

}*/
