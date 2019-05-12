import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import DatatableComponent from '../../src/components/datatable.component.vue';
import {MockServerResultsService} from '../paging/mock-server-results-service';
import {CorporateEmployee} from '../paging/model/corporate-employee';
import {Page} from '../paging/model/page';

@Component({
  name: 'summary-row-server-paging-demo',
  components: {
    'ngx-datatable': DatatableComponent,
  },
  template: `
    <div>
      <h3>
        Server-side paging
        <small>
          <a href="https://github.com/begemode/vue-ngx-datatable/blob/master/demo/summary/summary-row-server-paging.component.ts">
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        :rows="rows"
        :columns="columns"
        columnMode="force"
        :headerHeight="50"
        :summaryRow="true"
        summaryHeight="auto"
        :footerHeight="50"
        rowHeight="auto"
        :externalPaging="true"
        :count="page.totalElements"
        :offset="page.pageNumber"
        :limit="page.size"
        @page='setPage($event)'>
      </ngx-datatable>
    </div>
  `
})
export default class SummaryRowServerPagingComponent extends Vue {

  page = new Page();
  rows = new Array<CorporateEmployee>();
  serverResultsService = new MockServerResultsService();

  columns = [
    // NOTE: cells for current page only !
    { name: 'Name', summaryFunc: (cells) => `${cells.length} total` },
    { name: 'Gender', summaryFunc: () => this.getGenderSummary() },
    { name: 'Company', summaryFunc: () => null }
  ];

  created() {
    this.page.pageNumber = 0;
    this.page.size = 20;
  }

  mounted() {
    this.setPage({ offset: 0 });
  }

  /**
   * Populate the table with new data based on the page number
   * @param page The page to select
   */
  async setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    const pagedData = await this.serverResultsService.getResults(this.page);
    this.page = pagedData.page;
    this.rows = pagedData.data;
  }

  getGenderSummary(): string {
    // NOTE: there should be logic to get required informations from server
    return '10 males, 10 females';
  }

}
