import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import DatatableComponent from '../../src/components/datatable.component.vue';
import DataTableColumnComponent from '../../src/components/columns/column.component';
import { CorporateEmployee } from '../../demo/paging/model/corporate-employee';
import { MockServerResultsService } from '../../demo/paging/mock-server-results-service';
import { Page } from '../../demo/paging/model/page';

@Component({
  components: {
    'ngx-datatable': DatatableComponent,
    'ngx-datatable-column': DataTableColumnComponent,
  },
  template: `
    <div>
      <h3>
        Dynamic Height and Virtual Scrolling
        <small>
          <a href="https://github.com/begemode/vue-ngx-datatable/blob/master/demo/basic/dynamic-height.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        :rows="rows"
        columnMode="force"
        :headerHeight="50"
        :footerHeight="50"
        :rowHeight="getRowHeight"
        :externalPaging="true"
        :loadingIndicator="isLoading > 0"
        :count="totalElements"
        :offset="pageNumber"
        :scrollbarV="true"
        @page="setPage">
        <ngx-datatable-column name="Name"></ngx-datatable-column>
        <ngx-datatable-column name="Gender"></ngx-datatable-column>
        <ngx-datatable-column name="Row Height" prop="height"></ngx-datatable-column>
      </ngx-datatable>
    </div>
  `
})
export default class DynamicHeightComponent extends Vue {

  page: Page = null;
  rows: Array<CorporateEmployee> = null;
  columns = [{ name: 'Name' }, { name: 'Gender' }, { name: 'Company' }];
  cache: any = {};
  serverResultsService: MockServerResultsService;
  isLoading = 0;
  totalElements: number = 0;

  created() {
    this.serverResultsService = new MockServerResultsService();
    this.page = new Page();
    this.page.pageNumber = 0;
    // this.setPage({ offset: 0, pageSize: 10 })
  }

  get pageNumber() {
    return this?.page?.pageNumber;
  }

  /**
   * Populate the table with new data based on the page number
   * @param page The page to select
   */
  async setPage(pageInfo: { offset: number; pageSize: number }) {
    if (!this.page || (this.rows?.length && pageInfo.offset === this.page.pageNumber)) {
      return;
    }
    this.page.pageNumber = pageInfo.offset;
    this.page.size = pageInfo.pageSize;

    // cache results
    if (this.cache[this.page.pageNumber]) return;
    
    // counter of pages loading
    this.isLoading++;

    let prevPagedData = null;
    let page = this.page.pageNumber;
    // for last page we will load prev page data too
    if (pageInfo.offset === Math.floor(this.page.totalPages) && pageInfo.offset - 1 > 0 && !this.cache[pageInfo.offset - 1]) {
      this.page.pageNumber = pageInfo.offset - 1;
      page = this.page.pageNumber;
      prevPagedData = await this.serverResultsService.getResults(this.page, new Date(Date.now() + 1000 * Math.random()).getMilliseconds());
      this.page.pageNumber = pageInfo.offset;
    }

    const pagedData = await this.serverResultsService.getResults(this.page, new Date(Date.now() + 1000 * Math.random()).getMilliseconds());
    if (prevPagedData && Array.isArray(prevPagedData.data)) {
      pagedData.data = [...prevPagedData.data, ...pagedData.data]; 
    }

    this.totalElements = pagedData.page.totalElements;

    // create array to store data if missing
    if (!this.rows) {
      // length should be total count
      this.rows = new Array<CorporateEmployee>(this.page.totalElements || 0);
    }
    
    // calc start
    const start = page * this.page.size;

    // copy rows
    const rows = [...this.rows];

    // insert rows into new position
    rows.splice(start, pagedData.data.length, ...pagedData.data);

    // set rows to our new rows
    this.rows = rows;

    // add flag for results
    this.cache[page] = true;
    this.cache[pageInfo.offset] = true;
    this.isLoading--;
  }

  getRowHeight(row: Record<string, number>): number {
    if (!row) {
      return 100;
    }
    if (row.height === undefined) {
      return 50;
    }
    return row.height;
  }

}
