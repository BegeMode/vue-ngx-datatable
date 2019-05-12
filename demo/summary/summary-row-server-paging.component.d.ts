import { Vue } from 'vue-property-decorator';
import { MockServerResultsService } from '../paging/mock-server-results-service';
import { CorporateEmployee } from '../paging/model/corporate-employee';
import { Page } from '../paging/model/page';
export default class SummaryRowServerPagingComponent extends Vue {
    page: Page;
    rows: CorporateEmployee[];
    serverResultsService: MockServerResultsService;
    columns: ({
        name: string;
        summaryFunc: (cells: any) => string;
    } | {
        name: string;
        summaryFunc: () => any;
    })[];
    created(): void;
    mounted(): void;
    /**
     * Populate the table with new data based on the page number
     * @param page The page to select
     */
    setPage(pageInfo: any): Promise<void>;
    getGenderSummary(): string;
}
