import { Component, Vue } from 'vue-property-decorator';
import DatatableComponent from '../../src/components/datatable.component.vue';
import {MockServerResultsService} from './mock-server-results-service';
import {PagedData} from './model/paged-data';
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
        :count="page.totalElements"
        :offset="page.pageNumber"
        @page="setPage($event)">
      </ngx-datatable>
    </div>
  `
})
export default class VirtualPagingComponent extends Vue {

  page = new Page();
  rows = new Array<CorporateEmployee>();
  columns = [{ name: 'Name' }, { name: 'Gender' }, { name: 'Company' }];
  cache: any = {};
  serverResultsService: MockServerResultsService;

  created() {
    this.serverResultsService = new MockServerResultsService();
    this.page.pageNumber = -1;
  }

  /**
   * Populate the table with new data based on the page number
   * @param page The page to select
   */
  async setPage(pageInfo) {
    if (pageInfo.offset === this.page.pageNumber) {
      return;
    }
    this.page.pageNumber = pageInfo.offset;
    this.page.size = pageInfo.pageSize;

    // cache results
    // if(this.cache[this.page.pageNumber]) return;

    const pagedData = await this.serverResultsService.getResults(this.page);

    // calc start
    const start = this.page.pageNumber * this.page.size;

    // copy rows
    const rows = [...this.rows];

    // insert rows into new position
    rows.splice(start, 0, ...pagedData.data);

    // set rows to our new rows
    this.rows = rows;

    // add flag for results
    this.cache[this.page.pageNumber] = true;
  }

}
