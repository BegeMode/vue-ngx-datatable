import { Vue } from 'vue-property-decorator';
import { MockServerResultsService } from './mock-server-results-service';
import { CorporateEmployee } from './model/corporate-employee';
export default class VirtualPagingComponent extends Vue {
    page: any;
    rows: Array<CorporateEmployee>;
    columns: {
        name: string;
    }[];
    cache: any;
    serverResultsService: MockServerResultsService;
    isLoading: number;
    totalElements: number;
    created(): void;
    get pageNumber(): any;
    /**
     * Populate the table with new data based on the page number
     * @param page The page to select
     */
    setPage(pageInfo: any): Promise<void>;
}
