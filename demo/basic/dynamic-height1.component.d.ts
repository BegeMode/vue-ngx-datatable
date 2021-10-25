import { Vue } from 'vue-property-decorator';
import { CorporateEmployee } from '../../demo/paging/model/corporate-employee';
import { MockServerResultsService } from '../../demo/paging/mock-server-results-service';
import { Page } from '../../demo/paging/model/page';
export default class DynamicHeightComponent extends Vue {
    page: Page;
    rows: Array<CorporateEmployee>;
    columns: {
        name: string;
    }[];
    cache: any;
    serverResultsService: MockServerResultsService;
    isLoading: number;
    totalElements: number;
    created(): void;
    get pageNumber(): number;
    /**
     * Populate the table with new data based on the page number
     * @param page The page to select
     */
    setPage(pageInfo: {
        offset: number;
        pageSize: number;
    }): Promise<void>;
    getRowHeight(row: Record<string, number>): number;
}
