import { Vue } from 'vue-property-decorator';
import { MockServerResultsService } from './mock-server-results-service';
import { CorporateEmployee } from './model/corporate-employee';
import { Page } from './model/page';
export default class ServerPagingComponent extends Vue {
    page: Page;
    rows: CorporateEmployee[];
    serverResultsService: MockServerResultsService;
    created(): void;
    mounted(): void;
    /**
     * Populate the table with new data based on the page number
     * @param page The page to select
     */
    setPage(pageInfo: {
        pageNumber?: number;
        offset: number;
    }): Promise<void>;
}
