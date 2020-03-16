import { Vue } from 'vue-property-decorator';
export default class ScrollerComponent extends Vue {
    scrollbarV: boolean;
    scrollbarH: boolean;
    scrollHeight: number;
    scrollWidth: number;
    get styleObject(): {
        height: string;
        width: string;
    };
    scrollYPos: number;
    scrollXPos: number;
    prevScrollYPos: number;
    prevScrollXPos: number;
    parentElement: any;
    onScrollListener: any;
    scrollDirty: boolean;
    mounted(): void;
    destroyed(): void;
    setOffset(offsetY: number): void;
    onScrolled(event: MouseEvent): void;
    updateOffset(): void;
}
