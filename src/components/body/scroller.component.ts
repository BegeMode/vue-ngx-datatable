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

  get styleObject() {
    return {
      height: this.scrollHeight + 'px',
      width: this.scrollWidth + 'px',
    };
  }

  // @Output() scroll: EventEmitter<any> = new EventEmitter();

  scrollYPos: number = 0;
  scrollXPos: number = 0;
  prevScrollYPos: number = 0;
  prevScrollXPos: number = 0;
  parentElement: any;
  onScrollListener: any;
  scrollDirty = false;

  mounted(): void {
    // manual bind so we don't always listen
    if (this.scrollbarV || this.scrollbarH) {
      // const renderer = this.renderer;
      this.parentElement = this.$el.closest('.datatable-body');
      // .parentElement; //  renderer.parentNode(renderer.parentNode(this.element));
      this.parentElement.addEventListener('scroll', this.onScrolled.bind(this), {
        passive: true,
      });
    }
  }

  destroyed(): void {
    if (this.scrollbarV || this.scrollbarH) {
      this.parentElement.removeEventListener('scroll', this.onScrolled.bind(this));
    }
  }

  setOffset(offsetY: number): void {
    if (this.parentElement) {
      this.parentElement.scrollTop = offsetY;
    }
  }

  onScrolled(event: MouseEvent): void {
    if (this.scrollbarV || this.scrollbarH) {
      if (!this.scrollDirty) {
        this.scrollDirty = true;
        const dom: Element = <Element>event.currentTarget;
        requestAnimationFrame(() => {
          this.scrollDirty = false;
          this.scrollYPos = dom.scrollTop;
          this.scrollXPos = dom.scrollLeft;
          this.updateOffset();
        });
      } else {
        console.log(('this.scrollDirty is true'));
        
      }
    }
  }

  updateOffset(): void {
    let direction: string;
    if (this.scrollYPos < this.prevScrollYPos) {
      direction = 'down';
    } else if (this.scrollYPos > this.prevScrollYPos) {
      direction = 'up';
    }
    if (direction) {
      this.$emit('scroll', {
        direction,
        scrollYPos: this.scrollYPos,
        scrollXPos: this.scrollXPos
      });
    }

    this.prevScrollYPos = this.scrollYPos;
    this.prevScrollXPos = this.scrollXPos;
  }

}
