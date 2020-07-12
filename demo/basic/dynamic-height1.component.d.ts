import { Vue } from 'vue-property-decorator';
import { CorporateEmployee } from '../../demo/paging/model/corporate-employee';
import { MockServerResultsService } from '../../demo/paging/mock-server-results-service';
export default class DynamicHeightComponent extends Vue {
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
    getRowHeight(row: any): any;
}
