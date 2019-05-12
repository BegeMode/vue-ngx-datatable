import { Vue } from "vue-property-decorator";
import { CorporateEmployee } from "./model/corporate-employee";
declare class PagedData<T> {
    data: T[];
}
/**
 * A server used to mock a paged data result from a server
 */
export declare class MockServerResultsService {
    getResults(offset: number, limit: number): Promise<PagedData<CorporateEmployee>>;
}
export default class ServerScrollingComponent extends Vue {
    readonly headerHeight: number;
    readonly rowHeight: number;
    readonly pageLimit: number;
    rows: CorporateEmployee[];
    isLoading: boolean;
    serverResultsService: MockServerResultsService;
    mounted(): void;
    onScroll(offsetY: number): void;
    private loadPage;
}
export {};
