import { Component, Vue } from 'vue-property-decorator';
import DatatableComponent from '../../src/components/datatable.component.vue';
import DataTableColumnComponent from '../../src/components/columns/column.component';

@Component({
  components: {
    'ngx-datatable': DatatableComponent,
    'ngx-datatable-column': DataTableColumnComponent,
  },
  template: `
    <div>
      <h3>
        Force Fill Column Width Distribution
        <small>
          <a href="https://github.com/begemode/vue-ngx-datatable/blob/master/demo/columns/column-force.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        columnMode="force"
        :headerHeight="50"
        :footerHeight="50"
        :rowHeight="'auto'"
        :rows="rows">
        <ngx-datatable-column name="Name" :width="100" :resizeable="true">
        </ngx-datatable-column>
        <ngx-datatable-column name="Gender" :width="100">
        </ngx-datatable-column>
        <ngx-datatable-column name="Age" :width="300">
        </ngx-datatable-column>
      </ngx-datatable>
    </div>
  `
})
export default class ColumnForceComponent extends Vue {

  rows: Array<Record<string, unknown>> = [];

  created() {
    this.fetch((data: Array<Record<string, unknown>>) => {
      this.rows = data.splice(0, 5);
    });
  }

  fetch(cb: (data: Array<Record<string, unknown>>) => void) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

}
