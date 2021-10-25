import { Vue } from 'vue-property-decorator';
export interface IPage {
    number: number;
    text: string;
}
export default class DataTablePagerComponent extends Vue {
    pagerLeftArrowIcon: string;
    pagerRightArrowIcon: string;
    pagerPreviousIcon: string;
    pagerNextIcon: string;
    size: number;
    count: number;
    page: number;
    pages: IPage[];
    myPage: number;
    onCountChanged(): void;
    onSizeChanged(): void;
    onPageChanged(): void;
    created(): void;
    get totalPages(): number;
    get canPrevious(): boolean;
    get canNext(): boolean;
    prevPage(): void;
    nextPage(): void;
    selectPage(page: number): void;
    calcPages(page?: number): IPage[];
}
