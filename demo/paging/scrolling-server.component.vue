<template>
  <div>
    <h3>
      Server-side Scrolling
      <small>
        <a
          href="https://github.com/begemode/vue-ngx-datatable/blob/master/demo/paging/scrolling-server.component.ts"
          target="_blank"
          >Source</a
        >
      </small>
    </h3>
    <ngx-datatable
      class="material server-scrolling-demo"
      :rows="rows"
      :columns="[{ name: 'Name' }, { name: 'Gender' }, { name: 'Company' }]"
      columnMode="force"
      :headerHeight="headerHeight"
      :rowHeight="rowHeight"
      :loadingIndicator="isLoading"
      :scrollbarV="true"
      @scroll="onScroll($event.offsetY)"
    ></ngx-datatable>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DatatableComponent from '../../src/components/datatable.component.vue';
import { CorporateEmployee } from './model/corporate-employee';

const companyData = require('../../assets/data/company.json');

class PagedData<T> {
  data: T[];
}

/**
 * A server used to mock a paged data result from a server
 */
export class MockServerResultsService {
  public getResults(offset: number, limit: number): Promise<PagedData<CorporateEmployee>> {
    const result = companyData.slice(offset, offset + limit);
    let resolveFunc: (data: PagedData<CorporateEmployee>) => void;
    const promise = new Promise<PagedData<CorporateEmployee>>(resolve => (resolveFunc = resolve));
    setTimeout(() => resolveFunc({ data: result }), 2000);
    return promise;
  }
}

@Component({
  name: 'server-scrolling-demo',
  components: {
    'ngx-datatable': DatatableComponent,
  },
})
export default class ServerScrollingComponent extends Vue {
  readonly headerHeight = 50;
  readonly rowHeight = 50;
  readonly pageLimit = 10;

  rows: CorporateEmployee[] = [];
  isLoading: boolean = false;
  serverResultsService = new MockServerResultsService();

  mounted() {
    this.onScroll(0);
  }

  onScroll(offsetY: number) {
    // total height of all rows in the viewport
    const viewHeight = this.$el.getBoundingClientRect().height - this.headerHeight;

    // check if we scrolled to the end of the viewport
    if (!this.isLoading && offsetY + viewHeight >= this.rows.length * this.rowHeight) {
      // total number of results to load
      let limit = this.pageLimit;

      // check if we haven't fetched any results yet
      if (this.rows.length === 0) {
        // calculate the number of rows that fit within viewport
        const pageSize = Math.ceil(viewHeight / this.rowHeight);

        // change the limit to pageSize such that we fill the first page entirely
        // (otherwise, we won't be able to scroll past it)
        limit = Math.max(pageSize, this.pageLimit);
      }
      this.loadPage(limit);
    }
  }

  private async loadPage(limit: number) {
    // set the loading flag, which serves two purposes:
    // 1) it prevents the same page from being loaded twice
    // 2) it enables display of the loading indicator
    this.isLoading = true;

    const result = await this.serverResultsService.getResults(this.rows.length, limit);
    const rows = [...this.rows, ...result.data];
    this.rows = rows;
    this.isLoading = false;
  }
}
</script>
<style lang="scss">
.server-scrolling-demo {
  height: calc(100vh - 110px) !important;
}

.server-scrolling-demo .progress-linear {
  position: fixed !important;
  bottom: 0px;
}
</style>
