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
    footerSlot: any;
    selectedCount: number;
    selectedMessage: string | boolean;
    created(): void;
    beforeUpdate(): void;
    readonly isVisible: boolean;
    readonly curPage: number;
}
