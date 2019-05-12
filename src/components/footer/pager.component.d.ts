import { Vue } from 'vue-property-decorator';
export default class DataTablePagerComponent extends Vue {
    pagerLeftArrowIcon: string;
    pagerRightArrowIcon: string;
    pagerPreviousIcon: string;
    pagerNextIcon: string;
    size: number;
    count: number;
    page: number;
    pages: any;
    myPage: number;
    onCountChanged(): void;
    onSizeChanged(): void;
    onPageChanged(): void;
    created(): void;
    readonly totalPages: number;
    readonly canPrevious: boolean;
    readonly canNext: boolean;
    prevPage(): void;
    nextPage(): void;
    selectPage(page: number): void;
    calcPages(page?: number): any[];
}
