import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

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
  @Prop() scrollWidth: string;

  fromPager = true;
  innerWidth = 0;
  scrollYPos = 0;
  scrollXPos = 0;
  prevScrollYPos = 0;
  prevScrollXPos = 0;
  stopRender = false;
  parentElement: Element;
  // onScrollListener: (event: MouseEvent) => void;
  onInitScrollHandler: () => void;
  // scrollDirty = false;
  resizeObserver?: ResizeObserver;

  @Watch('innerWidth') onInnerWidthChanged() {
    this.$emit('change-width', this.innerWidth);
  }

  created(): void {
    this.$emit('setup', {
      scrollYPos: this.scrollYPos,
      scrollXPos: this.scrollXPos,
    });
  }

  mounted(): void {
    // manual bind so we don't always listen
    if (this.scrollbarV || this.scrollbarH) {
      this.parentElement = this.$el.closest('.datatable-body');
      // this.onScrollListener = this.onScrolled.bind(this) as (event: MouseEvent) => void;
      // this.parentElement.addEventListener('scroll', this.onScrollListener, {
      //   passive: true,
      // });
      this.onInitScrollHandler = this.onInitScroll.bind(this) as () => void;
      'mousedown DOMMouseScroll mousewheel wheel touchstart keyup'.split(' ').forEach(event => {
        this.parentElement.addEventListener(event, this.onInitScrollHandler, {
          passive: true,
        });
      });
      this.tick();
    }
    if ((window as Window).ResizeObserver) {
      this.resizeObserver = new (window as Window).ResizeObserver(entries => {
        if (entries.length && entries[0].contentRect) {
          this.innerWidth = Math.floor(entries[0].contentRect.width);
        } else {
          this.innerWidth = this.$el.clientWidth;
        }
      });
      this.resizeObserver.observe(this.$el);
    }
  }

  beforeDestroy(): void {
    this.stopRender = true;
    if (this.resizeObserver) {
      this.resizeObserver.unobserve(this.$el);
    }
    if (this.scrollbarV || this.scrollbarH) {
      // this.parentElement.removeEventListener('scroll', this.onScrollListener);
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

  onInitScroll(): void {
    this.fromPager = false;
  }

  // onScrolled(event: MouseEvent): void {
  // if (this.scrollbarV || this.scrollbarH) {
  //   if (!this.scrollDirty) {
  //     this.scrollDirty = true;
  //     const dom: Element = <Element>event.currentTarget;
  //     requestAnimationFrame(() => {
  //       this.scrollYPos = dom.scrollTop;
  //       this.scrollXPos = dom.scrollLeft;
  //       this.updateOffset();
  //       this.scrollDirty = false;
  //     });
  //   } else {
  //     // eslint-disable-next-line no-console
  //     console.log('this.scrollDirty is true');
  //   }
  // this.currScrollTop = event.target.scrollTop;
  // this.currScrollLeft = event.target.scrollLeft;
  // }

  tick(): void {
    if (this.stopRender) {
      return;
    }
    requestAnimationFrame(() => this.tick());
    if (this.scrollbarV || this.scrollbarH) {
      if (!this.parentElement) {
        return;
      }
      const scrollTop = this.parentElement.scrollTop;
      const scrollLeft = this.parentElement.scrollLeft;
      if (this.scrollYPos === scrollTop && this.scrollXPos === scrollLeft) {
        return;
      }
      this.scrollYPos = scrollTop;
      this.scrollXPos = scrollLeft;
      this.updateOffset();
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
        fromPager: this.fromPager,
      });
    }
    this.prevScrollYPos = this.scrollYPos;
    this.prevScrollXPos = this.scrollXPos;
  }

  get styleObject(): Record<string, unknown> {
    return {
      height: this.scrollHeight ? `${this.scrollHeight}px` : null,
      width: '100%', // `${this.scrollWidth}px`,
      position: 'relative',
      transform: 'translateZ(0)',
    };
  }
}
