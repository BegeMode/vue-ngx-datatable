import { Vue } from 'vue-property-decorator';
import { VNode } from 'vue';

class VisibilityController {
  _isVisible: boolean = false;
  timeout: any;
  vnode: VNode = null;
  element: HTMLElement = null;

  constructor(vNode: VNode, el) {
    this.vnode = vNode;
    this.element = el;
  }

  set isVisible(value: boolean) {
    this._isVisible = value;
    value ? this.element.classList.add('visible') : this.element.classList.remove('visible');
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

  runCheck(): void {
    const check = () => {
      clearTimeout(this.timeout);
      // https://davidwalsh.name/offsetheight-visibility
      const { offsetHeight, offsetWidth } = this.element;

      if (offsetHeight && offsetWidth) {
        this.onVisibilityChange(true);
      } else {
        this.onVisibilityChange(false);
      }
      this.timeout = setTimeout(check.bind(this), 100);
    };
    this.timeout = setTimeout(check.bind(this));
  }

  private emit(name, data) {
    const handlers = (this.vnode.data && this.vnode.data.on) ||
      (this.vnode.componentOptions && this.vnode.componentOptions.listeners);
  
    if (handlers && handlers[name]) {
      handlers[name].fns(data);
    }
  }
}

/**
 * Visibility Observer Directive
 *
 * Usage:
 *
 * 		<div
 *      v-visibility-observer
 *     >
 * 		</div>
 *
 */
export default Vue.directive('visibility-observer', {
  resizing: false,
  bind(el, binding, vnode) {
    const ctrl = new VisibilityController(vnode, el);
    el.__visibility__ = ctrl;
    ctrl.runCheck();
  },
  unbind(el: any) {
    const ctrl = el.__visibility__;
    ctrl.stopCheck();
  },
});

/*@Directive({ selector: '[visibilityObserver]' })
export class VisibilityDirective implements OnInit, OnDestroy {

  @HostBinding('class.visible') 
  isVisible: boolean = false;

  @Output() visible: EventEmitter<any> = new EventEmitter();

  timeout: any;

  constructor(private element: ElementRef, private zone: NgZone) { }

  ngOnInit(): void {
    this.runCheck();
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeout);
  }

  onVisibilityChange(): void {
    // trigger zone recalc for columns
    this.zone.run(() => {
      this.isVisible = true;
      this.visible.emit(true);
    });
  }

  runCheck(): void {
    const check = () => {
      // https://davidwalsh.name/offsetheight-visibility
      const { offsetHeight, offsetWidth } = this.element.nativeElement;

      if (offsetHeight && offsetWidth) {
        clearTimeout(this.timeout);
        this.onVisibilityChange();
      } else {
        clearTimeout(this.timeout);
        this.zone.runOutsideAngular(() => {
          this.timeout = setTimeout(() => check(), 50);
        });
      }
    };

    this.timeout = setTimeout(() => check());
  }

}*/
