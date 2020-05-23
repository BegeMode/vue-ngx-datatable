import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  template: `
  <div class="datatable-scroll" :style="styleObject">
    <slot></slot>
  </div>
  `,
})
export default class ScrollerComponent extends Vue {

  @Prop({ type: Boolean, default: false }) scrollbarV: boolean;
  @Prop({ type: Boolean, default: false }) scrollbarH: boolean;
  @Prop() scrollHeight: number;
  @Prop() scrollWidth: number;

  fromPager = true;

  get styleObject() {
    return {
      height: this.scrollHeight + 'px',
      width: this.scrollWidth + 'px',
    };
  }

  scrollYPos: number = 0;
  scrollXPos: number = 0;
  prevScrollYPos: number = 0;
  prevScrollXPos: number = 0;
  parentElement: any;
  onScrollListener: (event: MouseEvent) => void;
  onInitScrollHandler: () => void;
  scrollDirty = false;

  created() {
    this.$emit('setup', {
      scrollYPos: this.scrollYPos,
      scrollXPos: this.scrollXPos
    });
  }

  mounted(): void {
    // manual bind so we don't always listen
    if (this.scrollbarV || this.scrollbarH) {
      // const renderer = this.renderer;
      this.parentElement = this.$el.closest('.datatable-body');
      // .parentElement; //  renderer.parentNode(renderer.parentNode(this.element));
      this.onScrollListener = this.onScrolled.bind(this);
      this.parentElement.addEventListener('scroll', this.onScrollListener, {
        passive: true,
      });
      this.onInitScrollHandler = this.onInitScroll.bind(this);
      'mousedown DOMMouseScroll mousewheel wheel touchstart keyup'.split(' ').forEach(event => {
        this.parentElement.addEventListener(event, this.onInitScrollHandler);
      });
    }
  }

  destroyed(): void {
    if (this.scrollbarV || this.scrollbarH) {
      this.parentElement.removeEventListener('scroll', this.onScrollListener);
      'mousedown DOMMouseScroll mousewheel wheel touchstart keyup'.split(' ').forEach(event => {
        this.parentElement.removeEventListener(event, this.onInitScrollHandler);
      });
    }
  }

  setOffset(offsetY: number, fromPager: boolean = false): void {
    if (this.parentElement) {
      this.fromPager = fromPager;
      this.parentElement.scrollTop = offsetY;
    }
  }

  incOffset(offsetY: number): void {
    if (this.parentElement) {
      this.parentElement.scrollTop += offsetY;
    }
  }

  onInitScroll() {
    this.fromPager = false;
  }

  onScrolled(event: MouseEvent): void {
    if (this.scrollbarV || this.scrollbarH) {
      if (!this.scrollDirty) {
        this.scrollDirty = true;
        const dom: Element = <Element>event.currentTarget;
        requestAnimationFrame(() => {
          this.scrollYPos = dom.scrollTop;
          this.scrollXPos = dom.scrollLeft;
          this.updateOffset();
          this.scrollDirty = false;
        });
      } else {
        console.log('this.scrollDirty is true');
      }
    }
  }

  updateOffset(): void {
    let direction: string;
    if (this.scrollYPos < this.prevScrollYPos) {
      direction = 'down';
    } else if (this.scrollYPos > this.prevScrollYPos) {
      direction = 'up';
    } else if (this.scrollXPos < this.prevScrollXPos) {
      direction = 'right';
    } else if (this.scrollXPos > this.prevScrollXPos) {
      direction = 'left';
    }
    if (direction) {
      this.$emit('scroll', {
        direction,
        scrollYPos: this.scrollYPos,
        scrollXPos: this.scrollXPos,
        fromPager: this.fromPager
      });
    }
    this.prevScrollYPos = this.scrollYPos;
    this.prevScrollXPos = this.scrollXPos;
  }

}
