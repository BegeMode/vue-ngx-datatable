import { Component, Vue } from 'vue-property-decorator';
import DatatableComponent from '../../src/components/datatable.component.vue';
import {MockServerResultsService} from './mock-server-results-service';
import {CorporateEmployee} from './model/corporate-employee';
import {Page} from './model/page';

@Component({
  name: 'server-paging-demo',
  components: {
    'ngx-datatable': DatatableComponent,
  },
  template: `
    <div>
      <h3>
        Server-side Paging
        <small>
          <a href="https://github.com/begemode/vue-ngx-datatable/blob/master/demo/paging/paging-server.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        :rows="rows"
        :columns="[{name:'Name'},{name:'Gender'},{name:'Company'}]"
        columnMode="force"
        :headerHeight="50"
        :footerHeight="50"
        rowHeight="auto"
        :externalPaging="true"
        :count="page.totalElements"
        :offset="page.pageNumber"
        :limit="page.size"
        @page="setPage($event)">
      </ngx-datatable>
    </div>
  `
})
export default class ServerPagingComponent extends Vue {

  page = new Page();
  rows = new Array<CorporateEmployee>();
  serverResultsService = new MockServerResultsService(100);

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

}
