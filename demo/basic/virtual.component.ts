import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import DatatableComponent from '../../src/components/datatable.component.vue';
import { TableColumn } from '../../src/types';
import DataTableColumnComponent from '../../src/components/columns/column.component';

@Component({
  components: {
    'ngx-datatable': DatatableComponent,
    'vue-datatable-column': DataTableColumnComponent,
  },
  template: `
    <div>
      <h3>
        Virtual Scrolling with 10k Rows
        <small>
          <a href="https://github.com/begemmode/vue-ngx-datatable/blob/master/demo/basic/virtual.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class='material'
        :rows='rows'
        :columnMode="'force'"
        :headerHeight="50"
        :footerHeight="50"
        :rowHeight="getRowHeight"
        :scrollbarV="true"
        @rendered="onRendered">
        <vue-datatable-column name="Name" width="300">
          <template slot-scope="scope" v-if="scope.row">
            <strong>{{scope.row.name}}</strong>
          </template>
        </vue-datatable-column>
        <vue-datatable-column name="Gender" width="300">
          <template slot-scope="scope" v-if="scope.row">
            <strong>{{scope.row.name}}</strong>
            <i v-html="scope.row.name"></i> and <i>{{scope.row.gender}}</i>
          </template>
        </vue-datatable-column>
        <vue-datatable-column name="Row Height" prop="height" width="80">
        </vue-datatable-column>
      </ngx-datatable>
    </div>
  `
})
export default class VirtualScrollComponent extends Vue {

  rows = [];
  expanded = {};
  timeout: any;

  created() {
    this.fetch((data) => {
      this.rows = data;
    });
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/100k.json`);

    req.onload = () => {
      const rows = JSON.parse(req.response);

      for(const row of rows) {
        row.height = Math.floor(Math.random() * 80) + 50;
      }

      cb(rows);
    };

    req.send();
  }

  getRowHeight(row) {
    return row.height;
  }

  onRendered() {
    //
  }

}
