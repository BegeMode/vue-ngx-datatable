import { Component, Vue } from 'vue-property-decorator';
import DatatableComponent from '../../src/components/datatable.component.vue';
import {MockServerResultsService} from './mock-server-results-service';
import {CorporateEmployee} from './model/corporate-employee';
import {Page} from './model/page';

@Component({
  components: {
    'ngx-datatable': DatatableComponent,
  },
  template: `
    <div>
      <h3>
        Virtual Server-side Paging
        <small>
          <a href="https://github.com/begemode/vue-ngx-datatable/blob/master/demo/paging/paging-virtual.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        :rows="rows"
        :columns="columns"
        :columnMode="'force'"
        :headerHeight="50"
        :scrollbarV="true"
        :footerHeight="50"
        :rowHeight="50"
        :externalPaging="true"
        :loadingIndicator="isLoading > 0"
        :count="totalElements"
        :offset="pageNumber"
        @page="setPage($event)">
      </ngx-datatable>
    </div>
  `
})
export default class VirtualPagingComponent extends Vue {

  page = null;
  rows: Array<CorporateEmployee> = null;
  columns = [{ name: 'Name' }, { name: 'Gender' }, { name: 'Company' }];
  cache: any = {};
  serverResultsService: MockServerResultsService;
  isLoading = 0;
  totalElements: number = 0;

  created() {
    this.serverResultsService = new MockServerResultsService();
    setTimeout(() => {
      this.page = new Page();
      this.page.pageNumber = 4;
    }, 1000);
  }

  get pageNumber() {
    return this?.page?.pageNumber;
  }

  /**
   * Populate the table with new data based on the page number
   * @param page The page to select
   */
  async setPage(pageInfo) {
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

}
