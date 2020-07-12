import { Vue } from 'vue-property-decorator';
export default class ScrollerComponent extends Vue {
    scrollbarV: boolean;
    scrollbarH: boolean;
    scrollHeight: number;
    scrollWidth: number;
    fromPager: boolean;
    get styleObject(): {
        height: string;
        width: string;
    };
    scrollYPos: number;
    scrollXPos: number;
    prevScrollYPos: number;
    prevScrollXPos: number;
    parentElement: any;
    onScrollListener: (event: MouseEvent) => void;
    onInitScrollHandler: () => void;
    scrollDirty: boolean;
    created(): void;
    mounted(): void;
    beforeDestroy(): void;
    setOffset(offsetY: number, fromPager?: boolean): void;
    incOffset(offsetY: number): void;
    onInitScroll(): void;
    onScrolled(event: MouseEvent): void;
    updateOffset(): void;
}
