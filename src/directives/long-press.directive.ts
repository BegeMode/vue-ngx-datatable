import { Vue } from 'vue-property-decorator';
import { VNode } from 'vue';
import { MouseEvent } from '../events';

let _id = 0;

class LongPressData {
  id = 0;
  pressEnabled: boolean = true;
  pressModel: any;
  duration: number = 500;
  _pressing: boolean;
  _isLongPressing: boolean;
  timeout: any;
  mouseX: number = 0;
  mouseY: number = 0;
  vnode: VNode = null;
  element: Element = null;
  handleUp = null;
  handleDown = null;
  handleMove = null;

  constructor(id, vNode: VNode, el) {
    this.id = id;
    this.vnode = vNode;
    this.element = el;
    this.handleDown = this.onMouseDown.bind(this);
    this.handleUp = this.onMouseUp.bind(this);
    this.handleMove = this.onMouseMove.bind(this);
    el.addEventListener('mousedown', this.handleDown);
  }

  unsubcribe() {
    this.element.removeEventListener('mousedown', this.handleDown);
    document.removeEventListener('mouseup', this.handleUp);
    document.removeEventListener('mousemove', this.handleMove);
  }
  
  set pressing(value: boolean) {
    this._pressing = value;
    value ? this.element.classList.add('press') : this.element.classList.remove('press');
  }

  get pressing(): boolean {
    return this._pressing;
  }

  set isLongPressing(value: boolean) {
    this._isLongPressing = value;
    console.log('set isLongPressing, id, value', this.id, value);

    value ? this.element.classList.add('longpress') : this.element.classList.remove('longpress');
  }

  get isLongPressing(): boolean {
    return this._isLongPressing;
  }

  private onMouseDown(event: MouseEvent): void {
    // don't do right/middle clicks
    if (event.which !== 1 || !this.pressEnabled) return;

    // don't start drag if its on resize handle
    const target = (<HTMLElement>event.target);
    if (target.classList.contains('resize-handle')) return;

    this.mouseX = event.clientX;
    this.mouseY = event.clientY;

    this.pressing = true;
    this.isLongPressing = false;

    document.addEventListener('mouseup', this.handleUp);

    this.timeout = setTimeout(() => {
      this.isLongPressing = true;
      this.emit('longPressStart', {
        event,
        model: this.pressModel
      });

      document.addEventListener('mousemove', this.handleMove);

      this.loop(event);
    }, this.duration);

    this.loop(event);
  }

  private onMouseMove(event: MouseEvent): void {
    if (this.pressing && !this.isLongPressing) {
      const xThres = Math.abs(event.clientX - this.mouseX) > 10;
      const yThres = Math.abs(event.clientY - this.mouseY) > 10;

      console.log('long-press mouse move, id=', this.id);

      if (xThres || yThres) {
        this.endPress();
      }
    }
  }

  private loop(event: MouseEvent): void {
    if (this.isLongPressing) {
      this.timeout = setTimeout(() => {
        this.emit('longPressing', {
          event,
          model: this.pressModel
        });
        this.loop(event);
      }, 50);
    }
  }

  private endPress(): void {
    clearTimeout(this.timeout);
    this.isLongPressing = false;
    this.pressing = false;
    this.unsubcribe();

    this.emit('longPressEnd', {
      model: this.pressModel
    });
  }

  private onMouseUp(): void {
    document.removeEventListener('mousemove', this.handleMove);
    this.endPress();
  }

  private emit(name, data) {
    const handlers = (this.vnode.data && this.vnode.data.on) ||
      (this.vnode.componentOptions && this.vnode.componentOptions.listeners);
  
    if (handlers && handlers[name]) {
      handlers[name].fns(data);
    }
  }
}

export default Vue.directive('long-press', {
  resizing: false,
  bind(el, binding, vnode) {
    const data = new LongPressData(_id++, vnode, el);
    if (binding.value.pressEnabled !== undefined && binding.value.pressEnabled !== null) {
      data.pressEnabled = binding.value.pressEnabled;
    }
    if (binding.value.duration !== undefined && binding.value.duration !== null) {
      data.duration = binding.value.duration;
    }
    data.pressModel = binding.value.pressModel;
    el.__longpress__ = data;
  },
  unbind(el: any) {
    const data = el.__longpress__;
    data.unsubcribe();
  },
});

/*
@Directive({ selector: '[long-press]' })
export class LongPressDirective implements OnDestroy {

  @Input() pressEnabled: boolean = true;
  @Input() pressModel: any;
  @Input() duration: number = 500;

  @Output() longPressStart: EventEmitter<any> = new EventEmitter();
  @Output() longPressing: EventEmitter<any> = new EventEmitter();
  @Output() longPressEnd: EventEmitter<any> = new EventEmitter();

  pressing: boolean;
  isLongPressing: boolean;
  timeout: any;
  mouseX: number = 0;
  mouseY: number = 0;

  subscription: Subscription;

  @HostBinding('class.press')
  get press(): boolean { return this.pressing; }

  @HostBinding('class.longpress')
  get isLongPress(): boolean {
    return this.isLongPressing;
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    // don't do right/middle clicks
    if (event.which !== 1 || !this.pressEnabled) return;

    // don't start drag if its on resize handle
    const target = (<HTMLElement>event.target);
    if (target.classList.contains('resize-handle')) return;

    this.mouseX = event.clientX;
    this.mouseY = event.clientY;

    this.pressing = true;
    this.isLongPressing = false;

    const mouseup = fromEvent(document, 'mouseup');
    this.subscription = mouseup.subscribe((ev: MouseEvent) => this.onMouseup());

    this.timeout = setTimeout(() => {
      this.isLongPressing = true;
      this.longPressStart.emit({
        event,
        model: this.pressModel
      });

      this.subscription.add(
        fromEvent(document, 'mousemove')
          .pipe(takeUntil(mouseup))
          .subscribe((mouseEvent: MouseEvent) => this.onMouseMove(mouseEvent))
      );

      this.loop(event);
    }, this.duration);

    this.loop(event);
  }

  onMouseMove(event: MouseEvent): void {
    if (this.pressing && !this.isLongPressing) {
      const xThres = Math.abs(event.clientX - this.mouseX) > 10;
      const yThres = Math.abs(event.clientY - this.mouseY) > 10;

      if (xThres || yThres) {
        this.endPress();
      }
    }
  }

  loop(event: MouseEvent): void {
    if (this.isLongPressing) {
      this.timeout = setTimeout(() => {
        this.longPressing.emit({
          event,
          model: this.pressModel
        });
        this.loop(event);
      }, 50);
    }
  }

  endPress(): void {
    clearTimeout(this.timeout);
    this.isLongPressing = false;
    this.pressing = false;
    this._destroySubscription();

    this.longPressEnd.emit({
      model: this.pressModel
    });
  }

  onMouseup(): void {
    this.endPress();
  }

  ngOnDestroy(): void {
    this._destroySubscription();
  }

  private _destroySubscription(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }

}
*/
