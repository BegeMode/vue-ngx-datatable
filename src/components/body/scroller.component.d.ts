import { Vue } from 'vue-property-decorator';
export default class ScrollerComponent extends Vue {
    scrollbarV: boolean;
    scrollbarH: boolean;
    scrollHeight: number;
    scrollWidth: string;
    fromPager: boolean;
    innerWidth: number;
    scrollYPos: number;
    scrollXPos: number;
    prevScrollYPos: number;
    prevScrollXPos: number;
    stopRender: boolean;
    parentElement: Element;
    onInitScrollHandler: () => void;
    resizeObserver?: ResizeObserver;
    onInnerWidthChanged(): void;
    created(): void;
    mounted(): void;
    beforeDestroy(): void;
    setOffset(offsetY: number, fromPager?: boolean): void;
    incOffset(offsetY: number): void;
    onInitScroll(): void;
    tick(): void;
    updateOffset(): void;
    get styleObject(): Record<string, unknown>;
}
