import { VNode } from 'vue';
import { Vue } from 'vue-property-decorator';
export default class DataTableFooterComponent extends Vue {
    footerHeight: number;
    rowCount: number;
    pageSize: number;
    offset: number;
    pagerLeftArrowIcon: string;
    pagerRightArrowIcon: string;
    pagerPreviousIcon: string;
    pagerNextIcon: string;
    totalMessage: string;
    footerSlot: (arg?: Record<string, unknown>) => VNode[];
    selectedCount: number;
    selectedMessage: string | boolean;
    created(): void;
    beforeUpdate(): void;
    get isVisible(): boolean;
    get curPage(): number;
}